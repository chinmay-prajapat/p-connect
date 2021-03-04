import React from 'react';
import axios from 'axios';
import decode from 'jwt-decode';
import { Redirect } from 'react-router-dom';

class UserLogin extends React.Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem('token');
    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      email: '',
      password: '',
      errors: '',
      amount: '',
      loggedIn,
      responseError: '',
    };
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email: this.state.email,
      password: this.state.password,
    };

    axios.post('/api/users/login', formData).then((response) => {
      console.log(response.data.errors);
      if (response.data.errors) {
        this.setState(() => ({
          errors: response.data.errors,
          password: '',
        }));
      } else {
        const tokenData = decode(response.data.token);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', tokenData.roles);
        console.log(response.data);
        if (tokenData.amountPaid != undefined)
          localStorage.setItem('amountPaid', tokenData.amountPaid);
        // redirect to contacts page

        this.props.history.push('/myProfile');
        // change the navigation links = update the state of isAuthenticated in the parent component
        this.props.onAuthentication(true, tokenData.roles);
      }
      // write this to localStorage
    });
  };

  handleChange = (e) => {
    e.persist();
    this.setState(() => ({
      [e.target.name]: e.target.value,
    }));
  };

  render() {
    const container = {
      width: '500px',
      margin: '90px 0px 0px 320px',
      color: 'white',
      fontSize: '18px',
      padding: '60px',
      display: 'flex',
      justifyContent: 'center',
    };

    // {
    //   this.state.loggedIn &&
    //   this.state.roles === 'user' &&
    //   this.state.amount === null ? (
    //     <Redirect to="/pay" />
    //   ) : (
    //     <Redirect to="/home" />
    //   );
    // }
    // {
    //   return <Redirect to="/userheader" />;
    // }
    return (
      <div className="container ">
        <div
          className="border border-primary shadow-lg p-3 mb-5 bg-white rounded"
          style={container}
        >
          <div className="ui equal width grid">
            <div className="row">
              <h1
                style={{
                  marginLeft: '90px ',
                  color: 'black',
                  fontWeight: 'bold',
                }}
              >
                User Login
              </h1>
              <div className="column">
                <div
                  style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    backgroundColor: 'grey',
                  }}
                  className="ui segment"
                ></div>
              </div>
            </div>
            <div className="row">
              <div className="column">
                <div className="ui segment">
                  <form className="ui form">
                    <div className="field">
                      <input
                        style={{
                          lineHeight: '40px',
                          width: '350px',
                          margin: '25px',
                        }}
                        placeholder="Email"
                        type="text"
                        value={this.state.email}
                        onChange={this.handleChange}
                        name="email"
                      />
                    </div>

                    <div className="field">
                      <input
                        style={{
                          lineHeight: '40px',
                          margin: '25px',
                          width: '350px',
                        }}
                        placeholder="Password"
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        name="password"
                      />
                    </div>
                    <div style={{ color: 'red' }}>{this.state.errors}</div>
                    <div className="row">
                      <div
                        className="col"
                        style={{ textAlign: 'center', padding: '10px' }}
                      >
                        <button
                          type="submit"
                          className="btn btn-primary"
                          onClick={this.onFormSubmit}
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserLogin;
