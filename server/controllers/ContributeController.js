const express = require('express');

const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const decode = require('jwt-decode');
const { Contribute } = require('../models/Contribute');

const router = express.Router();

AWS.config.update({
  accessKeyId: 'AKIAI5ZM5TTMEUXIHZDA',
  secretAccessKey: '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',
});

const s3 = new AWS.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'p-connect',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

router.post('/upload', upload.single('document'), function (req, res) {
  const token = req.header('x-auth');

  const body = {
    title: req.body.title,

    link: req.body.link,
    location: req.file.location,
    document: req.file.originalname,
    description: req.body.description,
    contributer: req.body.contributer,
  };
  const contribute = new Contribute(body);
  contribute
    .save()
    .then(function (contribute) {
      res.send(contribute);
    })
    .catch(function (err) {
      console.log(err);
      res.send(err);
    });

  // Contribute.findByIdAndUpdate(decode(token)._id, body, { new: true })
  //   .then(function () {
  //     res.sendStatus(200);
  //   })
  //   .catch(function (err) {
  //     res.send(err);
  //   });
});

router.post('/get', function (req, res) {
  Contribute.findOne({ title: req.body.title })
    .then((titles) => res.json(titles))
    .catch((err) => err.status(400).json('Error ' + err));
});

router.get('/', function (req, res) {
  Contribute.find()
    .sort({ createdAt: -1 })
    .populate('contributer')
    .then(function (contributes) {
      res.send(contributes);
      console.log(contributes.contributer);
      res.send(contributes.contributer);
    })
    .catch(function (err) {
      res.send(err);
    });
});
router.get('/feed/:id', function (req, res) {
  Contribute.find()
    .then(function (contributes) {
      res.send(contributes);
    })
    .catch(function (err) {
      res.send(err);
    });
});

router.delete('/delete/:_id', function (req, res) {
  const id = req.body.params;
  Contribute.deleteOne(id)
    .then(function (contribute) {
      res.send(contribute);
    })
    .catch(function (err) {
      res.send(err);
    });
});

module.exports = {
  contributeRouter: router,
};
