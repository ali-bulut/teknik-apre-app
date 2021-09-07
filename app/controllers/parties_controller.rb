class PartiesController < ApplicationController
  before_action :set_party, only: [:update, :destroy]
  before_action :set_party_with_line_items, only: [:party_line_items]
  before_action :authenticate_user!

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
      render json: { error: "Party num cannot be same within the same year!" }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /parties/1
  def update
    update_status = @party.update_party(party_params)

    if update_status
      render json: { message: "Party successfully updated!" }
    else
      render json: { error: "Party could not be updated!" }, status: :unprocessable_entity
    end
  end

  # DELETE /parties/1
  def destroy
    if @party.destroy
      render json: { message: "Party successfully deleted!" }
    else
      render json: { error: "Party could not be deleted!" }, status: :unprocessable_entity
    end
  end

  def create_csv_file
    #TODO: Create CSV file and return its path
  end

  private

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
