class Barcode < ApplicationRecord
  belongs_to :template
  has_many :barcode_main_values, dependent: :destroy
  has_many :parties, dependent: :nullify

  def sorted_parties
    parties.order(created_at: "DESC")
  end

  def update_barcode(barcode_params, base_url)
    updated_net_weight_division_num = barcode_params[:netWeightDivisionNum]
    updated_gross_weight_addition_num = barcode_params[:grossWeightAdditionNum]

    self.net_weight_division_num = updated_net_weight_division_num
    self.gross_weight_addition_num = updated_gross_weight_addition_num
    self.name = barcode_params[:name]

    barcode_params[:mainValues].each do |record|
      barcode_main_value = barcode_main_values.find(record[:id])
      barcode_main_value.value = record[:value]
      barcode_main_value.save!
    end

    self.save!

    self.parties.each do |party|
      party.party_line_items.each do |item|
        item.html_path = nil
        net_mt_template_value = self.template.template_values.net_mt?.first
        item.party_line_item_values.each do |party_item_value|
          net_mt_value = item.party_line_item_values.where(template_value_id: net_mt_template_value.id).first.value.to_f
          net_kg_value = (net_mt_value / updated_net_weight_division_num).round(2)
          gross_kg_value = (net_kg_value + updated_gross_weight_addition_num).round(2)
          gross_mt_value = net_mt_value
          if party_item_value.template_value.net_kg?
            party_item_value.value = net_kg_value
          elsif party_item_value.template_value.gross_kg?
            party_item_value.value = gross_kg_value
          elsif party_item_value.template_value.gross_mt?
            party_item_value.value = gross_mt_value
          end
          party_item_value.save!
        end
        item.save!

        line_item_creator = PartyLineItemCreator.new
        html_path = line_item_creator.create_rendered_html(party, item, base_url)
        item.html_path = html_path
        item.save!
      end
    end
  end

end
