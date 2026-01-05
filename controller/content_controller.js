const Content = require('../model/Content_model');

// Add new content
exports.addContent = async (req, res) => {
  try {
    const newContent = new Content(req.body);
    await newContent.save();
    res.status(201).json({ message: 'Content added successfully', content: newContent });
  } catch (error) {
    res.status(500).json({ message: 'Error adding content', error: error.message });
  }
};

// Get all content with optional filtering
exports.getAllContent = async (req, res) => {
  try {
    const { Category, Status } = req.query;
    let filter = {};
    if (Category) filter.Category = Category;
    if (Status) filter.Status = Status;

    const contents = await Content.find(filter);
    res.status(200).json(contents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching content', error: error.message });
  }
};


// Get single content by ID
exports.getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching content', error: error.message });
  }
};

// Update content by ID
exports.updateContentById = async (req, res) => {
  try {
    const updatedContent = await Content.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedContent) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.status(200).json({ message: 'Content updated successfully', content: updatedContent });
  } catch (error) {
    res.status(500).json({ message: 'Error updating content', error: error.message });
  }
};

// Delete content by ID
exports.deleteContentById = async (req, res) => {
  try {
    const deletedContent = await Content.findByIdAndDelete(req.params.id);
    if (!deletedContent) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.status(200).json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting content', error: error.message });
  }
};
