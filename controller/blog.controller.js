const Blog = require('../model/Blog');

// Create a new blog post
exports.createBlog = async (req, res) => {
  try {
    const { title, content, author, tags } = req.body;
    let image = '';
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const blog = new Blog({
      title,
      content,
      author,
      tags,
      image
    });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(200).json({ error: 'Error creating blog post' });
  }
};

// ...

// Update a blog post by ID
exports.updateBlog = async (req, res) => {
  try {
    const { title, content, author, tags } = req.body;
    const updateData = { title, content, author, tags, updatedAt: Date.now() };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Error updating blog post' });
  }
};

// Get all blog posts
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(200).json({ error: 'Error fetching blog posts' });
  }
};

// Get a single blog post by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching blog post' });
  }
};

// Update a blog post by ID
exports.updateBlog = async (req, res) => {
  try {
    const { title, content, author, tags } = req.body;
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, author, tags, updatedAt: Date.now() },
      { new: true }
    );
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Error updating blog post' });
  }
};

// Delete a blog post by ID
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting blog post' });
  }
};

// Increment view count for a blog post
exports.incrementViewCount = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } }, // Increment views by 1
      { new: true } // Return the updated document
    );
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error('Error incrementing view count:', error);
    res.status(500).json({ error: 'Error incrementing view count' });
  }
};
