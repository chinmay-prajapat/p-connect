const express = require('express');
const { mongoose } = require('./config/database');
const uploadLocation = require('../client/src/uploads/uploadsLocation');
const { router } = require('./config/routes');
// const paytmpay = require('./models/checksum/server');
const payment = require('./models/Stripe');
const cors = require('cors');
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(`${uploadLocation}`));
// app.use('/paytm', paytmpay);
app.use('/payment', payment);
app.use('/', router);
app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
