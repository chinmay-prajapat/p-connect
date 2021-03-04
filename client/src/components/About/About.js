import React, { Component } from 'react';
import axios from 'axios';
function ValidationMessage(props) {
  if (!props.valid) {
    return (
      <div style={{ color: 'red' }} className="error-msg">
        {props.message}
      </div>
    );
  }
  return null;
}
class About extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
      firstNameValid: false,
      lastNameValid: false,
      emailValid: false,
      phoneValid: false,
      messageValid: false,
      errorMsg: {},
    };
  }
  validateForm = () => {
    const {
      firstNameValid,
      lastNameValid,
      emailValid,
      messageValid,
    } = this.state;
    this.setState({
      formValid: firstNameValid && lastNameValid && messageValid && emailValid,
    });
  };
  updateFirstName = (firstName) => {
    this.setState({ firstName }, this.validateFirstName);
  };

  validateFirstName = () => {
    const { firstName } = this.state;
    let firstNameValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (firstName.length < 3) {
      firstNameValid = false;
      errorMsg.firstName = 'Must be at least 3 characters long';
    } else if (!/^[a-zA-Z]+$/.test(firstName)) {
      firstNameValid = false;
      errorMsg.firstName = 'Must be alphabets';
    }
    this.setState({ firstNameValid, errorMsg }, this.validateForm);
  };
  updateLastName = (lastName) => {
    this.setState({ lastName }, this.validateLastName);
  };

  validateLastName = () => {
    const { lastName } = this.state;
    let lastNameValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (!/^[a-zA-Z]+$/.test(lastName)) {
      lastNameValid = false;
      errorMsg.lastName = 'Must be alphabets';
    } else if (lastName.length < 3) {
      lastNameValid = false;
      errorMsg.lastName = 'Must be at least 3 characters long';
    }
    this.setState({ lastNameValid, errorMsg }, this.validateForm);
  };
  updateEmail = (email) => {
    this.setState({ email }, this.validateEmail);
  };

  validateEmail = () => {
    const { email } = this.state;
    let emailValid = true;
    let errorMsg = { ...this.state.errorMsg };

    // checks for format _@_._
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailValid = false;
      errorMsg.email = 'Invalid email format';
    }

    this.setState({ emailValid, errorMsg }, this.validateForm);
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      message: this.state.message,
    };
    this.setState({
      message: '',
    });
    axios
      .post('http://localhost:5000/api/about/register', formData)
      .then(() => {
        this.props.history.push('/about');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onInputChange = (e) => {
    e.persist();
    this.setState(() => ({
      [e.target.name]: e.target.value,
    }));
  };
  render() {
    return (
      <div
        style={{
          display: 'inline-grid',
          justifyContent: 'center',
          margin: '30px 0px',
        }}
        className="container"
      >
        <div style={{ margin: '30px 0px' }} className="row">
          <div className="col">
            <h1>About</h1>
          </div>
          <div className="col">
            <p>
              The objective behind this project is to provide a platform for
              those who need guidance in their project,research work, workshops,
              and guest lectures.
            </p>
          </div>
        </div>
        <div style={{ margin: '20px 0px' }} className="row">
          <div className="col">
            <h1>Contact</h1>
          </div>
          <div className="col">
            <h5>Address:</h5>
            <p>Bangalore</p>
            <h5>Email:</h5>
            <p>prajapatchinmay@gmail.com</p>
            <h5>Mobile:</h5>
            <p>8197453533</p>
          </div>
        </div>
        <form onSubmit={(e) => this.onFormSubmit(e)}>
          <div className="row">
            <div className="col">
              <h1>Write Us</h1>
            </div>

            <div className="col">
              <ValidationMessage
                valid={this.state.firstNameValid}
                message={this.state.errorMsg.firstName}
              />
              <input
                style={{
                  width: '250px',
                  display: 'block',
                  border: '2px solid pink',
                  borderRadius: '5px',
                  lineHeight: '40px',
                }}
                type="text"
                name="firstName"
                placeholder="First Name"
                value={this.state.firstName}
                onChange={(e) => this.updateFirstName(e.target.value)}
                required
              />
              <ValidationMessage
                valid={this.state.lastNameValid}
                message={this.state.errorMsg.lastName}
              />
              <input
                style={{
                  position: 'relative',
                  left: '270px',
                  width: '270px',
                  borderRadius: '5px',
                  top: '-45px',
                  lineHeight: '40px',
                  border: '2px solid pink',
                }}
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={this.state.lastName}
                onChange={(e) => this.updateLastName(e.target.value)}
                required
              />
              <ValidationMessage
                valid={this.state.emailValid}
                message={this.state.errorMsg.email}
              />
              <input
                style={{
                  width: '539px',
                  borderRadius: '5px',
                  margin: '0px 0px   ',
                  padding: '0px 0px',
                  lineHeight: '40px',
                  border: '2px solid pink',
                }}
                type="text"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={(e) => this.updateEmail(e.target.value)}
                required
              />
              <textarea
                style={{
                  borderRadius: '5px',
                  margin: '10px 0px',
                  lineHeight: '40px',
                  border: '2px solid pink',
                }}
                name="message"
                id="message"
                className="form-control "
                cols="30"
                rows="8"
                placeholder="Message"
                value={this.state.message}
                onChange={this.onInputChange}
                required
              ></textarea>
              <button
                className="btn btn-primary"
                type="submit"
                name="submit"
                value="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default About;
