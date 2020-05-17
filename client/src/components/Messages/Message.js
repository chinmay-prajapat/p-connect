import React, { Component } from 'react';
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

  render() {
    // const { data } = this.state;

    let { data, isShowingAlert } = this.state;
    return (
      <div className="container">
        <h1 style={{ textAlign: 'center', padding: '50px 0px' }}>Q&A</h1>
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th></th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
            </tr>
          </thead>

          {data.map((data, i) => (
            <tbody>
              <tr key={i}>
                <th scope="row"></th>

                <td>{data.firstName}</td>
                <td>{data.lastName}</td>
                <td>{data.question}</td>
                <td>{data.description}</td>

                <td>
                  <Link
                    to={{
                      pathname: `/reply/${data._id}`,
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
    );
  }
}
export default Message;
