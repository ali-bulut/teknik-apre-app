class BarcodesController < ApplicationController
  before_action :set_barcode, only: [:show, :update, :destroy]
  before_action :set_barcode_with_parties, only: [:parties]

  # GET /barcodes
  def index
    @barcodes = Barcode.all

    render json: @barcodes
  end

  # GET /barcodes/1
  def show
    render json: @barcode, serializer: SingleBarcodeSerializer
  end

  # GET /barcodes/1/parties
  def parties
    render json: @barcode_with_parties.sorted_parties, each_serializer: BarcodePartiesSerializer
  end

  # POST /barcodes
  def create
    @barcode = Barcode.new(barcode_params)

    if @barcode.save
      render json: @barcode, status: :created, location: @barcode
    else
      render json: @barcode.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /barcodes/1
  def update
    if @barcode.update(barcode_params)
      render json: @barcode
    else
      render json: @barcode.errors, status: :unprocessable_entity
    end
  end

  # DELETE /barcodes/1
  def destroy
    @barcode.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_barcode
    @barcode = Barcode.find(params[:id])
  end

  def set_barcode_with_parties
    @barcode_with_parties = Barcode.includes(:parties).find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def barcode_params
    params.require(:barcode).permit(:name, :code, :net_weight_division_num, :gross_weight_addition_num, :templates_id)
  end
end
