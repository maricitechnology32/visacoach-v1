// // server/middleware/authMiddleware.js

// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');

// const protect = async (req, res, next) => {
//   let token;

//   // Check if the authorization header exists and starts with 'Bearer'
//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     try {
//       // 1. Get token from header (e.g., "Bearer eyJhbGciOi...")
//       token = req.headers.authorization.split(' ')[1];

//       // 2. Verify the token using our secret
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // 3. Find the user by the ID from the token's payload
//       //    Attach the user object to the request, excluding the password
//       req.user = await User.findById(decoded.id).select('-password');

//       // 4. Call the next middleware/controller
//       next();
//     } catch (error) {
//       console.error(error);
//       res.status(401).json({ message: 'Not authorized, token failed' });
//     }
//   }

//   if (!token) {
//     res.status(401).json({ message: 'Not authorized, no token' });
//   }
// };

// // This middleware checks if the user's role is allowed to access the route
// const authorize = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ message: `User role '${req.user.role}' is not authorized to access this route` });
//     }
//     next();
//   };
// };

// module.exports = { protect, authorize };



// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');

// const protect = async (req, res, next) => {
//   let token;

//   try {
//     // Support both Bearer tokens and cookie-based tokens
//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//       token = req.headers.authorization.split(' ')[1];
//     } else if (req.cookies && req.cookies.token) {
//       token = req.cookies.token;
//     }

//     if (!token) {
//       return res.status(401).json({ message: 'Not authorized, no token' });
//     }

//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Attach user without password
//     req.user = await User.findById(decoded.id).select('-password');
//     if (!req.user) {
//       return res.status(401).json({ message: 'User not found' });
//     }

//     next();
//   } catch (error) {
//     console.error(error);
//     if (error.name === 'TokenExpiredError') {
//       return res.status(401).json({ message: 'Token expired, please log in again' });
//     }
//     return res.status(401).json({ message: 'Not authorized, token failed' });
//   }
// };

// const authorize = (...roles) => {
//   return (req, res, next) => {
//     if (!req.user) {
//       return res.status(401).json({ message: 'Not authorized' });
//     }
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ message: `User role '${req.user.role}' is not authorized to access this route` });
//     }
//     next();
//   };
// };

// module.exports = { protect, authorize };

// server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  let token;

  // 1. Check for the token in the HttpOnly cookie first
  if (req.cookies.token) {
    try {
      // Get token from cookie
      token = req.cookies.token;

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token and attach to request
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // If there's still no token after checking cookies, deny access
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};


// The 'authorize' middleware does not need to change.
// It works by checking req.user, which is correctly set by the updated 'protect' middleware.
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `User role '${req.user.role}' is not authorized to access this route` });
    }
    next();
  };
};

module.exports = { protect, authorize };
