class PartyLineItemValuesController < ApplicationController
  before_action :set_party_line_item_value, only: [:show, :update, :destroy]
  before_action :authenticate_api_web_user!

  # GET /party_line_item_values
  def index
    @party_line_item_values = PartyLineItemValue.all

    render json: @party_line_item_values
  end

  # GET /party_line_item_values/1
  def show
    render json: @party_line_item_value
  end

  # POST /party_line_item_values
  def create
    @party_line_item_value = PartyLineItemValue.new(party_line_item_value_params)

    if @party_line_item_value.save
      render json: @party_line_item_value, status: :created, location: @party_line_item_value
    else
      render json: @party_line_item_value.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /party_line_item_values/1
  def update
    if @party_line_item_value.update(party_line_item_value_params)
      render json: @party_line_item_value
    else
      render json: @party_line_item_value.errors, status: :unprocessable_entity
    end
  end

  # DELETE /party_line_item_values/1
  def destroy
    @party_line_item_value.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_party_line_item_value
      @party_line_item_value = PartyLineItemValue.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def party_line_item_value_params
      params.require(:party_line_item_value).permit(:value, :template_value_id, :party_line_item_id)
    end
end
