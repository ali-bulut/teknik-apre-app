class PartyWithLineItemsSerializer < ActiveModel::Serializer
  attributes :partyNum, :barcodeName, :enteredValues, :data

  def partyNum
    object.party_num
  end

  def barcodeName
    object.barcode.name
  end

  def enteredValues
    object.barcode.template.entered_values.map { |v| TemplateValueSerializer.new(v) }
  end

  def data
    object.party_line_items.map { |i| PartyLineItemsSerializer.new(i) }
  end
end
