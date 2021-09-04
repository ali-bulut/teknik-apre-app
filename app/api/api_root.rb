GrapeDeviseTokenAuth.setup! do |config|
  config.authenticate_all = false
end

class ApiRoot < Grape::API
  #include DeviseTokenAuth::Concerns::SetUserByToken

  format :json
  formatter :json, Grape::Formatter::ActiveModelSerializers

  auth :grape_devise_token_auth, resource_class: :user
  helpers GrapeDeviseTokenAuth::AuthHelpers

  # Serializes errors with ActiveModel::Serializer::ErrorSerializer if an ActiveModel.
  # Serializer conforms to the adapter, ex: json, jsonapi.
  # So an error formatted with a jsonapi formatter would render as per:
  # http://jsonapi.org/format/#error-objects

  # TODO: I removed this to be able to send error! messages
  # error_formatter :json, Grape::Formatter::ActiveModelSerializers
  rescue_from ActiveRecord::RecordNotFound do |e|
    message = e.message.gsub(/\s\[.*\]/, '')
    error! message, 422
  end
  rescue_from ActiveRecord::RecordInvalid do |e|
    message = e.message.gsub(/\s\[.*\]/, '')
    error! message, 422
  end

  rescue_from ActiveRecord::RecordNotUnique do |e|
    message = e.message.gsub(/\s\[.*\]/, '')
    error! message, 422
  end

  rescue_from ActiveRecord::NotNullViolation do |e|
    message = e.message.gsub(/\s\[.*\]/, '')
    error! message, 422
  end

  # Web API
  mount WebApi
end
