class WebApi::Parties < Grape::API
  resource :parties do
    # ----------------------------------------------------
    # GET /parties
    # ----------------------------------------------------
    desc 'Fetches all parties'
    get '/', each_serializer: WebApi::PartySerializer do
      authenticate_api_web_user!
      Party.all
    end
  end
end
  