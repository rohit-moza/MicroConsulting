import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Navbar extends Component {
  render() {
    return(
      <div>
        <Link to="/login">
          <button onClick={this.toggleModal}>
            Login
          </button>
        </Link>
        <Link to="/register">
          <button>
            Register
          </button>
        </Link>
      </div>
    )
  }
}
