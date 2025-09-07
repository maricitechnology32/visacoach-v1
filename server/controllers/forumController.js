const ForumPost = require('../models/forumPostModel');
const ForumComment = require('../models/forumCommentModel');

// @desc    Create a new forum post
const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await ForumPost.create({
      title,
      content,
      author: req.user.id,
      consultancy: req.user.consultancy,
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all posts for the user's consultancy
const getConsultancyPosts = async (req, res) => {
  try {
    const posts = await ForumPost.find({ consultancy: req.user.consultancy })
      .populate('author', 'name profilePictureUrl')
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get a single post by ID with comments
const getPostById = async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.postId)
      .populate('author', 'name profilePictureUrl')
      .populate({
        path: 'comments',
        populate: { path: 'author', select: 'name profilePictureUrl' }
      });

    // Security check: ensure user belongs to the post's consultancy
    if (post.consultancy.toString() !== req.user.consultancy.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this post.' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add a comment to a post
const addComment = async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.postId);

    // Security check
    if (post.consultancy.toString() !== req.user.consultancy.toString()) {
      return res.status(403).json({ message: 'Not authorized to comment on this post.' });
    }

    const comment = await ForumComment.create({
      content: req.body.content,
      author: req.user.id,
      post: req.params.postId,
    });

    post.comments.push(comment._id);
    await post.save();

    // Populate the author details before sending back
    const populatedComment = await ForumComment.findById(comment._id).populate('author', 'name profilePictureUrl');
    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { createPost, getConsultancyPosts, getPostById, addComment };