import React, { Component } from 'react';
import axios from 'axios';
import decode from 'jwt-decode';
class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: '',
      description: '',
      record: '',
    };
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      question: this.state.question,

      description: this.state.description,
      firstName: this.state.record.firstName,
      lastName: this.state.record.lastName,

      sender: decode(localStorage.getItem('token'))._id,
    };
    console.log('this is reply', this.props.location.state.data.sender);
    axios
      .post(`http://localhost:5000/api/message/register`, formData)
      .then((res) => {
        axios
          .put(
            `http://localhost:5000/api/users/my/${this.props.location.state.data.sender}`,
            res.data
          )
          .then((res) => {
            console.log(res.data);
            this.setState({ data: res.data });
            console.log('data', this.state.data.firstName);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    const id = decode(localStorage.getItem('token'))._id;
    axios
      .get(
        `http://localhost:5000/api/users/account/${this.props.location.state.data.sender}`
      )
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

  onInputChange = (e) => {
    e.persist();
    this.setState(() => ({
      [e.target.name]: e.target.value,
    }));
  };

  render() {
    console.log('First', this.state.record);
    return (
      <div
        style={{
          boxShadow: '0px 2px 3px 3px grey',
          borderRadius: '5px',
          padding: '20px',
          width: '800px',
          margin: '100px 330px ',
        }}
        className="container"
      >
        <p>{this.state.record.firstName}</p>
        <p>{this.state.record.lastName}</p>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="question"
            value={this.state.question}
            placeholder="Please write your question"
            onChange={this.onInputChange}
          />
        </div>

        <div className="form-group">
          <textarea
            className="form-control"
            name="description"
            rows="3"
            value={this.state.description}
            placeholder="Please describe your problem"
            onChange={this.onInputChange}
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => this.onFormSubmit(e)}
        >
          Submit
        </button>
      </div>
    );
  }
}
export default Message;
