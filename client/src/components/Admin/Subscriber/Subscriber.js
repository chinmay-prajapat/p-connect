import React, { Component } from 'react';
import axios from 'axios';
// import generateData from '../generateData';
import { Link } from 'react-router-dom';
import moment from 'moment';

class Subscriber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      delete: 0,
      search: ' ',
    };
  }
  //   deleteItem = (itemId) => {
  //     this.setState({
  //       data: this.state.data.filter((data) => data.name !== itemId),
  //     });
  //   };
  deleteItem = (itemId) => {
    axios
      .delete(`http://localhost:5000/users/delete/${itemId}`)
      .then((response) => {
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    axios
      .get('http://localhost:5000/api/users/account/')
      .then((response) => {
        this.setState({
          // records: response.data,
          records: response.data.filter(
            (role) => role.roles === 'user' && role.amount !== 0
          ),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setSearch = (e) => {
    this.setState({
      search: e.target.value,
    });
  };
  render() {
    // const { data } = this.state;
    let sortStream = [
      <option key="2" value="Computer Science">
        Computer Science
      </option>,
      <option key="3" value="Bio">
        Bio
      </option>,
      <option key="4" value="Civil Engineering">
        Civil Engineering
      </option>,
      <option key="5" value="Physics">
        Physics
      </option>,
    ];

    let { records, isShowingAlert } = this.state;
    return (
      <div className="container-fluid">
        <div
          className="container  "
          style={{ textAlign: 'center', width: '300px', padding: '20px' }}
        >
          <div className=" shadow-lg p-3 mb-5 bg-white rounded border border-primary">
            <h1 style={{ fontWeight: 'bold' }}>Subscriber</h1>
          </div>
        </div>

        <div className=" table-responsive table-full-width p-0 m-0 ">
          <table className="table table-hover table-striped p-0 m-0 shadow-lg p-3 mb-5 bg-white rounded border border-primary">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Mobile</th>

                <th>Email Id</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Action</th>

                {/* <th
                  className="text-right"
                  data-checkbox="true"
                  data-search="true"
                >
                  Salary
                </th> */}
              </tr>
            </thead>
            <tbody>
              {records
                // .filter((record) => {
                //   if (this.state.search === ' ') return record;
                //   else if (record.stream === this.state.search) {
                //     return record;
                //   }
                //   // else ifs (a.stream.includes('Bio')) {
                //   //   return a;
                //   // }
                // })
                .map((record) => (
                  <tr key={record.firstName}>
                    <td>{record.firstName.toUpperCase()}</td>

                    <td>{record.lastName.toUpperCase()}</td>

                    <td>{record.phone}</td>
                    <td>{record.email}</td>
                    <td>{record.amount}</td>
                    <td style={{ color: '#79d70f' }}>
                      {moment(record.createdAt).format('MMM Do YY')}
                    </td>
                    <td>
                      <Link
                        className="btn btn-danger"
                        to={{
                          pathname: `/edit/${record._id}`,
                          state: { record },
                        }}
                      >
                        Edit
                      </Link>
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
export default Subscriber;
