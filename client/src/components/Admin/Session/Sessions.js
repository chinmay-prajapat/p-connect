import React, { Component } from 'react';
import axios from 'axios';
import decode from 'jwt-decode';
import moment from 'moment';
class Session extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    const id = decode(localStorage.getItem('token'))._id;
    axios
      .get(`http://localhost:5000/api/event/`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          data: response.data,
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
                  <td>{data.message}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    );
  }
}
export default Session;
