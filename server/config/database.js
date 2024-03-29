const mongoose = require('mongoose');

// configure mongoose to use global promises
mongoose.Promise = global.Promise;

// establish a database connection
mongoose
  .connect(
    'mongodb+srv://admin:chinmay@cluster0-pr5qz.mongodb.net/test?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    }
  )
  .then(function() {
    console.log('connected to db');
  })
  .catch(function(err) {
    console.log('error connecting to db', err);
  });

module.exports = {
  mongoose
};
