import React, { Component } from 'react';
import { Link } from 'react-router';
import '../styles/Navbar.css';

export default class Navbar extends Component {

  constructor(props) {
  super(props);
    this.state = {
      show: true
    };
  }


  render() {
    return(
      <div className="navBar">
        <img alt="login Icon" className="logoIcon" src="./logo.svg" />
        <span className="logoTitle">Consulting</span>
        <div className="navBtns">
          <Link to="/login">
            <button className="login">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button>
              Register
            </button>
          </Link>
        </div>
      </div>
    )
  }
}
