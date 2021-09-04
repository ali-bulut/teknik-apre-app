class PartyMainValue < ApplicationRecord
  belongs_to :template_value
  belongs_to :party
end
