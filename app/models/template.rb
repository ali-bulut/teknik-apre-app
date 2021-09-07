class Template < ApplicationRecord
  has_many :template_values, dependent: :destroy
  has_many :barcodes, dependent: :destroy

  def static_template_values
    template_values.where(is_calculated: false, is_entered: false)
  end

  def entered_values
    template_values.where(is_entered: true)
  end

  def calculated_values
    template_values.where(is_calculated: true)
  end

  def is_default?
    self.id == 1
  end

  def is_with_width?
    self.id == 2
  end
end
