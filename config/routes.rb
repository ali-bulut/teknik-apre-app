Rails.application.routes.draw do
  resources :party_line_item_values
  resources :party_line_items
  resources :party_main_values
  resources :parties
  resources :template_values
  resources :templates

  namespace :api do
    namespace :web do
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/web/users/registrations',
      }
    end
    mount ApiRoot => '/'
  end
end
