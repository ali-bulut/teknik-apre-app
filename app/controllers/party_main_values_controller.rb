class PartyMainValuesController < ApplicationController
  before_action :set_party_main_value, only: [:show, :update, :destroy]

  # GET /party_main_values
  def index
    @party_main_values = PartyMainValue.all

    render json: @party_main_values
  end

  # GET /party_main_values/1
  def show
    render json: @party_main_value
  end

  # POST /party_main_values
  def create
    @party_main_value = PartyMainValue.new(party_main_value_params)

    if @party_main_value.save
      render json: @party_main_value, status: :created, location: @party_main_value
    else
      render json: @party_main_value.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /party_main_values/1
  def update
    if @party_main_value.update(party_main_value_params)
      render json: @party_main_value
    else
      render json: @party_main_value.errors, status: :unprocessable_entity
    end
  end

  # DELETE /party_main_values/1
  def destroy
    @party_main_value.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_party_main_value
      @party_main_value = PartyMainValue.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def party_main_value_params
      params.require(:party_main_value).permit(:value, :template_value_id, :party_id)
    end
end
