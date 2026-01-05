const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  contentId: { type: String, unique: true }, // Ensure uniqueness
  title: { type: String },
  DatePosted: { type: String },
  Author: { type: String },
  Category: { type: String },
  Engagement: { type: String },
  Status: { type: String },
});

// Middleware to auto-generate a 5-digit contentId before saving
contentSchema.pre('save', async function (next) {
  if (!this.contentId) {
    // Generate a random 5-digit number
    const generateContentId = async () => {
      const id = String(Math.floor(10000 + Math.random() * 90000)); // 5-digit number
      // Check for uniqueness in the database
      const exists = await mongoose.models.content.findOne({ contentId: id });
      return exists ? generateContentId() : id;
    };

    this.contentId = await generateContentId();
  }
  next();
});

module.exports = mongoose.model('content', contentSchema);
