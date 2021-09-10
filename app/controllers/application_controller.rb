class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  before_action :set_headers

  rescue_from ActiveRecord::RecordNotFound, :with => :record_not_found

  def cors_preflight_check
    return unless request.method == 'OPTIONS'
    cors_set_access_control_headers
    render json: {}
  end

  def authenticate_current_user!
    head :unauthorized if get_current_user.nil?
  end

  def get_current_user
    request.headers.each.with_index do |t, i|
      Rails.logger.debug(i)
      Rails.logger.debug(t)
    end

    access_token = request.headers["HTTP_ACCESS_TOKEN"]
    expiry = request.headers["HTTP_EXPIRY"]
    uid = request.headers["HTTP_UID"]
    client = request.headers["HTTP_CLIENT"]

    return nil unless access_token and expiry

    expiration_datetime = DateTime.strptime(expiry, "%s")
    current_user = User.find_by(uid: uid)

    if current_user && current_user.tokens.has_key?(client) && expiration_datetime > DateTime.now
      @current_user = current_user
    end
    @current_user
  end

  protected

  def cors_set_access_control_headers
    response.headers['Access-Control-Allow-Origin'] = "*"
    response.headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, PATCH, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, Token, ' \
      'Auth-Token, Email, X-User-Token, X-User-Email, x-xsrf-token, access-token, uid, client, expiry, token-type, access-control-allow-origin, ' \
      'Access-Control-Request-Method, Access-Control-Request-Headers, X-Requested-With'
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
end
