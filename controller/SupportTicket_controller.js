// controllers/supportTicket.controller.js
const SupportTicket = require('../model/supportTicket.model');

// Create a new support ticket
exports.createSupportTicket = async (req, res) => {
  try {
    const { subject, description, user } = req.body;

    const newTicket = new SupportTicket({
      subject,
      description,
      user,
    });

    const savedTicket = await newTicket.save();
    res.status(201).json(savedTicket);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create support ticket' });
  }
};

// Get all support tickets
exports.getAllSupportTickets = async (req, res) => {
  try {
    const tickets = await SupportTicket.find().populate('user', 'name email');
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch support tickets' });
  }
};

// Get a single support ticket by ID
exports.getSupportTicketById = async (req, res) => {
  try {
    const ticket = await SupportTicket.findById(req.params.id).populate('user', 'name email');
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch support ticket' });
  }
};

// Update a support ticket status
exports.updateSupportTicket = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedTicket = await SupportTicket.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updatedTicket) return res.status(404).json({ error: 'Ticket not found' });
    res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update support ticket' });
  }
};

// Delete a support ticket
exports.deleteSupportTicket = async (req, res) => {
  try {
    const deletedTicket = await SupportTicket.findByIdAndDelete(req.params.id);
    if (!deletedTicket) return res.status(404).json({ error: 'Ticket not found' });
    res.status(200).json({ message: 'Support ticket deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete support ticket' });
  }
};
