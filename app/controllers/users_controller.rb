require 'mailgun'



class UsersController < ApiController
  before_action :set_user, only: [:show, :update, :destroy]

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

    if @user.save
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
