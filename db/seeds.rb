# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password')
# Subject seed
Subject.create!(name: 'None')
Subject.create!(name: 'Engineering')
Subject.create!(name: 'Health and Fitness')
Subject.create!(name: 'Law')
Subject.create!(name: 'Medical')


# User 1 seed question asker
User.create!(subject_id: 1,first_name: 'Bob', last_name: 'Marley', email: 'bob_marley@gmail.com', password: 'hello123', password_confirmation: 'hello123', image:'./', earnings_cents: 0)

# User 2 seed question answer
User.create!(subject_id: 2,first_name: 'Elon', last_name: 'Musk', email: 'elon_musk@gmail.com', password: 'hello123', password_confirmation: 'hello123', image:'./', earnings_cents: 0)


