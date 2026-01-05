// routes/supportTicket.routes.js
const express = require('express');
const router = express.Router();
const supportTicketController = require('../controller/SupportTicket_controller');

// Create a new support ticket
/**
 * @swagger
 * /api/v1/support-tickets:
 *   post:
 *     summary: Create a new support ticket
 *     tags: [SupportTickets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SupportTicket'
 *     responses:
 *       201:
 *         description: Support ticket created successfully
 *       500:
 *         description: Server error
 */
router.post('/support-tickets', supportTicketController.createSupportTicket);

// Get all support tickets
/**
 * @swagger
 * /api/v1/support-tickets:
 *   get:
 *     summary: Get all support tickets
 *     tags: [SupportTickets]
 *     responses:
 *       200:
 *         description: A list of support tickets
 *       500:
 *         description: Server error
 */
router.get('/support-tickets', supportTicketController.getAllSupportTickets);

// Get a support ticket by ID
/**
 * @swagger
 * /api/v1/support-tickets/{id}:
 *   get:
 *     summary: Get a support ticket by ID
 *     tags: [SupportTickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The support ticket ID
 *     responses:
 *       200:
 *         description: A single support ticket
 *       404:
 *         description: Support ticket not found
 *       500:
 *         description: Server error
 */
router.get('/support-tickets/:id', supportTicketController.getSupportTicketById);

// Update a support ticket status
/**
 * @swagger
 * /api/v1/support-tickets/{id}:
 *   put:
 *     summary: Update a support ticket status
 *     tags: [SupportTickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The support ticket ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ['open', 'in progress', 'closed']
 *     responses:
 *       200:
 *         description: Support ticket updated
 *       404:
 *         description: Support ticket not found
 *       500:
 *         description: Server error
 */
router.put('/support-tickets/:id', supportTicketController.updateSupportTicket);

// Delete a support ticket
/**
 * @swagger
 * /api/v1/support-tickets/{id}:
 *   delete:
 *     summary: Delete a support ticket
 *     tags: [SupportTickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The support ticket ID
 *     responses:
 *       200:
 *         description: Support ticket deleted
 *       404:
 *         description: Support ticket not found
 *       500:
 *         description: Server error
 */
router.delete('/support-tickets/:id', supportTicketController.deleteSupportTicket);

module.exports = router;
