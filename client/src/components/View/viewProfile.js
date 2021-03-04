import React, { Component, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import decode from 'jwt-decode';
import Comment from '../Comment/Comment';
// import StarRating from 'react-star-rating';
import StarRating from '../Users/UserProfiles/Rating';

class viewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: '',
      user: '',
      data: [],
    };
  }
  componentDidMount() {
    const ratingGiver = decode(localStorage.getItem('token'))._id;
    const ratingReciever = this.props.location.state.data.contributer._id;

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
        `http://localhost:5000/api/users/display/comment/${this.props.location.state.data.contributer._id}`
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
                    {this.props.location.state.data.contributer.firstName.toUpperCase()}
                    &nbsp;&nbsp;
                    {this.props.location.state.data.contributer.lastName.toUpperCase()}
                  </h6>
                  <h3></h3>
                  <div>
                    <StarRating
                      rating={this.state.rating}
                      mentorId={this.props.location.state.data.contributer._id}
                    />
                  </div>
                  <div>
                    You rated:
                    {this.state.rating}/5
                  </div>

                  <h6 className="card-title">
                    {this.props.location.state.data.contributer.stream}
                  </h6>
                  <h6 className="card-title">
                    {this.props.location.state.data.contributer.experience}:
                    Years of experience
                  </h6>
                  <div className="card-title">
                    {this.props.location.state.data.contributer.city.toUpperCase()}
                  </div>

                  <Link
                    className="btn btn-success"
                    to={{
                      pathname: `/mentor/${this.props.location.state.data.contributer._id}/inviteform`,
                      state: {
                        mentorId: this.props.location.state.data.contributer
                          ._id,
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
                        pathname: `/ask/${this.props.location.state.data.contributer._id}/messagebox`,
                        state: {
                          mentorId: this.props.location.state.data.contributer
                            ._id,
                          firstName: this.props.location.state.data.contributer
                            .firstName,
                          lastName: this.props.location.state.data.contributer
                            .lastName,
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
                    {this.props.location.state.data.contributer.firstName.toUpperCase()}

                    {this.props.location.state.data.contributer.lastName.toUpperCase()}
                  </h6>
                  <div>
                    <StarRating
                      mentorId={this.props.location.state.data.contributer._id}
                    />
                  </div>

                  <h6 className="card-title">
                    {this.props.location.state.data.contributer.stream}
                  </h6>
                  <h6 className="card-title">
                    {this.props.location.state.data.contributer.experience}
                    <p className="card-text">Years of experience</p>
                  </h6>
                  <div className="card-title">
                    {this.props.location.state.data.contributer.city.toUpperCase()}
                  </div>

                  <Link
                    className="btn btn-success"
                    to={{
                      pathname: `/mentor/${this.props.location.state.data.contributer._id}/inviteform`,
                      state: {
                        mentorId: this.props.location.state.data.contributer
                          ._id,
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
                        pathname: `/ask/${this.props.location.state.data.contributer._id}/messagebox`,
                        state: {
                          mentorId: this.props.location.state.data.contributer
                            ._id,
                          firstName: this.props.location.state.data.contributer
                            .firstName,
                          lastName: this.props.location.state.data.contributer
                            .lastName,
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
            <div className="row">
              <div className="col">
                {' '}
                <Link
                  className="btn btn-warning"
                  to={{
                    pathname: `/getownfeed/${this.props.location.state.data.contributer._id}`,
                    state: {
                      mentorId: this.props.location.state.data.contributer._id,
                    },
                  }}
                >
                  My Feed
                </Link>
              </div>
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
                        {this.props.location.state.data.contributer.notice}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Profession:</th>

                      <td>
                        {this.props.location.state.data.contributer.profession}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Stream:</th>

                      <td>
                        {this.props.location.state.data.contributer.stream}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Teacher at:</th>

                      <td>
                        {this.props.location.state.data.contributer.teaching}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Working at:</th>

                      <td>
                        {this.props.location.state.data.contributer.working}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">UG degree:</th>

                      <td>
                        {
                          this.props.location.state.data.contributer
                            .underGraduate
                        }
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Studied at:</th>

                      <td>
                        {
                          this.props.location.state.data.contributer
                            .underGraduateCollege
                        }
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">PG degree:</th>

                      <td>
                        {
                          this.props.location.state.data.contributer
                            .postGraduate
                        }
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Studied at:</th>

                      <td>
                        {
                          this.props.location.state.data.contributer
                            .postGraduateCollege
                        }
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Specialization in:</th>

                      <td>
                        {
                          this.props.location.state.data.contributer
                            .specialization
                        }
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Per session:</th>

                      <td>
                        ₹{this.props.location.state.data.contributer.session}/-
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">More about me:</th>

                      <td>{this.props.location.state.data.contributer.bio}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <Comment
              mentorId={this.props.location.state.data.contributer._id}
            ></Comment>
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
                  className="table shadow-lg p-1 mb-5 bg-white rounded"
                  style={{ padding: '40px' }}
                >
                  <tbody>
                    {data.map((data) => (
                      <tr>
                        <td>
                          {moment(data.Date).format('MMMM Do YYYY, h:mm:ss a')}
                        </td>
                        <td style={{ fontWeight: 'bold' }}>
                          {data.firstName.toLowerCase()}
                          &nbsp;&nbsp;
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
export default viewProfile;
