class Party < ApplicationRecord
  belongs_to :template
  has_many :party_main_values
  has_many :party_line_items
end
