const cors = require('cors');
const express = require('express');
const stripe = require('stripe')(process.env.KEY);
const uuid = require('uuid');
const app = express();
require('dotenv').config();
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.send('It works');
});
app.post('/payment', (req, res) => {
  const { porduct, token } = req.body;
  console.log('PRODUCT', porduct);
  console.log('PRICE', porduct.price);
  const idempontencyKey = uuid();
  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: porduct.price,
          currency: 'inr',
          customer: customer.id,
          receipt_email: token.email,
          description: `purchase${porduct.name}`,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
            },
          },
        },
        { idempontencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});

module.exports = app;
