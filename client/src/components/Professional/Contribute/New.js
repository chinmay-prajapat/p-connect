import React, { Component } from 'react';
import decode from 'jwt-decode';
import axios from 'axios';

class New extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      link: '',
      description: '',
      document: '',

      contributer: decode(localStorage.getItem('token'))._id,
    };
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', this.state.title);
    formData.append('link', this.state.link);
    formData.append('description', this.state.description);
    formData.append('document', this.state.document);
    formData.append('contributer', this.state.contributer);

    axios
      .post('http://localhost:5000/api/contribute/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth': localStorage.getItem('token'),
        },
      })
      .then((res) => {
        console.log('byes', this.state.contributer);
        const formData = { id: res.data._id };
        console.log(formData.id);
        axios
          .put(
            `http://localhost:5000/api/users/myContribute/${this.state.contributer}`,
            formData
          )

          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });

        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });

    // axios
    //   .post('http://localhost:5000/api/contribute/get', formData.title)
    //   .then((res) => {});
    // // .catch((err) => {
    // //   this.setState({ err: err });
    // // });
  };

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
    const myStyle = {
      display: 'grid',
      justifyContent: 'center',
      gridGap: '16px',
      width: '700px',
      borderRadius: '5px',
      margin: '30px 0px 0px 220px',
      backgroundColor: '#f4f4f4',
      boxShadow:
        '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    };
    const inStyle = {
      border: '2px solid pink',
      borderRadius: '5px',
      width: '400px',
      lineHeight: '40px',
    };

    return (
      <div className="container">
        <div style={myStyle} className="row">
          <div className="col-6 col-sm-3">
            <label style={{ margin: '30px 0px' }}>Title:</label>
            <input
              style={inStyle}
              type="text"
              name="title"
              id="title"
              value={this.state.title}
              onChange={this.onInputChange}
              placeholder="Title"
              required
            />
          </div>
          <div className="w-100">
            <div className="col-6 col-sm-3">
              <label>Links if any:</label>
              <input
                style={inStyle}
                type="text"
                name="link"
                id="link"
                value={this.state.link}
                onChange={this.onInputChange}
                placeholder="Any web Links ?"
              />
            </div>
          </div>
          <div className="col">
            <label>Please describe your title:</label>
            <textarea
              style={{
                borderRadius: '5px',
                margin: '10px 0px',
                lineHeight: '40px',
                border: '2px solid pink',
              }}
              name="description"
              id="description"
              className="form-control "
              cols="50"
              rows="5"
              value={this.state.description}
              onChange={this.onInputChange}
              placeholder="Description"
              required
            ></textarea>
          </div>
          <div className="col">
            <label>Attchment if any(PDF only):</label>
            <input
              type="file"
              name="document"
              id="document"
              onChange={this.onFileChange}
            />
          </div>
          <div className="col" style={{ padding: '30px 0px' }}>
            <input
              type="submit"
              name="submit"
              value="submit"
              className="btn btn-primary"
              onClick={this.onFormSubmit}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default New;
