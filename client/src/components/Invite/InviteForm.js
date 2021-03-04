import React, { Component } from 'react';
import decode from 'jwt-decode';
import axios from 'axios';
import DatePicker from 'react-datepicker';
function ValidationMessage(props) {
  if (!props.valid) {
    return (
      <div
        style={{ color: 'red', fontSize: '10px', marginBottom: '20px' }}
        className="error-msg m-0 p-0"
      >
        {props.message}
      </div>
    );
  }
  return null;
}
class PEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      place: '',
      date: '',
      hour: '',
      purpose: '',
      topic: '',
      description: '',
      errorMsg: {},
      sent: 0,

      firstNameValid: false,
      lastNameValid: false,
      emailValid: false,

      phoneValid: false,
      placeValid: false,
      hourValid: false,

      purposeValid: false,
      topicValid: false,
      descriptionValid: false,
    };
    console.log(this.props);
  }
  onInputChange = (e) => {
    e.persist();
    this.setState(() => ({
      [e.target.name]: e.target.value,
    }));
  };

  validateForm = () => {
    const {
      firstNameValid,
      lastNameValid,
      emailValid,

      placeValid,
      hourValid,
      purposeValid,

      topicValid,
      descriptionValid,

      phoneValid,
    } = this.state;
    this.setState({
      formValid:
        firstNameValid &&
        lastNameValid &&
        emailValid &&
        phoneValid &&
        placeValid &&
        hourValid &&
        purposeValid &&
        topicValid &&
        descriptionValid,
    });
  };
  updateHour = (hour) => {
    this.setState({ hour }, this.validateHour);
  };

  validateHour = () => {
    const { hour } = this.state;
    let hourValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (!/^[0-9]+$/.test(hour)) {
      hourValid = false;
      errorMsg.hour = 'Only numerical allowed';
    }

    this.setState({ hourValid, errorMsg }, this.validateForm);
  };

  updatePlace = (place) => {
    this.setState({ place }, this.validateFirstName);
  };

  validatePlace = () => {
    const { place } = this.state;
    let placeValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (place.length < 3) {
      placeValid = false;
      errorMsg.place = 'Must be at least 3 characters long';
    } else if (!/^[a-zA-Z]+$/.test(place)) {
      placeValid = false;
      errorMsg.place = 'Must be alphabets';
    }
    this.setState({ placeValid, errorMsg }, this.validateForm);
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
  updatePhone = (phone) => {
    this.setState({ phone }, this.validatePhone);
  };
  validatePhone = () => {
    const { phone } = this.state;
    let phoneValid = true;
    let errorMsg = { ...this.state.errorMsg };
    if (!/^[6-9][0-9]+$/.test(phone)) {
      phoneValid = false;
      errorMsg.phone = 'Invalid phone number';
    } else if (phone.length < 10) {
      phoneValid = false;
      errorMsg.phone = 'Phone number must be 10 digits';
    } else if (phone.length > 10) {
      phoneValid = false;
      errorMsg.phone = 'Phone number must be 10 digits';
    }
    this.setState({ phoneValid, errorMsg }, this.validateForm);
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
      phone: this.state.phone,
      email: this.state.email,
      place: this.state.place,
      date: this.state.date,
      hour: this.state.hour,
      purpose: this.state.purpose,
      topic: this.state.topic,
      description: this.state.description,
      mentorId: this.props.location.state.mentorId,
    };
    axios
      .post(`http://localhost:5000/api/event/register`, formData)
      .then((res) => {
        axios
          .put(
            `http://localhost:5000/api/users/update/${this.props.location.state.mentorId}`,
            res.data
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        this.setState({
          sent: 1,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    let purpose = [
      <option key="2" value="Work Shop">
        Work Shop
      </option>,
      <option key="3" value="Guest Lecture">
        Guest Lecture
      </option>,
    ];

    return this.state.sent === 0 ? (
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <form onSubmit={(e) => this.onFormSubmit(e)}>
          <div
            className="shadow p-3 mb-5 bg-white rounded  border border-primary"
            style={{
              width: 550,
              marginTop: '20px',
            }}
          >
            <div className=" shadow-lg p-3 mb-5 rounded bg-primary border border-primary">
              <h1
                style={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: 'white',
                  fontFamily: 'Lucida Console',
                }}
              >
                Invite
              </h1>
            </div>
            {/* <h1 style={{ textAlign: 'center' }}>Invite</h1> */}
            <div className="row">
              <div className="col-sm-6 my-3">
                <input
                  placeholder="First Name"
                  className="form-control"
                  type="text"
                  value={this.state.firstName}
                  onChange={(e) => this.updateFirstName(e.target.value)}
                  name="firstName"
                  required
                />
                <ValidationMessage
                  valid={this.state.firstNameValid}
                  message={this.state.errorMsg.firstName}
                />
              </div>

              <div className="col-sm-6 my-3">
                <input
                  placeholder="Last Name"
                  className="form-control"
                  type="text"
                  value={this.state.lastName}
                  onChange={(e) => this.updateLastName(e.target.value)}
                  name="lastName"
                  required
                />
                <ValidationMessage
                  valid={this.state.lastNameValid}
                  message={this.state.errorMsg.lastName}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6 my-3">
                <select
                  name="purpose"
                  className="form-control"
                  value={this.state.purpose}
                  onChange={this.onInputChange}
                >
                  <option key="1" value=" ">
                    purpose
                  </option>
                  {purpose}
                </select>
              </div>
              {/* <div className="field">
                  <input
                    style={inbox}
                    placeholder="Stream"
                    type="text"
                    value={this.state.stream}
                    onChange={this.onInputChange}
                    name="stream"
                    required
                  />
                </div> */}
              <div className="col-sm-6 my-3">
                <input
                  placeholder="Place"
                  className="form-control"
                  type="text"
                  value={this.state.place}
                  onChange={(e) => this.updatePlace(e.target.value)}
                  name="place"
                  required
                />
                <ValidationMessage
                  valid={this.state.placeValid}
                  message={this.state.errorMsg.place}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 my-3">
                <input
                  placeholder="Email"
                  className="form-control"
                  type="email"
                  value={this.state.email}
                  onChange={(e) => this.updateEmail(e.target.value)}
                  name="email"
                  required
                />
                <ValidationMessage
                  valid={this.state.emailValid}
                  message={this.state.errorMsg.email}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12 my-3">
                <input
                  placeholder="Phone Number"
                  className="form-control"
                  type="text"
                  value={this.state.phone}
                  onChange={(e) => this.updatePhone(e.target.value)}
                  name="phone"
                  required
                />
                <ValidationMessage
                  valid={this.state.phoneValid}
                  message={this.state.errorMsg.phone}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6 my-3">
                <input
                  placeholder="Date"
                  className="form-control"
                  type="Date"
                  value={this.state.date}
                  onChange={this.onInputChange}
                  name="date"
                  required
                />
              </div>

              <div className="col-sm-6 my-3">
                <input
                  placeholder="Hours"
                  className="form-control"
                  type="text"
                  // pattern="\d*"
                  maxlength="2"
                  value={this.state.hour}
                  onChange={(e) => this.updateHour(e.target.value)}
                  name="hour"
                  required
                />
                <ValidationMessage
                  valid={this.state.hourValid}
                  message={this.state.errorMsg.hour}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 my-3">
                <input
                  className="form-control"
                  placeholder="Topic"
                  type="text"
                  value={this.state.topic}
                  onChange={this.onInputChange}
                  name="topic"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 my-3">
                <textarea
                  className="form-control"
                  value={this.state.description}
                  onChange={this.onInputChange}
                  id="topic"
                  rows="4"
                  name="description"
                  cols="50"
                  placeholder=" Please describe the topic."
                  required
                ></textarea>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    ) : (
      <div style={{ textAlign: 'center', marginTop: '300px', color: 'grey' }}>
        <h1>Thank You For Sending The Request!!</h1>
        <p style={{ color: 'black' }}>
          We urge to you please wait for the response email from our
          professional.{' '}
        </p>
      </div>
    );
  }
}

export default PEvent;
