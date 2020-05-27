const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const messageSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  sender: { type: Schema.Types.ObjectId, ref: 'User' },
  messageSender: { type: Schema.Types.ObjectId, ref: 'User' },
});
const Message = mongoose.model('Message', messageSchema);
module.exports = {
  Message,
};
