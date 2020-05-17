import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import decode from 'jwt-decode';
const user = {
  backgroundColor: '#4d4c7d',
  display: 'flex',
  justifyContent: 'center',
  fontSize: '20px',
  float: 'center',
  width: '20px',
  margin: '250px 0px 0px 300px',

  padding: '30px 0px',

  borderRadius: '10px',
};

class Contribute extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        className="container row no-gutters"
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div className="col-sm" style={user}>
          <Link
            style={{ display: 'flex', color: 'white' }}
            to={{
              pathname: `/new/${decode(localStorage.getItem('token'))._id}`,
              state: {
                contributeId: decode(localStorage.getItem('token'))._id,
              },
            }}
          >
            New
          </Link>
        </div>

        <div className="col-sm" style={user}>
          <Link
            style={{
              color: 'white',
            }}
            to={{
              pathname: `/old/${decode(localStorage.getItem('token'))._id}`,
              state: {
                contributeId: decode(localStorage.getItem('token'))._id,
              },
            }}
          >
            Old
          </Link>
        </div>
      </div>
    );
  }
}
export default Contribute;
