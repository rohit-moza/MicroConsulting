class QuestionanswersController < ApplicationController
  before_action :set_questionanswer, only: [:show, :update, :destroy]

  # GET /questionanswers
  def index
    @questionanswers = Questionanswer.all

    render json: @questionanswers
  end

  # GET /questionanswers/1
  def show
    render json: @questionanswer
  end

  # POST /questionanswers
  def create
    @questionanswer = Questionanswer.new(questionanswer_params)

    if @questionanswer.save
      render json: @questionanswer, status: :created, location: @questionanswer
    else
      render json: @questionanswer.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /questionanswers/1
  def update
    if @questionanswer.update(questionanswer_params)
      render json: @questionanswer
    else
      render json: @questionanswer.errors, status: :unprocessable_entity
    end
  end

  # DELETE /questionanswers/1
  def destroy
    @questionanswer.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_questionanswer
      @questionanswer = Questionanswer.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def questionanswer_params
      params.fetch(:questionanswer, {})
    end
end
