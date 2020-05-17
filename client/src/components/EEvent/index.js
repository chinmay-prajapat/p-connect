import React, { Component } from 'react';
import decode from 'jwt-decode';
import axios from 'axios';
class PEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      place: '',
      date: '',
      hour: '',
      purpose: '',
      topic: '',
      description: '',
    };
    console.log(this.props);
  }
  onInputChange = (e) => {
    e.persist();
    this.setState(() => ({
      [e.target.name]: e.target.value,
    }));
  };

  //   onCertificateUpload = (event) => {
  //     this.setState({
  //       certificate: event.target.files[0],
  //       loaded: 0,
  //     });
  //   };

  //   onProfileImageUpload = (event) => {
  //     this.setState({
  //       profileImage: event.target.files[0],
  //       loaded: 0,
  //     });
  //   };
  onFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phone: this.state.phone,
      email: this.state.email,
      place: this.state.place,
      date: this.state.date,
      hour: this.state.hour,
      purpose: this.state.purpose,
      topic: this.state.topic,
      description: this.state.description,
      inviter: decode(localStorage.getItem('token'))._id,
    };
    axios
      .post(`http://localhost:5000/api/event/register`, formData)
      .then((res) => {
        axios
          .put(
            `http://localhost:5000/api/users/update/${this.props.location.state.mentorId}`,
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

  render() {
    let purpose = [
      <option key="2" value="Work Shop">
        Work Shop
      </option>,
      <option key="3" value="Guest Lecture">
        Guest Lecture
      </option>,
    ];
    const container = {
      marginTop: '100px',
      marginBottom: '70px',
      marginRight: '10px',

      marginLeft: '440px',
      width: '40%',
      height: '30%',
      display: 'flex',
      // flexWrap: 'wrap',

      justifyContent: 'center',
    };
    const inbox = {
      display: 'flex',
      lineHeight: '40px ',
      width: '270px',
      border: '2px solid grey',
      borderRadius: '5px',
    };
    return (
      <div style={container}>
        <div className="ui equal width grid">
          <div className="row">
            <h1>Event Registration</h1>
            <div className="column"></div>
          </div>

          <div
            className="row"
            style={{
              background: '#8db1ab',
              width: '700px',
              display: 'flex',
              textAlign: 'center',

              // margin: '40px 0px 0px 0px',
              color: 'white',
              fontSize: '18px',
              padding: '60px',

              borderRadius: '10px',
            }}
          >
            <div className="column">
              <div className="ui segment">
                <form className="ui form">
                  <div className="field">
                    <input
                      style={inbox}
                      placeholder="First Name"
                      type="text"
                      value={this.state.firstName}
                      onChange={this.onInputChange}
                      name="firstName"
                      required
                    />
                  </div>
                  <div className="field">
                    <input
                      style={{
                        position: 'relative',
                        left: '155px',
                        top: '-46px',
                        width: '270px',
                        borderRadius: '5px',
                        lineHeight: '40px',
                        border: '2px solid grey',
                      }}
                      placeholder="Last Name"
                      type="text"
                      value={this.state.lastName}
                      onChange={this.onInputChange}
                      name="lastName"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <select
                      style={{
                        display: 'flex',
                        lineHeight: '40px ',
                        width: '270px',
                        padding: '8px',
                        border: '2px solid grey',
                        borderRadius: '5px',
                      }}
                      name="purpose"
                      value={this.state.purpose}
                      onChange={this.onInputChange}
                    >
                      <option key="1" value=" ">
                        purpose
                      </option>
                      {purpose}
                    </select>
                  </div>
                  {/* <div className="field">
                  <input
                    style={inbox}
                    placeholder="Stream"
                    type="text"
                    value={this.state.stream}
                    onChange={this.onInputChange}
                    name="stream"
                    required
                  />
                </div> */}
                  <div className="field">
                    <input
                      style={{
                        position: 'relative',
                        left: '155px',
                        top: '-60px',
                        width: '270px',
                        borderRadius: '5px',
                        lineHeight: '40px',
                        border: '2px solid grey',
                      }}
                      placeholder="Place"
                      type="text"
                      value={this.state.place}
                      onChange={this.onInputChange}
                      name="place"
                      required
                    />
                  </div>
                  <div className="field">
                    <input
                      style={{
                        position: 'relative',
                        width: '580px',
                        borderRadius: '5px',
                        lineHeight: '40px',
                        border: '2px solid grey',
                      }}
                      placeholder="Email"
                      type="email"
                      value={this.state.email}
                      onChange={this.onInputChange}
                      name="email"
                      required
                    />
                  </div>

                  <div className="field">
                    <input
                      style={{
                        position: 'relative',
                        display: 'flex',
                        width: '580px',
                        borderRadius: '5px',
                        lineHeight: '40px',
                        margin: '40px 0px',
                        border: '2px solid grey',
                      }}
                      placeholder="Phone Number"
                      type="text"
                      value={this.state.phone}
                      onChange={this.onInputChange}
                      name="phone"
                      required
                    />
                  </div>

                  <div className="field">
                    <input
                      style={{
                        display: 'flex',
                        lineHeight: '40px ',
                        width: '270px',
                        border: '2px solid grey',
                        borderRadius: '5px',
                      }}
                      placeholder="Date"
                      type="Date"
                      value={this.state.date}
                      onChange={this.onInputChange}
                      name="date"
                      required
                    />
                  </div>

                  <div className="field">
                    <input
                      style={{
                        position: 'relative',
                        left: '155px',
                        top: '-47px',
                        width: '270px',
                        borderRadius: '5px',
                        lineHeight: '40px',
                        border: '2px solid grey',
                      }}
                      placeholder="Hours"
                      type="number"
                      min="1"
                      max="10"
                      value={this.state.hour}
                      onChange={this.onInputChange}
                      name="hour"
                      required
                    />
                  </div>
                  <div className="field">
                    <input
                      style={{
                        position: 'relative',
                        display: 'flex',
                        width: '580px',
                        borderRadius: '5px',
                        lineHeight: '40px',
                        margin: '10px 0px',
                        border: '2px solid grey',
                      }}
                      placeholder="Topic"
                      type="text"
                      value={this.state.topic}
                      onChange={this.onInputChange}
                      name="topic"
                      required
                    />
                  </div>

                  <div className="field">
                    <textarea
                      style={{
                        display: 'flex',
                        lineHeight: '40px ',
                        width: '500px',
                        border: '2px solid grey',
                        borderRadius: '5px',
                      }}
                      value={this.state.description}
                      onChange={this.onInputChange}
                      id="topic"
                      rows="4"
                      name="description"
                      cols="50"
                      placeholder=" Please describe the topic."
                      required
                    ></textarea>
                  </div>

                  <button
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
                    className="ui button"
                    onClick={(e) => this.onFormSubmit(e)}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PEvent;
