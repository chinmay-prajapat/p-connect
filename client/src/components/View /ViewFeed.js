import React, { Component } from 'react';
import axios from 'axios';
// import generateData from '../generateData';
import { Link } from 'react-router-dom';
import { Document, Page } from 'react-pdf';
class ViewFeed extends Component {
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
      .delete(`http://localhost:5000/api/contribute/${itemId}`)
      .then((response) => {
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    axios
      .get('http://localhost:5000/api/contribute/')
      .then((response) => {
        console.log(response.data);
        this.setState({
          data: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    let { data } = this.state;

    return (
      <div className="container">
        <h1 style={{ textAlign: 'center', padding: '50px 0px' }}> Feed View</h1>
        <div className="row" style={{ color: 'grey' }}>
          <div className="col">
            <h2 style={{ textAlign: 'center' }}>Title</h2>
          </div>

          <div className="col" style={{ textAlign: 'left' }}>
            <h2>Description</h2>
          </div>
          <div className="col">
            <h2 style={{ textAlign: 'left' }}>Link</h2>
          </div>
          <div className="col">
            <h2 style={{ textAlign: 'left' }}>Document</h2>
          </div>
        </div>
        <hr></hr>
        {data.map((data) => (
          <div
            className="row"
            style={{
              boxShadow: '2px 2px 2px 2px grey',
              borderRadius: '20px',
              padding: '10px',
              margin: '20px',
            }}
          >
            <div className="col-1">
              <Link
                to={{
                  pathname: `/viewProfile/${data.contributer._id}`,
                  state: {
                    data,
                  },
                }}
              >
                {data.contributer.firstName}
              </Link>
            </div>
            <div className="col-2">{data.title}</div>
            <div className="col-4">{data.description}</div>

            <div className="col-2" style={{ right: '20px' }}>
              <a href={data.link} target="blank">
                {data.link}
              </a>
            </div>

            <div className="col">
              <Document file={data.location} />
              <a href={data.location} target="blank">
                {data.location}
              </a>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default ViewFeed;
