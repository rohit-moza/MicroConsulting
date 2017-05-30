import React, { Component } from 'react';
import Navbar from './Navbar.js';
import { Link } from 'react-router';
import '../styles/App.css';

class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="introContainer">
          <div className="intro">
            <img alt="login Icon" className="homeIcon" src="./homePage.svg" />
            <h1 className="title">Professional Consulting</h1>
            <span className="subTitle">It's the little details that are vital. Little things make big things happen.</span>
            <Link to="/register">
              <button className="callAction">
                <img alt="login Icon" className="actionIcon" src="./callToActionHover.svg" />
                Meet A Consultant
              </button>
            </Link>

          </div>
        </div>
      </div>
    );
  }
}

export default App;
