class WebApi < Grape::API

  prefix 'web'
  # version :v1, using: :path

  helpers do
    def logger
      WebApi.logger
    end

    def permitted_params
      @permitted_params ||= declared(params, include_missing: false)
    end
  end

  desc 'API Entry Point'
  get '/' do
    {
    }
  end

  mount WebApi::Parties
end
  