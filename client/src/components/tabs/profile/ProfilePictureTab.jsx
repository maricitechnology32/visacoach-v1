import { useState, useRef } from 'react';

const ProfilePictureTab = ({ profilePictureUrl, selectedFile, uploading, onFileChange, onUpload }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [errors, setErrors] = useState(null);
  const [showConfirmUpload, setShowConfirmUpload] = useState(false);
  const [cropMode, setCropMode] = useState(false);
  const [cropData, setCropData] = useState({ x: 0, y: 0, width: 100, height: 100 });
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  // File validation constraints
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

  // Handle file selection
  const handleFileSelect = (file) => {
    setErrors(null);

    if (!file) return;

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setErrors('Invalid file type. Please select a JPEG, PNG, or GIF image.');
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setErrors('File size exceeds 5MB limit.');
      return;
    }

    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onFileChange(file);

    return () => URL.revokeObjectURL(url);
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    dropZoneRef.current.classList.add('border-green-500', 'bg-green-50');
  };

  const handleDragLeave = () => {
    dropZoneRef.current.classList.remove('border-green-500', 'bg-green-50');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    dropZoneRef.current.classList.remove('border-green-500', 'bg-green-50');

    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  // Handle file input change
  const handleInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  // Simulate upload progress (for demo purposes)
  const simulateProgress = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setUploadProgress(0);
      }
    }, 200);
  };

  // Handle upload
  const handleUpload = () => {
    if (!selectedFile) return;

    simulateProgress();
    onUpload(cropMode ? { file: selectedFile, crop: cropData } : selectedFile);
    setShowConfirmUpload(false);
    setCropMode(false);
    setPreviewUrl(null);
  };

  // Handle crop changes
  const handleCropChange = (e, dimension) => {
    setCropData({ ...cropData, [dimension]: Number(e.target.value) });
  };

  return (
    <div className="flex flex-col items-center p-8 max-w-lg mx-auto bg-white rounded-2xl shadow-lg">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2zm7 7a3 3 0 100-6 3 3 0 000 6zm-7 5h14" />
        </svg>
        Profile Picture
      </h2>

      {/* Current Profile Picture */}
      <div className="relative mb-6">
        <img
          src={profilePictureUrl ? `http://localhost:5001${profilePictureUrl}` : '/placeholder-profile.jpg'}
          alt="Profile"
          className="w-40 h-40 rounded-full object-cover border-4 border-green-200 shadow-md"
        />
        <span className="absolute bottom-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full shadow">
          Current
        </span>
      </div>

      {/* Preview Section */}
      {previewUrl && (
        <div className="mb-6 w-full">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Preview</h3>
          <div className="relative">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-48 h-48 object-cover rounded-lg mx-auto"
              style={{
                clipPath: cropMode ? `inset(${cropData.y}% ${100 - cropData.x - cropData.width}% ${100 - cropData.y - cropData.height}% ${cropData.x}%)` : 'none'
              }}
            />
            {cropMode && (
              <div className="absolute inset-0 bg-black bg-opacity-50 pointer-events-none" />
            )}
          </div>

          {/* Crop Controls */}
          {cropMode && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">X Position (%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={cropData.x}
                  onChange={(e) => handleCropChange(e, 'x')}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Y Position (%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={cropData.y}
                  onChange={(e) => handleCropChange(e, 'y')}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Width (%)</label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={cropData.width}
                  onChange={(e) => handleCropChange(e, 'width')}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Height (%)</label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={cropData.height}
                  onChange={(e) => handleCropChange(e, 'height')}
                  className="w-full"
                />
              </div>
            </div>
          )}
          {previewUrl && (
            <button
              onClick={() => setCropMode(!cropMode)}
              className="mt-2 px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {cropMode ? 'Done Cropping' : 'Crop Image'}
            </button>
          )}
        </div>
      )}

      {/* Upload Section */}
      <div
        ref={dropZoneRef}
        className="w-full border-2 border-dashed  border-green-300 rounded-lg p-6 text-center"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload New Picture
        </label>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleInputChange}
          accept="image/jpeg,image/png,image/gif"
          className="hidden"
        />
        <div
          className="block w-full text-sm text-green-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer"
          onClick={() => fileInputRef.current.click()}
        >
          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span>Drag and drop or click to select an image</span>
            <span className="text-xs text-gray-500 mt-1">(Max 5MB, JPEG/PNG/GIF)</span>
          </div>
        </div>
        {selectedFile && (
          <p className="mt-2 text-sm text-green-600 italic">
            📂 Selected: <span className="font-medium">{selectedFile.name}</span>
            <span className="text-gray-500"> ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</span>
          </p>
        )}
        {errors && <p className="mt-2 text-sm text-red-500">{errors}</p>}
      </div>

      {/* Upload Progress */}
      {uploading && uploadProgress > 0 && (
        <div className="w-full mt-4">
          <div className="bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-green-600 h-2.5 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">Uploading: {uploadProgress}%</p>
        </div>
      )}

      {/* Upload Button */}
      {selectedFile && (
        <button
          onClick={() => setShowConfirmUpload(true)}
          disabled={uploading}
          className={`mt-5 w-full py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-green-400 transition-all duration-200 shadow-md flex items-center justify-center gap-2 ${uploading ? 'cursor-not-allowed' : ''}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          {uploading ? '⏳ Uploading...' : '🚀 Confirm Upload'}
        </button>
      )}

      {/* Upload Confirmation Dialog */}
      {showConfirmUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Upload</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to upload {selectedFile.name} as your new profile picture?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowConfirmUpload(false);
                  setCropMode(false);
                }}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePictureTab;