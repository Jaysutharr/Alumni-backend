// news.controller.js
const News = require('../model/news_model');

// Create a news article
exports.createNews = async (req, res) => {
  try {
    console.log('📝 POST /api/v1/news called');
    console.log('📥 Request body:', req.body);

    const news = new News(req.body);
    console.log('💾 Saving to database...');
    await news.save();

    console.log('✅ News saved successfully');
    console.log('📰 Saved news:', news);

    res.status(201).json(news);
  } catch (error) {
    console.error('❌ Error creating news:', error);
    res.status(400).json({ error: error.message });
  }
};

// Get all news articles (with optional pagination)
exports.getAllNews = async (req, res) => {
  try {
    console.log('📰 GET /api/v1/news-articles called');
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    console.log('🔍 Querying database...');
    const news = await News.find().skip(skip).limit(limit);
    const total = await News.countDocuments();

    console.log('✅ Query complete');
    console.log('📊 Total documents:', total);
    console.log('📈 News found:', news.length);
    console.log('📰 News data:', JSON.stringify(news, null, 2));

    res.status(200).json({ total, page, news });
  } catch (error) {
    console.error('❌ Error in getAllNews:', error);
    res.status(400).json({ error: error.message });
  }
};

// Get a single news article by ID
exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.status(200).json(news);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a news article
exports.updateNews = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.status(200).json(news);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a news article
exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.status(200).json({ message: 'News deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
