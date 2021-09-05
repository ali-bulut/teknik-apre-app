class SingleBarcodeSerializer < ActiveModel::Serializer
  attributes :id, :name, :netWeightDivisionNum, :grossWeightAdditionNum, :templateImage, :mainValues, :enteredValues

  def netWeightDivisionNum
    object.net_weight_division_num
  end

  def grossWeightAdditionNum
    object.gross_weight_addition_num
  end

  def templateImage
    object.template.image_path
  end

  def mainValues
    object.barcode_main_values.map { |v| BarcodeMainValueSerializer.new(v) }
  end

  def enteredValues
    object.template.entered_values.map { |v| TemplateValueSerializer.new(v) }
  end
end
