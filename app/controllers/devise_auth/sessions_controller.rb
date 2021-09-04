class DeviseAuth::SessionsController < DeviseTokenAuth::SessionsController
  def render_create_success
    render json: current_user, serializer: AuthSerializer
  end
end