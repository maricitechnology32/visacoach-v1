const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createPost,
  getConsultancyPosts,
  getPostById,
  addComment
} = require('../controllers/forumController');

// Routes for Posts
router.route('/posts')
  .post(protect, createPost)
  .get(protect, getConsultancyPosts);

router.route('/posts/:postId')
  .get(protect, getPostById);

// Route for Comments
router.post('/posts/:postId/comments', protect, addComment);

module.exports = router;