const express = require('express');
const router = express.Router();
const blogController = require('../controller/blog.controller');
const upload = require('../middleware/upload');

// ... (swagger docs)

router.post('/blogs', upload.single('image'), blogController.createBlog);

// ... (swagger docs)

router.put('/blogs/:id', upload.single('image'), blogController.updateBlog);

/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the blog
 *         title:
 *           type: string
 *           description: The title of the blog post
 *         content:
 *           type: string
 *           description: The content of the blog post
 *         author:
 *           type: string
 *           description: The author of the blog post
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: The tags associated with the blog post
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date of the blog post
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update date of the blog post
 *       example:
 *         title: "My First Blog"
 *         content: "This is the content of the first blog post."
 *         author: "John Doe"
 *         tags: ["tech", "coding"]
 */

/**
 * @swagger
 * /api/v1/blogs:
 *   post:
 *     summary: Create a new blog post
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       201:
 *         description: The blog post was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       500:
 *         description: Some server error
 */
router.post('/blogs', blogController.createBlog);

/**
 * @swagger
 * /api/v1/blogs:
 *   get:
 *     summary: Get all blog posts
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: List of all blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 */
router.get('/blogs', blogController.getAllBlogs);

/**
 * @swagger
 * /api/v1/blogs/{id}:
 *   get:
 *     summary: Get a blog post by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog post ID
 *     responses:
 *       200:
 *         description: The blog post description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Blog not found
 */
router.get('/blogs/:id', blogController.getBlogById);

/**
 * @swagger
 * /api/v1/blogs/{id}:
 *   put:
 *     summary: Update a blog post by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       200:
 *         description: The blog post was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Some server error
 */
router.put('/blogs/:id', blogController.updateBlog);

/**
 * @swagger
 * /api/v1/blogs/{id}/view:
 *   put:
 *     summary: Increment view count for a blog post
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog post ID
 *     responses:
 *       200:
 *         description: View count incremented successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Some server error
 */
router.put('/blogs/:id/view', blogController.incrementViewCount);

/**
 * @swagger
 * /api/v1/blogs/{id}:
 *   delete:
 *     summary: Delete a blog post by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog post ID
 *     responses:
 *       200:
 *         description: Blog post deleted successfully
 *       404:
 *         description: Blog not found
 */
router.delete('/blogs/:id', blogController.deleteBlog);

module.exports = router;
