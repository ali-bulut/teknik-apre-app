class TemplatesController < ApplicationController
  before_action :authenticate_user!

  # GET /templates
  def index
    @templates = Template.all

    render json: @templates
  end

end
