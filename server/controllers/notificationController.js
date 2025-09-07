const Notification = require('../models/notificationModel');

const getMyNotifications = async (req, res) => {
  const notifications = await Notification.find({ recipient: req.user.id })
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(notifications);
};

const markAsRead = async (req, res) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.notificationId, recipient: req.user.id }, // Ensure user owns the notification
    { isRead: true },
    { new: true }
  );
  if (!notification) return res.status(404).json({ message: 'Notification not found.' });
  res.json(notification);
};

module.exports = { getMyNotifications, markAsRead };