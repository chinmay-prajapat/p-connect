import React, { Component } from 'react';
import axios from 'axios';
// import generateData from '../generateData';
import { Link } from 'react-router-dom';

class Invite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      first: [],
      second: [],
      rating: [],
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
          records: response.data.filter(
            (role) => role.roles === 'professional'
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
      <option key="2" value="Bachelor of Architecture - B.Arch">
        Bachelor of Architecture - B.Arch
      </option>,
      <option key="3" value="Bachelor of Arts - B.A.">
        Bachelor of Arts - B.A.
      </option>,
      <option
        key="4"
        value="Bachelor of Ayurvedic Medicine & Surgery - B.A.M.S."
      >
        Bachelor of Ayurvedic Medicine & Surgery - B.A.M.S.
      </option>,
      <option key="5" value="Bachelor of Business Administration - B.B.A.">
        Bachelor of Business Administration - B.B.A.
      </option>,
      <option key="6" value="Bachelor of Commerce - B.Com.">
        Bachelor of Commerce - B.Com.
      </option>,
      <option key="7" value="Bachelor of Computer Applications - B.C.A.">
        Bachelor of Computer Applications - B.C.A.
      </option>,
      <option key="8" value="Bachelor of Dental Surgery - B.D.S.">
        Bachelor of Dental Surgery - B.D.S.
      </option>,
      <option key="9" value="Bachelor of Design - B.Des. / B.D.">
        Bachelor of Design - B.Des. / B.D.
      </option>,
      <option key="10" value="Bachelor of Education - B.Ed.">
        Bachelor of Education - B.Ed.
      </option>,
      <option
        key="11"
        value="Bachelor of Engineering / Bachelor of Technology - B.E./B.Tech."
      >
        Bachelor of Engineering / Bachelor of Technology - B.E./B.Tech.
      </option>,
      <option key="12" value="Bachelor of Fine Arts - BFA / BVA">
        Bachelor of Fine Arts - BFA / BVA
      </option>,
      <option
        key="13"
        value="Bachelor of Fisheries Science - B.F.Sc./ B.Sc. (Fisheries)."
      >
        Bachelor of Fisheries Science - B.F.Sc./ B.Sc. (Fisheries).
      </option>,
      <option key="14" value="Bachelor of Laws - L.L.B.">
        Bachelor of Laws - L.L.B.
      </option>,
      <option key="15" value="Bachelor of Library Science - B.Lib. / B.Lib.Sc.">
        Bachelor of Library Science - B.Lib. / B.Lib.Sc.
      </option>,
      <option
        key="16"
        value="Bachelor of Mass Communications - B.M.C. / B.M.M."
      >
        Bachelor of Mass Communications - B.M.C. / B.M.M.
      </option>,
      <option
        key="17"
        value="Bachelor of Medicine and Bachelor of Surgery - M.B.B.S.
               "
      >
        Bachelor of Medicine and Bachelor of Surgery - M.B.B.S.
      </option>,
      <option key="18" value="Bachelor of Nursing">
        Bachelor of Nursing
      </option>,
      <option key="19" value="Bachelor of Pharmacy - B.Pharm / B.Pharma.">
        Bachelor of Pharmacy - B.Pharm / B.Pharma.
      </option>,
      <option key="20" value="Bachelor of Physical Education - B.P.Ed.">
        Bachelor of Physical Education - B.P.Ed.
      </option>,
      <option key="21" value="Bachelor of Physiotherapy - B.P.T.">
        Bachelor of Physiotherapy - B.P.T.
      </option>,
      <option key="22" value="Bachelor of Science - B.Sc.">
        Bachelor of Science - B.Sc.
      </option>,
      <option key="23" value="Bachelor of Social Work - BSW / B.A. (SW)">
        Bachelor of Social Work - BSW / B.A. (SW)
      </option>,
      <option
        key="24"
        value="Bachelor of Veterinary Science & Animal Husbandry - B.V.Sc. & A.H. / B.V.Sc"
      >
        Bachelor of Veterinary Science & Animal Husbandry - B.V.Sc. & A.H. /
        B.V.Sc
      </option>,
      <option key="25" value="Doctor of Medicine - M.D.">
        Doctor of Medicine - M.D.
      </option>,
      <option
        key="26"
        value="Doctor of Medicine in Homoeopathy - M.D. (Homoeopathy)"
      >
        Doctor of Medicine in Homoeopathy - M.D. (Homoeopathy)
      </option>,
      <option key="27" value="Doctor of Pharmacy - Pharm.D">
        Doctor of Pharmacy - Pharm.D
      </option>,
      <option key="28" value="Doctor of Philosophy - Ph.D. ">
        Doctor of Philosophy - Ph.D.
      </option>,
      <option key="29" value="Doctorate of Medicine - D.M.">
        Doctorate of Medicine - D.M.
      </option>,
      <option key="30" value="Master of Architecture - M.Arch.">
        Master of Architecture - M.Arch.
      </option>,
      <option key="31" value="Master of Arts - M.A.">
        Master of Arts - M.A.
      </option>,
      <option key="32" value="Master of Business Administration - M.B.A.">
        Master of Business Administration - M.B.A.
      </option>,
      <option
        key="33"
        value="Master of Chirurgiae - M.Ch.
                               "
      >
        Master of Chirurgiae - M.Ch.
      </option>,
      <option key="34" value="Master of Commerce - M.Com.">
        Master of Commerce - M.Com.
      </option>,
      <option key="35" value="Master of Computer Applications - M.C.A.">
        Master of Computer Applications - M.C.A.
      </option>,
      <option key="36" value="Master of Dental Surgery - M.D.S.">
        Master of Dental Surgery - M.D.S.
      </option>,
      <option key="37" value="Master of Design - M.Des./ M.Design.">
        Master of Design - M.Des./ M.Design.
      </option>,
      <option key="38" value="Master of Education - M.Ed.">
        Master of Education - M.Ed.
      </option>,
      <option
        key="39"
        value="Master of Engineering / Master of Technology - M.E./ M.Tech."
      >
        Master of Engineering / Master of Technology - M.E./ M.Tech.
      </option>,
      <option key="40" value="Master of Fine Arts - MFA / MVA">
        Master of Fine Arts - MFA / MVA
      </option>,
      <option key="41" value="Master of Laws - L.L.M.">
        Master of Laws - L.L.M.
      </option>,
      <option key="42" value="Master of Library Science - M.Lib./ M.Lib.Sc.">
        Master of Library Science - M.Lib./ M.Lib.Sc.
      </option>,
      <option
        key="43"
        value="Master of Mass Communications / Mass Media - M.M.C / M.M.M."
      >
        Master of Mass Communications / Mass Media - M.M.C / M.M.M.
      </option>,
      <option key="44" value="Master of Pharmacy - M.Pharm">
        Master of Pharmacy - M.Pharm
      </option>,
      <option key="45" value="Master of Philosophy - M.Phil.  ">
        Master of Philosophy - M.Phil.
      </option>,
      <option key="46" value="Master of Physical Education M.P.Ed. / M.P.E.">
        Master of Physical Education M.P.Ed. / M.P.E.
      </option>,
      <option key="47" value="Master of Physiotherapy - M.P.T.">
        Master of Physiotherapy - M.P.T.
      </option>,
      <option key="48" value="Master of Science - M.Sc.">
        Master of Science - M.Sc.
      </option>,
      <option
        key="49"
        value="Master of Social Work / Master of Arts in Social Work - M.S.W. / M.A. (SW)"
      >
        Master of Social Work / Master of Arts in Social Work - M.S.W. / M.A.
        (SW)
      </option>,
      <option
        key="50"
        value="Master of Science in Agriculture - M.Sc. (Agriculture)"
      >
        Master of Science in Agriculture - M.Sc. (Agriculture)
      </option>,
      <option key="51" value="Master of Surgery - M.S.">
        Master of Surgery - M.S.
      </option>,
      <option key="52" value="Master of Veterinary Science - M.V.Sc.">
        Master of Veterinary Science - M.V.Sc.
      </option>,
    ];

    let { records, isShowingAlert } = this.state;
    return (
      <div className="card">
        <div
          className="container "
          style={{ textAlign: 'center', width: '300px', paddingTop: '20px' }}
        >
          <div className=" shadow-lg p-3 mb-5 bg-white rounded border border-primary">
            <h1 style={{ fontWeight: 'bold' }}>Mentors</h1>
          </div>
        </div>
        <div>
          <select
            name="sortStream"
            value={this.state.sortStream}
            onChange={this.setSearch}
          >
            <option key="1" value=" ">
              Choose Stream
            </option>
            {sortStream}
          </select>
        </div>
        <div className=" content table-responsive table-full-width p-0 m-0">
          <table className="table table-hover table-striped p-0 m-0">
            <thead>
              <tr>
                <th>Name</th>

                <th>Stream</th>
                <th>Experience</th>

                {/* <th
                  className="text-right"
                  data-checkbox="true"
                  data-search="true"
                >
                  Salary
                </th> */}
                <th>Specialization</th>

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
                .map((record, i) => (
                  <tr key={record.firstName}>
                    <Link
                      to={{
                        pathname: `/inviteprofile/${record._id}`,
                        state: {
                          record,
                        },
                      }}
                    >
                      <td>
                        {record.firstName.toUpperCase()}&nbsp;&nbsp;
                        {record.lastName.toUpperCase()}
                      </td>
                    </Link>

                    <td>{record.stream}</td>

                    <td>{record.experience}</td>

                    <td>{record.specialization}</td>
                    <td>{record.city.toUpperCase()}</td>
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
export default Invite;
