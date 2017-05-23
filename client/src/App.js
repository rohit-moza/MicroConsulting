import React, { Component } from 'react';
import Navbar from './Navbar.js';
import '../styles/App.css';

class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.fetch('api/subjects')
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}

export default App;
