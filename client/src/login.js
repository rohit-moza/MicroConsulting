import React, { Component } from 'react';


class Login extends Component {

  render() {
    return (
      <div>
        <form>
          <label>
            Emails:
            <input type="text" name="name" />
          </label>
          <label>
            Password:
            <input type="text" name="password" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Login;
