class User < ApplicationRecord
  has_many :subjects
  has_many :answers
  has_many :questions
end
