const express = require('express');
const { Rating } = require('../models/Rating');
const router = express.Router();
router.post('/register', function (req, res) {
  const body = req.body;

  const rating = new Rating(body);
  rating
    .save()
    .then(function (rating) {
      res.send({ rating });
    })
    .catch(function (err) {
      console.log(err);
      res.send(err);
    });
});
router.get('/', function (req, res) {
  Rating.find()
    .then(function (ratings) {
      res.send(ratings);
    })

    .catch(function (err) {
      res.send(err);
    });
});

module.exports = {
  ratingRouter: router,
};
