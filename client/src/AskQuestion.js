import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import '../styles/QList.css';


export default class AskQuestion extends Component {


  constructor() {
  super()

  this.state = {
    title: '',
    subject: 'Law',
    content: ''
  }
}


handleTextChange = (e) => {
  const target = e.target;
  const value = target.value
  const name = target.name;

  let newQState = {};
  newQState[name] = value;

  this.setState(newQState);

  // {last_name: value};
  // this.setState({last_name: value});
}

handleDisplay = (e) => {
  console.log("calling update display");

  this.props.backToDash()
}


 questionSubmit = (e) => {
   e.preventDefault()
   const cookies = new Cookies();
   let token =  cookies.get('token')

   let question = JSON.stringify(this.state)

   console.log(question);
   fetch("http://localhost:3001/api/questions", {
     method: 'POST',
     headers: {
     'Content-Type': 'application/json',
     'Authorization': token
     },
     body: question
   })
  .then(response => response.json())
  .then(json => this.handleDisplay())
 }

  render() {
    return(
      <div className="askQcontainer">
        <h2 className="askQTitle">Ask A Question</h2>
        <form id="usrform" className="Qform">
          Title: <br/> <input onChange={this.handleTextChange} className="Qinput" type="text" name="title"/> <br/>
          Question: <br/> <textarea onChange={this.handleTextChange} className="Qinput" name="content" rows="4" cols="50"></textarea> <br/>
          Subject: <br/>
          <select value={this.state.subject} name="subject" onChange={this.handleTextChange}>
            <option name="law" defaultValue value="law">law</option>
            <option name="Engineering" value="Engineering">Engineering</option>
            <option name="Health" value="Health">Health</option>
            <option name="Medical" value="Medical">Medical</option>
          </select> <br/>
          <input className="askQBtn" onClick={this.questionSubmit} type="submit"/>
        </form>
        </div>
    )
  }
}
