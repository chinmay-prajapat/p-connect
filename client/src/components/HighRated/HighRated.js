import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Star from '../Image/Star.png';
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
      mentoId: [],
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
          stream: this.state.mentorId.map((b) => b.stream),
        });
        this.setState({
          firstName: this.state.mentorId.map((b) => b.firstName),
        });
        this.setState({
          lastName: this.state.mentorId.map((b) => b.lastName),
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
          firstName: [...new Set(this.state.firstName)],
        });
        this.setState({
          lastName: [...new Set(this.state.lastName)],
        });
        this.setState({
          stream: [...new Set(this.state.stream)],
        });
        this.setState({
          mentoId: [...new Set(this.state.id)],
        });

        console.log('Unique', this.state.uniqueValue);
        console.log('My Data', this.state.data);
        //console.log('my unique NAme', this.state.uniqueId);
        console.log('myMentor', this.state.mentoId);
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
    console.log('my id', this.state.id);
    console.log('my mentor', this.state.mentoId);

    let { data } = this.state;
    let { mentoId, uniqueId } = this.state;
    return (
      <div className="container">
        <div
          className="container "
          style={{ textAlign: 'center', width: '300px' }}
        >
          <div
            className=" shadow-lg p-3 mb-5 bg-white rounded border border-primary"
            style={{ marginTop: '20px' }}
          >
            <h1 style={{ fontWeight: 'bold' }}>High-Rated</h1>
          </div>
        </div>
        <div
          className="row "
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '100px ',
          }}
        >
          {this.state.mentoId.map((data, i) =>
            this.state.uniqueValue[i] ? (
              <div
                className="card border border-info"
                style={{
                  width: '18rem',
                  margin: 10,
                }}
              >
                <div className="card-body">
                  <Link
                    to={{
                      pathname: `/highrate/${data}`,
                      state: {
                        data,
                      },
                    }}
                  >
                    <h5 className="card-title">
                      {this.state.firstName[i].toUpperCase()}&nbsp;&nbsp;
                      {this.state.lastName[i].toUpperCase()}
                    </h5>
                  </Link>
                  {/* <p className="card-text">{this.state.uniqueValue[i]}</p> */}
                  <img style={{ height: '30px' }} src={Star} alt="Rating" />
                  <p>{parseFloat(this.state.uniqueValue[i]).toFixed(1)}/5</p>
                  <div className="card-text">
                    <p>{this.state.stream[i]}</p>
                  </div>
                  <Link
                    to={{
                      pathname: `/highrate/${this.state.mentoId[i]}`,
                      state: {
                        mentoId,
                      },
                    }}
                    className="btn btn-primary"
                  >
                    Go Profile
                  </Link>
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    );
  }
}
export default HighRated;
