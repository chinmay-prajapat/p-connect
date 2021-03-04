import React, { Component } from 'react';
import decode from 'jwt-decode';
import axios from 'axios';
import moment from 'moment';
class Invites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    const id = decode(localStorage.getItem('token'))._id;
    axios
      .get(
        `http://localhost:5000/api/event/myinvite/${this.props.location.state.mentorId}`
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
        <div style={{ fontSize: '14px' }}>
          <table class="table table-striped table-dark border border-danger shadow-lg p-3 mb-5  rounded">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Email</th>
                <th scope="col">Place</th>
                <th scope="col">Hour</th>
                <th scope="col">When</th>
                <th scope="col">Purpose</th>
                <th scope="col">Hour</th>
                <th scope="col">Topic</th>
                <th scope="col">Description</th>
                <th scope="col">Created</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            {data.map((data, index) => (
              <tbody>
                <tr key={index}>
                  <th scope="row"></th>
                  <td>
                    {data.firstName}&nbsp;&nbsp;{data.lastName}
                  </td>
                  <td>{data.phone}</td>
                  <td>{data.email}</td>
                  <td>{data.place}</td>
                  <td>{data.hour}</td>
                  <td style={{ color: '#79d70f' }}>
                    {moment(data.date).format('MMM Do YY')}
                  </td>
                  <td>{data.purpose}</td>
                  <td>{data.hour}</td>
                  <td>{data.topic}</td>
                  <td>{data.description}</td>
                  <td style={{ color: '#42e6a4' }}>
                    {moment(data.createdAt).format('MMM Do YY')}
                  </td>

                  <td
                    style={{
                      color: data.message === 'Accepted' ? 'green' : 'red',
                      fontWeight: 'bold',
                    }}
                  >
                    {data.message}
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    );
  }
}
export default Invites;
