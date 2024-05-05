class Api::V1::FloorPlansController < ApplicationController
  before_action :set_floor_plan, only: %i[ show update destroy ]

  # GET /floor_plans
  def index
    @floor_plans = FloorPlan.all
  
    floor_plans_with_images = @floor_plans.map do |floor_plan| 
      if floor_plan.image.attached?
        floor_plan.as_json.merge(image_url: url_for(floor_plan.image))
      else
        floor_plan.as_json.merge(image_url: nil)
      end
    end
    render json: floor_plans_with_images
  end

  # GET /floor_plans/1
  def show
    if @floor_plan.image.attached?
      render json: @floor_plan.as_json.merge(image_url: url_for(@floor_plan.image))
    else
      render json: @floor_plan.as_json.merge(image_url: nil)
    end
  end

  # POST /floor_plans
  def create
    @floor_plan = FloorPlan.new(floor_plan_params)

    if @floor_plan.save
      render json: @floor_plan, status: :created, location: api_v1_floor_plan_url(@floor_plan)
    else
      render json: @floor_plan.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /floor_plans/1
  def update
    if @floor_plan.update(floor_plan_params)
      render json: @floor_plan
    else
      render json: @floor_plan.errors, status: :unprocessable_entity
    end
  end

  # DELETE /floor_plans/1
  def destroy
    @floor_plan.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_floor_plan
      @floor_plan = FloorPlan.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def floor_plan_params
      params.require(:floor_plan).permit(:name, :interior_size, :exterior_size, :exterior_type, :facing_direction, :floor_type, :body, :image)
    end
end
