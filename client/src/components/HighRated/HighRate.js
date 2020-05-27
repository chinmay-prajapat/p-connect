import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HighRated from './HighRated';

class HighRate extends Component {
  constructor(props) {
    super(props);

    console.log('this is ', this.props);
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            {this.props.location.state.data.mentorId.firstName}
          </div>
          <div className="col">
            {this.props.location.state.data.mentorId.lastName}
          </div>
          <div className="col">
            {this.props.location.state.data.mentorId.email}
          </div>
          <div className="col">
            {this.props.location.state.data.mentorId.stream}
          </div>
          <div className="col">
            {this.props.location.state.data.mentorId.experience}
          </div>
          <div className="col">
            {this.props.location.state.data.mentorId.city}
          </div>
          <div className="col"></div>
          <Link
            className="btn btn-success"
            to={{
              pathname: `/mentor/${this.props.location.state.data.mentorId._id}/inviteform`,
              state: {
                mentorId: this.props.location.state.data.mentorId._id,
              },
            }}
          >
            Invite
          </Link>
          {localStorage.getItem('token') ? (
            <Link
              style={{ margin: '0px 2px' }}
              className="btn btn-info"
              to={{
                pathname: `/ask/${this.props.location.state.data.mentorId._id}/messagebox`,
                state: {
                  mentorId: this.props.location.state.data.mentorId._id,
                  firstName: this.props.location.state.data.mentorId.firstName,
                  lastName: this.props.location.state.data.mentorId.lastName,
                },
              }}
            >
              Send Message
            </Link>
          ) : (
            <Link
              className="btn btn-primary"
              to={{
                pathname: `/login`,
              }}
            >
              Login
            </Link>
          )}
        </div>
        <div className="row">
          <div className="col"></div>
        </div>
      </div>
    );
  }
}
export default HighRate;
