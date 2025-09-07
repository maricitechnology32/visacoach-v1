// server/middleware/vapiWebhookAuth.js
const jwt = require('jsonwebtoken');

// IMPORTANT: Get this from your Vapi Dashboard (Developers -> Security)
const VAPI_PUBLIC_KEY = process.env.VAPI_PUBLIC_KEY;

const verifyVapiWebhook = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    jwt.verify(token, VAPI_PUBLIC_KEY, { algorithms: ['ES256'] });
    next();
  } catch (error) {
    console.error('Vapi webhook verification failed:', error.message);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = { verifyVapiWebhook };