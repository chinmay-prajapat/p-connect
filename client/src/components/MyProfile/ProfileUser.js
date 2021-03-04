import React, { Component } from 'react';
import axios from 'axios';
import decode from 'jwt-decode';
import Image from '../../uploads/uploadsLocation';
class ProfileUser extends Component {
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
      img: '',
      teaching: 'Not specified',
      working: 'Not specified',
      bio: '',
      underGraduate: '',
      underGraduateCollege: '',
      postGraduate: '',
      postGraduateCollege: 'Not specified',
      specialization: 'Not specified',
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
      img: this.state.img,
      bio: this.state.bio.toLowerCase(),
      underGraduate: this.state.underGraduate.toUpperCase(),
      underGraduateCollege: this.state.underGraduateCollege.toLowerCase(),
      postGraduate: this.state.postGraduate.toUpperCase(),
      postGraduateCollege: this.state.postGraduateCollege.toLowerCase(),
      teaching: this.state.teaching.toLowerCase(),
      working: this.state.working.toLowerCase(),
      specialization: this.state.specialization.toLowerCase(),
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
      img: data.img,
      bio: data.bio,
      underGraduate: data.underGraduate,
      underGraduateCollege: data.underGraduateCollege,
      postGraduate: data.postGraduate,
      postGraduateCollege: data.postGraduateCollege,
      teaching: data.teaching,
      working: data.working,
      specialization: data.specialization,
      profession: data.profession,
    });
  }

  render() {
    console.log('this is my img', this.state.teaching);
    const myStyle = {
      fontWeight: 'bold',
    };

    return (
      <div className="container">
        <h3
          style={{ textAlign: 'center', padding: '20px', fontWeight: 'bold' }}
        >
          Update Your Profile
        </h3>
        <div className="form-row align-items-center">
          <div className="col-sm-3 my-1" style={{ left: '280px' }}>
            <label style={myStyle} htmlFor="firstName">
              First Name
            </label>
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
            <label style={myStyle} htmlFor="lastName">
              Last Name
            </label>
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
            <label style={myStyle} htmlFor="email">
              Email
            </label>
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
            <label style={myStyle} htmlFor="phone">
              Phone
            </label>
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
            <label style={myStyle} htmlFor="underGraduate">
              Please write your UG degree
            </label>
            <input
              placeholder="UG Degree"
              type="text"
              value={this.state.underGraduate}
              onChange={this.handleChange}
              name="underGraduate"
              className="form-control"
            />
          </div>
        </div>
        <div className="form-row align-items-center">
          <div className="col-sm-6 my-1" style={{ left: '280px' }}>
            <label style={myStyle} htmlFor="underGraduate">
              Please write your UG college
            </label>
            <input
              placeholder="UG College"
              type="text"
              value={this.state.underGraduateCollege}
              onChange={this.handleChange}
              name="underGraduateCollege"
              className="form-control"
            />
          </div>
        </div>
        <div className="form-row align-items-center">
          <div className="col-sm-6 my-1" style={{ left: '280px' }}>
            <label style={myStyle} htmlFor="underGraduate">
              Please write your PG degree
            </label>
            <input
              placeholder="PG Degree"
              type="text"
              value={this.state.postGraduate}
              onChange={this.handleChange}
              name="postGraduate"
              className="form-control"
            />
          </div>
        </div>
        <div className="form-row align-items-center">
          <div className="col-sm-6 my-1" style={{ left: '280px' }}>
            <label style={myStyle} htmlFor="underGraduate">
              Please write your UG college
            </label>
            <input
              placeholder="PG College"
              type="text"
              value={this.state.postGraduateCollege}
              onChange={this.handleChange}
              name="postGraduateCollege"
              className="form-control"
            />
          </div>
        </div>
        <div className="form-row align-items-center">
          <div className="col-sm-6 my-1" style={{ left: '280px' }}>
            <label style={myStyle} htmlFor="teaching">
              Currently teaching? if yes then please specify.
            </label>
            <input
              placeholder="Teaching"
              type="text"
              value={this.state.teaching}
              onChange={this.handleChange}
              name="teaching"
              className="form-control"
            />
          </div>
        </div>
        <div className="form-row align-items-center">
          <div className="col-sm-6 my-1" style={{ left: '280px' }}>
            <label style={myStyle} htmlFor="working">
              Currently working? if yes then please specify.
            </label>
            <input
              placeholder="Working"
              type="text"
              value={this.state.working}
              onChange={this.handleChange}
              name="working"
              className="form-control"
            />
          </div>
        </div>
        <div className="form-row align-items-center">
          <div className="col-sm-6 my-1" style={{ left: '280px' }}>
            <label style={myStyle} htmlFor="bio">
              Specialization In:
            </label>
            <input
              placeholder="Write your specialization"
              type="text"
              value={this.state.specialization}
              onChange={this.handleChange}
              name="specialization"
              className="form-control"
            />
          </div>
        </div>
        <div className="form-row align-items-center">
          <div className="col-sm-6 my-1" style={{ left: '280px' }}>
            <label style={myStyle} htmlFor="specialization">
              Brief yourself:
            </label>
            <textarea
              placeholder="Please write about yourself,interest,teaching,working,current professional status etc."
              rows="4"
              col="4"
              type="text"
              value={this.state.bio}
              onChange={this.handleChange}
              name="bio"
              className="form-control"
            />
          </div>
        </div>

        {/* <div className="column ui segment" style={{ margin: '0.5%' }}>
          <div className="row ">Profile Image</div>
          <div className="row ui segment">
            {this.state.img ? (
              <img
                style={{ width: '99%', height: '50%' }}
                alt="Lake Before"
                src={`http://localhost:5000/uploads/${this.state.img}`}
              />
            ) : (
              <h1>Profile Image</h1>
            )}
          </div>
        </div> */}

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
export default ProfileUser;
