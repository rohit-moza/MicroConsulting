import React, { Component } from 'react';
import Question from './Question.js';
import '../styles/QList.css';

export default class QuestionsList extends Component {


  constructor(props) {
  super(props);
    this.state = {
      questions: [],
      sendQuestion: [],
      display: {
        showList: true,
        showOneQ: false
      }
    }
  }


  toggleAnswer = (i) => {

    const name = "showOneQ";
    let showState = this.state;

    if (showState.display[name] === false) {
      for (let key in showState.display) { showState.display[key] = false; }
      showState.display[name] = true;
    }

    showState.sendQuestion = this.state.questions[i]
    this.setState(showState);
  }

  updateDisplay = () => {
    let backToList = this.state.display
    backToList.showList = true
    backToList.showOneQ = false

    this.props.qlist.newMessage = 0;
    debugger;
    this.setState({display: backToList});
    console.log("calling updateQList");

    this.props.updateQList()
  }

  componentWillMount = () => {
    let insertQs = this.state.questions
    insertQs = this.props.qlist.list
    this.setState({questions: insertQs})
  }

  render() {

    if (this.props.qlist.newMessage === true) {
      let showNewQ = this.state.display
      showNewQ.showList = false
      showNewQ.showOneQ = true
      console.log("got new message");
      return(
        <div>
          <h2>Answer this Question</h2>
             <Question QData={this.props.qlist.alertData} updateDisplay={this.updateDisplay}/>
        </div>
      )
    } else {

      if (this.props.qlist.resetDisplay === true) {
        this.updateDisplay()
      }


      const questions = this.props.qlist.list
      this.state.questions = this.props.qlist.list

      let listItems = questions.map((c, i) =>
      <div className="Qlist" key={questions[i].id}>
        <div className="titleSection">
        <span className="titleT">Title:</span> <br/>
        <span>{questions[i].title}</span>
        </div>
        <div className="questionSection">
        <span className="titleQ">Question:</span> <br/>
        <span>{questions[i].content}</span>
        </div>
        <button name="showOneQ" className="showOneQ" onClick={() =>{this.toggleAnswer(i)}}>Answer</button>
      </div>
      );

      return(
        <div className="QlistScroll">
          <h2>Unanswered Questions</h2>
            { this.state.display.showList && listItems  }
            { this.state.display.showOneQ && <Question QData={this.state.sendQuestion} updateDisplay={this.updateDisplay}/> }
        </div>
      )
    }
  }
}
