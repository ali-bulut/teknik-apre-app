class PartyLineItemsController < ApplicationController
  before_action :set_party_line_item, only: [:destroy]
  before_action :authenticate_member!

  # POST /party_line_items
  def create
    html_path = PartyLineItemCreator.call(party_id: party_line_item_params[:partyId],
                                          line_item_num: party_line_item_params[:rollNo],
                                          entered_l_i_values: party_line_item_params[:enteredLineItemValues],
                                          base_url: request.base_url)

    if html_path
      render json: { message: "PartyLineItem successfully created!", htmlPath: html_path }, status: :created
    else
      render json: { error: "PartyLineItem could not be created!" }, status: :unprocessable_entity
    end
  end

  # DELETE /party_line_items/1
  def destroy
    if @party_line_item.destroy
      render json: { message: "PartyLineItem successfully deleted!" }
    else
      render json: { error: "PartyLineItem could not be deleted!" }, status: :unprocessable_entity
    end
  end

  private

  def set_party_line_item
    @party_line_item = PartyLineItem.find(params[:id])
  end

  def party_line_item_params
    params.permit!
  end
end
