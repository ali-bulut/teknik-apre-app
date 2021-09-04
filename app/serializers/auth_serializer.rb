class AuthSerializer < ActiveModel::Serializer
  attributes :username, :email, :role

  def role
    object.roles.first.name
  end

end
    