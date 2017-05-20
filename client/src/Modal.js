import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6


class Modal extends React.Component {

    constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
  }



  handleEmail = (e) => {
    this.setState({email: e.target.value})
  }

  handlePassword = (e) => {
    this.setState({password: e.target.value})
  }

  loginSubmit = (e) => {
  let data = {
      email: 'elon_musk@gmail.com',
      name: 'Elon Musk'
  }

  let user = JSON.stringify(data)

  console.log("this is user");
  console.log(user)
  e.preventDefault()
  fetch("http://localhost:3001/api/users",
  {
    method: "POST",
    dataType: "json",
    body: user
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
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 3,
      maxWidth: 500,
      minHeight: 300,
      margin: '0 auto',
      padding: 30
    };


    return (
      <div className="backdrop" style={backdropStyle}>
        <div className="modal" style={modalStyle}>
          {this.props.children}
          <form>
            <label>
              Emails:
              <input onChange={this.handleEmail} type="text" name="email" />
            </label>
            <label>
              Password:
              <input onChange={this.handlePassword} type="text" name="password" />
            </label>
            <input onClick={this.loginSubmit} type="submit" value="Submit" />
          </form>

          <div className="footer">
            <button onClick={this.props.onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;
