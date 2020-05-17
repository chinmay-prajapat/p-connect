import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class viewProfile extends Component {
  constructor(props) {
    super(props);

    console.log('this is ', this.props);
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            {this.props.location.state.data.contributer.firstName}
          </div>
          <div className="col">
            {this.props.location.state.data.contributer.lastName}
          </div>
          <div className="col">
            {this.props.location.state.data.contributer.email}
          </div>
          <div className="col">
            {this.props.location.state.data.contributer.stream}
          </div>
          <div className="col">
            {this.props.location.state.data.contributer.experience}
          </div>
          <div className="col">
            {this.props.location.state.data.contributer.city}
          </div>
          <div className="col"></div>
          <Link
            className="btn btn-success"
            to={{
              pathname: `/mentor/${this.props.location.state.data.contributer._id}/inviteform`,
              state: {
                mentorId: this.props.location.state.data.contributer._id,
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
                pathname: `/ask/${this.props.location.state.data.contributer._id}/messagebox`,
                state: {
                  mentorId: this.props.location.state.data.contributer._id,
                  firstName: this.props.location.state.data.contributer
                    .firstName,
                  lastName: this.props.location.state.data.contributer.lastName,
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
export default viewProfile;
