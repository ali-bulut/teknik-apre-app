class BarcodeMainValuesController < ApplicationController
  before_action :set_barcode_main_value, only: [:show, :update, :destroy]

  # GET /barcode_main_values
  def index
    @barcode_main_values = BarcodeMainValue.all

    render json: @barcode_main_values
  end

  # GET /barcode_main_values/1
  def show
    render json: @barcode_main_value
  end

  # POST /barcode_main_values
  def create
    @barcode_main_value = BarcodeMainValue.new(barcode_main_value_params)

    if @barcode_main_value.save
      render json: @barcode_main_value, status: :created, location: @barcode_main_value
    else
      render json: @barcode_main_value.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /barcode_main_values/1
  def update
    if @barcode_main_value.update(barcode_main_value_params)
      render json: @barcode_main_value
    else
      render json: @barcode_main_value.errors, status: :unprocessable_entity
    end
  end

  # DELETE /barcode_main_values/1
  def destroy
    @barcode_main_value.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_barcode_main_value
      @barcode_main_value = BarcodeMainValue.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def barcode_main_value_params
      params.require(:barcode_main_value).permit(:value, :template_value_id, :barcode_id)
    end
end
