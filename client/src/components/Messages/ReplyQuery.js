import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class ReplyQuery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mentorId: '',
      firstName: '',
      lastName: '',
    };
    console.log('My data', this.props);
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
                pathname: `/replyattach/${this.props.location.state.data.sender}/messagebox`,
                state: {
                  sender: this.props.location.state.data.sender,
                  firstName: this.props.location.state.data.firstName,
                  lastName: this.props.location.state.data.lastName,
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
                pathname: `/reply/${this.props.location.state.data.sender}`,
                state: {
                  sender: this.props.location.state.data.sender,
                  firstName: this.props.location.state.data.firstName,
                  lastName: this.props.location.state.data.lastName,
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
export default ReplyQuery;
