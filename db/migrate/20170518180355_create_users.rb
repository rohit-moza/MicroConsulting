class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.references :subject, index: true, foreign_key: true

      t.string  :first_name
      t.string  :last_name
      t.string  :email
      t.string  :password_digest
      t.string  :image
      t.integer  :earnings_cents

      t.string   :confirmation_token
      t.datetime :confirmed_at
      t.datetime :confirmation_sent_at


      t.timestamps
    end
  end
end
