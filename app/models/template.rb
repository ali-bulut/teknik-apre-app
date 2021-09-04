class Template < ApplicationRecord
  has_many :template_values
  has_many :parties
end
