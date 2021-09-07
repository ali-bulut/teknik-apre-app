class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  before_action :set_headers

  # unless Rails.env.development?
  #   rescue_from StandardError, :with => :standard_error
  # end

  rescue_from ActiveRecord::RecordNotFound, :with => :record_not_found

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
