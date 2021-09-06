class TemplateValue < ApplicationRecord
  belongs_to :template

  enum calculated_value_types: {
    gross_kg: "gross kg",
    net_kg: "net kg",
    net_mt: "net mt",
    gross_mt: "gross mt"
  }

  scope :gross_kg?, -> { where(column_name: TemplateValue.calculated_value_types[:gross_kg]) }
  scope :net_kg?, -> { where(column_name: TemplateValue.calculated_value_types[:net_kg]) }
  scope :gross_mt?, -> { where(column_name: TemplateValue.calculated_value_types[:gross_mt]) }
  scope :net_mt?, -> { where(column_name: TemplateValue.calculated_value_types[:net_mt]) }

  def gross_kg?
    self.column_name == TemplateValue.calculated_value_types[:gross_kg]
  end

  def net_kg?
    self.column_name == TemplateValue.calculated_value_types[:net_kg]
  end

  def net_mt?
    self.column_name == TemplateValue.calculated_value_types[:net_mt]
  end

  def gross_mt?
    self.column_name == TemplateValue.calculated_value_types[:gross_mt]
  end

end
