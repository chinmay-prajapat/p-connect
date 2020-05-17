const express = require('express');
const router = express.Router();
const { contributeRouter } = require('../controllers/ContributeController');
const { usersRouter } = require('../controllers/UserController');
const { aboutRouter } = require('../controllers/AboutController');
const { eventRouter } = require('../controllers/EventController');
const { messageRouter } = require('../controllers/MessageController');
const { ratingRouter } = require('../controllers/RatingController');

router.use('/api/contribute', contributeRouter);
router.use('/api/users', usersRouter);
router.use('/api/about', aboutRouter);
router.use('/api/event', eventRouter);
router.use('/api/message', messageRouter);
router.use('/api/rating', ratingRouter);

module.exports = {
  router,
};
