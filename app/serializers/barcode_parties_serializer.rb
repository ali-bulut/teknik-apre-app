class BarcodePartiesSerializer < ActiveModel::Serializer
  attributes :id, :partyNum, :createdTime

  def partyNum
    object.party_num
  end

  def createdTime
    object.created_at
  end
end
