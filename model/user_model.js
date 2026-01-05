// user_model.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: String
  },
  FullName: { type: String }, // Ensure user field is required
  email: { type: String, required: true, unique: true, }, // Ensure user field is required
  password: { type: String }, // Ensure user field is required
  OTP: { type: Number },
  verificationCode: { type: Number },
  StreetAddress: {
    type: String
  },
  City: {
    type: String
  },
  State: {
    type: String
  },
  Country: {
    type: String
  },
  Postalcode: {
    type: String
  },
  Bio: {
    type: String
  },
  Location: {
    type: String
  },
  Status: {
    type: String,
    default: "Active"
  },
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  connectionRequests: [
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' },
    },
  ],

});

const user = mongoose.model('user', userSchema);

module.exports = user;
