import React, { Component } from 'react';
import { Link } from 'react-router';
import '../styles/dashboard.css';
import AskQuestion from './AskQuestion.js';

export default class Dashboard extends Component {

  constructor(props) {
  super(props);
    this.state = {
      show: false
    };
  }

  toggleComponent = () => {
    this.setState({ show: true });
  }

  render() {
    return(
      <div className="dashboardContainer">
        <h1>Welcome to the dashboard</h1>
        <div className="dashboardMain">

            <button onClick={this.toggleComponent}>ask question</button>
            { this.state.show && <AskQuestion/> }
        
        </div>
      </div>
    )
  }
}
