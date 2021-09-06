class PartyLineItemsSerializer < ActiveModel::Serializer
  attributes :id, :lineItemNum, :htmlPath, :lineItemValues

  def lineItemNum
    object.line_item_num
  end

  def htmlPath
    object.html_path
  end

  def lineItemValues
    object.party_line_item_values.map { |i| PartyLineItemValuesSerializer.new(i) }
  end

end
