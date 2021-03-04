import React, { Component } from 'react';
import axios from 'axios';
import decode from 'jwt-decode';
import moment from 'moment';
import { Document, Page } from 'react-pdf';
// import generateData from '../generateData';
import { Link } from 'react-router-dom';

class Old extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      delete: 0,
      title: '',
      description: '',
      link: '',
      location: '',
      document: '',
    };
  }
  //   deleteItem = (itemId) => {
  //     this.setState({
  //       data: this.state.data.filter((data) => data.name !== itemId),
  //     });
  //   };
  deleteItem = (itemId) => {
    axios
      .delete(`http://localhost:5000/api/contribute/delete/${itemId}`)
      .then((response) => {
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    const id = decode(localStorage.getItem('token'))._id;
    axios
      .get(`http://localhost:5000/api/contribute/myfeed/${id}`)
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
    // const { data } = this.state;

    let { data } = this.state;

    return (
      <div className="card">
        <div className="header" align="center">
          <div
            className="container "
            style={{ textAlign: 'center', width: '300px', margin: '20px 0px' }}
          >
            <div className=" shadow-lg p-3 mb-5 bg-white rounded border border-primary">
              <h1 style={{ fontWeight: 'bold' }}>My Feed</h1>
            </div>
          </div>
        </div>
        <div className="content table-responsive table-full-width">
          <table className="table table-hover ">
            <thead className="thead-dark">
              <tr>
                <th>Time</th>
                <th filter={{ type: 'TextFilter' }} dataSort>
                  Title
                </th>

                <th>Description</th>

                <th>Links</th>

                <th>Document</th>
              </tr>
            </thead>
            <tbody style={{ boxShadow: '2px 2px 2px grey' }}>
              {data.map((data) => (
                <tr style={{}}>
                  <td>
                    {moment(data.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                  </td>
                  <td>{data.title}</td>

                  <td>{data.description}</td>

                  <td>
                    {' '}
                    <a href={data.link} target="blank">
                      {data.link}
                    </a>
                  </td>
                  <td>
                    <a href={data.location} target="blank">
                      View Document
                    </a>
                  </td>

                  {/* <td>
                    <button
                      // rel="tooltip"
                      // className="btn btn-info btn-simple btn-xs"
                      data-original-title="View Profile"
                      onClick={() => this.deleteItem(data._id)}
                      style={{ color: 'red', fontSize: '15px' }}
                    >
                      Delete
                  
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default Old;
