import React, { Component } from 'react';
import axios from 'axios';
import decode from 'jwt-decode';
class Reply extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: '',
      description: '',
      record: '',
    };
    console.log('My data', this.props);
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      question: this.state.question,

      description: this.state.description,
      firstName: this.state.data.firstName,
      lastName: this.state.data.lastName,

      sender: decode(localStorage.getItem('token'))._id,
    };
    this.setState({
      question: '',
      description: '',
    });
    console.log('this is reply', this.props.location.state.sender);

    axios
      .post(`http://localhost:5000/api/message/register`, formData)
      .then((res) => {
        axios
          .put(
            `http://localhost:5000/api/users/my/${this.props.location.state.sender}`,
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
        `http://localhost:5000/api/users/account/${this.props.location.state.sender}`
      )
      .then((response) => {
        console.log(response.data);
        this.setState({
          record: response.data,
        });
        console.log('This is reply record', this.state.record.firstName);
      })

      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`http://localhost:5000/api/users/account/${id}`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          data: response.data,
        });
        console.log('This is my data', this.state.data.firstName);
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
        <pre>
          {this.state.record.firstName} {this.state.record.lastName}
        </pre>

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
          SEND
        </button>
      </div>
    );
  }
}
export default Reply;
