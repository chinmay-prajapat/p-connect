import React, { Component, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';

function Pay() {
  const [product, setProduct] = useState({
    name: 'React from FB',
    price: 100,
    productBy: 'facebook',
  });
  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    const headers = {
      'Content-Type': 'application/json',
    };
    return fetch(`http://localhost:5000/payment/`, {
      method: 'post',
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log('RESPONSE', response);
        const { status } = response;
        console.log('STATUS', status);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <StripeCheckout
        stripeKey={process.env.REACT_APP_KEY}
        token={makePayment}
        amount={product.price}
        name="Buy React"
      >
        <button className="btn btn-danger btn-lg">₹{product.price}</button>
      </StripeCheckout>
    </div>
  );
}

export default Pay;
