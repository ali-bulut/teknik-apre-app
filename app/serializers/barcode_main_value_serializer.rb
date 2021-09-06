class BarcodeMainValueSerializer < ActiveModel::Serializer
  attributes :id, :barcodeMainValueId, :columnName, :value

  def barcodeMainValueId
    object.id
  end

  def columnName
    object.template_value.column_name
  end

end
