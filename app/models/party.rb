class Party < ApplicationRecord
  belongs_to :barcode
  has_many :party_line_items, dependent: :destroy
end
