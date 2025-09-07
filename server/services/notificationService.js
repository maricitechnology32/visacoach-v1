// server/services/notificationService.js
const Notification = require('../models/notificationModel');

/**
 * Creates and pushes a real-time notification.
 * @param {object} io - The Socket.IO instance.
 * @param {string} recipientId - The ID of the user who should receive the notification.
 * @param {object} data - Notification data { senderId, type, message, link }.
 */
const createNotification = async (io, recipientId, data) => {
  try {
    // 1. Create the notification in the database
    const notification = await Notification.create({
      recipient: recipientId,
      sender: data.senderId,
      type: data.type,
      message: data.message,
      link: data.link,
    });

    // 2. Push the notification in real-time to the specific user
    //    We will make users join a room named after their own ID.
    io.to(recipientId.toString()).emit('new_notification', notification);

    console.log(`Notification sent to user ${recipientId}`);
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};

module.exports = { createNotification };