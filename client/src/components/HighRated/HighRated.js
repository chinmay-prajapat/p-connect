import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
class HighRated extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      record: [],
      myRating: [],
      higher: [],
      uniqueValue: [],
      uniqueId: [],
    };
  }
  componentDidMount() {
    axios
      .get('http://localhost:5000/api/rating/')
      .then((response) => {
        this.setState({
          data: response.data,
          mentorId: response.data.map((id) => id.mentorId),
        });
        this.setState({
          id: this.state.mentorId.map((r) => r._id),
        });
        this.setState({
          rating: this.state.mentorId.map((b) => b.rating),
        });
        this.setState({
          name: this.state.mentorId.map((b) => b.firstName),
        });
        console.log('Rating', this.state.rating);
        this.setState({
          userRating: this.state.rating.map((c) => c.map((d) => d.rating)),
        });
        console.log('UserRating', this.state.userRating);
        this.setState({
          myRating: this.state.userRating.map((e) => this.averageRating(e)),
        });
        console.log('User', this.state.myRating);
        this.setState({
          higher: this.state.myRating.filter((highrating) => highrating > 3),
        });
        this.setState({
          uniqueValue: [...new Set(this.state.higher)],
        });
        this.setState({
          uniqueId: [...new Set(this.state.name)],
        });

        console.log('Unique', this.state.uniqueValue);
        console.log('My Data', this.state.data);
        console.log('my unique NAme', this.state.uniqueId);
        console.log('myMentor', this.state.mentorId);
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
    console.log('Higher', this.state.higher);

    let { data } = this.state;
    return (
      <div className="container">
        <div>
          {data.map((data, i) => (
            <div className="row">
              <div className="col">
                <Link
                  to={{
                    pathname: `/highrate/${data.mentorId._id}`,
                    state: {
                      data,
                    },
                  }}
                >
                  {this.state.uniqueId[i]}
                </Link>
              </div>
              <p>{this.state.uniqueValue[i]}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default HighRated;
