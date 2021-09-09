class BarcodesController < ApplicationController
  before_action :set_barcode, only: [:show, :update, :destroy]
  before_action :set_barcode_with_parties, only: [:parties]
  before_action :authenticate_current_user!

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
    @barcode = Barcode.new
    @barcode.name = barcode_params[:barcodeName]
    @barcode.code = barcode_params[:barcodeCode]
    @barcode.gross_weight_addition_num = barcode_params[:grossWeightAdditionNum].to_f
    @barcode.net_weight_division_num = barcode_params[:netWeightDivisionNum].to_f
    @barcode.template_id = barcode_params[:templateId]

    save_status = @barcode.save

    barcode_params[:staticTemplateValues].each do |record|
      barcode_main_value = @barcode.barcode_main_values.new
      barcode_main_value.template_value_id = record[:templateValuesId]
      barcode_main_value.value = record[:value]

      barcode_main_value.save!
    end

    if save_status
      render json: { message: "Barcode successfully created!" }, status: :created
    else
      render json: { error: "Barcode could not be created!" }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /barcodes/1
  def update
    update_status = @barcode.update_barcode(barcode_params)

    if update_status
      render json: { message: "Barcode successfully updated!" }
    else
      render json: { error: "Barcode could not be updated!" }, status: :unprocessable_entity
    end
  end

  # DELETE /barcodes/1
  def destroy
    if @barcode.destroy
      render json: { message: "Barcode successfully deleted!" }
    else
      render json: { error: "Barcode could not be deleted!" }, status: :unprocessable_entity
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_barcode
    @barcode = Barcode.find(params[:id])
  end

  def set_barcode_with_parties
    @barcode_with_parties = Barcode.includes(:parties).find(params[:id])
  end

  def barcode_params
    params.permit!
  end
end
