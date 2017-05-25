import React, { Component } from 'react';
import Cookies from 'universal-cookie';

export default class Question extends Component {

  constructor(props) {
  super(props);
    this.state = {
      answer: "",
      question_id: 0
    };
  }

  handleDisplay = (e) => {
    console.log("calling update display");
    this.props.updateDisplay()
  }

  handleTextChange = (e) => {
    const target = e.target;
    const value = target.value
    let newAState = {};

    newAState.answer = value;
    newAState.question_id = this.props.QData.id;

    this.setState(newAState);
  }

  answerSubmit = (e) => {
    e.preventDefault()
    const cookies = new Cookies();
    let token =  cookies.get('token')

    let answer = JSON.stringify(this.state)
    console.log(this.props.QData.id);
    console.log(answer);
    fetch("http://localhost:3001/api/answers", {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': token
      },
      body: answer
    })
   .then(response => response.json())
   .then(json => console.log(json))
  }

  render() {
    return(
      <div>
        <h2>Answer this question</h2>
        <h3>Title:</h3>
        <h5>{this.props.QData.title}</h5>
        <h3>Question:</h3>
        <h5>{this.props.QData.content}</h5>
        <h3>Answer:</h3>
        <form>
          <textarea onChange={this.handleTextChange} name="content" rows="4" cols="50"></textarea>
          <input onClick={this.answerSubmit} type="submit"/>
        </form>
        <button onClick={this.handleDisplay}>All Questions</button>
      </div>
    )
  }
}
