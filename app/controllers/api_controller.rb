class ApiController < ActionController::API
require 'jwt'
require 'jsonwebtoken'

  protected
  # Validates the token and user and sets the @current_user scope
  def authenticate_request!
    if !payload || !JsonWebToken.valid_payload(payload.first)
      return invalid_authentication
    end

    load_current_user!
    invalid_authentication unless @current_user
  end

  # Returns 401 response. To handle malformed / invalid requests.
  def invalid_authentication
    render json: {error: 'Invalid Request'}, status: :unauthorized
  end

  private
  # Deconstructs the Authorization header and decodes the JWT token.
  def payload
    auth_header = request.headers['Authorization']
    puts "THIS IS WHAT I GET FOR AUTH : #{auth_header}"
    token = auth_header
    JsonWebToken.decode(token)
  rescue
    nil
  end

  # Sets the @current_user with the user_id from payload
  def load_current_user!
    puts "LOADING USER BECAUSE AUTH WAS SUCCESFULL"
    @current_user = User.find_by(id: payload[0]['user_id'])
  end

end