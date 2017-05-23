import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import App from './App';
import '../styles/index.css';

import Register from './Register.js';
import Modal from './Modal.js';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="register" component={Register} />
      <Route path="login" component={Modal} />
    </Route>
  </Router>,
  document.getElementById('root')
);
