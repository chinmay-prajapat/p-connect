const express = require('express');
const { Rating } = require('../models/Rating');
const { User } = require('../models/User');

const router = express.Router();
router.post('/register', function (req, res) {
  const body = req.body;
  console.log('rating', req.body);

  const rating = new Rating(body);
  rating
    .save()
    .then(function (rating) {
      User.findByIdAndUpdate(req.body.mentorId, {
        $push: { rating: rating._id },
      }).then((user) => {
        console.log(user);
      });
      res.send({ rating });
    })
    .catch(function (err) {
      console.log(err);
      res.send(err);
    });
});

router.get('/fetchrating/:ratingGiver/:ratingReciever', function (req, res) {
  console.log('RG', req.params.ratingGiver);
  console.log('RR', req.params.ratingReciever);
  Rating.findOne({
    user: req.params.ratingGiver,
    mentorId: req.params.ratingReciever,
  })
    .then(function (rating) {
      console.log(rating);
      res.send(rating);
    })

    .catch(function (err) {
      res.send(err);
    });
});
router.get('/rating/:id', function (req, res) {
  console.log(req.params.id);
  User.findById(req.params.id).then((rating) => {
    console.log(rating);
    res.send(rating);
  });
});
router.get('/rating1/:id', function (req, res) {
  console.log(req.params.id);
  User.findById(req.params.id).then((rating) => {
    console.log(rating);
    res.send(rating);
  });
});
module.exports = {
  ratingRouter: router,
};
