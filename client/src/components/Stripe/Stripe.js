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
      <div className="container">
        <div>
          <p>Subscription Benefits</p>
        </div>
        <StripeCheckout
          stripeKey={process.env.REACT_APP_KEY}
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
          <div className="container" style={{}}>
            <style
              dangerouslySetInnerHTML={{
                __html:
                  "\n.button {\n  display: inline-block;\n  border-radius: 4px;\n  background-color: #f4511e;\n  border: none;\n  color: #FFFFFF;\n  text-align: center;\n  font-size: 28px;\n  padding: 20px;\n  width: 200px;\n  transition: all 0.5s;\n  cursor: pointer;\n  margin: 5px;\n}\n\n.button span {\n  cursor: pointer;\n  display: inline-block;\n  position: relative;\n  transition: 0.5s;\n}\n\n.button span:after {\n  content: '\\00bb';\n  position: absolute;\n  opacity: 0;\n  top: 0;\n  right: -20px;\n  transition: 0.5s;\n}\n\n.button:hover span {\n  padding-right: 25px;\n}\n\n.button:hover span:after {\n  opacity: 1;\n  right: 0;\n}\n",
              }}
            />

            <button
              className="button"
              style={{
                textAlign: 'center',
                verticalAlign: 'middle',
                marginLeft: '450px',
                marginTop: '300px',
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
    );
  }
}

export default Pay;
