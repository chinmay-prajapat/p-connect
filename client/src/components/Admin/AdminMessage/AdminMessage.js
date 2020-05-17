import React, { Component } from 'react';
import axios from 'axios';
// import generateData from '../generateData';
import { Link } from 'react-router-dom';

class AdminMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      delete: 0,
    };
  }
  //   deleteItem = (itemId) => {
  //     this.setState({
  //       data: this.state.data.filter((data) => data.name !== itemId),
  //     });
  //   };
  deleteItem = (itemId) => {
    axios
      .delete(`http://localhost:5000/api/about/delete/${itemId}`)
      .then((response) => {
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    axios
      .get('http://localhost:5000/api/about/')
      .then((response) => {
        this.setState({
          data: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    // const { data } = this.state;

    let { data, isShowingAlert } = this.state;
    return (
      <div className="card">
        <div className="header" align="center">
          <h1
            style={{
              textAlign: 'center',
              color: ' rgb(51, 122, 183)',
              fontWeight: 'bold',
            }}
          >
            Query View
          </h1>
        </div>
        <div className="content table-responsive table-full-width">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th
                  style={{
                    display: 'table-cell',
                    verticalAlign: 'inherit',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    width: '150px',
                  }}
                >
                  First Name
                </th>
                <th style={{ width: '150px' }}>Last Name</th>
                <th>Email</th>

                {/* <th
                  className="text-right"
                  data-checkbox="true"
                  data-search="true"
                >
                  Salary
                </th> */}

                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {data.map((data) => (
                <tr>
                  <td style={{}}>{data.firstName.toUpperCase()}</td>
                  <td>{data.lastName.toUpperCase()}</td>
                  <td>
                    {' '}
                    <a href={`mailto:${data.email}`}>{data.email}</a>
                  </td>
                  <td>{data.message}</td>

                  {/* <td className="text-right">$ {data.salary}</td>
                  <td>
                    <button>
                      <Link
                        to={{
                          pathname: `/MyCustom/${data._id}`,
                          state: { data },
                        }}
                        style={{ color: '#0000ff', fontSize: '15px' }}
                      >
                        Edit
                      </Link>

                      <i className="fa fa-remove"></i>
                    </button>
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
export default AdminMessage;
