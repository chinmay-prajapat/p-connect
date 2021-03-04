import React, { Component } from 'react';
import axios from 'axios';
import decode from 'jwt-decode';
import { Redirect } from 'react-router-dom';
class AdminLogin extends Component {
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
    };
  }
  onFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email: this.state.email,
      password: this.state.password,
    };

    axios.post('/api/users/login', formData).then((response) => {
      if (response.data.errors) {
        this.setState(() => ({
          errors: response.data.errors,
          password: '',
        }));
      } else {
        // write this to localStorage
        const tokenData = decode(response.data.token);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', tokenData.roles);
        if (tokenData.amountPaid != undefined)
          localStorage.setItem('amountPaid', tokenData.amountPaid);
        // redirect to contacts page
        this.props.history.push('/adminfeed');

        // change the navigation links = update the state of isAuthenticated in the parent component
        this.props.onAuthentication(true, tokenData.roles);
      }
    });
  };

  handleChange = (e) => {
    e.persist();
    this.setState(() => ({
      [e.target.name]: e.target.value,
    }));
  };
  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/professionalheader" />;
    }
    return (
      <div
        className="container shadow-lg p-3 mb-5 bg-white rounded"
        style={{
          width: '500px',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '200px',
        }}
      >
        <form style={{}}>
          <div>
            <h1 style={{ textAlign: 'center', padding: '10px' }}>
              Admin Login
            </h1>
          </div>
          <div className="form-group ">
            <input
              type="email"
              className="form-control"
              value={this.state.email}
              name="email"
              onChange={this.handleChange}
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              className="form-control"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div style={{ padding: '10px 0px' }}>
            <button
              type="submit"
              onClick={this.onFormSubmit}
              className="btn btn-primary"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default AdminLogin;
