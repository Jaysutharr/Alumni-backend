const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    newsId: { type: String,   },
    user: { type: String, },
    content: { type: String,  },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);
