import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Navbar extends Component {

  constructor(props) {
  super(props);
    this.state = {
      show: true
    };
  }


  render() {
    return(
      <div>
        <Link to="/login">
          <button >
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
