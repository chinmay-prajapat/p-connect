import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
// import generateData from '../generateData';
import decode from 'jwt-decode';
import { Link } from 'react-router-dom';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      delete: 0,
      myData: [],
    };
  }
  //   deleteItem = (itemId) => {
  //     this.setState({
  //       data: this.state.data.filter((data) => data.name !== itemId),
  //     });
  //   };

  deleteItem = (itemId) => {
    console.log(itemId);
    axios
      .delete(`http://localhost:5000/api/message/${itemId}`)
      .then((res) => {
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    const id = decode(localStorage.getItem('token'))._id;
    axios
      .get(
        `http://localhost:5000/api/users/display1/message/${
          decode(localStorage.getItem('token'))._id
        }`
      )
      .then((res) => {
        console.log(res.data);
        this.setState({
          data: res.data,
        });
        console.log('data', this.state.data);
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
    axios
      .get(`http://localhost:5000/api/message/myquery/${id}`)
      .then((res1) => {
        console.log('Sender', res1.data);
        this.setState({
          myData: res1.data,
        });
        console.log('My Data', this.state.myData);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(id);
  }

  render() {
    // const { data } = this.state;

    let { data, myData, isShowingAlert } = this.state;
    return (
      <div className="container-fluid">
        <div
          className="container "
          style={{ textAlign: 'center', width: '300px', padding: '30px' }}
        >
          <div className=" shadow-lg p-3 mb-5 bg-white rounded border border-primary">
            <h1 style={{ fontWeight: 'bold' }}>Q&A</h1>
          </div>
        </div>
        <div
          className="row"
          style={{ width: '100%', height: '500px', overflow: 'scroll' }}
        >
          <div className="col-4" style={{ paddingRight: '0px' }}>
            <table
              className=" table table-striped table-primary shadow-lg p-3 mb-5 rounded"
              style={{ padding: '0px', margin: '0px' }}
            >
              <thead>
                <tr className="table-info">
                  <th></th>
                  <th scope="col"> By Me</th>
                  <th scope="col"> Description</th>
                  <th scope="col">Time</th>
                </tr>
              </thead>
              {myData.map((myData) => (
                <tbody>
                  <tr>
                    <th></th>
                    <td style={{ height: '146px' }}>{myData.question}</td>
                    <td>{myData.description}</td>
                    <td>
                      {' '}
                      {moment(data.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                    </td>
                    <td>
                      <a href={myData.location}>File</a>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
          <div className="col" style={{ paddingLeft: '0px' }}>
            <table
              className="table table-striped table-dark  shadow-lg p-3 mb-5 rounded"
              style={{ padding: '0px', margin: '0px' }}
            >
              <thead>
                <tr>
                  <th></th>
                  <th scope="col">Name</th>

                  <th scope="col">Time</th>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>

              {data.map((data, i) => (
                <tbody>
                  <tr key={i}>
                    <th scope="row"></th>

                    <td>
                      {data.firstName}
                      &nbsp;&nbsp;{data.lastName}
                    </td>
                    <td style={{ width: '5px' }}>
                      {' '}
                      {moment(data.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                    </td>
                    <td>{data.question}</td>
                    <td>{data.description}</td>
                    <td>
                      <a href={data.location}>File</a>
                    </td>
                    <td>
                      <Link
                        to={{
                          pathname: `/replyquery/${data._id}`,
                          state: {
                            data,
                          },
                        }}
                      >
                        Reply
                      </Link>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
    );
  }
}
export default Message;
