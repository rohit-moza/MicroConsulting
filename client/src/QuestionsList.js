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
  }


  componentDidMount = () => {
    let insertQs = this.state.questions
    insertQs = this.props.qlist
    this.setState({questions: insertQs})
  }

  render() {
    const questions = this.props.qlist

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
          { this.state.display.showList && listItems }
          { this.state.display.showOneQ && <Question QData={this.state.sendQuestion} updateDisplay={this.updateDisplay}/> }
      </div>
    )
  }
}
