
class QuestionsController < ApiController
  before_action :authenticate_request!

  # GET /questions
  def index
    @current_user = load_current_user!
    subject_id = @current_user.subject_id
    @questions = Question.joins("INNER JOIN questionanswers ON questionanswers.question_id = questions.id AND (questionanswers.subject_id =#{subject_id} AND questionanswers.answer_id is NULL)")
    render json: @questions
  end

  # GET /questions/my_questions SPECIFIC USER'S QUESTIONS
  def my_questions
    @current_user = load_current_user!
     #This query gives the questions and related answers for a particular user
     sql ="SELECT DISTINCT questions.id, questions.user_id, questions.title,
                  questions.content, questionanswers.answer_id, answers.content AS answer
                  FROM questions
                  LEFT OUTER JOIN questionanswers
                  ON questionanswers.question_id = questions.id
                  LEFT OUTER JOIN answers
                  ON questionanswers.answer_id = answers.id
                  WHERE questions.user_id=1 ORDER BY questions.id"

    @questionsAnswers = ActiveRecord::Base.connection.execute(sql)
    render json: @questionsAnswers
  end

  # GET /questions/1
  def show
    @question = Question.find(params[:id])
    render json: @question
  end


  # POST /questions
  def create
    @current_user = load_current_user!
    @question = Question.new(user_id: @current_user.id, title: params[:title], content: params[:content])
    @subject = Subject.find_by(name: params[:subject])

    if @question.save
      @questionsAnswers = Questionanswer.new(subject_id: @subject.id, question_id: @question.id, answer_id: nil)
      @questionsAnswers.save
      render json: {question: @question, questionsAnswers: @questionsAnswers}, status: :created, location: @question
    else
      render json: @question.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /questions/1
  def update
    if @question.update(question_params)
      render json: @question
    else
      render json: @question.errors, status: :unprocessable_entity
    end
  end

  # DELETE /questions/1
  def destroy
    @question = Question.find(params[:id])
    @question.destroy
    render json: Question.All
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_question
      @question = Question.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def question_params
      params.fetch(:question, {})
    end
end
