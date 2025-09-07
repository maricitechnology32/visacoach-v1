

// server/controllers/courseController.js
const Course = require('../models/courseModel');
const Lesson = require('../models/lessonModel'); // ✅ Import Lesson model
const fs = require('fs'); // For file system operations if needed

// @desc    Create a new course
const createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Please provide a title and description.' });
    }

    const course = await Course.create({
      title: title.trim(),
      description: description.trim(),
      createdBy: req.user.id,
      consultancy: req.user.consultancy,
    });

    res.status(201).json(course);
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      return res.status(400).json({ message: 'A course with this title already exists.' });
    }

    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all courses for the student's consultancy
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ consultancy: req.user.consultancy })
      .select('-modules'); // exclude modules for a lightweight list

    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get a single course with full content
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('modules.lessons'); // ✅ cleaner populate

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.consultancy.toString() !== req.user.consultancy.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this course.' });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all courses created by the logged-in counselor
const getMyCourses = async (req, res) => {
  try {
    const courses = await Course.find({ createdBy: req.user.id });
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add a lesson to a specific module (or create module if not exists)
const addLessonToModule = async (req, res) => {
  try {
    const { moduleTitle, title, content, videoUrl } = req.body;

    if (!moduleTitle || !title || !content) {
      return res.status(400).json({ message: 'Module title, lesson title, and content are required.' });
    }

    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found.' });
    }

    if (course.consultancy.toString() !== req.user.consultancy.toString()) {
      return res.status(403).json({ message: 'Not authorized to modify this course.' });
    }

    // Build lesson object
    const lessonData = { title: title.trim(), content: content.trim(), videoUrl };

    // If file upload exists, attach resource info
    if (req.file) {
      lessonData.resource = {
        fileName: req.file.originalname,
        filePath: `/${req.file.path.replace(/\\/g, '/')}`,
      };
    }

    // Create lesson document
    const newLesson = await Lesson.create(lessonData);

    // Find module by title
    let moduleIndex = course.modules.findIndex((mod) => mod.title === moduleTitle);

    if (moduleIndex > -1) {
      // Module exists → add lesson
      course.modules[moduleIndex].lessons.push(newLesson._id);
    } else {
      // Create new module with this lesson
      course.modules.push({ title: moduleTitle, lessons: [newLesson._id] });
    }

    // Save and return populated course
    const savedCourse = await course.save();
    const populatedCourse = await Course.findById(savedCourse._id).populate('modules.lessons');

    res.status(201).json(populatedCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// server/controllers/courseController.js
const uploadCourseThumbnail = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) { /* ... error handling ... */ }
    if (course.consultancy.toString() !== req.user.consultancy.toString()) { /* ... error handling ... */ }
    if (!req.file) { /* ... error handling ... */ }

    // If there's an old thumbnail, delete it
    if (course.thumbnail && course.thumbnail !== '/images/default-thumbnail.png') {
      fs.unlink(`public${course.thumbnail}`, (err) => { // Adjusted path for deletion
        if (err) console.error("Error deleting old thumbnail:", err);
      });
    }

    // ==> FIX: Remove 'public/' from the saved path <==
    const filePath = `/${req.file.path.replace(/\\/g, "/").replace("public/", "")}`;
    course.thumbnail = filePath;
    await course.save();

    
    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  getMyCourses,
  addLessonToModule,
  uploadCourseThumbnail
};
