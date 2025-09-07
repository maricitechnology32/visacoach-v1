import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  Chip,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Avatar,
  LinearProgress
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  WatchLater as WatchLaterIcon,
  Assignment as AssignmentIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  Warning as WarningIcon
} from '@mui/icons-material';

const ApplicationStatusDashboard = () => {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    const fetchApplicationData = async () => {
      // Simulate API call
      setTimeout(() => {
        setApplication({
          id: 'DS-2023-987654',
          status: 'Under Review',
          submittedDate: '2023-10-15',
          estimatedCompletion: '2023-10-30',
          counselor: {
            name: 'Sarah Johnson',
            email: 's.johnson@consultancy.com',
            phone: '+1 (555) 123-4567'
          },
          feedback: 'Your application is currently being reviewed by our visa specialists. We have requested additional documentation regarding your financial support evidence.',
          nextSteps: [
            'Upload bank statements from the last 6 months',
            'Provide letter of employment verification',
            'Schedule visa interview appointment'
          ],
          history: [
            { date: '2023-10-15', status: 'Submitted', description: 'Application submitted for review' },
            { date: '2023-10-16', status: 'Initial Review', description: 'Application assigned to counselor' },
            { date: '2023-10-18', status: 'Under Review', description: 'Additional documents requested' }
          ],
          documents: [
            { name: 'Application Form', type: 'DS-160', uploaded: true },
            { name: 'Passport Scan', type: 'Identification', uploaded: true },
            { name: 'Photograph', type: 'Identification', uploaded: true },
            { name: 'Financial Documents', type: 'Support', uploaded: false },
            { name: 'Employment Verification', type: 'Support', uploaded: false }
          ]
        });
        setLoading(false);
      }, 1500);
    };

    fetchApplicationData();
  }, []);

  const statusSteps = ['Submitted', 'Initial Review', 'Under Review', 'Approved', 'Visa Issued'];

  const getCurrentStep = () => {
    if (!application) return 0;
    switch (application.status) {
      case 'Submitted': return 0;
      case 'Initial Review': return 1;
      case 'Under Review': return 2;
      case 'Approved': return 3;
      case 'Visa Issued': return 4;
      default: return 0;
    }
  };

  const getStatusChip = (status) => {
    let color = 'default';
    let icon = <PendingIcon />;

    switch (status) {
      case 'Submitted':
        color = 'info';
        icon = <WatchLaterIcon />;
        break;
      case 'Initial Review':
      case 'Under Review':
        color = 'warning';
        icon = <PendingIcon />;
        break;
      case 'Approved':
      case 'Visa Issued':
        color = 'success';
        icon = <CheckCircleIcon />;
        break;
      default:
        color = 'default';
    }

    return <Chip icon={icon} label={status} color={color} variant="outlined" />;
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="60vh">
          <Typography variant="h6" gutterBottom>Loading your application status...</Typography>
          <LinearProgress sx={{ width: '100%', maxWidth: 400, mt: 2 }} />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom color="primary">
          DS-160 Application Status
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Track the progress of your visa application
        </Typography>
      </Box>

      {/* Application ID Card */}
      <Card sx={{ mb: 4, bgcolor: 'grey.50' }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Application ID: <strong>{application.id}</strong>
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body1">Status:</Typography>
                {getStatusChip(application.status)}
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: { md: 'right' } }}>
              <Button variant="outlined" startIcon={<DownloadIcon />} sx={{ mr: 1 }}>
                Download PDF
              </Button>
              <Button variant="outlined" startIcon={<PrintIcon />} sx={{ mr: 1 }}>
                Print
              </Button>
              <Button variant="outlined" startIcon={<EmailIcon />}>
                Email Status
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Progress Stepper */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Application Progress
        </Typography>
        <Stepper activeStep={getCurrentStep()} alternativeLabel sx={{ mt: 3 }}>
          {statusSteps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid item xs={12} md={8}>
          {/* Counselor Feedback */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Counselor Feedback
            </Typography>
            <Alert severity="info" sx={{ mt: 2, mb: 2 }}>
              <Typography variant="body1">
                {application.feedback}
              </Typography>
            </Alert>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Next Steps Required
            </Typography>
            <List>
              {application.nextSteps.map((step, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <AssignmentIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={step} />
                </ListItem>
              ))}
            </List>

            <Button variant="contained" sx={{ mt: 2 }}>
              Upload Requested Documents
            </Button>
          </Paper>

          {/* Application History */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Application History
            </Typography>
            <List>
              {application.history.map((item, index) => (
                <ListItem key={index} sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <CalendarIcon color="action" fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                      {item.date}
                    </Typography>
                    <Chip label={item.status} size="small" variant="outlined" />
                  </Box>
                  <Typography variant="body1">
                    {item.description}
                  </Typography>
                  {index < application.history.length - 1 && <Divider sx={{ width: '100%', mt: 2 }} />}
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={4}>
          {/* Counselor Information */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Your Counselor
            </Typography>
            <Box display="flex" alignItems="center" mb={2}>
              <Avatar sx={{ width: 60, height: 60, mr: 2 }}>
                <PersonIcon />
              </Avatar>
              <Box>
                <Typography variant="h6">{application.counselor.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Visa Application Specialist
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" gutterBottom>
              <strong>Email:</strong> {application.counselor.email}
            </Typography>
            <Typography variant="body2">
              <strong>Phone:</strong> {application.counselor.phone}
            </Typography>
            <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
              Contact Counselor
            </Button>
          </Paper>

          {/* Document Status */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Document Status
            </Typography>
            <List dense>
              {application.documents.map((doc, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    {doc.uploaded ? (
                      <CheckCircleIcon color="success" />
                    ) : (
                      <WarningIcon color="warning" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={doc.name}
                    secondary={doc.type}
                    primaryTypographyProps={{
                      color: doc.uploaded ? 'text.primary' : 'text.secondary'
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Important Dates */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Important Dates
            </Typography>
            <Box mb={2}>
              <Typography variant="body2" color="text.secondary">
                Submitted On
              </Typography>
              <Typography variant="body1">
                {application.submittedDate}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Estimated Completion
              </Typography>
              <Typography variant="body1">
                {application.estimatedCompletion}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Call to Action */}
      <Paper sx={{ p: 3, mt: 4, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
        <Typography variant="h5" gutterBottom>
          Next Steps for Your Visa Application
        </Typography>
        <Typography variant="body1" paragraph>
          Complete the requested documents and prepare for your visa interview. Your counselor will guide you through the process.
        </Typography>
        <Button variant="contained" color="secondary">
          View Interview Preparation Guide
        </Button>
      </Paper>
    </Container>
  );
};

export default ApplicationStatusDashboard;