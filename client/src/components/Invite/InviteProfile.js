import React, { Component, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import decode from 'jwt-decode';

class InviteProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: '',
      user: '',
      data: [],
    };
  }
  componentDidMount() {
    axios
      .get(
        `http://localhost:5000/api/users/display/comment/${this.props.location.state.record._id}`
      )
      .then((res) => {
        console.log(res.data);
        this.setState({
          data: res.data,
        });
        console.log('Commenter', this.state.data.firstName);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    let { data, isShowingAlert } = this.state;
    return (
      <div className="container">
        <div className="row">
          {/* <h2
            style={{ textAlign: 'center', padding: '30px', fontWeight: 'bold' }}
          >
            Mentor Profile
          </h2> */}

          <div className="col-4">
            <div
              className="card shadow-lg p-3 mb-5 bg-white rounded"
              style={{
                width: '18rem',
                padding: '20px',
                margin: '10px 0px',

                // boxShadow: '20px ',
              }}
            >
              {this.state.rating ? (
                <div className="card-body">
                  <h6
                    className="card-title"
                    style={{ fontWeight: 'bold', padding: '10px 0px' }}
                  >
                    {this.props.location.state.record.firstName.toUpperCase()}
                    &nbsp;&nbsp;
                    {this.props.location.state.record.lastName.toUpperCase()}
                  </h6>
                  <h3></h3>
                  <div></div>
                  <div>
                    You rated:
                    {this.state.rating}/5
                  </div>

                  <h6 className="card-title">
                    {this.props.location.state.record.stream}
                  </h6>
                  <h6 className="card-title">
                    {this.props.location.state.record.experience}: Years of
                    experience
                  </h6>
                  <div className="card-title">
                    {this.props.location.state.record.city.toUpperCase()}
                  </div>

                  <Link
                    className="btn btn-success"
                    to={{
                      pathname: `/mentor/${this.props.location.state.record._id}/inviteform`,
                      state: {
                        mentorId: this.props.location.state.record._id,
                      },
                    }}
                  >
                    Invite
                  </Link>
                  {localStorage.getItem('token') ? (
                    <Link
                      style={{ margin: '2px' }}
                      className="btn btn-info"
                      to={{
                        pathname: `/ask/${this.props.location.state.record._id}/messagebox`,
                        state: {
                          mentorId: this.props.location.state.record._id,
                          firstName: this.props.location.state.record.firstName,
                          lastName: this.props.location.state.record.lastName,
                        },
                      }}
                    >
                      Send Message
                    </Link>
                  ) : (
                    <Link
                      style={{ margin: '0px 2px' }}
                      className="btn btn-primary"
                      to={{
                        pathname: `/login`,
                      }}
                    >
                      Login
                    </Link>
                  )}
                </div>
              ) : (
                <div>
                  <h6 className="card-title">
                    {this.props.location.state.record.firstName.toUpperCase()}

                    {this.props.location.state.record.lastName.toUpperCase()}
                  </h6>
                  <div></div>

                  <h6 className="card-title">
                    {this.props.location.state.record.stream}
                  </h6>
                  <h6 className="card-title">
                    {this.props.location.state.record.experience}
                    <p className="card-text">Years of experience</p>
                  </h6>
                  <div className="card-title">
                    {this.props.location.state.record.city.toUpperCase()}
                  </div>
                  <Link
                    className="btn btn-success"
                    to={{
                      pathname: `/inviteform/${this.props.location.state.record._id}`,
                      state: {
                        mentorId: this.props.location.state.record._id,
                      },
                    }}
                  >
                    Invite
                  </Link>
                  {localStorage.getItem('token') ? (
                    <Link
                      style={{ margin: '2px' }}
                      className="btn btn-info"
                      to={{
                        pathname: `/ask/${this.props.location.state.record._id}/messagebox`,
                        state: {
                          mentorId: this.props.location.state.record._id,
                          firstName: this.props.location.state.record.firstName,
                          lastName: this.props.location.state.record.lastName,
                        },
                      }}
                    >
                      Send Message
                    </Link>
                  ) : (
                    <Link
                      style={{ margin: '0px 2px' }}
                      className="btn btn-primary"
                      to={{
                        pathname: `/login`,
                      }}
                    >
                      Login
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="col">
            <div className="container">
              <div style={{}}>
                <table className="table">
                  <tbody>
                    <tr>
                      <th
                        scope="row"
                        style={{ color: 'red', fontWeight: 'bold' }}
                      >
                        NOTICE:
                      </th>

                      <td style={{ fontWeight: 'bold', color: '#7d5e2a' }}>
                        {this.props.location.state.record.notice}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Profession</th>

                      <td>{this.props.location.state.record.profession}</td>
                    </tr>
                    <tr>
                      <th scope="row">Teacher at:</th>

                      <td>{this.props.location.state.record.teaching}</td>
                    </tr>
                    <tr>
                      <th scope="row">Working at:</th>

                      <td>{this.props.location.state.record.working}</td>
                    </tr>
                    <tr>
                      <th scope="row">UG degree:</th>

                      <td>{this.props.location.state.record.underGraduate}</td>
                    </tr>
                    <tr>
                      <th scope="row">Studied at:</th>

                      <td>
                        {this.props.location.state.record.underGraduateCollege}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">PG degree:</th>

                      <td>{this.props.location.state.record.postGraduate}</td>
                    </tr>
                    <tr>
                      <th scope="row">Studied at:</th>

                      <td>
                        {this.props.location.state.record.postGraduateCollege}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Specialization in:</th>

                      <td>{this.props.location.state.record.specialization}</td>
                    </tr>
                    <tr>
                      <th scope="row">Per session:</th>

                      <td>₹{this.props.location.state.record.session}/-</td>
                    </tr>
                    <tr>
                      <th scope="row">More about me:</th>

                      <td>{this.props.location.state.record.bio}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="container" style={{ marginTop: 100 }}>
            <div>
              <h4
                style={{
                  textAlign: 'center',
                  padding: '10px',
                  fontWeight: 'bold',
                  backgroundColor: '#007bff',
                  color: 'white',
                  marginBottom: 0,
                }}
              >
                Feedback
              </h4>
            </div>
            <div
              className="row"
              style={{
                height: '400px',
                overflow: 'auto',
              }}
            >
              <div className="col">
                <table className="table" style={{ padding: '40px' }}>
                  <tbody>
                    {data.map((data) => (
                      <tr>
                        <td style={{ fontWeight: 'bold' }}>
                          {data.firstName.toLowerCase()}
                        </td>
                        <td style={{ fontWeight: 'bold' }}>
                          {' '}
                          {data.lastName.toLowerCase()}
                        </td>
                        <td>
                          {moment(data.Date).format('MMMM Do YYYY, h:mm:ss a')}
                        </td>
                        <td>{data.comment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default InviteProfile;
