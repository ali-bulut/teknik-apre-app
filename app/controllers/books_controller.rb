class BooksController < ApplicationController
    before_action :authenticate_user!
  
    # Code for methods such as create and delete should come here.

    def show
        render json: {message: "You are IN!"}
    end
  end