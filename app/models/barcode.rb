class Barcode < ApplicationRecord
  belongs_to :template
  has_many :barcode_main_values, dependent: :destroy
  has_many :parties, dependent: :nullify

  def sorted_parties
    parties.order(created_at: "DESC")
  end

end
