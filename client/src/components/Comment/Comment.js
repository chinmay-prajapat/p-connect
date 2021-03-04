import React, { Component } from 'react';
import axios from 'axios';
import decode from 'jwt-decode';
class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      firstName: '',
      lastName: '',
      data: '',
    };
    console.log('This is comment', this.props);
  }
  onFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      comment: this.state.comment,
      firstName: this.state.record.firstName,
      lastName: this.state.record.lastName,
      mentorId: this.props.mentorId,

      commentSender: decode(localStorage.getItem('token'))._id,
    };
    const id = decode(localStorage.getItem('token'))._id;
    axios

      .post(`http://localhost:5000/api/comment/register`, formData)
      .then((res) => {
        axios
          .put(
            `http://localhost:5000/api/users/mycomment/${this.props.mentorId}`,
            res.data
          )
          .then((res) => {
            console.log(res.data);
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
        this.setState({
          sent: 1,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    const id = decode(localStorage.getItem('token'))._id;
    axios
      .get(`http://localhost:5000/api/users/account/${id}`)
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
  }
  onInputChange = (e) => {
    e.persist();
    this.setState(() => ({
      [e.target.name]: e.target.value,
    }));
  };

  render() {
    return (
      <form onSubmit={(e) => this.onFormSubmit(e)}>
        <div className="container">
          <div className="form-group">
            <textarea
              rows="4"
              cols="60"
              name="comment"
              placeholder="Please leave your feedback to this professor"
              value={this.state.comment}
              onChange={this.onInputChange}
              required="true"
            ></textarea>

            <div>
              <button
                //   style={{ marginLeft: '124px' }}
                type="submit"
                class="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
export default Comment;
