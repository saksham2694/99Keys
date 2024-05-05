require "test_helper"

class FloorPlansControllerTest < ActionDispatch::IntegrationTest
  setup do
    @floor_plan = floor_plans(:one)
  end

  test "should get index" do
    get floor_plans_url, as: :json
    assert_response :success
  end

  test "should create floor_plan" do
    assert_difference("FloorPlan.count") do
      post floor_plans_url, params: { floor_plan: { exterior_size: @floor_plan.exterior_size, exterior_type: @floor_plan.exterior_type, facing_direction: @floor_plan.facing_direction, floor_type: @floor_plan.floor_type, interior_size: @floor_plan.interior_size, name: @floor_plan.name } }, as: :json
    end

    assert_response :created
  end

  test "should show floor_plan" do
    get floor_plan_url(@floor_plan), as: :json
    assert_response :success
  end

  test "should update floor_plan" do
    patch floor_plan_url(@floor_plan), params: { floor_plan: { exterior_size: @floor_plan.exterior_size, exterior_type: @floor_plan.exterior_type, facing_direction: @floor_plan.facing_direction, floor_type: @floor_plan.floor_type, interior_size: @floor_plan.interior_size, name: @floor_plan.name } }, as: :json
    assert_response :success
  end

  test "should destroy floor_plan" do
    assert_difference("FloorPlan.count", -1) do
      delete floor_plan_url(@floor_plan), as: :json
    end

    assert_response :no_content
  end
end
