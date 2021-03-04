import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import decode from 'jwt-decode';

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
      allowAccess: '',
      loggedIn,
    };
  }

  componentDidMount() {
    let id = decode(localStorage.getItem('token'))._id;
    axios
      .get(`http://localhost:5000/api/users/account/${id}`)
      .then((response) => {
        this.setState({
          allowAccess: response.data.allowAccess,
        });
      });
    console.log(this.state.allowAccess);
  }

  render() {
    if (this.state.loggedIn === false) {
      return <Redirect to="userheader" />;
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
            fontFamily: 'Lucida Console',
          }}
        >
          <div style={myCol} className="col ">
            <Link style={{ fontSize: '17px', color: 'white' }} to="/feed">
              Home
            </Link>
          </div>
          <div style={myCol} className="col">
            <Link style={{ fontSize: '17px', color: 'white' }} to="/contribute">
              Contribute
            </Link>
          </div>

          <div style={myCol} className="col">
            <Link style={{ fontSize: '17px', color: 'white' }} to="/mentor">
              Mentor
            </Link>
          </div>

          <div style={myCol} className="col">
            <Link style={{ fontSize: '17px', color: 'white' }} to="/message">
              Message
            </Link>
          </div>
          {/* <div style={myCol} className="col">
            <Link style={{ fontSize: '17px', color: 'white' }} to="/feed">
              Feed
            </Link>
          </div> */}
          <div style={myCol} className="col">
            <Link
              style={{ fontSize: '17px', color: 'white' }}
              to="/professionalrequest"
            >
              Request
            </Link>
          </div>
          <div style={myCol} className="col">
            <Link style={{ fontSize: '17px', color: 'white' }} to="/highrated">
              High Rated
            </Link>
          </div>
          <div style={myCol} className="col">
            <Link style={{ fontSize: '17px', color: 'white' }} to="/myProfile">
              Profile
            </Link>
          </div>
          <div style={myCol} className="col">
            <Link style={{ fontSize: '17px', color: 'white' }} to="/about">
              About
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
export default PHeader;
