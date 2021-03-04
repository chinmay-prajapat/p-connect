import React, { Component, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import decode from 'jwt-decode';
import Comment from '../Comment/Comment';
// import StarRating from 'react-star-rating';
import StarRating from '../Users/UserProfiles/Rating';

class HighRate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: '',
      user: '',
      record: '',
      data: [],
    };
    console.log('my id', this.props.match.params.id);
  }

  componentDidMount() {
    const ratingGiver = decode(localStorage.getItem('token'))._id;
    const ratingReciever = this.props.match.params.id;

    axios
      .get(
        `http://localhost:5000/api/users/account/${this.props.match.params.id}`
      )
      .then((res) => {
        console.log(res.data);
        this.setState({
          record: res.data,
        });
        console.log('mydata', this.state.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(
        `http://localhost:5000/api/rating/fetchrating/${ratingGiver}/${ratingReciever}`
      )
      .then((res) => {
        console.log(res.data.rating);
        this.setState({ rating: res.data.rating });
      });
    axios
      .get(
        `http://localhost:5000/api/users/display/comment/${this.props.match.params.id}`
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
    let { record, isShowingAlert, data } = this.state;
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
                    {record.firstName}
                    &nbsp;&nbsp;
                    {record.lastName}
                  </h6>
                  <h3></h3>
                  <div>
                    <StarRating
                      rating={this.state.rating}
                      mentorId={record._id}
                    />
                  </div>
                  <div>
                    You rated:
                    {this.state.rating}/5
                  </div>

                  <h6 className="card-title">{record.stream}</h6>
                  <h6 className="card-title">
                    {record.experience}: Years of experience
                  </h6>
                  <div className="card-title">{record.city}</div>

                  <Link
                    className="btn btn-success"
                    to={{
                      pathname: `/mentor/${record._id}/inviteform`,
                      state: {
                        mentorId: record._id,
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
                        pathname: `/ask/${record._id}/messagebox`,
                        state: {
                          mentorId: record._id,
                          firstName: record.firstName,
                          lastName: record.lastName,
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
                    {record.firstName}

                    {record.lastName}
                  </h6>
                  <div>
                    <StarRating mentorId={record._id} />
                  </div>

                  <h6 className="card-title">{record.stream}</h6>
                  <h6 className="card-title">
                    {record.experience}
                    <p className="card-text">Years of experience</p>
                  </h6>
                  <div className="card-title">{record.city}</div>
                  <Link
                    className="btn btn-success"
                    to={{
                      pathname: `/mentor/${record._id}/inviteform`,
                      state: {
                        mentorId: record._id,
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
                        pathname: `/ask/${record._id}/messagebox`,
                        state: {
                          mentorId: record._id,
                          firstName: record.firstName,
                          lastName: record.lastName,
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
            <Link
              className="btn btn-warning"
              to={{
                pathname: `/getownfeed/${record._id}`,
                state: {
                  mentorId: record._id,
                },
              }}
            >
              My Feed
            </Link>
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
                        {record.notice}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Profession:</th>

                      <td>{record.profession}</td>
                    </tr>
                    <tr>
                      <th scope="row">Stream:</th>

                      <td>{record.stream}</td>
                    </tr>
                    <tr>
                      <th scope="row">Teacher at:</th>

                      <td>{record.teaching}</td>
                    </tr>
                    <tr>
                      <th scope="row">Working at:</th>

                      <td>{record.working}</td>
                    </tr>
                    <tr>
                      <th scope="row">UG degree:</th>

                      <td>{record.underGraduate}</td>
                    </tr>
                    <tr>
                      <th scope="row">Studied at:</th>

                      <td>{record.underGraduateCollege}</td>
                    </tr>
                    <tr>
                      <th scope="row">PG degree:</th>

                      <td>{record.postGraduate}</td>
                    </tr>
                    <tr>
                      <th scope="row">Studied at:</th>

                      <td>{record.postGraduateCollege}</td>
                    </tr>
                    <tr>
                      <th scope="row">Specialization in:</th>

                      <td>{record.specialization}</td>
                    </tr>
                    <tr>
                      <th scope="row">Per session:</th>

                      <td>₹{record.session}/-</td>
                    </tr>
                    <tr>
                      <th scope="row">More about me:</th>

                      <td>{record.bio}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <Comment mentorId={record._id}></Comment>
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
                <table
                  className="table shadow-lg p-1 mb-5 bg-white rounded "
                  style={{ padding: '40px' }}
                >
                  <tbody>
                    {data.map((data) => (
                      <tr>
                        <td>
                          {moment(data.Date).format('MMMM Do YYYY, h:mm:ss a')}
                        </td>
                        <td style={{ fontWeight: 'bold' }}>
                          {data.firstName.toLowerCase()}&nbsp;
                          {data.lastName.toLowerCase()}
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
export default HighRate;
