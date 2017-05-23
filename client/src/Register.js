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
    subject: 'None'
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
  this.setState({
    subject: e.target.value
  });
}


  registerSubmit = (e) => {
  e.preventDefault()
  let toSend = JSON.stringify(this.state)

  fetch("http://localhost:3001/api/users/login", {
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
              <input type="radio" checked={this.state.subject === 'None'} onChange={this.handleInputChange} value="None"  /> None  <br/>
              <input type="radio" checked={this.state.subject === 'Law'} onChange={this.handleInputChange} value="Law"/> Law  <br/>
              <input type="radio" checked={this.state.subject === 'Engineering'} onChange={this.handleInputChange} value="Engineering" /> Engineering <br/>
              <input type="radio" checked={this.state.subject === 'Health'} onChange={this.handleInputChange} value="Health"  /> Health <br/>
              <input type="radio"  checked={this.state.subject === 'Medical'} onChange={this.handleInputChange} value="Medical"  /> Medical <br/>
            <input onClick={this.registerSubmit} type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
