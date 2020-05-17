import React, { Component } from 'react';
import axios from 'axios';
// import generateData from '../generateData';
import { Link } from 'react-router-dom';

class Mentor extends Component {
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
      .get('http://localhost:5000/api/users/account')
      .then((response) => {
        this.setState({
          records: response.data.filter((role) => role.roles !== 'user'),
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
      <div className="card">
        <div>
          <select
            name="sortStream"
            value={this.state.sortStream}
            onChange={this.setSearch}
          >
            <option key="1" value=" "></option>
            {sortStream}
          </select>
        </div>
        <div className="header" align="center">
          <h1
            style={{
              textAlign: 'center',
              color: ' black',
              fontWeight: 'bold',
            }}
          >
            Mentor View
          </h1>
        </div>
        <div className=" content table-responsive table-full-width p-0 m-0">
          <table className="table table-hover table-striped p-0 m-0">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Stream</th>
                <th>Experience</th>

                {/* <th
                  className="text-right"
                  data-checkbox="true"
                  data-search="true"
                >
                  Salary
                </th> */}

                <th>City</th>
                <th>Profession</th>
              </tr>
            </thead>
            <tbody>
              {records
                .filter((record) => {
                  if (this.state.search === ' ') return record;
                  else if (record.stream === this.state.search) {
                    return record;
                  }
                  // else ifs (a.stream.includes('Bio')) {
                  //   return a;
                  // }
                })
                .map((record) => (
                  <tr key={record.firstName}>
                    <Link
                      to={{
                        pathname: `/mentor/${record._id}`,
                        state: {
                          record,
                        },
                      }}
                    >
                      <td>{record.firstName}</td>
                    </Link>

                    <td>{record.lastName}</td>
                    <td>{record.stream}</td>
                    <td>{record.experience}</td>
                    {/* <td>{record.email}</td> */}
                    <td>{record.city}</td>
                    <td>{record.profession}</td>
                    <td></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default Mentor;
