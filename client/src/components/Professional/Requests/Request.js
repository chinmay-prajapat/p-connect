import React, { Component } from 'react';
import axios from 'axios';
import nodemailer from 'nodemailer';
import moment from 'moment';
// import generateData from '../generateData';
import decode from 'jwt-decode';
import { Link } from 'react-router-dom';

class myRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      delete: 0,
      record: {},
    };
  }

  //   deleteItem = (itemId) => {
  //     this.setState({
  //       data: this.state.data.filter((data) => data.name !== itemId),
  //     });
  //   };

  componentDidMount() {
    const id = decode(localStorage.getItem('token'))._id;
    axios
      .get(`http://localhost:5000/api/users/display/invites/${id}`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          data: response.data,
        });
        console.log('My data', this.state.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`http://localhost:5000/api/users/account/${id}`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          record: response.data,
        });
        console.log('record', this.state.record.firstName);
      })

      .catch((err) => {
        console.log(err);
      });
    console.log(id);
  }

  deleteItem = (itemId) => {
    console.log(itemId);
    axios
      .delete(`http://localhost:5000/api/event/${itemId}`)
      .then((response) => {
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  acceptEmail = (email, firstName, lastName, eventId, index) => {
    const formData = {
      message: 'Accepted',
      acceptButton: true,
      eventId: eventId,
    };

    axios
      .put(
        `http://localhost:5000/api/event/accept`,
        formData
        // , {
        //   headers: {
        //     userId: decode(localStorage.getItem('token'))._id,
        //   },
        // }
      )
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        this.setState({ err: err });
      });

    console.log('send email called');
    const myEmail = { email: email, firstName: firstName, lastName: lastName };
    console.log(myEmail);
    axios
      .post('/api/users/acceptMail', myEmail)
      .then((res) => {
        console.log('Email send');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  rejectEmail = (email, firstName, lastName, eventId, index) => {
    const formData = {
      message: 'Rejected',
      rejectButton: true,
      eventId: eventId,
    };
    axios
      .put(
        `http://localhost:5000/api/event/accept`,
        formData
        // , {
        //   headers: {
        //     userId: decode(localStorage.getItem('token'))._id,
        //   },
        // }
      )
      .then((res) => {
        // this.setState({ data: res.data });
        window.location.reload();
      })
      .catch((err) => {
        this.setState({ err: err });
      });

    console.log('send email called');
    const myEmail = { email: email, firstName: firstName, lastName: lastName };
    console.log(myEmail);
    axios
      .post('/api/users/rejectMail', myEmail)
      .then((res) => {
        console.log('Email send');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    // const { data } = this.state;

    let { data, isShowingAlert } = this.state;
    return (
      <div className="container-fluid">
        <div
          className="container "
          style={{ textAlign: 'center', width: '300px' }}
        >
          <div
            className=" shadow-lg p-3 mb-5 bg-white rounded border border-primary"
            style={{ margin: '23px 0px' }}
          >
            <h1 style={{ fontWeight: 'bold' }}>Requests</h1>
          </div>
        </div>
        <div style={{ fontSize: '12px' }}>
          <table className="table table-striped table-dark shadow-lg p-3 mb-5 rounded">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Name</th>

                <th scope="col">Topic</th>
                <th scope="col">Description</th>
                <th scope="col">Place</th>
                <th scope="col">Hour</th>
                <th scope="col">Phone</th>
                <th scope="col">Email</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
              </tr>
            </thead>

            {data.map((data, index) => (
              <tbody>
                <tr key={index}>
                  <th scope="row"></th>
                  <td>
                    {data.firstName.toUpperCase()}&nbsp;
                    {data.lastName.toUpperCase()}
                  </td>
                  <td>{data.topic}</td>
                  <td style={{ height: '100px', width: '300px' }}>
                    {data.description}
                  </td>
                  <td>{data.place.toUpperCase()}</td>
                  <td>{data.hour}</td>
                  <td>{data.phone}</td>

                  <td>{data.email}</td>
                  <td style={{ fontWeight: 'bold', color: '#79d70f' }}>
                    {moment(data.date).format('MMM Do YY')}
                  </td>

                  <td
                    style={{
                      color: data.message === 'Accepted' ? 'green' : 'red',
                      fontWeight: 'bold',
                    }}
                  >
                    {data.message}
                  </td>

                  <td>
                    <button
                      className="btn btn-success"
                      disabled={data.acceptButton}
                      onClick={() =>
                        this.acceptEmail(
                          data.email,

                          this.state.record.firstName,
                          this.state.record.lastName,
                          data._id,
                          index
                        )
                      }
                    >
                      Accept
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      disabled={data.rejectButton}
                      onClick={() =>
                        this.rejectEmail(
                          data.email,
                          this.state.record.firstName,
                          this.state.record.lastName,
                          data._id,
                          index
                        )
                      }
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          {/* <div className="row" style={{ color: 'grey' }}>
          <div className="col">
            <h2>First Name</h2>
          </div>
          <div className="col">
            <h2>Last Name</h2>
          </div>
          <div className="col">
            <h2>Topic</h2>
          </div>
          <div className="col">
            <h2>Description</h2>
          </div>
        </div>
        <hr></hr>
        {data.map((data) => (
          <div className="row">
            <div className="col">{data.firstName.toUpperCase()}</div>

            <div className="col">{data.lastName}</div>

            <div
              style={{ textAlign: 'justify', textJustify: 'inter-word' }}
              className="col"
            >
              {data.topic}
            </div>

            <div className="col">{data.description}</div>
          </div> */}
        </div>
      </div>
    );
  }
}
export default myRequest;
