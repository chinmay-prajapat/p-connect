import React, { Component } from 'react';
import axios from 'axios';
// import generateData from '../generateData';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { Document, Page } from 'react-pdf';
class ViewFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      delete: 0,
      contributer: '',
      first: [],
      second: [],
      third: [],
      fourth: [],
      rating: [],
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
        console.log('Contri', response.data);
        this.setState({
          data: response.data,
          first: response.data.map((a) => a.contributer),
        });
        this.setState({
          second: this.state.first.map((b) => b.rating),
        });
        this.setState({
          third: this.state.second.map((c) => c.map((d) => d.rating)),
        });
        this.setState({
          rating: this.state.third.map((e) => this.averageRating(e)),
        });
      })

      .catch((err) => {
        console.log(err);
      });
  }

  averageRating = (arr) => {
    console.log('Array', arr);
    let i = 0;
    let sum = 0;
    let len = arr.length;
    while (i < len) {
      sum = sum + arr[i++];
    }
    return sum / len;
  };

  render() {
    console.log('first', this.state.first);
    console.log('Second', this.state.second);
    console.log('Third', this.state.third);
    console.log('Rating render', this.state.rating);
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
        {data.map((data, i) => (
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
                {data.contributer.firstName} {data.contributer.lastName}
              </Link>
              <p>{this.state.rating[i]}</p>
            </div>
            <div className="col-2">{data.title}</div>
            <div className="col-3">{data.description}</div>

            <div className="col-3" style={{ right: '20px' }}>
              <a href={data.link} target="blank">
                {data.link}
              </a>
            </div>

            <div className="col-2">
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
