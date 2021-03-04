import React, { Component } from 'react';
import axios from 'axios';
import decode from 'jwt-decode';
class profilePic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: '',
    };
  }
  onImageUpload = (event) => {
    this.setState({
      img: event.target.files[0],
      loaded: 0,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('img', this.state.img);

    console.log(formData);
    const id = decode(localStorage.getItem('token'))._id;
    axios
      .post(`http://localhost:5000/api/users/img/${id}`, formData, {
        headers: {
          'Access-Control-Allow-Origin': true,
          'Content-Type': 'multipart/form-data',
        },
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <div className="container">
        <div className="field">
          <label>Image </label>
          <input
            placeholder="Image"
            type="file"
            onChange={this.onImageUpload}
            name="img"
          />
        </div>
        <button
          type="submit"
          className="ui button"
          onClick={(e) => this.handleSubmit(e)}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default profilePic;
