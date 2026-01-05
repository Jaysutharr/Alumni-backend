const express = require("express")
const router = express.Router()
const User = require("../model/user_model")
router.post('/connections/request', async (req, res) => {
    const { senderId, receiverId } = req.body;
  
    try {
      const receiver = await User.findById(receiverId);
      if (!receiver) return res.status(404).json({ error: 'Receiver not found' });
  
      receiver.connectionRequests.push({ sender: senderId, status: 'Pending' });
      await receiver.save();
  
      res.status(200).json({ message: 'Connection request sent' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  router.post('/connections/respond', async (req, res) => {
    const { userId, senderId, response } = req.body; // response: 'Accepted' or 'Rejected'
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ error: 'User not found' });
  
      const request = user.connectionRequests.find(
        (req) => req.sender.toString() === senderId && req.status === 'Pending'
      );
  
      if (!request) return res.status(404).json({ error: 'Connection request not found' });
  
      request.status = response;
  
      if (response === 'Accepted') {
        user.connections.push(senderId);
        const sender = await User.findById(senderId);
        sender.connections.push(userId);
        await sender.save();
      }
  
      await user.save();
      res.status(200).json({ message: `Connection request ${response.toLowerCase()}` });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get('/connections/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const user = await User.findById(userId).populate('connections', 'name email profilePicture');
      if (!user) return res.status(404).json({ error: 'User not found' });
  
      res.status(200).json(user.connections);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post('/connections/remove', async (req, res) => {
    const { userId, connectionId } = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ error: 'User not found' });
  
      user.connections = user.connections.filter(
        (conn) => conn.toString() !== connectionId
      );
  
      const connection = await User.findById(connectionId);
      if (connection) {
        connection.connections = connection.connections.filter(
          (conn) => conn.toString() !== userId
        );
        await connection.save();
      }
  
      await user.save();
      res.status(200).json({ message: 'Connection removed' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
 /**
 * @swagger
 * /api/v1/connections/request:
 *   post:
 *     summary: Send a connection request
 *     tags:
 *       - Connections
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               senderId:
 *                 type: string
 *                 description: ID of the user sending the request
 *               receiverId:
 *                 type: string
 *                 description: ID of the user receiving the request
 *     responses:
 *       200:
 *         description: Connection request sent successfully
 *       404:
 *         description: Receiver not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/connections/respond:
 *   post:
 *     summary: Respond to a connection request
 *     tags:
 *       - Connections
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user responding
 *               senderId:
 *                 type: string
 *                 description: ID of the sender of the connection request
 *               response:
 *                 type: string
 *                 enum: [Accepted, Rejected]
 *                 description: Response to the connection request
 *     responses:
 *       200:
 *         description: Connection request responded to successfully
 *       404:
 *         description: User or request not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/connections/{userId}:
 *   get:
 *     summary: Get all connections of a user
 *     tags:
 *       - Connections
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: List of user connections
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   profilePicture:
 *                     type: string
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/connections/remove:
 *   post:
 *     summary: Remove a connection
 *     tags:
 *       - Connections
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user removing the connection
 *               connectionId:
 *                 type: string
 *                 description: ID of the connection to remove
 *     responses:
 *       200:
 *         description: Connection removed successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

module.exports = router;
