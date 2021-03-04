import React, { Component } from 'react';
import axios from 'axios';
import decode from 'jwt-decode';
import { Link } from 'react-router-dom';

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      data: [],
      accountConfirmation: false,
      dataLoaded: false,
      firstName: '',
      lastName: '',
      id: '',
    };
  }
  onInputChange = (e) => {
    e.persist();
    this.setState(() => ({
      [e.target.name]: e.target.value,
    }));
  };

  // hit = (token) => {
  //   if (!token) {
  //     this.props.history.push('/login');
  //   }
  // };

  componentDidMount() {
    const id = decode(localStorage.getItem('token'))._id;
    axios
      .get(`http://localhost:5000/api/users/account/${id}`)
      .then((response) => {
        this.setState({
          data: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //   const id = decode(localStorage.getItem('token'))._id;
  //   const url = 'http://localhost:5000/api/users/account/';
  //   axios.get(`${url}${id}`).then((response) => {
  //     this.setState({
  //       data: response.data,
  //       firstName: response.data.firstName,
  //       lastName: response.data.lastName,

  //       profession: response.data.profession,
  //       stream: response.data.stream,
  //       city: response.data.city,
  //       address: response.data.address,
  //       document: response.data.document,
  //       dataLoaded: true,
  //     });
  //   });
  // }

  render() {
    let { data } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div
            className="col"
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '40px',
              marginTop: '350px',
              // padding: '10px',
            }}
          >
            {/* <input
              type="text"
              name="firstName"
              value={(data.firstName, data.lastName)}
            /> */}
            {data.firstName} {data.lastName}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          {data.roles === 'user' ? (
            <Link
              className="btn btn-primary btn-lg active"
              to={{
                pathname: `/profileuser/${data._id}`,
                state: { data },
              }}
              style={{ color: 'white', fontSize: '30px' }}
            >
              Edit Profile
            </Link>
          ) : (
            <Link
              className="btn btn-primary btn-lg active"
              to={{
                pathname: `/updateProfile/${data._id}`,
                state: { data },
              }}
              style={{ color: 'white', fontSize: '30px' }}
            >
              Edit Profile
            </Link>
          )}
        </div>
      </div>
    );
  }
}
