// server/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');


// We will create this controller function in the next step
const { registerUser, loginUser, getMe, setPassword, logoutUser } = require('../controllers/authController');

// When a POST request is made to /api/auth/register, the registerUser function will run
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.post('/set-password', setPassword);
router.post('/logout', logoutUser);




module.exports = router;