// routes/faq.routes.js
const express = require('express');
const router = express.Router();
const faqController = require('../controller/faq_controller');

// Create a new FAQ
// routes/faq.routes.js
/**
 * @swagger
 * components:
 *   schemas:
 *     FAQ:
 *       type: object
 *       required:
 *         - question
 *         - answer
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the FAQ
 *         question:
 *           type: string
 *           description: The question for the FAQ
 *         answer:
 *           type: string
 *           description: The answer for the FAQ
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the FAQ was created
 *       example:
 *         id: 610c8a3f3f8f8b001f09804e
 *         question: What is Node.js?
 *         answer: Node.js is a JavaScript runtime built on Chrome's V8 engine.
 *         createdAt: 2023-09-25T10:20:50.123Z
 */

/**
 * @swagger
 * tags:
 *   name: FAQs
 *   description: API to manage FAQs
 */

/**
 * @swagger
 * /api/v1/faqs:
 *   post:
 *     summary: Create a new FAQ
 *     tags: [FAQs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FAQ'
 *     responses:
 *       201:
 *         description: The FAQ was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FAQ'
 *       500:
 *         description: Some server error
 */
router.post('/faqs', faqController.createFAQ);

/**
 * @swagger
 * /api/v1/faqs:
 *   get:
 *     summary: Get all FAQs
 *     tags: [FAQs]
 *     responses:
 *       200:
 *         description: List of all FAQs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FAQ'
 */
router.get('/faqs', faqController.getAllFAQs);

/**
 * @swagger
 * /api/v1/faqs/{id}:
 *   get:
 *     summary: Get a FAQ by ID
 *     tags: [FAQs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The FAQ ID
 *     responses:
 *       200:
 *         description: The FAQ description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FAQ'
 *       404:
 *         description: FAQ not found
 */
router.get('/faqs/:id', faqController.getFAQById);

/**
 * @swagger
 * /api/v1/faqs/{id}:
 *   put:
 *     summary: Update a FAQ by ID
 *     tags: [FAQs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The FAQ ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FAQ'
 *     responses:
 *       200:
 *         description: The FAQ was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FAQ'
 *       404:
 *         description: FAQ not found
 *       500:
 *         description: Some server error
 */
router.put('/faqs/:id', faqController.updateFAQ);

/**
 * @swagger
 * /api/v1/faqs/{id}:
 *   delete:
 *     summary: Delete a FAQ by ID
 *     tags: [FAQs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The FAQ ID
 *     responses:
 *       200:
 *         description: FAQ was deleted
 *       404:
 *         description: FAQ not found
 *       500:
 *         description: Some server error
 */
router.delete('/faqs/:id', faqController.deleteFAQ);

module.exports = router;

