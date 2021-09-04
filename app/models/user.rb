# frozen_string_literal: true

class User < ActiveRecord::Base
  rolify
  extend Devise::Models
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :authentication_keys => [:username, :email]
  include DeviseTokenAuth::Concerns::User
end
