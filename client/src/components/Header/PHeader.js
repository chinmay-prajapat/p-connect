import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

const myStyle = { backgroundColor: '#d8345f', padding: '0px' };
const myCol = {
  display: 'block',
  padding: '20px 10px',
  float: 'left',
};
class PHeader extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem('token');
    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      loggedIn,
    };
  }
  render() {
    if (this.state.loggedIn === false) {
      return <Redirect to="/professionalheader" />;
    }
    return (
      <nav
        className="container-fluid"
        style={{ padding: '0px 0px', borderRadius: '30px' }}
      >
        <div
          className="container-fluid row"
          style={{
            backgroundColor: 'black',
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
            <Link style={{ fontSize: '20px', color: 'white' }} to="/contribute">
              Contribute
            </Link>
          </div>
          <div style={myCol} className="col">
            <Link
              style={{ fontSize: '20px', color: 'white' }}
              to="/professionalfollower"
            >
              Follower
            </Link>
          </div>
          <div style={myCol} className="col">
            <Link style={{ fontSize: '20px', color: 'white' }} to="/mentor">
              Mentor
            </Link>
          </div>

          <div style={myCol} className="col">
            <Link style={{ fontSize: '20px', color: 'white' }} to="/message">
              Message
            </Link>
          </div>
          <div style={myCol} className="col">
            <Link style={{ fontSize: '20px', color: 'white' }} to="/feed">
              Feed
            </Link>
          </div>
          <div style={myCol} className="col">
            <Link
              style={{ fontSize: '20px', color: 'white' }}
              to="/professionalrequest"
            >
              Request
            </Link>
          </div>
          <div style={myCol} className="col">
            <Link style={{ fontSize: '20px', color: 'white' }} to="/highrated">
              High Rated
            </Link>
          </div>
          <div style={myCol} className="col">
            <Link style={{ fontSize: '20px', color: 'white' }} to="/myProfile">
              Profile
            </Link>
          </div>
          <div style={myCol} className="col">
            <Link style={{ fontSize: '20px', color: 'white' }} to="/about">
              About
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
export default PHeader;
