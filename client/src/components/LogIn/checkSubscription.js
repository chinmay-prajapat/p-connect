import React, { Component } from 'react';
import decode from 'jwt-decode';
import axios from 'axios';
class checkSubscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    };
  }
  componentDidMount() {
    const id = decode(localStorage.getItem('token'))._id;
    axios
      .get(`http://localhost:5000/api/users/account/${id}`)
      .then((response) => {
        this.setState({
          data: response.data,
        });
        console.log('my data', this.state.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    let { data } = this.state;
    return <div>This is checkSubscription</div>;
  }
}
export default checkSubscription;
