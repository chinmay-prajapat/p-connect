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
            backgroundColor: 'black',
            margin: '0px',
            display: 'inlinegrid',
            justifyContent: 'center',
            padding: '10px',
            textAlign: 'center',
            fontFamily: 'Lucida Console',
          }}
        >
          <div style={myCol} className="col ">
            <Link style={{ fontSize: '17px', color: 'white' }} to="/">
              Home
            </Link>
          </div>
          <div style={myCol} className="col">
            <Link style={{ fontSize: '17px', color: 'white' }} to="/register">
              Register
            </Link>
          </div>
          <div style={myCol} className="col">
            <Link style={{ fontSize: '17px', color: 'white' }} to="/inviteterm">
              Invite
            </Link>
          </div>

          <div style={myCol} className="col">
            <Link style={{ fontSize: '17px', color: 'white' }} to="/about">
              About
            </Link>
          </div>

          <div style={myCol} className="col">
            <Link style={{ fontSize: '17px', color: 'white' }} to="/login">
              Login
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}
export default Header;
