import React, { Component } from 'react';

export default class Alert extends Component {

  constructor(props) {
  super(props);
    this.state = {};
    console.log("this is in alert");
    console.log(this.props.alert);
  }

  goToAlert = (e) => {
    console.log("calling update display");
    this.props.showNewAlert()
  }


  render() {
    return(
      <div>
        <h2>You got a Question</h2>
        <h3>{this.props.alert.title}</h3>
        <button onClick={this.goToAlert}>answer</button>
      </div>
    )
  }
}
