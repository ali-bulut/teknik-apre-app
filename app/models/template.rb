class Template < ApplicationRecord
  has_many :template_value
  has_many :party
end
