class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  before_action :set_headers

  # unless Rails.env.development?
  #   rescue_from StandardError, :with => :standard_error
  # end

  rescue_from ActiveRecord::RecordNotFound, :with => :record_not_found

  def cors_preflight_check
    return unless request.method == 'OPTIONS'
    cors_set_access_control_headers
    render json: {}
  end

  protected

  def cors_set_access_control_headers
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, PATCH, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, Token, ' \
      'Auth-Token, Email, X-User-Token, X-User-Email, x-xsrf-token, access-token, uid, client, expiry'
    response.headers['Access-Control-Max-Age'] = '1728000'
    response.headers['Access-Control-Allow-Credentials'] = true
  end

  private

  def record_not_found(error)
    render json: { error: error.message }, status: :not_found
  end

  def set_headers
    response.headers['Access-Control-Expose-Headers'] = 'access-token, uid, client, expiry'
  end

  # def standard_error(error)
  #   render json: { error: "Something went wrong!" }, status: :internal_server_error
  # end
end
