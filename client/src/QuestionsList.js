import React, { Component } from 'react';
import Question from './Question.js';

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
          <h2>List of questions</h2>
             <Question QData={this.props.qlist.alertData} updateDisplay={this.updateDisplay}/>
        </div>
      )
    } else {
      console.log(this.props.qlist);
      const questions = this.props.qlist.list
      this.state.questions = this.props.qlist.list

      let listItems = questions.map((c, i) =>
      <div key={questions[i].id}>
        <p>{questions[i].id}</p>
        <span>Title:</span>
        {questions[i].title} <br/>
        <span>Question:</span>
        {questions[i].content}
        <button name="showOneQ" onClick={() =>{this.toggleAnswer(i)}}>Answer</button>
      </div>
      );

      return(
        <div>
          <h2>List of questions</h2>
            { this.state.display.showList && listItems  }
            { this.state.display.showOneQ && <Question QData={this.state.sendQuestion} updateDisplay={this.updateDisplay}/> }
        </div>
      )
    }
  }
}
