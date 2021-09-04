class TemplateValue < ApplicationRecord
  belongs_to :template
  has_many :party_main_values
end
