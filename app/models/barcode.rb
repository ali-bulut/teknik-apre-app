class Barcode < ApplicationRecord
  belongs_to :template
  has_many :barcode_main_values
  has_many :parties

  def sorted_parties
    parties.order(created_at: "DESC")
  end

end
