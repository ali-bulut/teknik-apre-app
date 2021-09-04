class TemplateSerializer < ActiveModel::Serializer
  attributes :templateId, :templateName, :templateDesc, :templateImage, :staticTemplateValues

  def templateId
    object.id
  end

  def templateName
    object.name
  end

  def templateDesc
    object.description
  end

  def templateImage
    object.image_path
  end

  def staticTemplateValues
    object.static_template_values.map { |v| TemplateValueSerializer.new(v) }
  end

end
