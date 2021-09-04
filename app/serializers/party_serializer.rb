class PartySerializer < ActiveModel::Serializer
  attributes :id, :name, :code, :netWeightDivisionNum, :grossWeightAdditionNum, :templateImage, :createdTime

  def netWeightDivisionNum
    object.net_weight_division_num
  end

  def grossWeightAdditionNum
    object.gross_weight_addition_num
  end

  def templateImage
    object.template.image_path
  end

  def createdTime
    object.created_at
  end

end
  