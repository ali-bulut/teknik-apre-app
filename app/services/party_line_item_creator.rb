require 'erb'

class PartyLineItemCreator
  def initialize(party_id:, line_item_num:, entered_l_i_values:)
    @party_id = party_id
    @line_item_num = line_item_num
    @entered_l_i_values = entered_l_i_values
  end

  def self.call(*args)
    new(*args).send(:create_line_item)
  end

  private

  def create_line_item
    @party = Party.find(@party_id)
    @party_line_item = @party.party_line_items.new
    @party_line_item.line_item_num = @line_item_num
    save_status = @party_line_item.save

    self.create_entered_l_i_values
    self.create_calculated_l_i_values

    # TODO: create barcode and return html_path

    html_path = create_rendered_html
    @party_line_item.html_path = html_path
    @party_line_item.save!

    html_path
  end

  def create_entered_l_i_values
    @entered_l_i_values.each do |record|
      party_line_item_value = @party_line_item.party_line_item_values.new
      party_line_item_value.template_value_id = record[:id]
      party_line_item_value.value = record[:value].to_f.round(2)

      party_line_item_value.save!
    end
  end

  def create_calculated_l_i_values
    entered_value = @party.barcode.template.entered_values.net_mt?.first

    net_mt_value = @party_line_item.party_line_item_values.where(template_value_id: entered_value.id).first.value.to_f
    net_kg_value = (net_mt_value / @party.barcode.net_weight_division_num).round(2)
    gross_kg_value = (net_kg_value + @party.barcode.gross_weight_addition_num).round(2)
    gross_mt_value = net_mt_value

    @party.barcode.template.calculated_values.map do |calculated_value|
      party_line_item_value = @party_line_item.party_line_item_values.new
      party_line_item_value.template_value_id = calculated_value.id

      if calculated_value.net_kg?
        party_line_item_value.value = net_kg_value
      elsif calculated_value.gross_kg?
        party_line_item_value.value = gross_kg_value
      elsif calculated_value.gross_mt?
        party_line_item_value.value = gross_mt_value
      end

      party_line_item_value.save!
    end
  end

  def create_rendered_html
    erb_path = @party.barcode.template.html_path
    erb_str = File.read(Rails.root.join('public', erb_path))

    html_dir = Rails.root.join('public', 'barcodes', @party.barcode.name, "Party-#{@party.party_num.to_s}")
    FileUtils.mkdir_p(html_dir) unless File.exist?(html_dir)

    created_html_path = Rails.root.join(html_dir, "Item-#{@party_line_item.line_item_num.to_s}.html")

    @rendered_line_item_num = "Item-#{@party_line_item.line_item_num.to_s}"
    renderer = ERB.new(erb_str)
    result = renderer.result(binding)

    File.open(created_html_path, 'w') do |f|
      f.write(result)
    end
    html_path = "barcodes/" + @party.barcode.name + "/Party-#{@party.party_num.to_s}/" + "Item-#{@party_line_item.line_item_num.to_s}.html"

    html_path
  end
end
