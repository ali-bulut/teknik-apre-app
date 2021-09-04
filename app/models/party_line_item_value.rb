class PartyLineItemValue < ApplicationRecord
  belongs_to :template_value
  belongs_to :party_line_item
end
