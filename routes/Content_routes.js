const express = require('express');
const router = express.Router();
const contentController = require('../controller/content_controller');

/**
 * @swagger
 * tags:
 *   - name: Content
 *     description: API for managing content
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Content:
 *       type: object
 *       properties:
 *         contentId:
 *           type: string
 *           description: Unique identifier for the content.
 *         title:
 *           type: string
 *           description: Title of the content.
 *         DatePosted:
 *           type: string
 *           format: date
 *           description: Date when the content was posted.
 *         Author:
 *           type: string
 *           description: Author of the content.
 *         Category:
 *           type: string
 *           description: Category of the content.
 *         Engagement:
 *           type: string
 *           description: Engagement metrics of the content.
 *         Status:
 *           type: string
 *           description: Status of the content (e.g., published, draft).
 */

/**
 * @swagger
 * /api/v1/addcontent:
 *   post:
 *     summary: Add new content
 *     description: Adds a new content entry to the database.
 *     tags:
 *       - Content
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Content'
 *     responses:
 *       201:
 *         description: Content added successfully.
 *       500:
 *         description: Error adding content.
 */
router.post('/addcontent', contentController.addContent);

/**
 * @swagger
 * /api/v1/getcontent:
 *   get:
 *     summary: Get all content
 *     description: Retrieves all content entries.
 *     tags:
 *       - Content
 *     responses:
 *       200:
 *         description: A list of content.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Content'
 *       500:
 *         description: Error fetching content.
 */
router.get('/getcontent', contentController.getAllContent);



/**
 * @swagger
 * /api/v1/getcontentbyid/{id}:
 *   get:
 *     summary: Get content by ID
 *     description: Retrieves a single content entry by its ID.
 *     tags:
 *       - Content
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the content to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Content retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *       404:
 *         description: Content not found.
 *       500:
 *         description: Error fetching content.
 */
router.get('/getcontentbyid/:id', contentController.getContentById);

/**
 * @swagger
 * /api/v1/updatecontent/{id}:
 *   put:
 *     summary: Update content by ID
 *     description: Updates an existing content entry by its ID.
 *     tags:
 *       - Content
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the content to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Content'
 *     responses:
 *       200:
 *         description: Content updated successfully.
 *       404:
 *         description: Content not found.
 *       500:
 *         description: Error updating content.
 */
router.put('/updatecontent/:id', contentController.updateContentById);

/**
 * @swagger
 * /api/v1/deletecontent/{id}:
 *   delete:
 *     summary: Delete content by ID
 *     description: Deletes a content entry by its ID.
 *     tags:
 *       - Content
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the content to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Content deleted successfully.
 *       404:
 *         description: Content not found.
 *       500:
 *         description: Error deleting content.
 */
router.delete('/deletecontent/:id', contentController.deleteContentById);

module.exports = router;
