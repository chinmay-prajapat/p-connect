import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const myStyle = { backgroundColor: '#d8345f', padding: '0px' };
const myCol = {
  display: 'block',
  padding: '10px 10px',
  float: 'left',
};
class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav className="container-fluid" style={{ padding: '0px 0px' }}>
        <div
          className="container-fluid row"
          style={{
            backgroundColor: '#d8345f',
            margin: '0px',
            display: 'inlinegrid',
            justifyContent: 'center',
            padding: '0px',
            textAlign: 'center',
          }}
        >
          <div style={myCol} className="col ">
            <Link style={{ fontSize: '20px', color: 'white' }} to="/home">
              Home
            </Link>
          </div>
          <div style={myCol} className="col">
            <Link style={{ fontSize: '20px', color: 'white' }} to="/register">
              Register
            </Link>
          </div>
          <div style={myCol} className="col">
            <Link style={{ fontSize: '20px', color: 'white' }} to="/mentor">
              Invite
            </Link>
          </div>
          <div style={myCol} className="col">
            <Link style={{ fontSize: '20px', color: 'white' }} to="/about">
              About
            </Link>
          </div>

          <div style={myCol} className="col">
            <Link style={{ fontSize: '20px', color: 'white' }} to="/login">
              Login
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}
export default Header;
