class User < ApplicationRecord
  include ActiveModel::Dirty
  has_many :subjects
  has_many :answers
  has_many :questions
  before_save { email.downcase! }
  before_create :generate_confirmation_instructions
  validates :first_name,  presence: true, length: { maximum: 50 }
  validates :last_name,  presence: true, length: { maximum: 50 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }
  has_secure_password
  validates :password, presence: true, length: { minimum: 6 }


  def generate_confirmation_instructions
    self.confirmation_token = SecureRandom.hex(10)
    self.confirmation_sent_at = Time.now.utc
  end


  def confirmation_token_valid?
      (self.confirmation_sent_at + 30.days) > Time.now.utc
  end



  def mark_as_confirmed!
    self.confirmation_token = nil
    self.confirmed_at = Time.now.utc
    save(options ={validate: false}) #conflicts with validate pass at create so enforcing override
  end

end
