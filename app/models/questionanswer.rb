class Questionanswer < ApplicationRecord
  belongs_to :answer
  belongs_to :question
end
