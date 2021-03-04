import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import myImage from '../Image/try3.jpeg';

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

class Login extends Component {
  render() {
    return (
      <body
        style={{
          backgroundImage: `url(${myImage})`,
          backgroundColor: 'black',
          backgroundSize: 'cover',
          padding: '45px',
        }}
      >
        <div className="container">
          <div className="row ">
            <div className="col" style={{ top: '30px' }}>
              <h1
                style={{
                  textAlign: 'center',
                  fontSize: '60px',
                  padding: '5px',
                  fontWeight: 'bold',
                  color: 'black',
                }}
              >
                Login
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
            <div className="col">
              <Link
                style={{
                  fontWeight: 'bold',

                  color: 'white',
                }}
                className="btn btn-dark"
                to="/ulogin"
              >
                User
              </Link>
            </div>

            <div className="col">
              <Link
                style={{ fontWeight: 'bold' }}
                className="btn btn-dark"
                to="/plogin"
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
export default Login;
