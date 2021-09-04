class PartyLineItem < ApplicationRecord
  belongs_to :party
  has_many :party_line_item_values
end
