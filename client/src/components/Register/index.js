import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import myImage from '../Image/signup.png';
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
      // style={{
      //   backgroundImage: `url(${myImage})`,
      //   backgroundPosition: 'center',
      //   backgroundSize: 'cover',
      //   backgroundRepeat: 'no-repeat',
      // }}
      <body
        style={{
          backgroundImage: `url(${myImage})`,
          backgroundSize: 'cover',
          padding: '20px',
          overflowY: 'hidden',
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col" style={{ top: '30px' }}>
              <h1
                style={{
                  textAlign: 'center',
                  fontSize: '60px',
                  padding: '28px',
                  fontWeight: 'bold',
                  color: 'black',
                }}
              >
                Signup
              </h1>
            </div>
          </div>
          <div
            className="row"
            style={{
              textAlign: 'center',
              margin: '250px  ',
              fontSize: '27px',
            }}
          >
            <div className="col" style={{ bottom: '22px' }}>
              <Link
                style={{ fontWeight: 'bold' }}
                className="btn btn-dark"
                to="/userterm"
              >
                User
              </Link>
            </div>

            <div className="col " style={{ bottom: '22px' }}>
              <Link
                style={{ fontWeight: 'bold' }}
                className="btn btn-dark"
                to="/term"
              >
                Professional
              </Link>
            </div>
          </div>
        </div>
      </body>
    );
  }
}
export default Register;
