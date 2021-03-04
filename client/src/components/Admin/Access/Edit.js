import React from 'react';
import axios from 'axios';

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      stream: '',
      city: '',
      email: '',
      phone: '',
      experience: '',
      password: '',
      repeatPassword: '',
      certificate: '',
      profession: '',
      roles: '',
      allowAccess: '',
    };
    console.log(this.props);
  }

  handleChange = (e) => {
    e.persist();
    this.setState(() => ({
      [e.target.name]: e.target.value,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      stream: this.state.stream,
      city: this.state.city,
      email: this.state.email,
      phone: this.state.phone,
      experience: this.state.experience,
      password: this.state.password,
      repeatPassword: this.state.repeatPassword,
      certificate: this.state.certificate,
      profession: this.state.profession,
      roles: this.state.roles,
      allowAccess: this.state.allowAccess,
    };

    axios
      .put(
        `http://localhost:5000/api/users/allow/${this.props.match.params.id}`,
        formData
      )
      .then((res) => {
        console.log(this.props.match.params.id);

        // this.props.history.push('/');

        const myEmail = {
          email: this.state.email,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
        };
        console.log(myEmail);
        axios
          .post('/api/users/confirm', myEmail)
          .then((res) => {
            console.log('Email send');
          })
          .catch((err) => {
            console.log(err);
          });
        window.location.reload();
        console.log(res.data);
      })
      .catch((res) => {
        console.log(res.data);
      });
  };

  componentDidMount() {
    const { record } = this.props.location.state;
    this.setState({
      firstName: record.firstName,
      lastName: record.lastName,
      stream: record.stream,
      city: record.city,
      email: record.email,
      phone: record.phone,
      experience: record.experience,
      password: record.password,
      repeatPassword: record.repeatPassword,
      certificate: record.certificate,
      profession: record.profession,
      roles: record.roles,
      allowAccess: record.allowAccess,
    });
  }
  render() {
    // let containerTypeValues = this.state.containerTypeValues
    //   ? this.state.containerTypeValues.map((containerTypeValue, index) => (
    //       <option key={index} value={containerTypeValue.containerType}>
    //         {containerTypeValue.containerType}
    //       </option>
    //     ))
    //   : null;

    let allowAccess = [
      <option key="1" value="yes">
        Yes
      </option>,
      <option key="2" value="no">
        No
      </option>,
    ];

    const container = {
      marginTop: '58px',
      marginBottom: '70px',
      marginRight: '10px',
      marginLeft: '10px',
      width: '100%',
      display: 'flex',
      // flexWrap: 'wrap',
      justifyContent: 'center',
    };
    return (
      <div
        className="container border border-primary shadow-lg p-3 mb-5 bg-white rounded"
        style={{ marginTop: '50px' }}
      >
        <div style={container}>
          <div className="container">
            <div
              className=" shadow-lg p-3 mb-5 rounded border border-primary"
              style={{
                width: '300px',
                backgroundColor: '#d63447',
                color: 'grey',
              }}
            >
              <h1
                style={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                Access
              </h1>
            </div>
          </div>
          <div className="ui equal width grid">
            <form className="ui form">
              <div className="row">
                <div className="col-6 col-md-4">
                  <label>First Name :</label>
                  <br></br>
                  <input
                    placeholder="First Name"
                    type="text"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                    name="firstName"
                    className="form-control"
                  />
                </div>
                <div className="col-6 col-md-4">
                  <label>Last Name:</label>
                  <br></br>
                  <input
                    placeholder="Last Name"
                    type="text"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                    name="lastName"
                    className="form-control"
                  />
                </div>
                <div className="col-6 col-md-4">
                  <label>Email:</label>
                  <br></br>
                  <input
                    placeholder="Email"
                    type="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    name="email"
                    className="form-control"
                  />
                </div>
                <div className="col-6 col-md-4">
                  <label>Stream:</label>
                  <br></br>
                  <input
                    placeholder="Stream"
                    type="text"
                    value={this.state.stream}
                    onChange={this.handleChange}
                    name="stream"
                    className="form-control"
                  />
                </div>
                <div className="col-6 col-md-4">
                  <label>City:</label>
                  <br></br>
                  <input
                    placeholder="City"
                    type="text"
                    value={this.state.city}
                    onChange={this.handleChange}
                    name="city"
                    className="form-control"
                  />
                </div>
                <div className="col-6 col-md-4">
                  <label>Phone:</label>
                  <br></br>
                  <input
                    placeholder="Phone"
                    type="text"
                    value={this.state.phone}
                    onChange={this.handleChange}
                    name="phone"
                    className="form-control"
                  />
                </div>
                <div className="col-6 col-md-4">
                  <label>Experience:</label>
                  <br></br>
                  <input
                    placeholder="Experience"
                    type="text"
                    value={this.state.experience}
                    onChange={this.handleChange}
                    name="experience"
                    className="form-control"
                  />
                </div>
                <div className="col-6 col-md-4">
                  <label>Profession:</label>
                  <br></br>
                  <input
                    placeholder="name"
                    type="text"
                    value={this.state.profession}
                    onChange={this.handleChange}
                    name="profession"
                    className="form-control"
                  />
                </div>
                <div className="col-6 col-md-4">
                  <label>Access Allow:</label>
                  <br />
                  <select
                    name="allowAccess"
                    value={this.state.allowAccess}
                    onChange={this.handleChange}
                    style={{ marginRight: 10 }}
                  >
                    <option>Change the Status</option>
                    {allowAccess}
                  </select>
                </div>
              </div>
              <br />
              <br />
              <button
                type="submit"
                className="btn btn-warning"
                onClick={(e) => this.handleSubmit(e)}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
