class PartyLineItemValuesSerializer < ActiveModel::Serializer
  attributes :id, :columnName, :value

  def columnName
    object.template_value.column_name
  end

end
