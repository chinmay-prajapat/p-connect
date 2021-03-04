import React, { Component } from 'react';
import axios from 'axios';
import myImage from '../Image/professional.gif';
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
  updateCity = (city) => {
    this.setState({ city }, this.validateCity);
  };

  validateCity = () => {
    const { city } = this.state;
    let cityValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (city.length < 3) {
      cityValid = false;
      errorMsg.city = 'Must be at least 3 characters long';
    } else if (!/^[a-zA-Z]+$/.test(city)) {
      cityValid = false;
      errorMsg.city = 'Must be alphabets';
    }
    this.setState({ cityValid, errorMsg }, this.validateForm);
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
      <option key="2" value="Bachelor of Architecture - B.Arch">
        Bachelor of Architecture - B.Arch
      </option>,
      <option key="3" value="Bachelor of Arts - B.A.">
        Bachelor of Arts - B.A.
      </option>,
      <option
        key="4"
        value="Bachelor of Ayurvedic Medicine & Surgery - B.A.M.S."
      >
        Bachelor of Ayurvedic Medicine & Surgery - B.A.M.S.
      </option>,
      <option key="5" value="Bachelor of Business Administration - B.B.A.">
        Bachelor of Business Administration - B.B.A.
      </option>,
      <option key="6" value="Bachelor of Commerce - B.Com.">
        Bachelor of Commerce - B.Com.
      </option>,
      <option key="7" value="Bachelor of Computer Applications - B.C.A.">
        Bachelor of Computer Applications - B.C.A.
      </option>,
      <option key="8" value="Bachelor of Dental Surgery - B.D.S.">
        Bachelor of Dental Surgery - B.D.S.
      </option>,
      <option key="9" value="Bachelor of Design - B.Des. / B.D.">
        Bachelor of Design - B.Des. / B.D.
      </option>,
      <option key="10" value="Bachelor of Education - B.Ed.">
        Bachelor of Education - B.Ed.
      </option>,
      <option
        key="11"
        value="Bachelor of Engineering / Bachelor of Technology - B.E./B.Tech."
      >
        Bachelor of Engineering / Bachelor of Technology - B.E./B.Tech.
      </option>,
      <option key="12" value="Bachelor of Fine Arts - BFA / BVA">
        Bachelor of Fine Arts - BFA / BVA
      </option>,
      <option
        key="13"
        value="Bachelor of Fisheries Science - B.F.Sc./ B.Sc. (Fisheries)."
      >
        Bachelor of Fisheries Science - B.F.Sc./ B.Sc. (Fisheries).
      </option>,
      <option key="14" value="Bachelor of Laws - L.L.B.">
        Bachelor of Laws - L.L.B.
      </option>,
      <option key="15" value="Bachelor of Library Science - B.Lib. / B.Lib.Sc.">
        Bachelor of Library Science - B.Lib. / B.Lib.Sc.
      </option>,
      <option
        key="16"
        value="Bachelor of Mass Communications - B.M.C. / B.M.M."
      >
        Bachelor of Mass Communications - B.M.C. / B.M.M.
      </option>,
      <option
        key="17"
        value="Bachelor of Medicine and Bachelor of Surgery - M.B.B.S.
                 "
      >
        Bachelor of Medicine and Bachelor of Surgery - M.B.B.S.
      </option>,
      <option key="18" value="Bachelor of Nursing">
        Bachelor of Nursing
      </option>,
      <option key="19" value="Bachelor of Pharmacy - B.Pharm / B.Pharma.">
        Bachelor of Pharmacy - B.Pharm / B.Pharma.
      </option>,
      <option key="20" value="Bachelor of Physical Education - B.P.Ed.">
        Bachelor of Physical Education - B.P.Ed.
      </option>,
      <option key="21" value="Bachelor of Physiotherapy - B.P.T.">
        Bachelor of Physiotherapy - B.P.T.
      </option>,
      <option key="22" value="Bachelor of Science - B.Sc.">
        Bachelor of Science - B.Sc.
      </option>,
      <option key="23" value="Bachelor of Social Work - BSW / B.A. (SW)">
        Bachelor of Social Work - BSW / B.A. (SW)
      </option>,
      <option
        key="24"
        value="Bachelor of Veterinary Science & Animal Husbandry - B.V.Sc. & A.H. / B.V.Sc"
      >
        Bachelor of Veterinary Science & Animal Husbandry - B.V.Sc. & A.H. /
        B.V.Sc
      </option>,
      <option key="25" value="Doctor of Medicine - M.D.">
        Doctor of Medicine - M.D.
      </option>,
      <option
        key="26"
        value="Doctor of Medicine in Homoeopathy - M.D. (Homoeopathy)"
      >
        Doctor of Medicine in Homoeopathy - M.D. (Homoeopathy)
      </option>,
      <option key="27" value="Doctor of Pharmacy - Pharm.D">
        Doctor of Pharmacy - Pharm.D
      </option>,
      <option key="28" value="Doctor of Philosophy - Ph.D. ">
        Doctor of Philosophy - Ph.D.
      </option>,
      <option key="29" value="Doctorate of Medicine - D.M.">
        Doctorate of Medicine - D.M.
      </option>,
      <option key="30" value="Master of Architecture - M.Arch.">
        Master of Architecture - M.Arch.
      </option>,
      <option key="31" value="Master of Arts - M.A.">
        Master of Arts - M.A.
      </option>,
      <option key="32" value="Master of Business Administration - M.B.A.">
        Master of Business Administration - M.B.A.
      </option>,
      <option
        key="33"
        value="Master of Chirurgiae - M.Ch.
                                 "
      >
        Master of Chirurgiae - M.Ch.
      </option>,
      <option key="34" value="Master of Commerce - M.Com.">
        Master of Commerce - M.Com.
      </option>,
      <option key="35" value="Master of Computer Applications - M.C.A.">
        Master of Computer Applications - M.C.A.
      </option>,
      <option key="36" value="Master of Dental Surgery - M.D.S.">
        Master of Dental Surgery - M.D.S.
      </option>,
      <option key="37" value="Master of Design - M.Des./ M.Design.">
        Master of Design - M.Des./ M.Design.
      </option>,
      <option key="38" value="Master of Education - M.Ed.">
        Master of Education - M.Ed.
      </option>,
      <option
        key="39"
        value="Master of Engineering / Master of Technology - M.E./ M.Tech."
      >
        Master of Engineering / Master of Technology - M.E./ M.Tech.
      </option>,
      <option key="40" value="Master of Fine Arts - MFA / MVA">
        Master of Fine Arts - MFA / MVA
      </option>,
      <option key="41" value="Master of Laws - L.L.M.">
        Master of Laws - L.L.M.
      </option>,
      <option key="42" value="Master of Library Science - M.Lib./ M.Lib.Sc.">
        Master of Library Science - M.Lib./ M.Lib.Sc.
      </option>,
      <option
        key="43"
        value="Master of Mass Communications / Mass Media - M.M.C / M.M.M."
      >
        Master of Mass Communications / Mass Media - M.M.C / M.M.M.
      </option>,
      <option key="44" value="Master of Pharmacy - M.Pharm">
        Master of Pharmacy - M.Pharm
      </option>,
      <option key="45" value="Master of Philosophy - M.Phil.  ">
        Master of Philosophy - M.Phil.
      </option>,
      <option key="46" value="Master of Physical Education M.P.Ed. / M.P.E.">
        Master of Physical Education M.P.Ed. / M.P.E.
      </option>,
      <option key="47" value="Master of Physiotherapy - M.P.T.">
        Master of Physiotherapy - M.P.T.
      </option>,
      <option key="48" value="Master of Science - M.Sc.">
        Master of Science - M.Sc.
      </option>,
      <option
        key="49"
        value="Master of Social Work / Master of Arts in Social Work - M.S.W. / M.A. (SW)"
      >
        Master of Social Work / Master of Arts in Social Work - M.S.W. / M.A.
        (SW)
      </option>,
      <option
        key="50"
        value="Master of Science in Agriculture - M.Sc. (Agriculture)"
      >
        Master of Science in Agriculture - M.Sc. (Agriculture)
      </option>,
      <option key="51" value="Master of Surgery - M.S.">
        Master of Surgery - M.S.
      </option>,
      <option key="52" value="Master of Veterinary Science - M.V.Sc.">
        Master of Veterinary Science - M.V.Sc.
      </option>,
    ];

    return (
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'right',
        }}
      >
        <div style={{ marginTop: '100px' }}>
          <img style={{ top: '100px' }} src={myImage} alt="Computer" />
        </div>
        <form onSubmit={(e) => this.onFormSubmit(e)}>
          <div
            className="shadow p-3 mb-5 bg-white rounded  border border-primary"
            style={{
              width: 550,
              marginTop: '20px',
            }}
          >
            <div className="row">
              <div className="col-sm-6 my-3">
                <input
                  placeholder="First Name"
                  type="text"
                  className="form-control"
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
                <ValidationMessage
                  valid={this.state.streamValid}
                  message={this.state.errorMsg.stream}
                />
                <select
                  className="form-control"
                  name="stream"
                  value={this.state.stream}
                  onChange={(e) => this.updateStream(e.target.value)}
                  required
                >
                  <option value="">Stream</option>
                  {stream}
                </select>
              </div>
              <div className="col-sm-6 my-3">
                <input
                  placeholder="City"
                  className="form-control"
                  type="text"
                  value={this.state.city}
                  onChange={(e) => this.updateCity(e.target.value)}
                  name="city"
                  required
                />

                <ValidationMessage
                  valid={this.state.cityValid}
                  message={this.state.errorMsg.city}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12 my-3">
                <input
                  placeholder="Email"
                  className="form-control"
                  type="text"
                  value={this.state.email}
                  onChange={(e) => this.updateEmail(e.target.value)}
                  name="email"
                  required
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
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
                  maxLength="10"
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
              <div className="col-6 my-3">
                <input
                  placeholder="Password"
                  className="form-control"
                  type="password"
                  value={this.state.password}
                  onChange={(e) => this.updatePassword(e.target.value)}
                  name="password"
                  required
                />
                <ValidationMessage
                  valid={this.state.passwordValid}
                  message={this.state.errorMsg.password}
                />
              </div>
              <div className="col-6 my-3">
                <input
                  placeholder="Repeat Password"
                  type="password"
                  className="form-control"
                  value={this.state.repeatPassword}
                  onChange={(e) => this.updateRepeatPassword(e.target.value)}
                  name="repeatPassword"
                  required
                />
                <ValidationMessage
                  valid={this.state.repeatPasswordValid}
                  message={this.state.errorMsg.repeatPassword}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-6 my-3">
                <input
                  placeholder="Experience"
                  className="form-control"
                  // type="number"
                  // min="1"
                  // maxLength="2"
                  type="text"
                  pattern="\d*"
                  maxlength="2"
                  value={this.state.experience}
                  onChange={(e) => this.updateExperience(e.target.value)}
                  name="experience"
                  required
                />
                <ValidationMessage
                  valid={this.state.experienceValid}
                  message={this.state.errorMsg.experience}
                />
              </div>
              <div className="col-6 my-3">
                <input
                  type="text"
                  minLength="3"
                  className="form-control"
                  maxLength="4"
                  value={this.state.session}
                  onChange={(e) => this.updateSession(e.target.value)}
                  name="session"
                  placeholder="Fee per hour"
                  required
                />
                <ValidationMessage
                  valid={this.state.sessionValid}
                  message={this.state.errorMsg.session}
                />
              </div>
            </div>

            <div className="row">
              <div class="col-sm-10 my-3">
                <label>Please select your profession:-</label>
                <div class="form-check">
                  <input
                    type="radio"
                    value={this.state.profession}
                    className="form-check-input"
                    onChange={this.onInputChange}
                    name="profession"
                    value="Teacher"
                    required
                  />
                  <label class="form-check-label" htmlFor="Teacher">
                    Teacher
                  </label>
                </div>
                <div class="form-check">
                  <input
                    type="radio"
                    class="form-check-input"
                    value={this.state.profession}
                    onChange={this.onInputChange}
                    name="profession"
                    value="Industrialist"
                    required
                  />
                  <label class="form-check-label" htmlFor="Industrialist">
                    Industrialist
                  </label>
                </div>

                {/* <div className="col-3 my-3" >
                <label>Please select your profession</label>
                <input
                  type="radio"
                  value={this.state.profession}
                  className="form-control"
                  onChange={this.onInputChange}
                  name="profession"
                  value="Teacher"
                  required
                />
                <span>Teacher</span>
              </div>
              <div className="row">
                <div className="col-3 my-3">
                  <input
                    type="radio"
                    className="form-control"
                    value={this.state.profession}
                    onChange={this.onInputChange}
                    name="profession"
                    value="Industrialist"
                    required
                  />
                  <span>Industrialist</span>
                </div>
              </div> */}
              </div>
            </div>

            <div className="row">
              <div className="col-6 my-3">
                <label>Please attach your experience Certificate:-</label>
                <input
                  style={{ margin: '10px 0px' }}
                  placeholder="Certificate"
                  type="file"
                  onChange={this.onFileChange}
                  name="certificate"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col ">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default ProfessionalRegister;
