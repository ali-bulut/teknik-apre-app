class WebApi::Parties < Grape::API
  resource :parties do
    # ----------------------------------------------------
    # GET /parties
    # ----------------------------------------------------
    desc 'Fetches all parties'
    get '/' do
      authenticate_api_web_user!
      status(200)
      {
        'message': 'It is working!'
      }
    end
  end
end
  