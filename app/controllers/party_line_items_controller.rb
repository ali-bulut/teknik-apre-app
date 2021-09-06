class PartyLineItemsController < ApplicationController
  before_action :set_party_line_item, only: [:show, :update, :destroy]
  before_action :authenticate_user!

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
    html_path = PartyLineItemCreator.call(party_id: party_line_item_params[:partyId],
                                          line_item_num: party_line_item_params[:rollNo],
                                          entered_l_i_values: party_line_item_params[:enteredLineItemValues])

    if html_path
      render json: { message: "PartyLineItem successfully created!", htmlPath: html_path }, status: :created
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
    if @party_line_item.destroy
      render json: { message: "PartyLineItem successfully deleted!" }
    else
      render json: @party_line_item.errors, status: :unprocessable_entity
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_party_line_item
    @party_line_item = PartyLineItem.find(params[:id])
  end

  def party_line_item_params
    params.permit!
  end
end
