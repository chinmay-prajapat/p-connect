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
      loggedIn,
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
        // redirect to contacts page
        this.props.history.push('/userheader');
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
    const container = {
      background: '#698474',
      width: '500px',
      margin: '90px 0px 0px 320px',
      color: 'white',
      fontSize: '18px',
      padding: '60px',
      display: 'flex',
      justifyContent: 'center',
      borderRadius: '10px',
    };
    if (this.state.loggedIn) {
      return <Redirect to="/userheader" />;
    }
    return (
      <div className="container">
        <h1 style={{ textAlign: 'center', margin: '35px 0px' }}>User Login</h1>
        <div style={container}>
          <div className="ui equal width grid">
            <div className="row">
              <div className="column">
                <div
                  style={{ fontWeight: 'bold', textAlign: 'center' }}
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
                          borderRadius: '5px',
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

                    <button
                      style={{
                        display: 'flex',
                        lineHeight: '30px',
                        justifyContent: 'center',
                        margin: '25px',
                        width: '100px',
                        padding: '10px',
                        color: 'white',

                        backgroundColor: '#000839',
                        borderRadius: '5px',
                      }}
                      type="submit"
                      className="ui button"
                      onClick={this.onFormSubmit}
                    >
                      Login
                    </button>
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
