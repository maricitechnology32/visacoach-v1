

const multer = require('multer');
const path = require('path');
const fs = require('fs').promises; // Use promises for async operations
const sanitizeFilename = require('sanitize-filename');
// const fs = require('fs');



// Helper function to validate user authentication
const ensureAuthenticated = (req, cb) => {
  if (!req.user || !req.user.id) {
    return cb(new Error('User not authenticated'));
  }
};

// Helper function to validate courseId
const ensureValidCourseId = (req, cb) => {
  if (!req.params.courseId || !/^[0-9a-fA-F]{24}$/.test(req.params.courseId)) {
    return cb(new Error('Invalid course ID'));
  }
};

// --- Uploader for Documents ---
const documentStorage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const dir = path.join('public', 'uploads', 'documents');
    await fs.mkdir(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const sanitizedName = sanitizeFilename(file.originalname);
    cb(null, `document-${Date.now()}${path.extname(sanitizedName)}`);
  }
});

const uploadDocument = multer({
  storage: documentStorage,
  limits: { fileSize: 5000000 }, // 5MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|pdf|doc|docx/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only images, PDFs, and Word documents are allowed!'));
  }
}).single('documentFile');

// --- Uploader for Profile Pictures ---
const profilePicStorage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const dir = path.join('public', 'images', 'profiles');
    await fs.mkdir(dir, { recursive: true });
    ensureAuthenticated(req, cb); // Validate user
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const sanitizedName = sanitizeFilename(file.originalname);
    const baseName = `profile-${req.user.id}`;
    const ext = path.extname(sanitizedName);
    cb(null, `${baseName}${ext}`);
  }
});

const uploadProfilePic = multer({
  storage: profilePicStorage,
  limits: { fileSize: 2000000 }, // 2MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Images Only!'));
  }
}).single('profileImage');

// --- Uploader for SOPs ---
const sopStorage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const dir = path.join('public', 'uploads', 'sops');
    await fs.mkdir(dir, { recursive: true });
    ensureAuthenticated(req, cb); // Validate user
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const sanitizedName = sanitizeFilename(file.originalname);
    cb(null, `sop-${req.user.id}-${Date.now()}${path.extname(sanitizedName)}`);
  }
});

const uploadSop = multer({
  storage: sopStorage,
  limits: { fileSize: 3000000 }, // 3MB
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf|doc|docx/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype); // Added MIME type check
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only .pdf, .doc, and .docx files are allowed!'));
  }
}).single('sopFile');

// --- Uploader for Lesson Resources ---
const lessonResourceStorage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const dir = path.join('public', 'uploads', 'lessons');
    await fs.mkdir(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const sanitizedName = sanitizeFilename(file.originalname);
    cb(null, `lesson-resource-${Date.now()}${path.extname(sanitizedName)}`);
  }
});

const uploadLessonResource = multer({
  storage: lessonResourceStorage,
  limits: { fileSize: 10000000 }, // 10MB
  fileFilter: (req, file, cb) => {
    // Restrict to common resource types for security
    const filetypes = /jpeg|jpg|png|gif|pdf|doc|docx|mp4|mp3/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only images, PDFs, Word documents, videos, and audio files are allowed!'));
  }
}).single('resourceFile');

// --- Uploader for Thumbnails ---
const thumbnailStorage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const dir = path.join('public', 'images', 'thumbnails');
    await fs.mkdir(dir, { recursive: true });
    ensureValidCourseId(req, cb); // Validate courseId
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const sanitizedName = sanitizeFilename(file.originalname);
    const baseName = `thumbnail-${req.params.courseId}`;
    const ext = path.extname(sanitizedName);
    cb(null, `${baseName}${ext}`);
  }
});

const uploadThumbnail = multer({
  storage: thumbnailStorage,
  limits: { fileSize: 2000000 }, // 2MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Images Only!'));
  }
}).single('thumbnailFile');

// Error handling wrapper for consistent responses
const handleUpload = (uploader) => {
  return (req, res, next) => {
    uploader(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: `Upload error: ${err.message}` });
      } else if (err) {
        return res.status(400).json({ error: err.message });
      }
      next();
    });
  };
};
const ds160PhotoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // DS-160 photos are sensitive, so keep them in the private 'uploads' folder
    const dir = './uploads/ds160-photos/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    // Name the file after the student's ID for easy reference
    cb(null, `ds160-photo-${req.user.id}${path.extname(file.originalname)}`);
  }
});

const uploadDs160Photo = multer({
  storage: ds160PhotoStorage,
  limits: { fileSize: 2000000 }, // 2MB limit
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/; // Strict image filter
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Only .jpeg, .jpg, or .png images are allowed!');
    }
  }
}).single('ds160Photo'); // The form field name must be 'ds160Photo'

// Export all functions with error handling
module.exports = {
  uploadDocument: handleUpload(uploadDocument),
  uploadProfilePic: handleUpload(uploadProfilePic),
  uploadSop: handleUpload(uploadSop),
  uploadLessonResource: handleUpload(uploadLessonResource),
  uploadThumbnail: handleUpload(uploadThumbnail),
  uploadDs160Photo: handleUpload(uploadDs160Photo)
};
