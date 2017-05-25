import React, { Component } from 'react';
import '../styles/dashboard.css';
import AskQuestion from './AskQuestion.js';
import DashHome from './DashHome.js';
import Profile from './Profile.js';
import Alert from './alert.js';
import QList from './QuestionsList.js';
import Cookies from 'universal-cookie';

export default class Dashboard extends Component {

  constructor(props) {
  super(props);
    this.state = {
      display: {
        showQ: false,
        showDash: true,
        showProfile: false,
        showAlert: false,
        showQList: false,
      },
      questions: [],
      poll: true
    };
  }

  toggleComponent = (e) => {
    const target = e.target;
    const name = target.name;
    let showState = this.state.display;

    if (showState[name] === false) {
      for (let key in showState) { showState[key] = false; }
      showState[name] = true;
    }

    this.setState({display: showState});
  }


  getAllQuestions = () => {

      console.log("got invoked");
      const cookies = new Cookies();
      let token =  cookies.get('token')
    fetch("http://localhost:3001/api/questions", {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': token
      }
    })
   .then((response) => { return response.json()})
   .then((json) => {
     let getQs = this.state.questions;
     getQs = json
     this.setState({questions: getQs})
   })
}

getNewQuestions = () => {
  console.log(this.state.questions);
  if (this.state.poll === false) {
    return false
  }
  if (this.state.display.showDash === true) {
    console.log("got new invoked");
    const cookies = new Cookies();
    let token =  cookies.get('token')
    fetch("http://localhost:3001/api/questions", {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': token
    }
  })
    .then(response => response.json())
    .then(json => this.handleNewQuestion(json))
  }
}


handleNewQuestion = (data) => {
  if (data.length > this.state.questions.length) {
    console.log("new message received");
    // remember to change the polled update total to state total
    // this.state.questions.total = data.length

    let showAlert = this.state;
    showAlert.showAlert = true;
    this.setState(showAlert);

  }
}

updateQList = () => {
  console.log("calling getAllQuestions");
  this.getAllQuestions()
}

poll = () => {
  if (this.state.poll === true) {
    setInterval(this.getNewQuestions, 10000);
  }
}

componentDidMount = () => {
  // this.poll()
  this.getAllQuestions()
}

componentWillUnmount = () => {
  if (this.state.poll.show && this.state.showDash) {
    this.state.poll.show = false
  }

console.log("unmounting");
}

  render() {
    return(
      <div className="dashboardContainer">
        <button name="showDash" onClick={this.toggleComponent}>Dashboard</button>
        <button name="showQ" onClick={this.toggleComponent}>ask question</button>
        <button name="showQList" onClick={this.toggleComponent}>Question List</button>
        {/* <button name="showProfile" onClick={this.toggleComponent}>Profile</button> */}
        <h1>Welcome to the dashboard</h1>
        <div className="dashboardMain">
          { this.state.display.showDash && <DashHome/> }
          { this.state.display.showQ && <AskQuestion/> }
          {/* { this.state.display.showProfile && <Profile/> } */}
          { this.state.display.showAlert && <Alert/> }
          { this.state.display.showQList && <QList qlist={this.state.questions} updateQList={this.updateQList}/> }
        </div>
      </div>
    )
  }
}
