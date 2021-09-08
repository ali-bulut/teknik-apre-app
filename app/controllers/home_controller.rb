require 'rails/application_controller'

class HomeController < Rails::ApplicationController
  def index
    render file: 'app/views/home/index.html'
  end
end