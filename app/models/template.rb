class Template < ApplicationRecord
  has_many :template_values
  has_many :parties

  def static_template_values
    template_values.where(is_calculated: false, is_entered: false)
  end
end
