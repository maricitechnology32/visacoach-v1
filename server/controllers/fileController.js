const path = require('path');
const fs = require('fs');

const downloadPrivateFile = (req, res) => {
  try {
    const { filePath, fileName } = req.body;

    if (!filePath || !fileName) {
      return res.status(400).json({ message: 'File path and name are required.' });
    }

    // Build the absolute path to the file on the server
    const fullFilePath = path.join(__dirname, '../../', filePath.substring(1));

    // Security Check: Ensure the requested path is within our project's folders
    const rootDir = path.join(__dirname, '../../');
    if (!fullFilePath.startsWith(rootDir)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    if (fs.existsSync(fullFilePath)) {
      // Use Express's built-in download method
      res.download(fullFilePath, fileName);
    } else {
      res.status(404).json({ message: 'File not found on server.' });
    }
  } catch (error) {
    console.error('File download error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { downloadPrivateFile };