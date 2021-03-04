import React, { Component } from 'react';
import axios from 'axios';
import decode from 'jwt-decode';
class ReplyAttach extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: '',
      description: '',
      firstName: '',
      lastName: '',
      link: '',
      document: '',
      sender: decode(localStorage.getItem('token'))._id,
      sent: 0,
    };

    console.log(this.props);
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('question', this.state.question);

    formData.append('description', this.state.description);

    formData.append('firstName', this.state.data.firstName);
    formData.append('document', this.state.document);
    formData.append('lastName', this.state.data.lastName);
    formData.append('link', this.state.link);
    formData.append('sender', this.state.sender);

    this.setState({
      description: '',
      question: '',
      link: '',
    });
    const id = decode(localStorage.getItem('token'))._id;
    axios

      .post(`http://localhost:5000/api/message/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth': localStorage.getItem('token'),
        },
      })

      .then((res) => {
        //  const formData = { id: res.data._id };
        axios
          .put(
            `http://localhost:5000/api/users/my/${this.props.location.state.sender}`,
            res.data
          )
          .then((res) => {
            console.log(res.data);
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
        console.log('record', this.state.record.firstName);
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
  onFileChange = (e) => {
    this.setState({ [e.target.name]: e.target.files[0] });
  };
  onInputChange = (e) => {
    e.persist();
    this.setState(() => ({
      [e.target.name]: e.target.value,
    }));
  };
  render() {
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
        <div>
          <pre>
            {this.props.location.state.firstName.toUpperCase()}{' '}
            {this.props.location.state.lastName.toUpperCase()}
          </pre>
          <p> </p>
        </div>
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
        <div className="form-group">
          <label>Attchment if any(PDF only):</label>
          <input
            type="file"
            className="form-control"
            name="document"
            id="document"
            onChange={this.onFileChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={this.onFormSubmit}
        >
          SEND
        </button>
      </div>
    );
  }
}
export default ReplyAttach;
