import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import decode from 'jwt-decode';
import Contri from '../../Image/Contri.gif';
const user = {
  backgroundColor: '#4d4c7d',
  display: 'flex',
  justifyContent: 'center',
  fontSize: '20px',
  float: 'center',
  width: '20px',
  margin: '250px 0px 0px 300px',

  padding: '30px 0px',

  borderRadius: '10px',
};

class Contribute extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <body
        style={{
          backgroundImage: `url(${Contri})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'black',

          backgroundSize: 'cover',
          padding: '20px',
        }}
      >
        <div className="container ">
          <div className="row">
            <div className="col" style={{ top: '135px' }}>
              <h1
                style={{
                  textAlign: 'center',
                  fontSize: '60px',
                  fontWeight: 'bold',
                  padding: '28px',

                  color: '#14213d',
                }}
              >
                Your Feed
              </h1>
            </div>
          </div>
          <div
            className="row "
            style={{
              textAlign: 'center',
              margin: '250px  ',

              fontSize: '27px',
            }}
          >
            <div className="col " style={{ right: '50px' }}>
              <Link
                style={{
                  fontWeight: 'bold',
                }}
                className="btn btn-dark "
                to={{
                  pathname: `/new/${decode(localStorage.getItem('token'))._id}`,
                  state: {
                    contributeId: decode(localStorage.getItem('token'))._id,
                  },
                }}
              >
                New
              </Link>
            </div>

            <div className="col" style={{ left: '160px' }}>
              <Link
                style={{ fontWeight: 'bold' }}
                className="btn btn-dark"
                to={{
                  pathname: `/old/${decode(localStorage.getItem('token'))._id}`,
                  state: {
                    contributeId: decode(localStorage.getItem('token'))._id,
                  },
                }}
              >
                Old
              </Link>
            </div>
          </div>
        </div>
      </body>
    );
  }
}
export default Contribute;
