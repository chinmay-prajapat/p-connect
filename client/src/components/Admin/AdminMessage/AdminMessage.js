import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
// import generateData from '../generateData';
import { Link } from 'react-router-dom';

class AdminMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      delete: 0,
    };
  }
  //   deleteItem = (itemId) => {
  //     this.setState({
  //       data: this.state.data.filter((data) => data.name !== itemId),
  //     });
  //   };
  deleteItem = (itemId) => {
    axios
      .delete(`http://localhost:5000/api/about/delete/${itemId}`)
      .then((response) => {
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    axios
      .get('http://localhost:5000/api/about/')
      .then((response) => {
        this.setState({
          data: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    // const { data } = this.state;

    let { data, isShowingAlert } = this.state;
    return (
      <div className="container-fluid">
        <div
          className="container "
          style={{ textAlign: 'center', width: '300px', padding: '20px' }}
        >
          <div className=" shadow-lg p-3 mb-5 bg-white rounded border border-primary">
            <h1 style={{ fontWeight: 'bold' }}>Query</h1>
          </div>
        </div>{' '}
        <div className=" content table-responsive table-full-width p-0 m-0 ">
          <table className="table table-hover table-striped table-dark p-0 m-0 shadow-lg p-3 mb-5  rounded border border-danger">
            <thead>
              <tr>
                <th> Name</th>

                <th>Email</th>

                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((data) => (
                <tr>
                  <td>
                    {data.firstName.toUpperCase()}&nbsp;&nbsp;
                    {data.lastName.toUpperCase()}
                  </td>
                  <td>
                    <a href={`mailto:${data.email}`}>{data.email}</a>
                  </td>
                  <td>{data.message}</td>
                  <td style={{ color: '#79d70f' }}>
                    {moment(data.date).format('MMM Do YY, h:mm:ss a')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default AdminMessage;
