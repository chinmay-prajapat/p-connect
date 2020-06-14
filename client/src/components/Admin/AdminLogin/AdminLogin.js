import React, { Component } from 'react';
import axios from 'axios';
import decode from 'jwt-decode';
class AdminLogin extends Component {
  constructor(props) {
    super(props);
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

    axios.post('/api/admin/login', formData).then((response) => {
      if (response.data.errors) {
        this.setState(() => ({
          errors: response.data.errors,
          password: '',
        }));
        console.log('Hello Admin');
      } else {
        // write this to localStorage
        const tokenData = decode(response.data.token);
        console.log('My admin', tokenData);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', tokenData.roles);
        // if (tokenData.amountPaid != undefined)
        //   localStorage.setItem('amountPaid', tokenData.amountPaid);
        // redirect to contacts page
        this.props.history.push('/profileRequest');

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
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
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
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default AdminLogin;
