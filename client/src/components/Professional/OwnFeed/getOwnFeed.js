import React, { Component } from 'react';

import moment from 'moment';
import decode from 'jwt-decode';
import axios from 'axios';
class getOwnFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    console.log('My props', this.props.location.state.mentorId);
  }

  componentDidMount() {
    const id = decode(localStorage.getItem('token'))._id;
    axios
      .get(
        `http://localhost:5000/api/contribute/myfeed/${this.props.location.state.mentorId}`
      )
      .then((res) => {
        console.log(res.data);
        this.setState({
          data: res.data,
        });
        console.log(this.state.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    let { data } = this.state;
    return (
      <div className="container-fluid">
        <div
          className="container-fluid shadow-lg p-3 mb-5 bg-white rounded border border-primary"
          style={{ marginRight: '130px', marginTop: '20px' }}
        >
          <div className="row " style={{ color: 'grey', marginRight: '250px' }}>
            <div className="col" style={{ textAlign: 'left', right: '100px' }}>
              <h2 style={{ textAlign: 'right' }}>Time</h2>
            </div>

            <div className="col-2" style={{ textAlign: 'left', left: '-80px' }}>
              <h2>Title</h2>
            </div>
            <div className="col" style={{ textAlign: 'left', left: '80px' }}>
              <h2>Description</h2>
            </div>

            <div className="col" style={{ textAlign: 'left', left: '150px' }}>
              <h2 style={{ textAlign: 'right' }}>Link</h2>
            </div>

            <div className="col" style={{ textAlign: 'right', left: '210px' }}>
              <h2> Document</h2>
            </div>
          </div>
        </div>
        <hr></hr>
        {data.map((data) => (
          <div
            className="row shadow-lg p-3 mb-5 rounded border border-info"
            style={{
              borderRadius: '20px',
              padding: '10px',
              margin: '20px',
              textAlign: 'center',
              // backgroundColor: '#434e52',

              // boxShadow: '2px 2px 2px 2px grey',
            }}
          >
            <div className="col-1">
              {moment(data.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
              &nbsp;
              <p>
                {' '}
                <i style={{ color: '#e43f5a' }} className="fa fa-eye"></i>&nbsp;
                {data.counter}
              </p>
            </div>
            <div className="col-3">{data.title}</div>
            <div className="col">{data.description}</div>

            <div className="col-2" style={{ right: '20px' }}>
              <a href={data.link} target="blank">
                Source-Link
              </a>
            </div>

            <div className="col-2">
              {/* <Document file={data.location} */}
              <a href={data.location} target="blank">
                View Document
              </a>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default getOwnFeed;
