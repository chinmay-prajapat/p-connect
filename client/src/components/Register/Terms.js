import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import React, { Component } from 'react';

const myStyle = {
  textAlign: 'left',
};
class Terms extends Component {
  constructor(props) {
    super(props);
  }

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
              7. The organization will levied 10% of every service given through
              the profession or lecture or workshop by the invite.
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
              13. For any further query you please contact through about page
            </p>
          </div>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="defaultCheck1"
            required
          />
          <label class="form-check-label" for="defaultCheck1">
            I have read and understood the terms and conditions and pledge to
            practice them.
          </label>
        </div>
        <div>
          {/* <Link to="/uregister"
          <button
            style={{
              margin: '20px 0px',
              display: 'block',
              textAlign: 'center',
              position: 'relative',
              left: '500px',
            }}
            type="button"
            onclick="/uregister"
            class="btn btn-info"
            onclick={this.routeChange}
          >
            Next

          </button> */}
          <Link
            style={{
              margin: '20px 0px',

              textAlign: 'center',
            }}
            to="/pregister"
            className="btn btn-info"
          >
            Next
          </Link>
        </div>
      </div>
    );
  }
}
export default Terms;
