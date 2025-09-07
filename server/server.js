// server/js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const User = require('./models/userModel');
const Message = require('./models/messageModel');
const { createNotification } = require('./services/notificationService');
const path = require('path');

// --- 2. INITIALIZATION AND CONFIG ---
dotenv.config();
connectDB();

// ==> START THE JOB PROCESSOR <==
// This initializes the worker to start listening for jobs on the 'interviews' queue.
require('./jobs/interviewProcessor');

const app = express();
const server = http.createServer(app);

// Serve static files from the 'public' directory (for profile pictures, etc.)
// app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use("/public", express.static(path.join(__dirname, "public")));



const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Your React app's URL
    methods: ["GET", "POST"]
  }
});

// Make the io instance available to all routes
app.set('socketio', io);


// --- 3. MIDDLEWARE ---
// app.use(express.json());
app.use(express.json({ limit: '10mb' }));

// app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(cors({
  origin: 'http://localhost:5173', // 1. Allow our specific frontend origin
  credentials: true                // 2. Allow cookies to be sent and received
}));
app.use(cookieParser());


// --- 4. SOCKET.IO LOGIC ---

// Socket.IO middleware for authentication
io.use(async (socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('Authentication error: No token provided.'));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || !user.consultancy) {
      return next(new Error('Authentication error: Invalid user.'));
    }
    socket.user = user; // Attach user info to the socket object
    next();
  } catch (err) {
    next(new Error('Authentication error: Token is not valid.'));
  }
});

// SINGLE, CONSOLIDATED Socket.IO Connection Handler
io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}, Role: ${socket.user.role}`);

  // Join a broadcast room for the user's consultancy
  const consultancyRoom = socket.user.consultancy.toString();
  socket.join(consultancyRoom);

  // Join a private room for personal notifications
  const privateRoom = socket.user.id.toString();
  socket.join(privateRoom);

  console.log(`Socket ${socket.id} joined rooms: ${consultancyRoom} and ${privateRoom}`);

  // Listener for joining a private chat conversation
  socket.on('join_conversation', (otherUserId) => {
    const userIds = [socket.user.id, otherUserId].sort();
    const conversationId = userIds.join('-');
    socket.join(conversationId);
    console.log(`Socket ${socket.id} joined private chat room ${conversationId}`);
  });

  // Listener for sending a private message
  socket.on('private_message', async (data) => {
    const { receiverId, content } = data;
    const senderId = socket.user.id;

    const userIds = [senderId, receiverId].sort();
    const conversationId = userIds.join('-');

    // 1. Save message to database
    const message = await Message.create({
      conversationId,
      sender: senderId,
      receiver: receiverId,
      content,
    });
    const populatedMessage = await Message.findById(message._id).populate('sender', 'name profilePictureUrl');

    // 2. Emit the new message to the specific conversation room
    io.to(conversationId).emit('new_message', populatedMessage);

    // 3. Create a notification for the receiver
    createNotification(io, receiverId, {
      senderId: senderId,
      type: 'new_message',
      message: `You have a new message from ${socket.user.name}.`,
      link: `/messages/${senderId}`
    });
  });

  // Listener for when the user disconnects
  socket.on('disconnect', () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

// app.use('/uploads', require('./routes/fileRoutes'));
app.use('/api/files', require('./routes/fileRoutes'));



// --- 5. API ROUTES ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/consultancies', require('./routes/consultancyRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/documents', require('./routes/documentRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/notices', require('./routes/noticeRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));
app.use('/api/checklists', require('./routes/checklistRoutes'));
app.use('/api/journey', require('./routes/journeyRoutes'));
app.use('/api/sop', require('./routes/sopRoutes'));
app.use('/api/timelines', require('./routes/timelineRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/financials', require('./routes/financialRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/forums', require('./routes/forumRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/interviews', require('./routes/interviewRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/lessons', require('./routes/lessonRoutes'));
app.use('/api/ds160', require('./routes/ds160Routes'));
app.use('/api/universities', require('./routes/universityRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));


// --- 6. SERVER START ---
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT} 🔥`));