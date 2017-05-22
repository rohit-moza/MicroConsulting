import React, { Component } from 'react';
import '../styles/App.css';

// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { browserHistory } from 'react-router'

import Register from './Register.js';
import Modal from './Modal.js';

import { createHashHistory } from 'history'
export const history = createHashHistory()

// Get the current location.
const location = history.location

// Listen for changes to the current location.
const unlisten = history.listen((location, action) => {
  // location is an object like window.location
  console.log(action, location.pathname, location.state)
})

import {
  BrowserRouter as Router,
  Route,
  Link,
  // Switch,  when you need to switch routes turn this on
  // Redirect when you need to redirect routes turn this on
} from 'react-router-dom'


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      slide: false,
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
      <Router>
      <div className="App">

        <Link to="/login">
        <button onClick={this.toggleModal}>
          Login
        </button>
        </Link>


        <Link to="/register">
        <button>
          Register
        </button>
        </Link>

          <Modal className="slide" show={this.state.isOpen}
            onClose={this.toggleModal}>
          </Modal>

        <Route path="/login" component={Modal}/>
        <Route path="/register" component={Register}/>
      </div>
    </Router>
    );
  }
}

export default App;
