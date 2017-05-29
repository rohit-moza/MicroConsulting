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
      questions: {
        list: [],
        newMessage: false,
        alertData: []
      },
      userInfo: { },
      poll: true
    };
  }

  toggleComponent = (e) => {
    const target = e.target;
    const name = target.name;
    let showState = this.state;

    showState.questions.newMessage = false
    showState.questions.alertData = []

    if (showState.display[name] === false) {
      for (let key in showState.display) { showState.display[key] = false; }
      showState.display[name] = true;
    }

    this.setState(showState);
  }


  getUserData = () => {
      console.log("got user Data");
      const cookies = new Cookies();
      let token =  cookies.get('token')
    fetch("http://localhost:3001/api/users/user_data", {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': token
      }
    })
    .then((response) => { return response.json()})
    .then((json) => {
     let getUser = this.state.userInfo;
     getUser.name = json.first_name + " " + json.last_name
     getUser.subject = json.subject
     this.setState({userInfo: getUser})
     console.log(this.state);
    })
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
   getQs.list = json
   getQs.newMessage = false
   this.setState({questions: getQs})
   console.log(this.state);
  })
}

getNewQuestions = () => {
  // console.log(this.state.questions);
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
  if (data.length > this.state.questions.list.length) {
    console.log("new message received");

    console.log(data);
    let newQ = data[data.length-1]

    let showAlert = this.state;

    showAlert.questions.alertData = newQ
    showAlert.questions.newMessage = true
    showAlert.questions.list = data
    showAlert.display.showAlert = true;
    this.setState(showAlert);

  }
}

showNewAlert = () => {

    let showState = this.state.display;
    for (let key in showState) { showState[key] = false; }
    showState["showQList"] = true;


  this.setState({display: showState});

}

updateQList = () => {
  console.log("calling getAllQuestions");
  let clearAlert = this.state.questions
  clearAlert.newMessage = false
  clearAlert.alertData = []
  clearAlert.list = []

  this.setState({questions: clearAlert});
  this.getAllQuestions()
}

poll = () => {
  if (this.state.poll === true) {
    setInterval(this.getNewQuestions, 10000);
  }
}

componentDidMount = () => {
  this.getUserData()
  this.getAllQuestions()
  this.poll()
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
        <div className="topSection">
          <div className="dashNav">
            <div className="userData">
              <img alt="login Icon" className="dashUserIcon" src="./callToActionHover.svg" />
              <p>{this.state.userInfo.name} <br/> Welcome</p> <br/>
            </div>
            <div className="dashBtns">
            <button name="showDash" onClick={this.toggleComponent}><img alt="login Icon" className="dashIcon" src="./dash.svg" />Dashboard</button> <br/>
            <button name="showQ" onClick={this.toggleComponent}><img alt="login Icon" className="dashIcon" src="./askQ.svg" />Ask Question</button> <br/>
            <button name="showQList" onClick={this.toggleComponent}><img alt="login Icon" className="dashIcon" src="./list.svg" />Question List</button>
            {/* <button name="showProfile" onClick={this.toggleComponent}>Profile</button> */}
            </div>
          </div>
        </div>
        <div className="dashboardMain">
          { this.state.display.showDash && <DashHome/> }
          { this.state.display.showQ && <AskQuestion/> }
          {/* { this.state.display.showProfile && <Profile/> } */}
          { this.state.display.showAlert && <Alert alert={this.state.questions.alertData} showNewAlert={this.showNewAlert}/> }
          { this.state.display.showQList && <QList qlist={this.state.questions} updateQList={this.updateQList}/> }
        </div>
      </div>
    )
  }
}
