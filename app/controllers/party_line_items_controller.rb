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
    party = Party.find(party_line_item_params[:partyId])
    @party_line_item = party.party_line_items.new
    @party_line_item.line_item_num = party_line_item_params[:rollNo]

    save_status = @party_line_item.save

    party_line_item_params[:enteredLineItemValues].each do |record|
      party_line_item_value = @party_line_item.party_line_item_values.new
      party_line_item_value.template_value_id = record[:id]
      party_line_item_value.value = record[:value]

      party_line_item_value.save!
    end

    if save_status
      render json: { message: "PartyLineItem successfully created!" }, status: :created
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

  def party_line_item_params
    params.permit!
  end
end
