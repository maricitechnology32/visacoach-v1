

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   Container, Paper, Typography, Button, Box, CircularProgress,
//   Alert, Divider, TextField, Select, MenuItem, FormControl, InputLabel
// } from '@mui/material';
// import { Save as SaveIcon, ArrowBack as BackIcon } from '@mui/icons-material';

// // Import the necessary service functions
// import { getStudentDs160, reviewStudentDs160 } from '../services/ds160Service';

// // We reuse the InfoSection component to display the data
// import InfoSection from '../components/summary/InfoSection';

// const Ds160ReviewPage = () => {
//   const { studentId } = useParams(); // Get studentId from the URL
//   const navigate = useNavigate(); // To navigate back after submission

//   const [formData, setFormData] = useState(null);
//   const [feedback, setFeedback] = useState('');
//   const [newStatus, setNewStatus] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   useEffect(() => {
//     const loadStudentData = async () => {
//       if (!studentId) return;
//       try {
//         setLoading(true);
//         const data = await getStudentDs160(studentId);
//         setFormData(data);
//         setNewStatus(data.status); // Pre-fill status
//         setFeedback(data.counselorFeedback || ''); // Pre-fill feedback
//       } catch (err) {
//         setError(err.message || 'Failed to load student DS-160 data.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadStudentData();
//   }, [studentId]);

//   const handleSubmitReview = async () => {
//     try {
//       setError('');
//       setSuccess('');
//       const reviewData = { status: newStatus, counselorFeedback: feedback };
//       await reviewStudentDs160(studentId, reviewData);
//       setSuccess('Review submitted successfully! The student will be notified.');
//       setTimeout(() => navigate('/dashboard'), 2000); // Redirect after 2s
//     } catch (err) {
//       setError(err.message || 'Failed to submit the review.');
//     }
//   };

//   if (loading) {
//     return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
//   }
//   if (error) {
//     return <Container><Alert severity="error" sx={{ mt: 4 }}>{error}</Alert></Container>;
//   }
//   if (!formData) {
//     return <Container><Typography sx={{ mt: 4 }}>No data found for this student.</Typography></Container>;
//   }

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       {/* Student's Form Summary */}
//       <Paper sx={{ p: { xs: 2, md: 4 }, mb: 4 }}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           Review DS-160 Application
//         </Typography>
//         <Typography variant="h6" color="text.secondary">
//           Student Name: {formData.personalInfo?.fullNameNative || 'N/A'}
//         </Typography>
//         <Typography variant="body1" color="text.secondary">
//           Application ID: {formData.applicationId || 'N/A'}
//         </Typography>
//         <Divider sx={{ my: 3 }} />

//         {/* ✅ All InfoSection components are now explicitly rendered */}
//         <InfoSection title="Personal Information" data={formData.personalInfo} />
//         <InfoSection title="Passport Information" data={formData.passportInfo} />
//         <InfoSection title="Contact Information" data={formData.contactInfo} />
//         <InfoSection title="Travel Information" data={formData.travelInfo} />
//         <InfoSection title="Previous U.S. Travel" data={formData.previousUSTravel} />
//         <InfoSection title="International Travel History" data={formData.internationalTravelHistory} />
//         <InfoSection title="U.S. Point of Contact" data={formData.usContact} />
//         <InfoSection title="Family Information" data={formData.familyInfo} />
//         <InfoSection title="Work, Education & Training" data={formData.workEducation} />
//         <InfoSection title="SEVIS Information" data={formData.sevisInfo} />
//         <InfoSection title="Security and Background" data={formData.security} />
//         <InfoSection title="Additional Contacts" data={formData.additionalContacts} />
//         <InfoSection title="Social Media" data={formData.socialMedia} />
//         <InfoSection title="Applicant Statement" data={formData.applicantStatement} />
//         <InfoSection title="Photograph" data={formData.photograph} />
//         <InfoSection title="Additional Information" data={formData.additionalInformation} />

//       </Paper>

//       {/* Counselor's Review Form */}
//       <Paper sx={{ p: { xs: 2, md: 4 }, position: 'sticky', bottom: 0, zIndex: 1 }}>
//         <Typography variant="h5" gutterBottom>Counselor Review & Action</Typography>
//         {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

