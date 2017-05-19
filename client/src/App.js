import React, { Component } from 'react';
import './App.css';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';


import Login from './login.js';
import Modal from './Modal.js';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      opacity: 0
     };
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentDidMount() {
    window.fetch('api/subjects')
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="App">

        <button onClick={this.toggleModal}>
          Open the modal
        </button>

          <Modal show={this.state.isOpen}
            onClose={this.toggleModal}>
            Here's some content for the modal
          </Modal>


      </div>
    );
  }
}

export default App;
