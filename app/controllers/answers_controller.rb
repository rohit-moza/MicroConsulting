
# require 'open-uri'
class AnswersController < ApiController
  before_action :authenticate_request!

  # GET /answers
  def index
    @answers = Answer.all

    render json: @answers
  end

  # GET /answers/1
  def show
    render json: @answer
  end


  # POST /answers
  def create
    @current_user = load_current_user!
    @answer = Answer.new(user_id: @current_user.id, content: params[:answer])
    @questionsAnswers = Questionanswer.find(params[:question_id])
    @currentBalance = @current_user.earnings_cents
    @newBalance = @currentBalance + 100; #Add 100cents aka $1 to user account balance
    @current_user.update_columns(earnings_cents: @newBalance) #Update expert user balance

    if @answer.save
      @questionsAnswers.update(answer_id: @answer.id)
      render json: {answer: @answer, questionsAnswers: @questionsAnswers}, status: :created, location: @answer
    else
      render json: {answer: @answer, questionsAnswers: @questionsAnswers}, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /answers/1
  def update
    if @answer.update(answer_params)
      render json: @answer
    else
      render json: @answer.errors, status: :unprocessable_entity
    end
  end

  # DELETE /answers/1
  def destroy
    @answer.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_answer
      @answer = Answer.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def answer_params
      params.fetch(:answer, {})
    end
end
