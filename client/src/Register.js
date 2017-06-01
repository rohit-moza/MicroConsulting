import React, { Component } from 'react';
import '../styles/register.css';
import { Link } from 'react-router';
import Cookies from 'universal-cookie';

class Register extends Component {

  constructor() {
  super()
  this.state = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    subject: 'None',
    showSubjects: false,
    hideNext: false
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
   [].slice.call( document.querySelectorAll( 'input.input__fieldReg' ) ).forEach( function( inputEl ) {
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


handleTextChange = (e) => {
  const target = e.target;
  const value = target.value
  const name = target.name;

  let newUserState = {};
  newUserState[name] = value;

  this.setState(newUserState);

  this.checkinput()
  // {last_name: value};
  // this.setState({last_name: value});
}


showSub = (e) => {
e.preventDefault()
  let showS = this.state
  showS.hideNext = true

  this.setState(showS);

  setTimeout(() => {
    showS.showSubjects = true
    this.setState(showS);
  }, 500);
}


handleInputChange = (e) => {
  this.setState({
    subject: e.target.value
  });
}


registerSubmit = (e) => {
  e.preventDefault()
  let toSend = JSON.stringify(this.state)

  fetch("http://localhost:3001/api/users", {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: toSend
  })
 .then(response => response.json())
 .then(json => this.showDash(json))
}

showDash = () => {
  this.props.router.push('/');
}


  render() {

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(91,194,141,1)',
      padding: 50
    };


    // The modal "window"
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 4,
      maxWidth: 550,
      minHeight: 300,
      height: 600,
      margin: '100px'
    };


    return (
      <div className="regBG fade" style={backdropStyle}>
        <Link to="/">
        <button className="backBtn">Back</button>
        </Link>
        <div className="move" style={modalStyle}>
          <div>
            <img alt="login Icon" className="regIcon" src="./regIcon.svg" />
            <h1 className="signUpH1">Create An Account</h1>
          </div>
          <div className="registerContainer">
            <form>
              <section>
                <div className={`firstForm ${this.state.showSubjects ? 'moveOut' : ''}`}>
                <span className="inputReg input--yoshiko">
                  <input name="first_name" onChange={this.handleTextChange} className="input__fieldReg input__fieldReg--yoshiko" type="text" id="input-10" />
                  <label className="input__labelReg input__labelReg--yoshiko">
                    <span className="input__labelReg-content input__labelReg-content--yoshiko" data-content="First Name">First Name</span>
                  </label>
                </span>
                <span className="inputReg input--yoshiko">
                  <input name="last_name" onChange={this.handleTextChange} className="input__fieldReg input__fieldReg--yoshiko" type="text" id="input-11" />
                  <label className="input__labelReg input__labelReg--yoshiko">
                    <span className="input__labelReg-content input__labelReg-content--yoshiko" data-content="Last Name">Last Name</span>
                  </label>
                </span>
                <span className="inputReg input--yoshiko">
                  <input name="email" onChange={this.handleTextChange} className="input__fieldReg input__fieldReg--yoshiko" type="text" id="input-12" />
                  <label className="input__labelReg input__labelReg--yoshiko">
                    <span className="input__labelReg-content input__labelReg-content--yoshiko" data-content="Email">Email</span>
                  </label>
                </span>
                <span className="inputReg input--yoshiko">
                  <input name="password" onChange={this.handleTextChange} className="input__fieldReg input__fieldReg--yoshiko" type="password" id="input-12" />
                  <label className="input__labelReg input__labelReg--yoshiko">
                    <span className="input__labelReg-content input__labelReg-content--yoshiko" data-content="Password">Password</span>
                  </label>
                </span>
                <span className="inputReg input--yoshiko">
                  <input name="password_confirmation" onChange={this.handleTextChange} className="input__fieldReg input__fieldReg--yoshiko" type="password" id="input-12" />
                  <label className="input__labelReg input__labelReg--yoshiko">
                    <span className="input__labelReg-content input__labelReg-content--yoshiko" data-content="Password Confirmation">Password Confirmation</span>
                  </label>
                </span> <br/>
                </div>
                <div className={`${this.state.showSubjects ? 'moveIn' : 'hideSubjects'}`} >
                  <div className="middle">
                    <label>
                    <input type="radio" name="radio" value="None" onChange={this.handleInputChange} checked={this.state.subject === 'None'}/>
                    <div className="front-end box">
                      <span>None</span>
                    </div>
                    </label>

                    <label>
                    <input type="radio" name="radio" value="Law" onChange={this.handleInputChange} checked={this.state.subject === 'Law'}/>
                    <div className="back-end box">
                      <span>Law</span>
                    </div>
                    </label>

                    <label>
                    <input type="radio" name="radio" value="Engineering" onChange={this.handleInputChange} checked={this.state.subject === 'Engineering'}/>
                    <div className="engin box">
                      <span>Engineering</span>
                    </div>
                    </label>

                    <label>
                    <input type="radio" name="radio" value="Health" onChange={this.handleInputChange} checked={this.state.subject === 'Health'}/>
                    <div className="health box">
                      <span>Health</span>
                    </div>
                    </label>

                    <label>
                    <input type="radio" name="radio" value="Medical" onChange={this.handleInputChange} checked={this.state.subject === 'Medical'}/>
                    <div className="medical box">
                      <span>Medical</span>
                    </div>
                    </label>
                  </div>
                <input onClick={this.registerSubmit} id="submitBtnID" className="regBtn" type="submit" value="Submit" />
                </div>
                <input onClick={this.showSub} id="submitBtnID" className={`regBtn ${this.state.hideNext ? 'fadeOut' : ''}`} type="submit" value="Next" />
              </section>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
