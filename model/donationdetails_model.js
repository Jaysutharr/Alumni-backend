const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  DonationId: String,
  CampaignTitle: String,
  CampaignDescription: String,
  Categories: String,
  GoalAmount: String,
  PaymentMethods: String,
  Paymentdetail: String,
  AllowCommenting: String,
  Comment: String,
  userId: String,
});

const dondetails = mongoose.model('donationsdetails', donationSchema);
module.exports = dondetails;
