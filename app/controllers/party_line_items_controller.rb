class PartyLineItemsController < ApplicationController
  before_action :set_party_line_item, only: [:show, :update, :destroy]

  # GET /party_line_items
  def index
    @party_line_items = PartyLineItem.all

    render json: @party_line_items
  end

  # GET /party_line_items/1
  def show
    render json: @party_line_item
  end

  # POST /party_line_items
  def create
    @party_line_item = PartyLineItem.new(party_line_item_params)

    if @party_line_item.save
      render json: @party_line_item, status: :created, location: @party_line_item
    else
      render json: @party_line_item.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /party_line_items/1
  def update
    if @party_line_item.update(party_line_item_params)
      render json: @party_line_item
    else
      render json: @party_line_item.errors, status: :unprocessable_entity
    end
  end

  # DELETE /party_line_items/1
  def destroy
    @party_line_item.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_party_line_item
      @party_line_item = PartyLineItem.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def party_line_item_params
      params.require(:party_line_item).permit(:line_item_num, :html_path, :party_id)
    end
end
