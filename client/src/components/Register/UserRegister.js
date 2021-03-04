import React from 'react';
import axios from 'axios';
import myImage from '../Image/home.gif';
function ValidationMessage(props) {
  if (!props.valid) {
    return (
      <div
        style={{
          color: 'red',
          fontSize: '10px',
          marginBottom: '20px',
        }}
        className="error-msg m-0"
      >
        {props.message}
      </div>
    );
  }
  return null;
}
const inbox = {
  display: 'flex',
  lineHeight: '40px ',
  width: '270px',
  border: '2px solid grey',
  borderRadius: '5px',
};

class UserRegister extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      repeatPassword: '',
      firstNameValid: false,
      lastNameValid: false,
      emailValid: false,
      phoneValid: false,
      passwordValid: false,
      repeatPassword: false,
      formValid: false,
      errorMsg: [],
      errorRegister: [],
      // data: [],
      // isLoaded: false,
    };
  }
  validateForm = () => {
    const {
      firstNameValid,
      lastNameValid,
      emailValid,
      phoneValid,
      passwordValid,
      repeatPasswordValid,
    } = this.state;
    this.setState({
      formValid:
        firstNameValid &&
        lastNameValid &&
        phoneValid &&
        emailValid &&
        passwordValid &&
        repeatPasswordValid,
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
  updatePhone = (phone) => {
    this.setState({ phone }, this.validatePhone);
  };
  validatePhone = () => {
    const { phone } = this.state;
    let phoneValid = true;
    let errorMsg = { ...this.state.errorMsg };
    if (!/^[6-9][0-9]{9}/.test(phone)) {
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
  // componentDidMount() {
  //   axios.get('http://localhost:5000/api/users/account').then((response) => {
  //     this.setState({ data: response.data, isLoaded: true });
  //   });
  // }

  onFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password,
      repeatPassword: this.state.repeatPassword,
    };

    axios
      .post('http://localhost:5000/api/users/register', formData)
      .then((response) => {
        this.props.history.push('/ulogin');

        const myEmail = {
          email: this.state.email,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
        };
        console.log(myEmail);
        axios
          .post('/api/users/userRegister', myEmail)
          .then((res) => {
            console.log('Email send');
          })
          .catch((err) => {
            console.log(err);
          });
        console.log(response.data);
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
    console.log('Error Register', this.state.errorRegister);
    return (
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'right',

          margin: '20px',
          marginLeft: '200px',
        }}
      >
        <div style={{ marginTop: '10px', marginRight: '50px' }}>
          <img src={myImage} alt="Computer" />
        </div>
        {/* <div
          className="container "
          style={{ textAlign: 'center', width: '300px' }}
        >
          <div className=" shadow-lg p-3 mb-5 bg-white rounded border border-primary">
            <h1 style={{ fontWeight: 'bold' }}>User Signup</h1>
          </div>
        </div> */}
        <div
          className="shadow p-3 mb-5 bg-white rounded  border border-primary"
          style={{
            marginTop: 50,
            width: 700,

            padding: 20,
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
              />
              <ValidationMessage
                valid={this.state.firstNameValid}
                message={this.state.errorMsg.firstName}
              />
            </div>

            <div className="col-sm-6 my-3">
              <input
                placeholder="Last Name"
                type="text"
                className="form-control"
                value={this.state.lastName}
                onChange={(e) => this.updateLastName(e.target.value)}
                name="lastName"
              />
              <ValidationMessage
                valid={this.state.lastNameValid}
                message={this.state.errorMsg.lastName}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 my-1 ">
              <input
                placeholder="Email"
                type="email"
                className="form-control"
                value={this.state.email}
                onChange={(e) => this.updateEmail(e.target.value)}
                name="email"
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
              <p>{this.state.errorRegister}</p>
              <ValidationMessage
                valid={this.state.emailValid}
                message={this.state.errorMsg.email}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 my-2">
              <input
                minLength="10"
                maxLength="10"
                placeholder="Phone Number"
                type="text"
                className="form-control"
                value={this.state.phone}
                onChange={(e) => this.updatePhone(e.target.value)}
                name="phone"
              />
              <ValidationMessage
                valid={this.state.phoneValid}
                message={this.state.errorMsg.phone}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 my-3 ">
              <input
                // style={inbox}
                placeholder="Password"
                type="password"
                className="form-control"
                value={this.state.password}
                onChange={(e) => this.updatePassword(e.target.value)}
                name="password"
              />
              <ValidationMessage
                valid={this.state.passwordValid}
                message={this.state.errorMsg.password}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 my-2">
              <input
                // style={inbox}
                placeholder="Password"
                type="password"
                className="form-control"
                value={this.state.repeatPassword}
                onChange={(e) => this.updateRepeatPassword(e.target.value)}
                name="repeatPassword"
              />
              <ValidationMessage
                valid={this.state.repeatPasswordValid}
                message={this.state.errorMsg.repeatPassword}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 my-3">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!this.state.formValid}
                onClick={(e) => this.onFormSubmit(e)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default UserRegister;

// <div className="row">
//             <h1>User Register</h1>

//           <div
//             className="row"
//             style={{
//               background: '#596157',
//               width: '700px',
//               display: 'flex',

//               // margin: '40px 0px 0px 0px',
//               color: 'white',
//               fontSize: '18px',
//               padding: '60px',

//               borderRadius: '10px',
//             }}
//
//

//
//                   <div >
//
//                   </div>
//                   <div >
//                     <input
//                       style={{
//                         position: 'relative',
//                         left: '300px',
//                         top: '-46px',
//                         width: '270px',
//                         borderRadius: '5px',
//                         lineHeight: '40px',
//                       }}
//                       placeholder="Repeat Password"
//                       type="password"
//                       value={this.state.Repeat_Password}
//                       onChange={this.handleChange}
//                       name="repeatpassword"
//                     />
//                   </div>

//                   <button
//                     style={{
//                       display: 'flex',
//                       lineHeight: '30px',
//                       justifyContent: 'center',
//                       margin: '10px 0px',
//                       width: '100px',
//                       padding: '10px',
//                       color: 'white',

//                       backgroundColor: '#d7385e',
//                       borderRadius: '5px',
//                     }}
//                     type="submit"
//                     className="ui button"
//                     onClick={(e) => this.handleSubmit(e)}
//                   >
//                     Submit
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
