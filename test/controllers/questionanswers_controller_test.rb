require 'test_helper'

class QuestionanswersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @questionanswer = questionanswers(:one)
  end

  test "should get index" do
    get questionanswers_url, as: :json
    assert_response :success
  end

  test "should create questionanswer" do
    assert_difference('Questionanswer.count') do
      post questionanswers_url, params: { questionanswer: {  } }, as: :json
    end

    assert_response 201
  end

  test "should show questionanswer" do
    get questionanswer_url(@questionanswer), as: :json
    assert_response :success
  end

  test "should update questionanswer" do
    patch questionanswer_url(@questionanswer), params: { questionanswer: {  } }, as: :json
    assert_response 200
  end

  test "should destroy questionanswer" do
    assert_difference('Questionanswer.count', -1) do
      delete questionanswer_url(@questionanswer), as: :json
    end

    assert_response 204
  end
end
