class CreateAnswers < ActiveRecord::Migration[5.0]
  def change
    create_table :answers do |t|
      t.references :user, index: true, foreign_key: true
      t.string     :content

      t.timestamps
    end
  end
end
