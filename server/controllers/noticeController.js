// server/controllers/noticeController.js
const Notice = require('../models/noticeModel');

// @desc    Create and broadcast a new notice
// @route   POST /api/notices
// @access  Private (Counselor, Admin)
const createNotice = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Notice message cannot be empty.' });
    }

    // 1. Save the notice to the database
    const notice = await Notice.create({
      message,
      sender: req.user.id,
      consultancy: req.user.consultancy,
    });

    // 2. Get the Socket.IO instance we attached to the app in server.js
    const io = req.app.get('socketio');

    // 3. Define the room name based on the consultancy ID
    const room = req.user.consultancy.toString();

    // 4. Emit a 'new_notice' event ONLY to clients in that specific room
    io.to(room).emit('new_notice', notice);

    res.status(201).json(notice);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { createNotice };