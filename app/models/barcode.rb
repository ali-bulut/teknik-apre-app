class Barcode < ApplicationRecord
  belongs_to :template
  has_many :barcode_main_values, dependent: :destroy
  has_many :parties, dependent: :nullify

  def sorted_parties
    parties.order(created_at: "DESC")
  end

  def update_barcode(barcode_params)
    self.net_weight_division_num = barcode_params[:netWeightDivisionNum]
    self.gross_weight_addition_num = barcode_params[:grossWeightAdditionNum]
    self.name = barcode_params[:name]

    barcode_params[:mainValues].each do |record|
      barcode_main_value = barcode_main_values.find(record[:id])
      barcode_main_value.value = record[:value]
      barcode_main_value.save!
    end

    self.save!
  end

end
