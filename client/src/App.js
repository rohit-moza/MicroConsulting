import React, { Component } from 'react';
import Navbar from './Navbar.js';
import '../styles/App.css';

class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Navbar />
        <h1>Professional Consulting</h1>
      </div>
    );
  }
}

export default App;
