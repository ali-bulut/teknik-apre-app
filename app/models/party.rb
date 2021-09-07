class Party < ApplicationRecord
  belongs_to :barcode
  has_many :party_line_items, dependent: :destroy

  before_create :check_party_num

  def update_party(party_params)
    self.party_num = party_params[:updatedPartyNum]

    self.save!
  end

  def self.by_year(year)
    where('extract(year from created_at) = ?', year)
  end

  def check_party_num
    if Party.where(party_num: self.party_num).by_year(Time.current.year).any?
      throw(:abort)
    end
  end
end
