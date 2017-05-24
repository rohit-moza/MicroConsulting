import React, { Component } from 'react';
import '../styles/dashboard.css';
import AskQuestion from './AskQuestion.js';
import DashHome from './DashHome.js';
import Profile from './Profile.js';

export default class Dashboard extends Component {

  constructor(props) {
  super(props);
    this.state = {
      showQ: false,
      showDash: true,
      showProfile: false
    };
  }

  toggleComponent = (e) => {
    const target = e.target;
    const name = target.name;
    let showState = this.state;

    if (showState[name] === false) {
      for (let key in showState) { showState[key] = false; }
      showState[name] = true;
    }

    this.setState(showState);
  }


  getQuestions = () => {
    if (this.state.showDash === true) {
      console.log("got invoked");
    }
 //  fetch("http://localhost:3001/api/questions", {
 //    method: 'GET',
 //    headers: {
 //    'Content-Type': 'application/json'
 //    },
 //    body: ""
 //  })
 // .then(response => response.json())
 // .then(json => this.handleLogin(json))
}



componentDidMount = () => {
  setInterval( () => {
      this.getQuestions()
    }, 1000);
}

  render() {
    return(
      <div className="dashboardContainer">
        <button name="showDash" onClick={this.toggleComponent}>Dashboard</button>
        <button name="showQ" onClick={this.toggleComponent}>ask question</button>
        <button name="showProfile" onClick={this.toggleComponent}>Profile</button>
        <h1>Welcome to the dashboard</h1>
        <div className="dashboardMain">
          { this.state.showDash && <DashHome/> }
          { this.state.showQ && <AskQuestion/> }
          { this.state.showProfile && <Profile/> }
        </div>
      </div>
    )
  }
}
