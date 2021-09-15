require 'erb'
require 'barby'
require 'barby/barcode/code_39'
require 'barby/outputter/png_outputter'

class PartyLineItemCreator
  def initialize(party_id: nil, line_item_num: nil, entered_l_i_values: nil, base_url: nil)
    @party_id = party_id
    @line_item_num = line_item_num
    @entered_l_i_values = entered_l_i_values
    @base_url = base_url
  end

  def self.call(*args)
    new(*args).send(:create_line_item)
  end

  public

  def create_line_item
    @party = Party.find(@party_id)
    unless @party.party_line_items.find_by(line_item_num: @line_item_num).nil?
      return false
    end

    @party_line_item = @party.party_line_items.new
    @party_line_item.line_item_num = @line_item_num
    @party_line_item.save!

    self.create_entered_l_i_values
    self.create_calculated_l_i_values

    html_path = create_rendered_html(@party, @party_line_item, @base_url)
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

  def create_rendered_html(party, party_line_item, base_url)
    erb_path = party.barcode.template.html_path
    erb_str = File.read(Rails.root.join('public', erb_path))

    barcode_name = party.barcode.id.to_s
    party_num = "Party-#{party.id.to_s}"
    file_name = "Item-#{party_line_item.id.to_s}-#{Time.now.to_i}"
    html_file_name = file_name + ".html"

    html_dir = Rails.root.join('public', 'barcodes', barcode_name, party_num)
    barcode_image_dir = Rails.root.join('public', 'barcodes', barcode_name, party_num, 'barcode_images')
    FileUtils.mkdir_p(html_dir) unless File.exist?(html_dir)
    FileUtils.mkdir_p(barcode_image_dir) unless File.exist?(barcode_image_dir)

    created_html_path = Rails.root.join(html_dir, html_file_name)

    if party.barcode.template.is_default?
      create_default_template(party, party_line_item)
    elsif party.barcode.template.is_with_width?
      create_template_with_width(party, party_line_item)
    end

    common_path = "barcodes/" + barcode_name + '/' + party_num
    html_path = common_path + '/' + html_file_name

    create_barcode(common_path, file_name, party, base_url)

    renderer = ERB.new(erb_str)
    result = renderer.result(binding)

    File.open(created_html_path, 'w') do |f|
      f.write(result)
    end

    html_path
  end

  def create_default_template(party, party_line_item)
    @value_1 = party.barcode.barcode_main_values.find_by(template_value_id: 1).value
    @value_2 = party.barcode.barcode_main_values.find_by(template_value_id: 2).value
    @value_3 = party.barcode.barcode_main_values.find_by(template_value_id: 3).value
    @value_4 = party.barcode.barcode_main_values.find_by(template_value_id: 4).value
    @value_5 = party.barcode.barcode_main_values.find_by(template_value_id: 5).value
    @value_6 = party.barcode.barcode_main_values.find_by(template_value_id: 6).value
    @value_7 = party.barcode.barcode_main_values.find_by(template_value_id: 7).value
    @value_8 = party.barcode.barcode_main_values.find_by(template_value_id: 8).value
    @value_roll_no = party_line_item.line_item_num

    gross_kg_id = party.barcode.template.template_values.gross_kg?.first
    @gross_kg = party_line_item.party_line_item_values.find_by(template_value_id: gross_kg_id).value

    net_kg_id = party.barcode.template.template_values.net_kg?.first
    @net_kg = party_line_item.party_line_item_values.find_by(template_value_id: net_kg_id).value

    gross_mt_id = party.barcode.template.template_values.gross_mt?.first
    @gross_mt = party_line_item.party_line_item_values.find_by(template_value_id: gross_mt_id).value

    net_mt_id = party.barcode.template.template_values.net_mt?.first
    @net_mt = party_line_item.party_line_item_values.find_by(template_value_id: net_mt_id).value
  end

  def create_template_with_width(party, party_line_item)
    @value_13 = party.barcode.barcode_main_values.find_by(template_value_id: 13).value
    @value_14 = party.barcode.barcode_main_values.find_by(template_value_id: 14).value
    @value_15 = party.barcode.barcode_main_values.find_by(template_value_id: 15).value
    @value_16 = party.barcode.barcode_main_values.find_by(template_value_id: 16).value
    @value_17 = party.barcode.barcode_main_values.find_by(template_value_id: 17).value
    @value_roll_no = party_line_item.line_item_num

    net_kg_id = party.barcode.template.template_values.net_kg?.first
    @net_kg = party_line_item.party_line_item_values.find_by(template_value_id: net_kg_id).value

    width_id = party.barcode.template.template_values.width?.first
    @width = party_line_item.party_line_item_values.find_by(template_value_id: width_id).value

    net_mt_id = party.barcode.template.template_values.net_mt?.first
    @net_mt = party_line_item.party_line_item_values.find_by(template_value_id: net_mt_id).value
  end

  def create_barcode(common_path, file_name, party, base_url)
    barcode = Barby::Code39.new("#{party.barcode.code}-#{Time.now.to_i}", true)

    barcode_img_path = common_path + '/barcode_images/' + file_name + ".png"

    File.open(Rails.root.join("public", barcode_img_path), 'wb') { |f| f.write barcode.to_png }

    @barcode_img = base_url + '/' + barcode_img_path
    @barcode_text = barcode.to_s
  end
end
