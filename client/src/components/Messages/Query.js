import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Query extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mentorId: '',
      firstName: '',
      lastName: '',
    };
  }
  render() {
    console.log('My data', this.props);
    return (
      <div className="container">
        <h5 style={{ color: 'grey', textAlign: 'center', margin: '50px 0px' }}>
          Do you have an attachment to share?
        </h5>
        <div
          className="row"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <div className="col-sm-3" style={{ left: '100px' }}>
            <Link
              style={{ margin: '2px' }}
              className="btn btn-info"
              to={{
                pathname: `/attachment/${this.props.location.state.mentorId}/messagebox`,
                state: {
                  mentorId: this.props.location.state.mentorId,
                  firstName: this.props.location.state.firstName,
                  lastName: this.props.location.state.lastName,
                },
              }}
            >
              Yes
            </Link>
          </div>
          <div className="col-sm-3" style={{ left: '70px' }}>
            <Link
              style={{ margin: '2px' }}
              className="btn btn-info"
              to={{
                pathname: `/ask/${this.props.location.state.mentorId}/messagebox`,
                state: {
                  mentorId: this.props.location.state.mentorId,
                  firstName: this.props.location.state.firstName,
                  lastName: this.props.location.state.lastName,
                },
              }}
            >
              No
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default Query;
