import React, { Component } from 'react';
import axios from 'axios';
class About extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
    };
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      message: this.state.message,
    };

    axios
      .post('http://localhost:5000/api/about/register', formData)
      .then(() => {
        this.props.history.push('/about');
      })
      .catch((err) => {
        console.log(err);
      });
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
          display: 'inline-grid',
          justifyContent: 'center',
          margin: '30px 0px',
        }}
        className="container"
      >
        <div style={{ margin: '30px 0px' }} className="row">
          <div className="col">
            <h1>About</h1>
          </div>
          <div className="col">
            <p>
              The objective behind this project is to provide a platform for
              those who need guidance in their project,research work, workshops,
              and guest lectures.
            </p>
          </div>
        </div>
        <div style={{ margin: '20px 0px' }} className="row">
          <div className="col">
            <h1>Contact</h1>
          </div>
          <div className="col">
            <h5>Address:</h5>
            <p>Bangalore</p>
            <h5>Email:</h5>
            <p>prajapatchinmay@gmail.com</p>
            <h5>Mobile:</h5>
            <p>8197453533</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h1>Write Us</h1>
          </div>
          <div className="col">
            <input
              style={{
                width: '250px',
                display: 'block',
                border: '2px solid pink',
                borderRadius: '5px',
                lineHeight: '40px',
              }}
              type="text"
              name="firstName"
              placeholder="First Name"
              value={this.state.firstName}
              onChange={this.onInputChange}
            />

            <input
              style={{
                position: 'relative',
                left: '270px',
                width: '270px',
                borderRadius: '5px',
                top: '-45px',
                lineHeight: '40px',
                border: '2px solid pink',
              }}
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={this.state.lastName}
              onChange={this.onInputChange}
            />

            <input
              style={{
                width: '539px',
                borderRadius: '5px',
                margin: '0px 0px   ',
                padding: '0px 0px',
                lineHeight: '40px',
                border: '2px solid pink',
              }}
              type="text"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.onInputChange}
            />
            <textarea
              style={{
                borderRadius: '5px',
                margin: '10px 0px',
                lineHeight: '40px',
                border: '2px solid pink',
              }}
              name="message"
              id="message"
              className="form-control "
              cols="30"
              rows="8"
              placeholder="Message"
              value={this.state.message}
              onChange={this.onInputChange}
            ></textarea>
            <input
              style={{
                display: 'flex',
                lineHeight: '30px',
                justifyContent: 'center',
                margin: '40px 0px',
                width: '100px',
                padding: '10px',
                color: 'white',

                backgroundColor: '#d7385e',
                borderRadius: '5px',
              }}
              type="submit"
              name="submit"
              value="submit"
              onClick={(e) => this.onFormSubmit(e)}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default About;
