Rails.application.routes.draw do
  match '*all', controller: 'application', action: 'cors_preflight_check', via: [:options]

  resources :barcodes do
    # /barcodes/:id/parties
    get 'parties', :on => :member

    # /barcodes/parties
    # get 'parties', :on => :collection
  end
  resources :party_line_items
  resources :parties do
    get 'party_line_items', :on => :member
    post 'create_csv_file', :on => :collection
  end
  resources :templates

  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    registrations: 'devise_auth/registrations',
    sessions: 'devise_auth/sessions',
  }

  root "home#index"
end
