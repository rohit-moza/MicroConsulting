# Light Shine - a Micro Consulting Platform
Quora/Stack Overflow meets Uber in a nutshell. A micro-consulting platform, which enables sharing of knowledge between experts and question askers. Question askers get questions answered for a fee (e.g $1, because small questions take less roughly a minute to answer - translates to consulting at $60/hr), and experts get this fee upon answering the question. A user can be an expert, a question asker or both. 

**A quick run down of how the app works**
  * Users can register as experts in a certain field OR none if their intention is solely to be a question asker
  * Users can post a question related to a particular field
  * Users who are experts in a field get notifications about questions asked in their fields, and they can choose to answer      these questions. Once they answer a question they get their fee ( e.g. $1)


## Stack 

### Back End 
  * Rails Api Server - Active Record , PostgresQL 
  * Webpack dev- server  
### Front End
  * React JS , Recharts 

### Ruby version
  *  2.3.3 With Rails 5
  * Configuration

## Database initialization
    - rake db:drop all
    - rake db:create
    - rake db:migrate
    - rake db:reset db:seed
