import React from 'react';
import PropTypes from 'prop-types';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../styles/Modal.css';

import {
  BrowserRouter as Router,
  Route,
  Link,
  // Switch,  when you need to switch routes turn this on
  // Redirect when you need to redirect routes turn this on
} from 'react-router-dom'



class Modal extends React.Component {

    constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
  }

  checkinput = () => {

    function classReg( className ) {
      return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }

    // classList support for class management
    // altho to be fair, the api sucks because it won't accept multiple classes at once
    var hasClass, addClass, removeClass;

    if ( 'classList' in document.documentElement ) {
      hasClass = function( elem, c ) {
        return elem.classList.contains( c );
      };
      addClass = function( elem, c ) {
        elem.classList.add( c );
      };
      removeClass = function( elem, c ) {
        elem.classList.remove( c );
      };
    }
    else {
      hasClass = function( elem, c ) {
        return classReg( c ).test( elem.className );
      };
      addClass = function( elem, c ) {
        if ( !hasClass( elem, c ) ) {
          elem.className = elem.className + ' ' + c;
        }
      };
      removeClass = function( elem, c ) {
        elem.className = elem.className.replace( classReg( c ), ' ' );
      };
    }

    function toggleClass( elem, c ) {
      var fn = hasClass( elem, c ) ? removeClass : addClass;
      fn( elem, c );
    }

    var classie = {
      // full names
      hasClass: hasClass,
      addClass: addClass,
      removeClass: removeClass,
      toggleClass: toggleClass,
      // short names
      has: hasClass,
      add: addClass,
      remove: removeClass,
      toggle: toggleClass
    };

     (function() {

     // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
     if (!String.prototype.trim) {
       (function() {
         // Make sure we trim BOM and NBSP
         var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
         String.prototype.trim = function() {
           return this.replace(rtrim, '');
         };
       })();
     }
     [].slice.call( document.querySelectorAll( 'input.input__field' ) ).forEach( function( inputEl ) {
       // in case the input is already filled..
       if( inputEl.value.trim() !== '' ) {
         classie.add( inputEl.parentNode, 'input--filled' );
       }
       // events:
       inputEl.addEventListener( 'focus', onInputFocus );
       inputEl.addEventListener( 'blur', onInputBlur );
     } );
     function onInputFocus( ev ) {
       classie.add( ev.target.parentNode, 'input--filled' );
     }
     function onInputBlur( ev ) {
       if( ev.target.value.trim() === '' ) {
         classie.remove( ev.target.parentNode, 'input--filled' );
       }
     }
   })();
  }



  handleEmail = (e) => {
    this.setState({email: e.target.value})
    this.checkinput()
  }

  handlePassword = (e) => {
    this.setState({password: e.target.value})
    this.checkinput()
  }

  loginSubmit = (e) => {
  let data = {
    email: `${this.state.email}`,
    password: `${this.state.password}`
  }
  let toSend = JSON.stringify(data)

  e.preventDefault()
  fetch("http://localhost:3001/api/users",{
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: toSend
  })
 .then(response => response.json())
 .then(json => console.log(json))


}


  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.8)',
      padding: 50
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 4,
      maxWidth: 1000,
      minHeight: 300,
      height: 500,
      margin: '100px auto'
    };


    return (
      <Router>
      <div className="backdrop fade" style={backdropStyle}>
        <div className="modal slide" style={modalStyle}>

          <section>
            <div className="loginPic">
              <Link to="/">
              <span className="closeBtn" onClick={this.props.onClose}>x</span>
              </Link>
              <img alt="login Icon" className="loginIcon" src="./usersIcon.svg" />
              <h4 className="loginText">Professional Consultants Are Just a Few Clicks Away</h4>
            </div>
            <form>
              <div className="titleContainer">
                <h2 className="loginTitle">Welcome Back</h2>
                <h4 className="loginSubtitle">Enter your email and password to your account</h4>
              </div>
            <span className="emailInput input input--jiro">
              <input className="input__field input__field--jiro" onChange={this.handleEmail} type="text" id="input-10" />
              <label className="input__label input__label--jiro">
                <span className="input__label-content input__label-content--jiro">Email</span>
              </label>
            </span>
            <span className="input input--jiro">
              <input className="input__field input__field--jiro" onChange={this.handlePassword} type="password" id="input-11" />
              <label className="input__label input__label--jiro">
                <span className="input__label-content input__label-content--jiro">Password</span>
              </label>
            </span> <br/>
            <input onClick={this.loginSubmit} className="submitBtn" type="submit" value="Submit" />
            </form>
          </section>


          <div className="footer">
          </div>
        </div>
        <Route path="/"/>
      </div>
      </Router>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;
