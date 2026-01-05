// news.routes.js
const express = require('express');
const router = express.Router();
const newsController = require('../controller/news.controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     News:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - author
 *         - category
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the news article
 *         title:
 *           type: string
 *           description: Title of the news article
 *         content:
 *           type: string
 *           description: Content of the news article
 *         author:
 *           type: string
 *           description: Author of the news article
 *         category:
 *           type: string
 *           description: Category of the news article
 *         publishedAt:
 *           type: string
 *           format: date-time
 *           description: The date the news was published
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Tags associated with the news article
 *       example:
 *         title: New JavaScript Framework Released
 *         content: A new JS framework is taking over the web development world.
 *         author: John Doe
 *         category: Technology
 *         publishedAt: 2024-09-24T16:50:17Z
 *         tags: [javascript, framework, technology]
 */

/**
 * @swagger
 * /api/v1/news:
 *   post:
 *     summary: Create a new news article
 *     tags: [News]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/News'
 *     responses:
 *       201:
 *         description: News created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 *       400:
 *         description: Bad request
 */
router.post('/news-articles', newsController.createNews);

/**
 * @swagger
 * /api/v1/news:
 *   get:
 *     summary: Get all news articles
 *     tags: [News]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of news articles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 news:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/News'
 */
router.get('/news-articles', newsController.getAllNews);

/**
 * @swagger
 * /api/v1/news/{id}:
 *   get:
 *     summary: Get a news article by ID
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the news article
 *     responses:
 *       200:
 *         description: A single news article
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 *       404:
 *         description: News article not found
 */
router.get('/news-articles/:id', newsController.getNewsById);

/**
 * @swagger
 * /api/v1/news/{id}:
 *   put:
 *     summary: Update a news article
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the news article to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/News'
 *     responses:
 *       200:
 *         description: News article updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 *       404:
 *         description: News article not found
 */
router.put('/news-articles/:id', newsController.updateNews);

/**
 * @swagger
 * /api/v1/news/{id}:
 *   delete:
 *     summary: Delete a news article
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the news article to delete
 *     responses:
 *       200:
 *         description: News article deleted successfully
 *       404:
 *         description: News article not found
 */
router.delete('/news-articles/:id', newsController.deleteNews);

module.exports = router;
