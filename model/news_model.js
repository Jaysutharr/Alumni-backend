// news.model.js
const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  publishedAt: { type: Date, default: Date.now },
  tags: [{ type: String }],
  views: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
}, {
  timestamps: true,
  collection: 'news' // Explicitly set collection name
});

module.exports = mongoose.model('News', newsSchema);
