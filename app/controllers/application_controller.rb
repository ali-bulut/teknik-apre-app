class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken

  # unless Rails.env.development?
  #   rescue_from StandardError, :with => :standard_error
  # end

  rescue_from ActiveRecord::RecordNotFound, :with => :record_not_found

  private

  def record_not_found(error)
    render json: { error: error.message }, status: :not_found
  end

  # def standard_error(error)
  #   render json: { error: "Something went wrong!" }, status: :internal_server_error
  # end
end
