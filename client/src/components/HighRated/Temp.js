import React, { Component } from 'react';
import decode from 'jwt-decode';
import axios from 'axios';
import { Link } from 'react-router-dom';
class HighRated extends Component {
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
      higher: [],
    };
  }
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
        this.setState({
          higher: this.state.rating.filter(function (rating) {
            return rating > 3;
          }),
        });
        console.log('my rating', this.state.higher);
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
  // componentDidMount() {
  //   axios
  //     .get('http://localhost:5000/api/rating/myrating')
  //     .then((res) => {
  //       console.log(res.data);
  //       this.setState({
  //         data: res.data,
  //         mentor: res.data.map((a) => a.mentorId),
  //       });
  //       this.setState({
  //         data: res.data,
  //         rating: res.data.map((a) => a.rating),
  //       });
  //       console.log('this is array', this.state.rating);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   axios
  //     .get(
  //       `http://localhost:5000/api/users/account/${this.state.data.mentorId}`
  //     )
  //     .then((res) => {
  //       console.log(res.data);
  //       this.setState({
  //         record: res.data,
  //       });
  //       console.log('Mentor', this.state.record);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  render() {
    let { data } = this.state;
    return (
      <div className="container">
        {data.map((data, i) => (
          <div>
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

            <div>{this.state.higher[i]}</div>
          </div>
        ))}
      </div>
    );
  }
}
export default HighRated;
