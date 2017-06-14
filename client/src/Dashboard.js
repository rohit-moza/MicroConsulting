import React, { Component } from 'react';
import { Link } from 'react-router';
import '../styles/dashboard.css';
import AskQuestion from './AskQuestion.js';
import DashHome from './DashHome.js';
import Profile from './Profile.js';
import Alert from './alert.js';
import QList from './QuestionsList.js';
import Cookies from 'universal-cookie';
import MyQuestions from './MyQuestions.js';

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
          showMyQ: false
      },
      questions: {
        list: [],
        newMessage: false,
        alertData: [],
        resetDisplay: false
      },
      userInfo: {

      },
      poll: true
    };
  }

  toggleComponent = (e) => {
    this.updateQList()
    const target = e.target;
    const name = target.name;
    let showState = this.state;

    showState.questions.newMessage = false
    showState.questions.alertData = []
    showState.questions.resetDisplay = true


    if (showState.display[name] === false) {
      for (let key in showState.display) { showState.display[key] = false; }
      showState.display[name] = true;
    }

    this.setState(showState);
  }


  getUserData = () => {

      const cookies = new Cookies();
      let token =  cookies.get('token')
    fetch("./api/users/user_data", {
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
     getUser.questionsAnswered = json.questionsAnswered
     getUser.questionsAsked = json.questionsAsked
     getUser.earnings_cents = json.earnings_cents
     getUser.EngineeringQCount = json.EngineeringQCount
     getUser.HealthAndFitnessQCount = json.HealthAndFitnessQCount
     getUser.LawQCount = json.LawQCount
     getUser.MedicalQCount = json.MedicalQCount



     if (getUser.subject === "None") {
       getUser.subject = 0
     }

     this.setState({userInfo: getUser})


    })
  }

getAllQuestions = () => {
    const cookies = new Cookies();
    let token =  cookies.get('token')
  fetch("./api/questions", {
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

  })
}

getNewQuestions = () => {

  if (this.state.poll === false) {
    return false
  }
  if (this.state.display.showDash === true) {

    const cookies = new Cookies();
    let token =  cookies.get('token')
    fetch("./api/questions", {
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

backToDash = () => {

  let backDash = this.state.display
  backDash.showDash = true
  backDash.showQ = false

  this.setState({display: backDash});
  this.getAllQuestions()
}

updateQList = () => {

  let clearAlert = this.state.questions
  clearAlert.newMessage = false
  clearAlert.alertData = []
  clearAlert.list = []
  clearAlert.resetDisplay = false

  this.setState({questions: clearAlert});
  this.getAllQuestions()
}


logOut = () => {
  const cookies = new Cookies();
  let token =  cookies.get('token')
  cookies.remove('token')
  this.props.router.push('/');
}

poll = () => {
  if (this.state.poll === true) {
    setInterval(this.getNewQuestions, 5000);
    setInterval(this.getUserData, 5000);
  }
}

componentWillMount = () => {
  this.getUserData()
  this.getAllQuestions()
  this.poll()
}

componentDidMount = () => {

  const cookies = new Cookies();
  let token =  cookies.get('token')
  if (!token) {

    this.props.router.push('/login');
  }

}

componentWillUnmount = () => {
  if (this.state.poll.show && this.state.showDash) {
    this.state.poll.show = false
  }
}

  render() {
    return(
      <div className="dashboardContainer">
        <div className="topSection">
          <div onClick={this.logOut} className="logoutDash">
           <div className="navBar">
              <div className="navBtns">
                <button className="login">
                  Logout
                </button>
              </div>
            </div>
          </div>
          <div className="dashNav">
            <div className="dashLogo">
              <img alt="login Icon" className="logoIconDash" src="./logo.svg" />
              <span className="logoTitleDash">Light Shine</span>
            </div>
            <div className="userData">
              <img alt="login Icon" className="dashUserIcon" src="./callToActionHover.svg" />
              <p>{this.state.userInfo.name} <br/>
              Balance: ${this.state.userInfo.earnings_cents / 100}</p> <br/>
            </div>
            <div className="dashBtns">
            <button name="showDash" onClick={this.toggleComponent}><img alt="login Icon" className="dashIcon" src="./dash.svg" />Dashboard</button> <br/>
            <button name="showQ" onClick={this.toggleComponent}><img alt="login Icon" className="dashIcon" src="./askQ.svg" />Ask Question</button> <br/>
            <button name="showQList" className={`${this.state.userInfo.subject ? '' : 'hideQList'}`} onClick={this.toggleComponent}><img alt="login Icon" className="dashIcon" src="./list.svg" />Question List</button>
            <button name="showMyQ" onClick={this.toggleComponent}><img alt="login Icon" className="dashIcon" src="./list.svg" />My Questions</button>
            {/* <button name="showProfile" onClick={this.toggleComponent}>Profile</button> */}
            </div>
          </div>
        </div>
        <div className="dashboardMain">
          { this.state.display.showAlert && <Alert alert={this.state.questions.alertData} showNewAlert={this.showNewAlert}/> }
          { this.state.display.showDash && <DashHome stats={this.state.userInfo}/> }
          { this.state.display.showQ && <AskQuestion backToDash={this.backToDash}/> }
          { this.state.display.showMyQ && <MyQuestions/> }
          {/* { this.state.display.showProfile && <Profile/> } */}
          { this.state.display.showQList && <QList qlist={this.state.questions} updateQList={this.updateQList}/> }
        </div>
      </div>
    )
  }
}
