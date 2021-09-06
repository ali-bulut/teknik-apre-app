class Party < ApplicationRecord
  belongs_to :barcode
  has_many :party_line_items, dependent: :destroy

  def update_party(party_params)
    self.party_num = party_params[:updatedPartyNum]

    self.save!
  end
end
