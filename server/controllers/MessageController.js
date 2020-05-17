const express = require('express');
const { Message } = require('../models/Message');

const router = express.Router();

router.post('/register', function (req, res) {
  const body = req.body;
  console.log('Message', req.body);
  const message = new Message(body);
  message
    .save()

    .then(function (message) {
      res.send({ messageId: message._id });
    })
    .catch(function (err) {
      console.log(err);
      res.send(err);
    });
});

router.get('/', function (req, res) {
  Message.find()
    .populate('messageSender')
    .then(function (messages) {
      res.send(messages);
      res.send(messages.messageSender);
    })

    .catch(function (err) {
      res.send(err);
    });
});

router.delete('/delete/:id', function (req, res) {
  const id = req.body.params;
  Message.deleteOne(id)
    .then(function (message) {
      res.send(message);
    })
    .catch(function (err) {
      res.send(err);
    });
});

module.exports = {
  messageRouter: router,
};
