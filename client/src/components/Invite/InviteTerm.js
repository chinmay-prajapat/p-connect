import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { Link } from 'react-router-dom';
//import React, { Component } from 'react';

const myStyle = {
  textAlign: 'left',
};
class InviteTerm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
    };
  }
  toggleChange = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  };
  onFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    this.props.history.push('/invite');
  };
  render() {
    return (
      <div className="container">
        <h1
          style={{
            textAlign: 'center',
            backgroundColor: 'grey',
            padding: '20px',
            margin: '20px 0px',
          }}
        >
          Terms & Conditions
        </h1>

        <div className="row">
          <div className="col">
            <p>
              1.Please analyzed the profile carefully and be sure before
              inviting any professional whether the professional is suitable for
              your session or not.
            </p>
            <p>
              2. Fill your details very carefully and be specific about every
              detail in the invite form to get in touch by the professional.
            </p>
            <p>
              3. After inviting please wait to get confirmation from the
              professional for your request.
            </p>
            <p>
              4. With the confirmation, you will get contact details of
              professional where you can contact with professional
            </p>
            <p>
              5. Before with date of the session please clarify all the
              prerequisites with the professional.
            </p>
            <p>6.For cancellation please report through About.</p>

            <p>*For any further query you please contact through about page</p>
          </div>
        </div>
        <form onSubmit={(e) => this.onFormSubmit(e)}>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="defaultCheck1"
              required
            />
            <label className="form-check-label" htmlFor="defaultCheck1">
              I have read and understood the terms and conditions and pledge to
              practice them.
            </label>
          </div>
          <div>
            <button className="btn btn-info" type="submit" name="submit">
              Next
            </button>

            {/* <Link
              style={{
                margin: '20px 0px',

                textAlign: 'center',
              }}
              to="/pregister"
              type="submit"
              name="submit"
              className="btn btn-info"
            >
              Next
            </Link> */}
          </div>
        </form>
      </div>
    );
  }
}
export default InviteTerm;
