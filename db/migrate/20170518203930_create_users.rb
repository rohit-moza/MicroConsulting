class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.references :subject, index: true, foreign_key: true

      t.string  :first_name
      t.string  :last_name
      t.string  :email
      t.string  :password
      t.string  :image
      t.integer  :earnings_cents

      t.timestamps
    end
  end
end
