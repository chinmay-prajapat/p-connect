import React, { Component } from 'react';
import axios from 'axios';
import decode from 'jwt-decode';
class updateProfile extends Component {
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
    };
  }
  handleChange = (e) => {
    e.persist();
    this.setState(() => ({
      [e.target.name]: e.target.value,
    }));
  };

  onFileChange = (e) => {
    this.setState({ [e.target.name]: e.target.files[0] });
  };

  handleSubmit = (e) => {
    const id = decode(localStorage.getItem('token'))._id;

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

    // axios
    //   .post('http://localhost:5000/api/users/upload', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //       'x-auth': localStorage.getItem('token'),
    //     },
    //   })
    //   .then((res) => {
    //     window.location.reload();
    //   })
    //   .catch((err) => {
    //     this.setState({ err: err });
    //   });

    console.log(id);
    console.log(formData);
    axios
      .post(`http://localhost:5000/api/users/update1/${id}`, formData)
      .then(() => {
        this.props.history.push('/myProfile');
      })
      .catch((res) => {});
  };
  componentDidMount() {
    const { data } = this.props.location.state;
    this.setState({
      firstName: data.firstName,
      lastName: data.lastName,
      stream: data.stream,
      city: data.city,
      email: data.email,
      phone: data.phone,
      experience: data.experience,
      password: data.password,
      repeatPassword: data.repeatPassword,
      certificate: data.certificate,
      profession: data.profession,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="form-row align-items-center">
          <div className="col-sm-3 my-1" style={{ left: '280px' }}>
            <input
              placeholder="First Name"
              type="text"
              value={this.state.firstName}
              onChange={this.handleChange}
              name="firstName"
              disabled="disabled"
              className="form-control"
            />
          </div>
          <div className="col-sm-3 my-1" style={{ left: '280px' }}>
            <input
              placeholder="Last Name"
              type="text"
              value={this.state.lastName}
              onChange={this.handleChange}
              name="lastName"
              disabled="disabled"
              className="form-control"
            />
          </div>
        </div>
        <div className="form-row align-items-center">
          <div className="col-sm-6 my-1" style={{ left: '280px' }}>
            <input
              placeholder="Email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
              name="email"
              className="form-control"
              disabled="disabled"
            />
          </div>
        </div>
        <div className="form-row align-items-center">
          <div className="col-sm-6 my-1" style={{ left: '280px' }}>
            <input
              placeholder="Mobile No"
              type="text"
              value={this.state.phone}
              onChange={this.handleChange}
              name="phone"
              className="form-control"
            />
          </div>
        </div>
        <div className="form-row align-items-center">
          <div className="col-sm-6 my-1" style={{ left: '280px' }}>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => this.handleSubmit(e)}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default updateProfile;
