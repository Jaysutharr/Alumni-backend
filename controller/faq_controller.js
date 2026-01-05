// controllers/faq.controller.js
const FAQ = require('../model/faq.model');

// Create a new FAQ
exports.createFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const newFAQ = new FAQ({ question, answer });
    await newFAQ.save();
    res.status(201).json(newFAQ);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create FAQ' });
  }
};

// Get all FAQs
exports.getAllFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.status(200).json(faqs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve FAQs' });
  }
};

// Get FAQ by ID
exports.getFAQById = async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq) return res.status(404).json({ error: 'FAQ not found' });
    res.status(200).json(faq);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve FAQ' });
  }
};

// Update FAQ by ID
exports.updateFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const updatedFAQ = await FAQ.findByIdAndUpdate(req.params.id, { question, answer }, { new: true });
    if (!updatedFAQ) return res.status(404).json({ error: 'FAQ not found' });
    res.status(200).json(updatedFAQ);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update FAQ' });
  }
};

// Delete FAQ by ID
exports.deleteFAQ = async (req, res) => {
  try {
    const deletedFAQ = await FAQ.findByIdAndDelete(req.params.id);
    if (!deletedFAQ) return res.status(404).json({ error: 'FAQ not found' });
    res.status(200).json({ message: 'FAQ deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete FAQ' });
  }
};
