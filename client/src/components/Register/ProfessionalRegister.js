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

class ProfessionalRegister extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      stream: '',
      city: '',
      email: '',
      phone: '',
      experience: '',
      password: '',
      repeatPassword: '',
      certificate: '',
      profession: '',
      roles: 'professional',
      allowAccess: 'false',
      firstNameValid: false,
      lastNameValid: false,
      streamValid: false,
      cityValid: false,
      experienceValid: '',
      certificateValid: '',
      professionValid: '',
      session: '',
      emailValid: false,
      phoneValid: false,
      passwordValid: false,
      repeatPassword: false,
      formValid: false,
      errorMsg: {},
    };
  }
  validateForm = () => {
    const {
      firstNameValid,
      lastNameValid,
      emailValid,
      cityValid,
      experienceValid,
      streamValid,
      certificateValid,
      professionValid,
      phoneValid,
      passwordValid,
      sessionValid,
      repeatPasswordValid,
    } = this.state;
    this.setState({
      formValid:
        firstNameValid &&
        lastNameValid &&
        emailValid &&
        cityValid &&
        experienceValid &&
        streamValid &&
        certificateValid &&
        professionValid &&
        phoneValid &&
        passwordValid &&
        repeatPasswordValid &&
        sessionValid,
    });
  };
  updateExperience = (experience) => {
    this.setState({ experience }, this.validateExprience);
  };
  validateExprience = () => {
    const { experience } = this.state;
    let experienceValid = true;
    let errorMsg = { ...this.state.errorMsg };
    if (!/^[0-9]+$/.test(experience)) {
      experienceValid = false;
      errorMsg.experience = 'Only numerical allowed';
    }
    this.setState({ experienceValid, errorMsg }, this.validateForm);
  };
  updateSession = (session) => {
    this.setState({ session }, this.validateSession);
  };

  validateSession = () => {
    const { session } = this.state;
    let sessionValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (!/^[0-9]+$/.test(session)) {
      sessionValid = false;
      errorMsg.session = 'Only numerical allowed';
    }

    this.setState({ sessionValid, errorMsg }, this.validateForm);
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
  updateStream = (stream) => {
    this.setState({ stream }, this.validateStream);
  };
  validateStream = () => {
    const { stream } = this.state;
    let streamValid = true;
    let errorMsg = { ...this.state.errorMsg };
    if (stream === null) {
      streamValid = false;
      errorMsg.stream = 'Please select the appropriate option';
    }

    this.setState({ streamValid, errorMsg }, this.validateForm);
  };
  updatePassword = (password) => {
    this.setState({ password }, this.validatePassword);
  };

  validatePassword = () => {
    const { password } = this.state;
    let passwordValid = true;
    let errorMsg = { ...this.state.errorMsg };

    // must be 6 chars
    // must contain a number
    // must contain a special character

    if (password.length < 6) {
      passwordValid = false;
      errorMsg.password = 'Password must be at least 6 characters long';
    } else if (!/\d/.test(password)) {
      passwordValid = false;
      errorMsg.password = 'Password must contain a digit';
    } else if (!/[!@#$%^&*]/.test(password)) {
      passwordValid = false;
      errorMsg.password = 'Password must contain special character: !@#$%^&*';
    }

    this.setState({ passwordValid, errorMsg }, this.validateForm);
  };

  updateRepeatPassword = (repeatPassword) => {
    this.setState({ repeatPassword }, this.validateRepeatPassword);
  };

  validateRepeatPassword = () => {
    const { repeatPassword, password } = this.state;
    let repeatPasswordValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (password !== repeatPassword) {
      repeatPasswordValid = false;
      errorMsg.repeatPassword = 'Passwords do not match';
    }

    this.setState({ repeatPasswordValid, errorMsg }, this.validateForm);
  };

  onInputChange = (e) => {
    e.persist();
    this.setState(() => ({
      [e.target.name]: e.target.value,
    }));
  };

  onFileChange = (e) => {
    this.setState({ [e.target.name]: e.target.files[0] });
  };
  onFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    // formData.append('title', this.state.title);
    // formData.append('link', this.state.link);
    // formData.append('description', this.state.description);
    // formData.append('document', this.state.document);

    formData.append('firstName', this.state.firstName.toUpperCase());
    formData.append('lastName', this.state.lastName.toUpperCase());
    formData.append('stream', this.state.stream);
    formData.append('email', this.state.email.toLowerCase());
    formData.append('phone', this.state.phone);
    formData.append('password', this.state.password);
    formData.append('experience', this.state.experience);
    formData.append('repeatPassword', this.state.repeatPassword);
    formData.append('city', this.state.city.toUpperCase());
    formData.append('profession', this.state.profession);
    formData.append('certificate', this.state.certificate);
    formData.append('allowAccess', this.state.allowAccess);
    formData.append('roles', this.state.roles);
    formData.append('session', this.state.session);

    axios
      .post('http://localhost:5000/api/users/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth': localStorage.getItem('token'),
        },
      })
      .then((res) => {
        const myEmail = {
          email: this.state.email,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
        };
        console.log(myEmail);
        axios
          .post('/api/users/professionalRegister', myEmail)
          .then((res) => {
            console.log('Email send');
          })
          .catch((err) => {
            console.log(err);
          });
        window.location.reload();
        console.log(res.data);
      })
      .catch((err) => {
        this.setState({ err: err });
      });

    axios
      .put('http://localhost:5000/api/users/upload', formData, {})
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        this.setState({ err: err });
      });
  };

  // onProfileImageUpload = (event) => {
  //   this.setState({
  //     profileImage: event.target.files[0],
  //     loaded: 0,
  //   });
  // };
  // onFormSubmit = (e) => {
  //   e.preventDefault();
  //   const formData = {
  //     firstName: this.state.firstName,
  //     lastName: this.state.lastName,
  //     stream: this.state.stream,
  //     email: this.state.email,
  //     phone: this.state.phone,
  //     password: this.state.password,
  //     experience: this.state.experience,
  //     repeatPassword: this.state.repeatPassword,
  //     city: this.state.city,
  //     profession: this.state.profession,
  //     certificate: this.state.certificate,
  //     roles: this.state.roles,

  //   axios
  //     .post('http://localhost:5000/api/users/upload', formData)
  //     .then(() => {
  //       this.props.history.push('/ulogin');
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  render() {
    let stream = [
      <option key="2" value="Computer Science">
        Computer Science
      </option>,
      <option key="3" value="Bio">
        Bio
      </option>,
      <option key="4" value="Civil Engineering">
        Civil Engineering
      </option>,
      <option key="5" value="Physics">
        Physics
      </option>,
    ];
    const container = {
      marginTop: '100px',
      marginBottom: '70px',
      marginRight: '10px',

      marginLeft: '440px',
      width: '40%',
      height: '30%',
      display: 'flex',
      // flexWrap: 'wrap',

      justifyContent: 'center',
    };
    const inbox = {
      display: 'flex',
      lineHeight: '40px ',
      width: '270px',
      border: '2px solid grey',
      borderRadius: '5px',
    };
    return (
      <div style={container}>
        <div className="ui equal width grid">
          <div className="row">
            <h1>Professional Registration</h1>
            <div className="column"></div>
          </div>
          <form onSubmit={(e) => this.onFormSubmit(e)}>
            <div
              className="row"
              style={{
                background: '#8db1ab',
                width: '700px',
                display: 'flex',
                textAlign: 'center',

                // margin: '40px 0px 0px 0px',
                color: 'white',
                fontSize: '18px',
                padding: '60px',

                borderRadius: '10px',
              }}
            >
              <div className="column">
                <div className="ui segment">
                  <form className="ui form">
                    <div className="field">
                      <ValidationMessage
                        valid={this.state.firstNameValid}
                        message={this.state.errorMsg.firstName}
                      />
                      <input
                        style={inbox}
                        placeholder="First Name"
                        type="text"
                        value={this.state.firstName}
                        onChange={(e) => this.updateFirstName(e.target.value)}
                        name="firstName"
                        required
                      />
                    </div>
                    <div className="field">
                      <ValidationMessage
                        valid={this.state.lastNameValid}
                        message={this.state.errorMsg.lastName}
                      />
                      <input
                        style={{
                          position: 'relative',
                          left: '270px',
                          top: '-46px',
                          width: '270px',
                          borderRadius: '5px',
                          lineHeight: '40px',
                          border: '2px solid grey',
                        }}
                        placeholder="Last Name"
                        type="text"
                        value={this.state.lastName}
                        onChange={(e) => this.updateLastName(e.target.value)}
                        name="lastName"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <ValidationMessage
                        valid={this.state.streamValid}
                        message={this.state.errorMsg.stream}
                      />
                      <select
                        style={{
                          display: 'flex',
                          lineHeight: '40px ',
                          width: '270px',
                          padding: '8px',
                          border: '2px solid grey',
                          borderRadius: '5px',
                        }}
                        name="stream"
                        value={this.state.stream}
                        onChange={(e) => this.updateStream(e.target.value)}
                        required
                      >
                        <option value="">Stream</option>
                        {stream}
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
                    <div className="field">
                      <input
                        style={{
                          position: 'relative',
                          left: '270px',
                          top: '-60px',
                          width: '270px',
                          borderRadius: '5px',
                          lineHeight: '40px',
                          border: '2px solid grey',
                        }}
                        placeholder="City"
                        type="text"
                        value={this.state.city}
                        onChange={this.onInputChange}
                        name="city"
                        required
                      />
                    </div>
                    <div className="field">
                      <ValidationMessage
                        valid={this.state.emailValid}
                        message={this.state.errorMsg.email}
                      />
                      <input
                        style={{
                          position: 'relative',
                          width: '161%',
                          borderRadius: '5px',
                          lineHeight: '40px',
                          border: '2px solid grey',
                        }}
                        placeholder="Email"
                        type="text"
                        value={this.state.email}
                        onChange={(e) => this.updateEmail(e.target.value)}
                        name="email"
                        required
                      />
                    </div>
                    <div className="field">
                      <ValidationMessage
                        valid={this.state.phoneValid}
                        message={this.state.errorMsg.phone}
                      />
                      <input
                        style={{
                          position: 'relative',
                          display: 'flex',
                          width: '161%',
                          borderRadius: '5px',
                          lineHeight: '40px',
                          margin: '40px 0px',
                          border: '2px solid grey',
                        }}
                        placeholder="Phone Number"
                        type="text"
                        maxLength="10"
                        value={this.state.phone}
                        onChange={(e) => this.updatePhone(e.target.value)}
                        name="phone"
                        required
                      />
                    </div>

                    <div className="field">
                      <ValidationMessage
                        valid={this.state.passwordValid}
                        message={this.state.errorMsg.password}
                      />
                      <input
                        style={inbox}
                        placeholder="Password"
                        type="password"
                        value={this.state.password}
                        onChange={(e) => this.updatePassword(e.target.value)}
                        name="password"
                        required
                      />
                    </div>
                    <div className="field">
                      <ValidationMessage
                        valid={this.state.repeatPasswordValid}
                        message={this.state.errorMsg.repeatPassword}
                      />
                      <input
                        style={{
                          position: 'relative',
                          left: '270px',
                          width: '270px',
                          borderRadius: '5px',
                          top: '-46px',
                          lineHeight: '40px',
                          border: '2px solid grey',
                        }}
                        placeholder="Repeat Password"
                        type="password"
                        value={this.state.repeatPassword}
                        onChange={(e) =>
                          this.updateRepeatPassword(e.target.value)
                        }
                        name="repeatPassword"
                        required
                      />
                    </div>
                    <div className="field">
                      <ValidationMessage
                        valid={this.state.experienceValid}
                        message={this.state.errorMsg.experience}
                      />
                      <input
                        style={inbox}
                        placeholder="Experience"
                        type="number"
                        min="1"
                        max="20"
                        value={this.state.experience}
                        onChange={(e) => this.updateExperience(e.target.value)}
                        name="experience"
                        required
                      />
                    </div>
                    <div className="field">
                      <ValidationMessage
                        valid={this.state.sessionValid}
                        message={this.state.errorMsg.session}
                      />
                      <input
                        style={{
                          position: 'relative',
                          left: '270px',
                          width: '270px',
                          borderRadius: '5px',
                          top: '-46px',
                          lineHeight: '40px',
                          border: '2px solid grey',
                        }}
                        type="text"
                        minLength="3"
                        maxLength="4"
                        value={this.state.session}
                        onChange={(e) => this.updateSession(e.target.value)}
                        name="session"
                        placeholder="Fee per hour"
                        required
                      />
                    </div>
                    <div className="field">
                      <label
                        style={{
                          color: 'black',
                          display: 'flex',
                          margin: '30px 5px',
                        }}
                      >
                        Please select your profession
                      </label>
                      <input
                        style={{
                          position: 'relative',
                          right: '125px',
                          width: '270px',
                          borderRadius: '5px',
                          lineHeight: '40px',
                          border: '2px solid grey',
                        }}
                        type="radio"
                        value={this.state.profession}
                        onChange={this.onInputChange}
                        name="profession"
                        value="Teacher"
                        required
                      />
                      <span
                        style={{
                          position: 'relative',
                          right: '250px',
                          width: '270px',

                          lineHeight: '40px',
                        }}
                      >
                        Teacher
                      </span>
                    </div>
                    <div className="field">
                      <input
                        style={{
                          position: 'relative',
                          right: '110px',
                          width: '270px',
                          borderRadius: '5px',
                          lineHeight: '40px',
                          border: '2px solid grey',
                        }}
                        type="radio"
                        value={this.state.profession}
                        onChange={this.onInputChange}
                        name="profession"
                        value="Industrialist"
                        required
                      />
                      <span
                        style={{
                          position: 'relative',
                          right: '233px',
                          width: '270px',

                          lineHeight: '40px',
                        }}
                      >
                        Industrialist
                      </span>
                    </div>

                    <div className="field">
                      <label
                        style={{
                          color: 'black',
                          display: 'flex',
                          margin: '20px 5px',
                        }}
                      >
                        Please attach your experience Certificate
                      </label>
                      <input
                        placeholder="Certificate"
                        type="file"
                        onChange={this.onFileChange}
                        name="certificate"
                        required
                      />
                    </div>

                    <button
                      style={{
                        display: 'flex',
                        lineHeight: '30px',
                        justifyContent: 'center',
                        margin: '40px 0px',
                        width: '100px',
                        padding: '10px',
                        color: 'white',

                        backgroundColor: '#d7385e',
                        borderRadius: '5px',
                      }}
                      type="submit"
                      className="ui button"
                      // disabled={!this.state.formValid}
                      // onClick={(e) => this.onFormSubmit(e)}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default ProfessionalRegister;
