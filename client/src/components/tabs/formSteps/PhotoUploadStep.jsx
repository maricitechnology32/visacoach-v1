import React, { useState, useRef } from 'react';
import {
  Box,
  Grid,
  Typography,
  Divider,
  Alert,
  Paper,
  Button,
  Card,
  CardMedia,
  CardActions,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import HelpIcon from '@mui/icons-material/Help';

const PhotoUploadStep = ({ data, onChange }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [requirementsDialogOpen, setRequirementsDialogOpen] = useState(false);
  const fileInputRef = useRef(null);

  const photoRequirements = [
    { text: 'Taken within the last 6 months', met: true },
    { text: 'Color photo against white background', met: true },
    { text: 'Full face, front view with eyes open', met: true },
    { text: 'Neutral expression with both eyes open', met: true },
    { text: 'No hats or head coverings (except religious)', met: true },
    { text: 'No headphones or wireless hands-free devices', met: true },
    { text: '2 x 2 inches (51 x 51 mm) in size', met: true },
    { text: 'Head height between 1 - 1 3/8 inches (25 - 35 mm)', met: true },
    { text: 'Eye height between 1 1/8 - 1 3/8 inches (28 - 35 mm)', met: true }
  ];

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      validateAndUploadPhoto(file);
    }
  };

  const validateAndUploadPhoto = (file) => {
    setUploadError('');
    setUploading(true);

    // Check file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please upload an image file (JPEG, PNG, etc.)');
      setUploading(false);
      return;
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File size must be less than 10MB');
      setUploading(false);
      return;
    }

    // Simulate upload process
    const reader = new FileReader();
    reader.onload = (e) => {
      // In a real application, you would upload to a server here
      // For demo purposes, we'll use the data URL directly
      setTimeout(() => {
        const uploadDate = new Date();
        onChange('filePath', e.target.result);
        onChange('uploadDate', uploadDate);
        onChange('meetsRequirements', true); // Assume it meets requirements after upload
        setUploading(false);
      }, 1500);
    };
    reader.onerror = () => {
      setUploadError('Error reading file. Please try again.');
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      validateAndUploadPhoto(files[0]);
    }
  };

  const handleRemovePhoto = () => {
    onChange('filePath', '');
    onChange('uploadDate', null);
    onChange('meetsRequirements', false);
  };

  const handleRequirementsConfirm = () => {
    onChange('meetsRequirements', true);
    setRequirementsDialogOpen(false);
  };

  const isPhotoComplete = () => {
    return data?.filePath && data.meetsRequirements;
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2" fontWeight="bold">
          Photograph Requirements
        </Typography>
        <Typography variant="body2">
          Upload a recent photograph that meets the U.S. Department of State requirements.
          The photo will be printed on your visa if approved.
        </Typography>
      </Alert>

      <Grid container spacing={3}>
        {/* Photo Upload Area */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              textAlign: 'center',
              border: '2px dashed',
              borderColor: data?.filePath ? 'success.main' : 'grey.300',
              backgroundColor: data?.filePath ? 'success.50' : 'grey.50',
              minHeight: '300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {uploading ? (
              <Box sx={{ textAlign: 'center' }}>
                <CircularProgress size={60} thickness={4} />
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Uploading your photo...
                </Typography>
              </Box>
            ) : data?.filePath ? (
              <Box sx={{ textAlign: 'center' }}>
                <CheckCircleIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
                <Typography variant="h6" color="success.main" gutterBottom>
                  Photo Uploaded Successfully!
                </Typography>
                <Card sx={{ maxWidth: 200, mx: 'auto', mb: 2 }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={data?.filePath}
                    alt="Uploaded visa photo"
                    sx={{ objectFit: 'cover' }}
                  />
                </Card>
                <Typography variant="body2" color="text.secondary">
                  Uploaded on: {data.uploadDate ? new Date(data.uploadDate).toLocaleDateString() : 'N/A'}
                </Typography>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleRemovePhoto}
                  sx={{ mt: 2 }}
                >
                  Remove Photo
                </Button>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <CloudUploadIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Upload Your Photo
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Drag and drop your photo here or click to browse
                </Typography>
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<PhotoCameraIcon />}
                >
                  Select Photo
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleFileSelect}
                  />
                </Button>
                <Button
                  variant="text"
                  onClick={() => setRequirementsDialogOpen(true)}
                  startIcon={<HelpIcon />}
                  sx={{ mt: 2, display: 'block', mx: 'auto' }}
                >
                  View Photo Requirements
                </Button>
              </Box>
            )}

            {uploadError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {uploadError}
              </Alert>
            )}
          </Paper>
        </Grid>

        {/* Requirements Checklist */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Photo Requirements Checklist
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <List dense>
              {photoRequirements.map((requirement, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    {requirement.met ? (
                      <CheckIcon color="success" />
                    ) : (
                      <CloseIcon color="error" />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={requirement.text} />
                </ListItem>
              ))}
            </List>

            <Alert severity="info" sx={{ mt: 2 }}>
              <Typography variant="body2">
                Religious head coverings are acceptable but must not obscure any facial features.
                Medical requirements are accepted with documentation.
              </Typography>
            </Alert>

            <FormControlLabel
              control={
                <Checkbox
                  checked={data?.meetsRequirements || false}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setRequirementsDialogOpen(true);
                    } else {
                      onChange('meetsRequirements', false);
                    }
                  }}
                  disabled={!data?.filePath}
                />
              }
              label="I confirm that my photo meets all requirements"
              sx={{ mt: 2, display: 'block' }}
            />
          </Paper>
        </Grid>

        {/* Status and Actions */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Photo Status
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Alert
              severity={
                isPhotoComplete() ? "success" :
                  data?.filePath ? "warning" : "info"
              }
            >
              <Typography variant="body2" fontWeight="bold">
                {isPhotoComplete()
                  ? "Photo Accepted and Ready for Submission"
                  : data?.filePath
                    ? "Please confirm that your photo meets requirements"
                    : "Please upload your visa photograph"
                }
              </Typography>
              <Typography variant="body2">
                {isPhotoComplete()
                  ? "Your photo has been uploaded and meets all requirements."
                  : data?.filePath
                    ? "Your photo has been uploaded. Please confirm it meets all requirements above."
                    : "Your photo will be printed on your visa if approved."
                }
              </Typography>
            </Alert>

            {data?.filePath && !data?.meetsRequirements && (
              <Button
                variant="contained"
                onClick={() => setRequirementsDialogOpen(true)}
                startIcon={<HelpIcon />}
                sx={{ mt: 2 }}
              >
                Review Requirements
              </Button>
            )}
          </Paper>
        </Grid>

        {/* Important Notes */}
        <Grid item xs={12}>
          <Alert severity="warning">
            <Typography variant="body2" fontWeight="bold">
              Important Information:
            </Typography>
            <Typography variant="body2">
              • Your photo must be recent (taken within last 6 months)<br />
              • It must be a color photo against plain white background<br />
              • You must have a neutral facial expression with both eyes open<br />
              • No uniforms or clothing that looks like uniforms<br />
              • Photos not meeting requirements will delay visa processing
            </Typography>
          </Alert>
        </Grid>
      </Grid>

      {/* Requirements Confirmation Dialog */}
      <Dialog
        open={requirementsDialogOpen}
        onClose={() => setRequirementsDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Confirm Photo Requirements</DialogTitle>
        <DialogContent>
          <Typography variant="body2" paragraph>
            Please confirm that your photo meets all of the following requirements:
          </Typography>

          <List dense>
            {photoRequirements.map((requirement, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <CheckIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={requirement.text} />
              </ListItem>
            ))}
          </List>

          <Alert severity="error" sx={{ mt: 2 }}>
            <Typography variant="body2" fontWeight="bold">
              Important:
            </Typography>
            <Typography variant="body2">
              Photos not meeting these requirements will be rejected and may delay your visa processing.
            </Typography>
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRequirementsDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleRequirementsConfirm}
            variant="contained"
            startIcon={<CheckCircleIcon />}
          >
            Confirm Requirements Met
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PhotoUploadStep;