require 'mailgun'

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

    # Find the user who asked the question
    @question = Question.find(params[:question_id])
    @questionUser = User.find(@question.user_id)


    #Updating Expert user balance
    @currentBalance = @current_user.earnings_cents
    @newBalance = @currentBalance + 100; #Add 100cents aka $1 to user account balance
    @current_user.update_columns(earnings_cents: @newBalance) #Update expert user balance

    mg_client = Mailgun::Client.new 'key-be069e0dd16a6ff3c38a40b5ac45a7a2'

      # Define your message parameters
      message_params =  {
                          from: 'moza.rohit@gmail.com',
                          to:   'moza.rohit@gmail.com',  #Hardcoded default email for dev.
                          subject: @questionUser.first_name + '' + @questionUser.last_name + ''+ 'Your Question = answered!',
                          text:    "Please visit http://localhost:3000, login and check your My Questions dashboard tab to view your answer."
                        }
      # Send your message through the client
      mg_client.send_message 'sandbox3516aa2dfb0e4483a36ff1e47d914a74.mailgun.org', message_params



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
