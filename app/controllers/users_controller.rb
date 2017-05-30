require 'mailgun'
require 'open-uri'


class UsersController < ApiController
  before_action  :authenticate_request!, only: [:user_data]

  # GET /users
  def index
    @users = User.all
    render json: {token: token}
  end

  # GET /users/1
  def show
    render json: @user
  end

  # POST /users
  def create
    # Subject id lookup
    @subject = Subject.find_by(name: params[:subject])
    @user = User.new(subject_id: @subject.id ,first_name: params[:first_name], last_name: params[:last_name], email: params[:email], password: params[:password], password_confirmation: params[:password_confirmation], image:'./', earnings_cents: 0)

    # download = open('http://images.clipartpanda.com/smiley-face-clip-art-emotions-RidMBKdi9.jpeg')
    # send_file(Rails.root.join('app' , 'controllers', 'sky_wave.jpg'))

    if @user.save
      # # GET IMAGE URL AND SAVE WITH UNDER USER ID.jpeg
      # download = open(params[:user_image_url])
      # IO.copy_stream(download, "public/images/#{@user.id}.jpeg")


      #SEND EMAIL
      # First, instantiate the Mailgun Client with your API key
      mg_client = Mailgun::Client.new 'key-be069e0dd16a6ff3c38a40b5ac45a7a2'
      token = @user.confirmation_token
      # Define your message parameters
      message_params =  {
                          from: 'moza.rohit@gmail.com',
                          to:   @user.email,
                          subject: 'Micro Consult Sign up confirmation email!',
                          text:    "Thank you for signing up! Please click on this link to complete registation: http://localhost:3001/api/users/confirm?token=" + token
                        }
      # Send your message through the client
      mg_client.send_message 'sandbox3516aa2dfb0e4483a36ff1e47d914a74.mailgun.org', message_params

      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end

  end

  # GET users/user_data
  def user_data
    @current_user = load_current_user!
    @subject = Subject.find(@current_user.subject_id)
    @questionsAsked = Question.where(user_id: @current_user.id).count
    @questionsAnswered = Answer.where(user_id: @current_user.id).count
    # Questions asked in Subject category count
    @EngineeringQCount = Questionanswer.where(subject_id: 2).count
    @HealthAndFitnessQCount = Questionanswer.where(subject_id: 3).count
    @LawQCount = Questionanswer.where(subject_id: 4).count
    @MedicalQCount = Questionanswer.where(subject_id: 5).count

    render json: {
      first_name: @current_user.first_name,
      last_name: @current_user.last_name,
      subject: @subject.name,
      earnings_cents: @current_user.earnings_cents,
      questionsAsked: @questionsAsked,
      questionsAnswered: @questionsAnswered,
      EngineeringQCount: @EngineeringQCount,
 HealthAndFitnessQCount: @HealthAndFitnessQCount,
              LawQCount: @LawQCount,
          MedicalQCount: @MedicalQCount
    }
  end

  # PATCH/PUT /users/1
  def update
    if @user.update()
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user = User.find(params[:id])
    @user.destroy!
  end

  # POST FROM FRONT END TO LOGIN USERS /users/login
  def login
    user = User.find_by(email: params[:email].to_s.downcase)

    if user && user.authenticate(params[:password])
        auth_token = JsonWebToken.encode({user_id: user.id})
        render json: {auth_token: auth_token}, status: :ok
    else
      render json: {error: 'Invalid username / password'}, status: :unauthorized
    end
  end
  # Still in test
  #GET TO CONFIRM FOR CONFIRMATION EMAIL FUNCTIONALITY
  def confirm
    token = params[:token].to_s

    user = User.find_by(confirmation_token: token)

    if user.present? && user.confirmation_token_valid?
      user.mark_as_confirmed!
      redirect_to "http://localhost:3000/"
    else
      render json: {status: 'Invalid token'}, status: :not_found
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      ActiveModelSerializers::Deserialization.jsonapi_parse(params)
    end

end
