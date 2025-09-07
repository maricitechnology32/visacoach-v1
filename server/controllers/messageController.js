// server/controllers/messageController.js
const Message = require('../models/messageModel');
const getMessages = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;
    const otherUserId = req.params.otherUserId;

    // Create the consistent conversationId
    const userIds = [loggedInUserId, otherUserId].sort();
    const conversationId = userIds.join('-');

    const messages = await Message.find({ conversationId })
      .populate('sender', 'name profilePictureUrl') // Also get sender's details
      .sort({ createdAt: 1 }); // Sort by oldest first

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getMessages };