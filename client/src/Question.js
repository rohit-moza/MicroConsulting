import React, { Component } from 'react';

export default class Question extends Component {

  constructor(props) {
  super(props);
    this.state = {};
  }

  handleDisplay = (e) => {
    this.props.updateDisplay()
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
