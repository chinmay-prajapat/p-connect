import React, { Component, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import decode from 'jwt-decode';
import { FaWindows } from 'react-icons/fa';

class Pay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoaded: false,
    };
  }

  onPayment = (token) => {
    console.log(token);
    axios
      .post(`http://localhost:5000/api/payment/pay`, token, {
        headers: {
          userId: decode(localStorage.getItem('token'))._id,
        },
      })
      .then((response) => {
        // console.log(response);
        this.setState(
          {
            data: response.data,
            isLoaded: true,
          },
          () => {
            console.log('setState', this.state.data);
            localStorage.setItem('amountPaid', this.state.data.amount);
            localStorage.setItem(
              'subscription',
              this.state.data.subscriptionDeadLine
            );
            window.location.href = '/home';
            // window.location.reload();
          }
        );
      })
      .catch((error) => console.log(error));
    // window.location.href = 'http://localhost:3000/userheader';
  };

  render() {
    return (
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          class="card shadow-lg p-3 mb-5 "
          style={{
            maxWidth: '33rem',
            maxHeight: '45rem',

            borderRadius: '10px',
            marginTop: '10px',
            fontFamily: 'Lucida Console',
          }}
        >
          <div
            style={{
              backgroundColor: '#511845',
              borderRadius: '10px',
              color: 'white',
              padding: '20px',
              marginLeft: '25px',
              boxShadow: '0 10px 20px -6px #511845',

              textAlign: 'center',
              width: '450px',
            }}
          >
            <h1>Subscription Benefits</h1>
          </div>

          <div class="card-body">
            <h6 class="card-title" style={{ fontWeight: 'bold' }}>
              Easy To Access:-
            </h6>
            <p class="card-text" style={{ color: 'grey' }}>
              You are free to consume all the documents or feeds which are being
              published or shared by Professionals(Regardless of stream).
            </p>
          </div>
          <div class="card-body">
            <h6 class="card-title" style={{ fontWeight: 'bold' }}>
              Get In Touch:-
            </h6>
            <p class="card-text" style={{ color: 'grey' }}>
              All professionals are well qualified and you are free to ask
              queries to any professional.
            </p>
          </div>
          <div class="card-body">
            <h6 class="card-title" style={{ fontWeight: 'bold' }}>
              Need Workshop For Your Organization/Institution ?
            </h6>
            <p class="card-text" style={{ color: 'grey' }}>
              Here we got you here immense options to get your workshop or guest
              session from experts who have been working in the fields for
              years.
            </p>
          </div>
          <div class="card-body">
            <h6 class="card-title" style={{ fontWeight: 'bold' }}>
              Who Are The Professionals ?
            </h6>
            <p class="card-text" style={{ color: 'grey' }}>
              Professionals might be a teacher, professor, industrialist, etc.
              who are experienced which their respective fields and ready to
              help you in your problems.
            </p>
          </div>
          <div class="card-body">
            <h6 class="card-title" style={{ fontWeight: 'bold' }}>
              And ?
            </h6>
            <p class="card-text" style={{ color: 'grey' }}>
              Many more, get the subscription and make your goal one step
              closer.
            </p>
          </div>
          <div>
            {' '}
            <StripeCheckout
             // stripeKey={process.env.REACT_APP_KEY}
             stripeKey="pk_test_EhOawk9NUd9Ho2IMlQq3717000YckEDQaD"
              token={(token) => {
                console.log(token);
                this.onPayment(token);
              }}
              amount={500 * 100}
              country="india"
              currency="INR"
              name="P-Connect"
              description="Subscription"
            >
              <div className="container" style={{ textAlign: 'center' }}>
                <style
                  dangerouslySetInnerHTML={{
                    __html:
                      "\n.button {\n  display: inline-block;\n  border-radius: 4px;\n  background-color: #511845;\n  border: none;\n  color: #FFFFFF;\n  text-align: center;\n  font-size: 28px;\n  padding: 20px;\n  width: 200px;\n  transition: all 0.5s;\n  cursor: pointer;\n  margin: 5px;\n}\n\n.button span {\n  cursor: pointer;\n  display: inline-block;\n  position: relative;\n  transition: 0.5s;\n}\n\n.button span:after {\n  content: '\\00bb';\n  position: absolute;\n  opacity: 0;\n  top: 0;\n  right: -20px;\n  transition: 0.5s;\n}\n\n.button:hover span {\n  padding-right: 25px;\n}\n\n.button:hover span:after {\n  opacity: 1;\n  right: 0;\n}\n",
                  }}
                />

                <button
                  className="button"
                  style={{
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    boxShadow: '0 10px 20px -6px #511845',
                  }}
                >
                  <span>Subscribe </span>
                </button>
              </div>
              {/* <button style={{ marginLeft: '650px', marginTop: '300px' }}>
          ₹100
        </button> */}
            </StripeCheckout>
          </div>
        </div>
      </div>
    );
  }
}

export default Pay;
