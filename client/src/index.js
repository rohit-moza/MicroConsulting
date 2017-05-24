import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
import App from './App';
import '../styles/index.css';

import Register from './Register.js';
import Modal from './Modal.js';
import Dashboard from './Dashboard.js';
import AskQuestion from './AskQuestion.js';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App} />
      <Route path="register" component={Register} />
      <Route path="login" component={Modal} />
      <Route path="dashboard" component={Dashboard} />
        <Route path="dashboard/askQuestion" component={AskQuestion} />
    
  </Router>,
  document.getElementById('root')
);
