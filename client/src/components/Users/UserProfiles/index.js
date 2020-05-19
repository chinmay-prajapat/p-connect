import React, { Component, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import decode from 'jwt-decode';
// import StarRating from 'react-star-rating';
import StarRating from '../UserProfiles/Rating';

class Profile extends Component {
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
    const ratingReciever = this.props.location.state.record._id;

    axios
      .get(
        `http://localhost:5000/api/rating/fetchrating/${ratingGiver}/${ratingReciever}`
      )
      .then((res) => {
        console.log(res.data.rating);
        this.setState({ rating: res.data.rating });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    let { data, isShowingAlert } = this.state;
    return (
      <div
        className="card"
        style={{
          width: '18rem',
          padding: '20px',
          margin: '20px 0px',
          left: '200px',
        }}
      >
        {this.state.rating ? (
          <div className="card-body">
            <h6 className="card-title">
              {this.props.location.state.record.firstName.toUpperCase()}

              {this.props.location.state.record.lastName.toUpperCase()}
            </h6>
            <div>
              <StarRating
                rating={this.state.rating}
                mentorId={this.props.location.state.record._id}
              />
            </div>

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
          <div className="card-body">
            <h6 className="card-title">
              {this.props.location.state.record.firstName.toUpperCase()}

              {this.props.location.state.record.lastName.toUpperCase()}
            </h6>
            <div>
              <StarRating mentorId={this.props.location.state.record._id} />
            </div>

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
        )}
      </div>
    );
  }
}
export default Profile;