//         <FormControl fullWidth sx={{ mb: 2 }}>
//           <InputLabel id="status-select-label">Update Status</InputLabel>
//           <Select
//             labelId="status-select-label"
//             value={newStatus}
//             label="Update Status"
//             onChange={(e) => setNewStatus(e.target.value)}
//           >
//             <MenuItem value="In Progress">In Progress (Needs Correction)</MenuItem>
//             <MenuItem value="Submitted for Review">Submitted for Review</MenuItem>
//             <MenuItem value="Approved">Approved</MenuItem>
//           </Select>
//         </FormControl>

//         <TextField
//           label="Feedback for Student"
//           multiline
//           rows={4}
//           fullWidth
//           variant="outlined"
//           value={feedback}
//           onChange={(e) => setFeedback(e.target.value)}
//           placeholder="Provide clear feedback or points for correction. This will be visible to the student."
//           sx={{ mb: 2 }}
//         />

//         <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//           <Button
//             variant="outlined"
//             startIcon={<BackIcon />}
//             onClick={() => navigate('/dashboard')}
//           >
//             Back to Dashboard
//           </Button>
//           <Button
//             variant="contained"
//             color="primary"
//             startIcon={<SaveIcon />}
//             onClick={handleSubmitReview}
//           >
//             Submit Review
//           </Button>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default Ds160ReviewPage;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Paper, Typography, Button, Box, CircularProgress,
  Alert, Divider, TextField, Select, MenuItem, FormControl, InputLabel,
  Grid, Card, CardContent, Chip, Stepper, Step, StepLabel,
  useTheme, useMediaQuery
} from '@mui/material';
import {
  Save as SaveIcon,
  ArrowBack as BackIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import { getStudentDs160, reviewStudentDs160 } from '../services/ds160Service';
import InfoSection from '../components/summary/InfoSection';

const Ds160ReviewPage = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [formData, setFormData] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const loadStudentData = async () => {
      if (!studentId) return;
      try {
        setLoading(true);
        const data = await getStudentDs160(studentId);
        setFormData(data);
        setNewStatus(data.status);
        setFeedback(data.counselorFeedback || '');
      } catch (err) {
        setError(err.message || 'Failed to load student DS-160 data.');
      } finally {
        setLoading(false);
      }
    };
    loadStudentData();
  }, [studentId]);

  const handleSubmitReview = async () => {
    try {
      setError('');
      setSuccess('');
      const reviewData = { status: newStatus, counselorFeedback: feedback };
      await reviewStudentDs160(studentId, reviewData);
      setSuccess('Review submitted successfully! The student will be notified.');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setError(err.message || 'Failed to submit the review.');
    }
  };

  const getStatusChip = (status) => {
    let color = 'default';
    let icon = <EditIcon />;

    if (status === 'Submitted' || status === 'Submitted for Review') {
      color = 'warning';
      icon = <WarningIcon />;
    } else if (status === 'Approved') {
      color = 'success';
      icon = <CheckIcon />;
    } else if (status === 'In Progress') {
      color = 'info';
    }

    return (
      <Chip
        icon={icon}
        label={status}
        color={color}
        size="small"
        variant="outlined"
        sx={{ fontWeight: 'bold' }}
      />
    );
  };

  if (loading) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        flexDirection: 'column',
        gap: 2
      }}>
        <CircularProgress sx={{ color: '#2e7d32' }} />
        <Typography variant="h6" color="text.secondary">
          Loading student application...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button
          variant="contained"
          onClick={() => navigate('/dashboard')}
          sx={{
            backgroundColor: '#2e7d32',
            '&:hover': { backgroundColor: '#1b5e20' }
          }}
        >
          Back to Dashboard
        </Button>
      </Container>
    );
  }

  if (!formData) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          No Data Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          No DS-160 data found for this student.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/dashboard')}
          sx={{
            backgroundColor: '#2e7d32',
            '&:hover': { backgroundColor: '#1b5e20' }
          }}
        >
          Back to Dashboard
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 3 },
          mb: 3,
          backgroundColor: '#f1f8e9',
          border: '1px solid #c8e6c9',
          borderRadius: 2
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', mb: 2 }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, color: '#1b5e20' }}>
              Review DS-160 Application
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Student: <strong>{formData.personalInfo?.fullNameNative || 'N/A'}</strong>
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Application ID: <strong>{formData.applicationId || 'N/A'}</strong>
            </Typography>
          </Box>
          <Box sx={{ mt: isMobile ? 2 : 0 }}>
            {getStatusChip(formData.status)}
          </Box>
        </Box>

        <Stepper activeStep={formData.status === 'In Progress' ? 0 : formData.status === 'Submitted for Review' ? 1 : 2} sx={{ mt: 3, mb: 2 }}>
          <Step>
            <StepLabel>In Progress</StepLabel>
          </Step>
          <Step>
            <StepLabel>Submitted</StepLabel>
          </Step>
          <Step>
            <StepLabel>Approved</StepLabel>
          </Step>
        </Stepper>
      </Paper>

      <Grid container spacing={3}>
        {/* Student Application Data */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: { xs: 2, md: 3 }, mb: 3, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#2e7d32', display: 'flex', alignItems: 'center' }}>
              <Box component="span" sx={{ mr: 1 }}>📋</Box>
              Application Details
            </Typography>
            <Divider sx={{ mb: 3, borderColor: '#c8e6c9' }} />

            <Box sx={{ '& > *': { mb: 3 } }}>
              <InfoSection title="Personal Information" data={formData.personalInfo} />
              <InfoSection title="Passport Information" data={formData.passportInfo} />
              <InfoSection title="Contact Information" data={formData.contactInfo} />
              <InfoSection title="Travel Information" data={formData.travelInfo} />
              <InfoSection title="Previous U.S. Travel" data={formData.previousUSTravel} />
              <InfoSection title="International Travel History" data={formData.internationalTravelHistory} />
              <InfoSection title="U.S. Point of Contact" data={formData.usContact} />
              <InfoSection title="Family Information" data={formData.familyInfo} />
              <InfoSection title="Work, Education & Training" data={formData.workEducation} />
              <InfoSection title="SEVIS Information" data={formData.sevisInfo} />
              <InfoSection title="Security and Background" data={formData.security} />
              <InfoSection title="Additional Contacts" data={formData.additionalContacts} />
              <InfoSection title="Social Media" data={formData.socialMedia} />
              <InfoSection title="Applicant Statement" data={formData.applicantStatement} />
              <InfoSection title="Photograph" data={formData.photograph} />
              <InfoSection title="Additional Information" data={formData.additionalInformation} />
            </Box>
          </Paper>
        </Grid>

        {/* Counselor Review Section */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: { xs: 2, md: 3 },
              position: 'sticky',
              top: 20,
              borderRadius: 2,
              border: '1px solid #c8e6c9'
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ color: '#2e7d32', display: 'flex', alignItems: 'center' }}>
              <Box component="span" sx={{ mr: 1 }}>✏️</Box>
              Counselor Review
            </Typography>
            <Divider sx={{ mb: 3, borderColor: '#c8e6c9' }} />

            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="status-select-label">Update Status</InputLabel>
              <Select
                labelId="status-select-label"
                value={newStatus}
                label="Update Status"
                onChange={(e) => setNewStatus(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#c8e6c9',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4caf50',
                  },
                }}
              >
                <MenuItem value="In Progress">In Progress (Needs Correction)</MenuItem>
                <MenuItem value="Submitted for Review">Submitted for Review</MenuItem>
                <MenuItem value="Approved">Approved</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Feedback for Student"
              multiline
              rows={6}
              fullWidth
              variant="outlined"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Provide clear feedback or points for correction. This will be visible to the student."
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#4caf50',
                  },
                },
              }}
            />

            <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<BackIcon />}
                onClick={() => navigate('/dashboard')}
                fullWidth={isMobile}
                sx={{
                  borderColor: '#2e7d32',
                  color: '#2e7d32',
                  '&:hover': {
                    borderColor: '#1b5e20',
                    backgroundColor: 'rgba(46, 125, 50, 0.04)'
                  }
                }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSubmitReview}
                fullWidth={isMobile}
                sx={{
                  backgroundColor: '#2e7d32',
                  '&:hover': { backgroundColor: '#1b5e20' }
                }}
              >
                Submit Review
              </Button>
            </Box>

            {/* Help Text */}
            <Card sx={{ mt: 3, backgroundColor: '#f1f8e9', border: '1px solid #c8e6c9' }}>
              <CardContent>
                <Typography variant="body2" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                  Review Guidelines
                </Typography>
                <Typography variant="body2" sx={{ color: '#424242', mt: 1 }}>
                  • Check for accuracy and completeness<br />
                  • Provide constructive feedback<br />
                  • Update status appropriately<br />
                  • Be specific about required corrections
                </Typography>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Ds160ReviewPage;