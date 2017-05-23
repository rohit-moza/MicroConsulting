import React, { Component } from 'react';


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
  let data = {
    email: `${this.state.email}`,
    password: `${this.state.password}`
  }

  let toSend = JSON.stringify(data)

  e.preventDefault()
  fetch("http://localhost:3001/api/users",{
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
        <form>
          <label>
            First Name:
            <input type="text" onChange={this.handleTextChange} name="firstName" />
          </label>
          <label>
            Last Name:
            <input type="text" onChange={this.handleTextChange} name="LastName" />
          </label>
          <label>
            Emails:
            <input type="text" onChange={this.handleTextChange} name="email" />
          </label>
          <label>
            Password:
            <input type="password" onChange={this.handleTextChange} name="password" />
          </label>
          <label>
            Password Confirmation:
            <input type="password" onChange={this.handleTextChange} name="password_confirmation" />
          </label> <br/>
          <label> Subjects</label> <br/>
            <input type="checkbox" onChange={this.handleInputChange} checked={this.state.subjects.Law} name="Law" /> Law  <br/>
            <input type="checkbox" onChange={this.handleInputChange} checked={this.state.subjects.Engineering} name="Engineering" /> Engineering <br/>
            <input type="checkbox" onChange={this.handleInputChange} checked={this.state.subjects.Health} name="Health" /> Health <br/>
            <input type="checkbox" onChange={this.handleInputChange} checked={this.state.subjects.Medical} name="Medical" /> Medical <br/>
          <input onClick={this.registerSubmit} type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Register;
