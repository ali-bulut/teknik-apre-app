Rails.application.routes.draw do
  resources :barcode_main_values
  resources :barcodes do
    # /barcodes/:id/parties
    get 'parties', :on => :member
    
    # /barcodes/parties
    # get 'parties', :on => :collection
  end
  resources :party_line_item_values
  resources :party_line_items
  resources :parties
  resources :template_values
  resources :templates

  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    registrations: 'devise_auth/registrations',
    sessions: 'devise_auth/sessions',
  }
end
