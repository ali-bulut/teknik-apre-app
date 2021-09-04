class TemplateValuesController < ApplicationController
  before_action :set_template_value, only: [:show, :update, :destroy]

  # GET /template_values
  def index
    @template_values = TemplateValue.all

    render json: @template_values
  end

  # GET /template_values/1
  def show
    render json: @template_value
  end

  # POST /template_values
  def create
    @template_value = TemplateValue.new(template_value_params)

    if @template_value.save
      render json: @template_value, status: :created, location: @template_value
    else
      render json: @template_value.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /template_values/1
  def update
    if @template_value.update(template_value_params)
      render json: @template_value
    else
      render json: @template_value.errors, status: :unprocessable_entity
    end
  end

  # DELETE /template_values/1
  def destroy
    @template_value.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_template_value
      @template_value = TemplateValue.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def template_value_params
      params.require(:template_value).permit(:column_name, :is_calculated, :is_entered, :template_id)
    end
end
