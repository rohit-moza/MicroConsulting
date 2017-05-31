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

# User 3 seed question answer
User.create!(subject_id: 3,first_name: 'Dwayne', last_name: 'Johnson', email: 'the_rock@gmail.com', password: 'hello123', password_confirmation: 'hello123', image:'./', earnings_cents: 0)

# User 4 seed question answer
User.create!(subject_id: 4,first_name: 'Harvey', last_name: 'Specter', email: 'harvey_specter@gmail.com', password: 'hello123', password_confirmation: 'hello123', image:'./', earnings_cents: 0)

# User 5 seed question answer
User.create!(subject_id: 5,first_name: 'Dr.', last_name: 'Oz', email: 'dr.oz@gmail.com', password: 'hello123', password_confirmation: 'hello123', image:'./', earnings_cents: 0)



Question.create(user_id: 1, title: 'Git Hub branches delete' ,content: 'How do I delete a Git branch both locally and remotely?')
Questionanswer.create(subject_id: 2, question_id: 1, answer_id: nill)
# Delete the remote branch using - git push origin --delete <branch_name>
# Delete the local branch using - git branch -d <branch_name>

Question.create(user_id: 1, title: 'React native vs React' ,content: 'What is difference between React native vs React?')
Questionanswer.create(subject_id: 2, question_id: 2, answer_id: nill)
#ReactJS is a JavaScript library, supporting both front end web and being run on the server, for building user interfaces and web applications.
# React Native is a mobile framework that compiles to native app components, allowing you to build native mobile applications (iOS, Android, and Windows) in JavaScript that allows you to use ReactJS to build your components, and implements ReactJS under the hood.
# Both are open sourced by Facebook.

Question.create(user_id: 1, title: 'Rails api server' ,content: 'How do I generate a new api Rails app')
Questionanswer.create(subject_id: 2, question_id: 3, answer_id: nill)
# Type in this is in terminal new my_api --api into your terminal

Question.create(user_id: 1, title: 'Filing HST' ,content: 'I have a business where I invoice my customers for services rendered, when do I have to start filing HST?')
Questionanswer.create(subject_id: 4, question_id: 4, answer_id: nill)
# Simple answer if you pass the 30k mark a year.You have to file HST

Question.create(user_id: 1, title: 'Diabetic food advice' ,content: 'Can a diabetic eat popcorn or peanut butter?')
Questionanswer.create(subject_id: 5, question_id: 5, answer_id: nill)
# Yes, in moderation.

Question.create(user_id: 1, title: 'Increase Bench lift weight' ,content: 'How do I increase my bench lift weight?')
Questionanswer.create(subject_id: 3, question_id: 6, answer_id: nill)
# Start doing complexes and mix in pushup days + flat dumbell bench presses into your routine




