import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { Link } from 'react-router-dom';
//import React, { Component } from 'react';

const myStyle = {
  textAlign: 'left',
};
class Terms extends Component {
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
    this.props.history.push('/pregister');
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
            <p style={myStyle}>
              As a condition of use, you promise not to use the Services for any
              purpose that is unlawful or prohibited by these Terms.
            </p>

            <p>
              1. To abuse, harass, threaten, impersonate or intimidate any
              person.
            </p>
            <p>
              2. To post or transmit, or cause to be posted or transmitted, any
              Content that is libelous, defamatory, obscene, pornographic,
              abusive, offensive, profane, or that infringes any copyright or
              other right of any person.
            </p>
            <p>
              3. To communicate with representatives or other users in an
              abusive or offensive manner.
            </p>
            <p>
              4. To post copyrighted Content that does not belong to you, unless
              you are commenting on Visual Content in Blogs, where you may post
              such Content subject to providing appropriate attribution to the
              copyright owner and a link to the source of the Content.
            </p>
            <p>
              5. It is required to all professionals to pre-defined the charges
              of workshop or guest lecture.(No extra charges will be asked to
              inviter later-on)
            </p>
            <p>
              6. As per terms and conditions, the total amount of services will
              be given to the professionals at the end of the month after
              charges are levied.
            </p>
            <p>
              7. To get monetary benefits or invites you must need to be active
              on the platform by sharing feeds and answering the question being
              asked by other users.
            </p>

            <p>
              8. Any abnormality must be reported the organization through about
              page.
            </p>
            <p>
              9. For any account related query must be reported through the
              about page.
            </p>
            <p>10. Any refund query must be reported through about page.</p>
            <p>
              11. the refund can be given on certain conditions and if satisfies
              the condition.
            </p>

            <p>
              12. If any fraudulent and deception is caught the legal action
              will be taken.
            </p>
            <p>
              13. You are free to accept or reject your invites, there will not
              be any interest by us.
            </p>
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
export default Terms;
