import React, { Component } from 'react';
import axios from 'axios';
import decode from 'jwt-decode';
import { Document, Page } from 'react-pdf';
// import generateData from '../generateData';
import { Link } from 'react-router-dom';

class Old extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      delete: 0,
      title: '',
      description: '',
      link: '',
      location: '',
      document: '',
    };
  }
  //   deleteItem = (itemId) => {
  //     this.setState({
  //       data: this.state.data.filter((data) => data.name !== itemId),
  //     });
  //   };
  deleteItem = (itemId) => {
    axios
      .delete(`http://localhost:5000/api/contribute/delete/${itemId}`)
      .then((response) => {
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    const id = decode(localStorage.getItem('token'))._id;
    axios
      .get(`http://localhost:5000/api/users/getContribution/${id}`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          data: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(this.data);
  }
  render() {
    // const { data } = this.state;

    let { data } = this.state;

    return (
      <div className="card">
        <div className="header" align="center">
          <h1
            style={{
              textAlign: 'center',
              color: ' black',
              fontWeight: 'bold',
              padding: '20px',
            }}
          >
            My Feed
          </h1>
        </div>
        <div className="content table-responsive table-full-width">
          <table className="table table-hover ">
            <thead className="thead-dark">
              <tr>
                <th filter={{ type: 'TextFilter' }} dataSort>
                  Title
                </th>
                <th>Links</th>
                <th>Description</th>

                {/* <th
                  className="text-right"
                  data-checkbox="true"
                  data-search="true"
                >
                  Salary
                </th> */}

                <th>Document</th>

                <th>Document Link</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody style={{ boxShadow: '2px 2px 2px grey' }}>
              {data.map((data) => (
                <tr style={{}}>
                  <td>{data.title}</td>
                  <td>
                    {' '}
                    <a href={data.link} target="blank">
                      {data.link}
                    </a>
                  </td>

                  <td>{data.description}</td>
                  <td>{data.document}</td>

                  <a href={data.location} target="blank">
                    {data.location}
                  </a>

                  {/* <td className="text-right">$ {data.salary}</td> */}
                  {/* <td>
                    <button>
                      <Link
                        to={{
                          pathname: `/MyCustom/${data._id}`,
                          state: { data },
                        }}
                        style={{ color: '#0000ff', fontSize: '15px' }}
                      >
                        Edit
                      </Link> */}

                  {/* <i className="fa fa-remove"></i> */}
                  {/* </button>
                  </td> */}
                  <td>
                    <button
                      // rel="tooltip"
                      // className="btn btn-info btn-simple btn-xs"
                      data-original-title="View Profile"
                      onClick={() => this.deleteItem(data._id)}
                      style={{ color: 'red', fontSize: '15px' }}
                    >
                      Delete
                      {/* <i className="fa fa-remove"></i> */}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default Old;
