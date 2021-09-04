class TemplateValueSerializer < ActiveModel::Serializer
  attributes :templateValuesId, :columnName

  def templateValuesId
    object.id
  end

  def columnName
    object.column_name
  end

end
