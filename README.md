# Light Shine - a Micro Consulting Platform

### Contributors
#### Matt Socha                                                       
 *   Github - https://github.com/Socha17
 *    Email - mattsocha11@gmail.com  
 * LinkedIn - https://www.linkedin.com/in/matt-socha-284969a0/ 

#### Rohit Moza
 *   Github - https://github.com/fozenite
 *    Email - moza.rohit@gmail.com 
 * LinkedIn - https://www.linkedin.com/in/rohit-moza/

## 1.0  Introduction
Quora/Stack Overflow meets Uber in a nutshell. A micro-consulting platform, which enables sharing of knowledge between experts and question askers. Question askers get questions answered for a fee (e.g $1, because small questions take a minute to answer - translates to consulting at $60/hr), and experts get this fee upon answering the question. A user can be an expert, a question asker or both. 

**A quick run down of how the app works**
  * Users can register as experts in a certain field OR none if their intention is solely to be a question asker
  * Upon registration a confirmation email is sent to the user, with a confirmation token link to activate their account
  * Users can post a question related to a particular field
  * Users who are experts in a field get notifications about questions asked in their fields, and they can choose to answer      these questions. Once they answer a question they get their fee ( e.g. $1)
  * The user, whose question got answered gets a question answered notification via email.  

## 2.0  Stack 

### 2.1  Back End 
  * Rails Api Server - Active Record , PostgresQL 
 
### 2.2  Front End
  * React JS, CSS 

### 2.3  Key APIs, Packages and Gems

#### 2.3.1 react-router - Npm package 
* Handles routing for the SPA

#### 2.3.2 recharts - Npm package 
* Used for charts in the dashboard to show user stats  

#### 2.3.3 'mailgun-ruby'/Mailgun - Gem/API 
* Sending registration confirmation emails to users on registration with a confirmation token
*  Sending notification emails to users who's questions are answered to check their dashboard 
     
#### 2.3.4 'jwt'  - Gem 
* Manages generation of JWT tokens for every user that logs in. These tokens are sent in headers from the client, each    time access is reqiuired to Authorized sections of the Rails Api Server.
#### 2.3.5 'rack-cors' - Gem 
* Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible.
* Lets us specify origins ,which our Rails API server can take requests from.  
     
### 2.4  Versions
*  Ruby 2.3.3 
*  Rails 5.0.3
*  Node v6.9.5
  
## 3.0  General Setup

### 3.1 Setting up Ruby on Rails API Server Side
#### 3.1.1  Database initialization
- rake db:drop all
- rake db:create
- rake db:migrate
- rake db:reset db:seed
   
### 3.2 Setting up Ruby on Rails API Server Side



### 3.2 Installing node modules


### 3.2  React App Setup

### 4.0 ERD Diagram
![ERD Diagram](https://github.com/fozenite/MicroConsulting/blob/master/README_assets/ERD_diagram.png)

