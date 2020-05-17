import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const user = {
  backgroundColor: '#4d4c7d',
  display: 'flex',
  justifyContent: 'center',
  fontSize: '20px',
  float: 'center',
  width: '20px',
  margin: '250px 0px 0px 300px',

  padding: '30px 0px',

  borderRadius: '10px',
};

class Register extends Component {
  render() {
    return (
      <div
        className="container row no-gutters"
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div className="col-sm" style={user}>
          <Link style={{ display: 'flex', color: 'white' }} to="/uregister">
            User
          </Link>
        </div>

        <div className="col-sm" style={user}>
          <Link
            style={{
              color: 'white',
            }}
            to="/term"
          >
            Professional
          </Link>
        </div>
      </div>
    );
  }
}
export default Register;
