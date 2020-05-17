import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const myStyle = { backgroundColor: '#d8345f', padding: '0px' };
const myCol = {
  display: 'block',
  padding: '10px 10px',
  float: 'left',
};
class AHeader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav className="container-fluid" style={{ padding: '0px 0px' }}>
        <div
          className="container-fluid row"
          style={{
            backgroundColor: '#10375c',
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
            <Link
              style={{ fontSize: '20px', color: 'white' }}
              to="/transcation"
            >
              Transcation
            </Link>
          </div>
          <div style={myCol} className="col">
            <Link
              style={{ fontSize: '20px', color: 'white' }}
              to="/adminMessage"
            >
              Message
            </Link>
          </div>
          <div style={myCol} className="col">
            <Link
              style={{ fontSize: '20px', color: 'white' }}
              to="/profileRequest"
            >
              Request
            </Link>
          </div>
          <div style={myCol} className="col">
            <Link style={{ fontSize: '20px', color: 'white' }} to="/subscriber">
              Subscriber
            </Link>
          </div>
          <div style={myCol} className="col">
            <Link style={{ fontSize: '20px', color: 'white' }} to="/mentor">
              Mentor
            </Link>
          </div>

          <div style={myCol} className="col">
            <Link style={{ fontSize: '20px', color: 'white' }} to="/logout">
              Logout
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}
export default AHeader;
