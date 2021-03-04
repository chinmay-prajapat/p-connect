import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const myStyle = { backgroundColor: '#d8345f', padding: '0px' };
const myCol = {
  display: 'block',
  padding: '20px 10px',
  float: 'left',
};
class AHeader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav
        className="container-fluid"
        style={{ padding: '0px 0px', borderRadius: '30px' }}
      >
        <div
          className="container-fluid row"
          style={{
            backgroundColor: '#e84a5f',
            margin: '0px',

            display: 'inlinegrid',
            justifyContent: 'center',
            padding: '0px',
            textAlign: 'center',
            fontFamily: 'Lucida Console',
          }}
        >
          <div style={myCol} className="col ">
            <Link style={{ fontSize: '17px', color: 'white' }} to="/adminfeed">
              Home
            </Link>
          </div>
          <div style={myCol} className="col">
            <Link style={{ fontSize: '17px', color: 'white' }} to="/highrated">
              High Rated
            </Link>
          </div>
          {/* <div style={myCol} className="col">
            <Link style={{ fontSize: '17px', color: 'white' }} to="/session">
              Session
            </Link>
          </div> */}
          <div style={myCol} className="col">
            <Link style={{ fontSize: '17px', color: 'white' }} to="/allowed">
              Active
            </Link>
          </div>

          <div style={myCol} className="col">
            <Link
              style={{ fontSize: '17px', color: 'white' }}
              to="/profileRequest"
            >
              Request
            </Link>
          </div>
          <div style={myCol} className="col">
            <Link style={{ fontSize: '17px', color: 'white' }} to="/subscriber">
              Subscriber
            </Link>
          </div>
          <div style={myCol} className="col">
            <Link
              style={{ fontSize: '17px', color: 'white' }}
              to="/nsubscriber"
            >
              N-Subscriber
            </Link>
          </div>
          <div style={myCol} className="col">
            <Link style={{ fontSize: '17px', color: 'white' }} to="/mentor">
              Mentor
            </Link>
          </div>
          <div style={myCol} className="col">
            <Link
              style={{ fontSize: '17px', color: 'white' }}
              to="/adminMessage"
            >
              Message
            </Link>
          </div>

          <div style={myCol} className="col">
            <Link style={{ fontSize: '17px', color: 'white' }} to="/logout">
              Logout
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}
export default AHeader;
