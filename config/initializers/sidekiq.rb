redis_url = ENV.fetch('REDIS_URL')

Rails.logger = Sidekiq.logger
ActiveRecord::Base.logger = Sidekiq.logger

Sidekiq.configure_server do |config|
  config.redis = { url: redis_url }
end