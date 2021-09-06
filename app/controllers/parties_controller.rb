class PartiesController < ApplicationController
  before_action :set_party, only: [:show, :update, :destroy]
  before_action :set_party_with_line_items, only: [:party_line_items]
  before_action :authenticate_user!

  # GET /parties
  def index
    @parties = Party.all

    render json: @parties
  end

  # GET /parties/1
  def show
    render json: @party
  end

  # GET /parties/1/party_line_items
  def party_line_items
    render json: @party_with_line_items, serializer: PartyWithLineItemsSerializer
  end

  # POST /parties
  def create
    @party = Party.new
    @party.party_num = party_params[:createdPartyNum]
    @party.barcode_id = party_params[:barcodeId]

    if @party.save
      render json: { message: "Party successfully created!" }, status: :created
    else
      render json: @party.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /parties/1
  def update
    update_status = @party.update_party(party_params)

    if update_status
      render json: { message: "Party successfully updated!" }
    else
      render json: @party.errors, status: :unprocessable_entity
    end
  end

  # DELETE /parties/1
  def destroy
    @party.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_party
    @party = Party.find(params[:id])
  end

  def set_party_with_line_items
    @party_with_line_items = Party.includes(:party_line_items).find(params[:id])
  end

  def party_params
    params.permit!
  end
end
