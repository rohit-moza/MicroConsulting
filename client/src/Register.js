import React, { Component } from 'react';


class Login extends Component {

  render() {
    return (
      <div>
        <form>
          <label>
            First Name:
            <input onChange={this.handleEmail} type="text" name="firstName" />
          </label>
          <label>
            Last Name:
            <input onChange={this.handleEmail} type="text" name="LastName" />
          </label>
          <label>
            Emails:
            <input onChange={this.handleEmail} type="text" name="email" />
          </label>
          <label>
            Password:
            <input onChange={this.handlePassword} type="text" name="password" />
          </label>
          <input onClick={this.loginSubmit} type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Login;
