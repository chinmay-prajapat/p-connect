import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import decode from 'jwt-decode';
import Header from '../Header/Header';

const myStyle = { backgroundColor: '#10375c', padding: '0px' };
const myCol = {
  display: 'block',
  padding: '20px 10px',
  float: 'left',
};
class UserHeader extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem('token');
    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      loggedIn,
      amount: '',
      dataLoaded: false,
    };
  }

  // componentDidMount() {
  //   axios
  //     .get(
  //       `http://localhost:5000/api/users/account/${
  //         decode(localStorage.getItem('token'))._id
  //       }`
  //     )
  //     .then((res) => {
  //       this.setState({
  //         amount: res.data.amount,
  //         dataLoaded: true,
  //       });
  //     });
  // }
  render() {
    return (
      // this.state.loggedIn ? (
      //   this.state.dataLoaded ? (
      //     this.state.amount !== 500 ? (
      <div>
        <nav className="container-fluid" style={{ padding: '0px 0px' }}>
          <div
            className="container-fluid row"
            style={{
              backgroundColor: '#235952',
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
                to="/highrated"
              >
                High Rated
              </Link>
            </div>
            <div style={myCol} className="col">
              <Link
                style={{ fontSize: '17px', color: 'white' }}
                to="/myProfile"
              >
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
      </div>
    );
  }
}
export default UserHeader;
