import React, { Component } from 'react';
import '../styles/register.css';


class Register extends Component {

  constructor() {
  super()
  this.state = {
    firstName: '',
    LastName: '',
    email: '',
    password: '',
    password_confirmation: '',

    subjects: {
      Law: false,
      Engineering: false,
      Health: false,
      Medical: false
    }
  }
}

handleTextChange = (e) => {
  const target = e.target;
  const value = target.value
  const name = target.name;

  let newUserState = {};
  newUserState[name] = value;

  this.setState(newUserState);

  // {lastName: value};
  // this.setState({lastName: value});
}

handleInputChange = (e) => {
  const target = e.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;

  let newSubjects = this.state.subjects;
  newSubjects[name] = value;

  this.setState({
    subjects: newSubjects
  });
}


  registerSubmit = (e) => {
  let toSend = JSON.stringify(this.state)



  console.log(toSend);
  e.preventDefault()
  fetch("http://localhost:3001/api/users", {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: toSend
  })
 .then(response => response.json())
 .then(json => console.log(json))
}

  render() {
    return (
      <div>
        <div className="registerContainer">
          <form className="registerForm">
            <label>
              First Name: </label>
              <input type="text" onChange={this.handleTextChange} name="firstName" />
              <br/>
            <label>
              Last Name: </label>
              <input type="text" onChange={this.handleTextChange} name="LastName" />
            <br/>
            <label>
              Emails: </label>
              <input type="text" onChange={this.handleTextChange} name="email" />
            <br/>
            <label>
              Password: </label>
              <input type="password" onChange={this.handleTextChange} name="password" />
            <br/>
            <label>
              Password Confirmation: </label>
              <input type="password" onChange={this.handleTextChange} name="password_confirmation" />
             <br/>
            <label> Subjects</label> <br/>
              <input type="checkbox" onChange={this.handleInputChange} checked={this.state.subjects.Law} name="Law" /> Law  <br/>
              <input type="checkbox" onChange={this.handleInputChange} checked={this.state.subjects.Engineering} name="Engineering" /> Engineering <br/>
              <input type="checkbox" onChange={this.handleInputChange} checked={this.state.subjects.Health} name="Health" /> Health <br/>
              <input type="checkbox" onChange={this.handleInputChange} checked={this.state.subjects.Medical} name="Medical" /> Medical <br/>
            <input onClick={this.registerSubmit} type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
