import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
// import generateData from '../generateData';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Star from '../Image/Star.png';
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
    console.log('Data', this.state.data);
    console.log('first', this.state.first);
    console.log('Second', this.state.second);
    console.log('Third', this.state.third);
    console.log('Rating render', this.state.rating);
    let { data } = this.state;

    return (
      <div className="container-fluid">
        <div
          className="container-fluid shadow-lg p-3 mb-5 bg-white rounded border border-primary"
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          <div className="row " style={{ color: 'grey', marginRight: '250px' }}>
            <div className="col" style={{ left: '-160px' }}>
              <h2>Name</h2>
            </div>
            <div className="col" style={{ left: '-170px' }}>
              <h2>Time</h2>
            </div>

            <div className="col" style={{ right: '80px' }}>
              <h2>Title</h2>
            </div>
            <div className="col" style={{ left: '125px' }}>
              <h2>Description</h2>
            </div>

            <div className="col" style={{ left: '350px' }}>
              <h2>Link</h2>
            </div>

            <div className="col" style={{ left: '360px' }}>
              <h2> Document</h2>
            </div>
          </div>
        </div>
        <hr></hr>
        {data.map((data, i) => (
          <div
            className="row  shadow-lg p-3 mb-5 bg-white rounded border border-info"
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
                {data.contributer.firstName.toUpperCase()}{' '}
                {data.contributer.lastName.toUpperCase()}
              </Link>
              <img style={{ height: '30px' }} src={Star} alt="Rating" />

              <p>{parseFloat(this.state.rating[i]).toFixed(1)}/5</p>
            </div>
            <div className="col-1">
              {' '}
              {moment(data.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
            </div>
            <div className="col-3">{data.title}</div>
            &nbsp; &nbsp;
            <div className="col-4">{data.description}</div>
            &nbsp; &nbsp;
            <div className="col-1" style={{ right: '20px' }}>
              <a href={data.link} target="blank">
                Source-Link
              </a>
            </div>
            &nbsp; &nbsp;
            <div className="col">
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
export default ViewFeed;
