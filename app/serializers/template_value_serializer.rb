class TemplateValueSerializer < ActiveModel::Serializer
  attributes :id, :templateValuesId, :columnName

  def templateValuesId
    object.id
  end

  def columnName
    object.column_name
  end

end
