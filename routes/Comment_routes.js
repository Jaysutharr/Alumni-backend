const express = require('express');
const Comment = require('../model/newscomment_model');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API for managing comments
 */

/**
 * @swagger
 * /api/v1/comments/{newsId}:
 *   get:
 *     summary: Get all comments for a news article
 *     tags: [Comments]
 *     parameters:
 *       - name: newsId
 *         in: path
 *         required: true
 *         description: ID of the news article
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Error fetching comments
 */
router.get('/comments/:newsId', async (req, res) => {
    try {
        const comments = await Comment.find({ newsId: req.params.newsId });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments', error });
    }
});

/**
 * @swagger
 * /api/v1/comments:
 *   post:
 *     summary: Post a new comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newsId:
 *                 type: string
 *               user:
 *                 type: string
 *               content:
 *                 type: string
 *             required:
 *               - newsId
 *               - user
 *               - content
 *     responses:
 *       201:
 *         description: Comment created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Error saving comment
 */
router.post('/comments', async (req, res) => {
    const { newsId, user, content } = req.body;
    const comment = new Comment({ newsId, user, content });

    try {
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ message: 'Error saving comment', error });
    }
});

/**
 * @swagger
 * /api/v1/comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the comment to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment deleted
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Error deleting comment
 */
router.delete('/comments/:id', async (req, res) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json({ message: 'Comment deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting comment', error });
    }
});

// Define the Comment schema for Swagger documentation
/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The comment ID
 *         newsId:
 *           type: string
 *           description: The ID of the news article
 *         user:
 *           type: string
 *           description: The user who made the comment
 *         content:
 *           type: string
 *           description: The content of the comment
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date when the comment was created
 */

module.exports = router;
