class CreateQuestionanswers < ActiveRecord::Migration[5.0]
  def change
    create_table :questionanswers do |t|
      t.references :subject, index: true, foreign_key: true
      t.references :question, index: true, foreign_key: true
      t.references :answer, index: true, foreign_key: true

      t.timestamps
    end
  end
end
