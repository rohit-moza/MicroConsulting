
# require 'open-uri'
class AnswersController < ApiController
  before_action :authenticate_request!

  # GET /answers
  def index
    @answers = Answer.all
    # download = open('http://images.clipartpanda.com/smiley-face-clip-art-emotions-RidMBKdi9.jpeg')
    # IO.copy_stream(download, 'public/images/smiley.jpeg')
    # send_file(Rails.root.join('app' , 'controllers', 'sky_wave.jpg'))
    render json: @answers
  end

  # GET /answers/1
  def show
    render json: @answer
  end


  # create_table "answers", force: :cascade do |t|
  #   t.integer "user_id"
  #   t.string  "content"
  #   t.index ["user_id"], name: "index_answers_on_user_id", using: :btree
  # end

# @current_user = load_current_user!
#     @question = Question.new(user_id: @current_user.id, title: params[:title], content: params[:content])
#     @subject = Subject.find_by(name: params[:subject])
#     @question.save
#     @questionsAnswers = Questionanswer.new(subject_id: @subject.id, question_id: @question.id, answer_id: nil)
  # POST /answers
  def create
    @current_user = load_current_user!
    @answer = Answer.new(user_id: @current_user.id, content: params[:content])
    @questionsAnswers = Questionanswer.find(params[:question_id])

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
