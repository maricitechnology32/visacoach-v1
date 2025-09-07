import React, { useState } from 'react';
import {
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
  Divider,
  Alert,
  Button,
  IconButton,
  Paper,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';

const WorkEducationStep = ({ data, onChange, onNestedChange }) => {
  const [employmentInput, setEmploymentInput] = useState({
    occupation: '',
    employer: '',
    address: '',
    dateFrom: null,
    dateTo: null,
    supervisorName: ''
  });

  const [educationInput, setEducationInput] = useState({
    schoolName: '',
    address: '',
    courseOfStudy: '',
    dateFrom: null,
    dateTo: null,
    degree: ''
  });

  const [trainingInput, setTrainingInput] = useState({
    description: '',
    dateFrom: null,
    dateTo: null,
    institution: ''
  });

  const [skillInput, setSkillInput] = useState('');
  const [membershipInput, setMembershipInput] = useState('');

  const degreeOptions = [
    'High School',
    'Associate Degree',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'Doctorate',
    'Professional Certificate',
    'Diploma',
    'Other'
  ];

  // Current Employment/Education Handlers
  const handleCurrentChange = (field, value) => {
    onNestedChange('current', field, value);
  };

  // Previous Employment Handlers
  const handleAddEmployment = () => {
    if (employmentInput.occupation.trim() && employmentInput.employer.trim()) {
      const updatedEmployment = [...data.previousEmployment, { ...employmentInput }];
      onChange('previousEmployment', updatedEmployment);
      setEmploymentInput({
        occupation: '',
        employer: '',
        address: '',
        dateFrom: null,
        dateTo: null,
        supervisorName: ''
      });
    }
  };

  const handleRemoveEmployment = (index) => {
    const updatedEmployment = data.previousEmployment.filter((_, i) => i !== index);
    onChange('previousEmployment', updatedEmployment);
  };

  const handleEmploymentInputChange = (field, value) => {
    setEmploymentInput(prev => ({ ...prev, [field]: value }));
  };

  // Education History Handlers
  const handleAddEducation = () => {
    if (educationInput.schoolName.trim() && educationInput.courseOfStudy.trim()) {
      const updatedEducation = [...data.educationalHistory, { ...educationInput }];
      onChange('educationalHistory', updatedEducation);
      setEducationInput({
        schoolName: '',
        address: '',
        courseOfStudy: '',
        dateFrom: null,
        dateTo: null,
        degree: ''
      });
    }
  };

  const handleRemoveEducation = (index) => {
    const updatedEducation = data.educationalHistory.filter((_, i) => i !== index);
    onChange('educationalHistory', updatedEducation);
  };

  const handleEducationInputChange = (field, value) => {
    setEducationInput(prev => ({ ...prev, [field]: value }));
  };

  // Training Handlers
  const handleAddTraining = () => {
    if (trainingInput.description.trim() && trainingInput.institution.trim()) {
      const updatedTraining = [...data.otherTraining, { ...trainingInput }];
      onChange('otherTraining', updatedTraining);
      setTrainingInput({
        description: '',
        dateFrom: null,
        dateTo: null,
        institution: ''
      });
    }
  };

  const handleRemoveTraining = (index) => {
    const updatedTraining = data.otherTraining.filter((_, i) => i !== index);
    onChange('otherTraining', updatedTraining);
  };

  const handleTrainingInputChange = (field, value) => {
    setTrainingInput(prev => ({ ...prev, [field]: value }));
  };

  // Skills Handlers
  const handleAddSkill = () => {
    if (skillInput.trim()) {
      const updatedSkills = [...data.specializedSkills, skillInput.trim()];
      onChange('specializedSkills', updatedSkills);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = data.specializedSkills.filter((_, i) => i !== index);
    onChange('specializedSkills', updatedSkills);
  };

  // Membership Handlers
  const handleAddMembership = () => {
    if (membershipInput.trim()) {
      const updatedMemberships = [...data.professionalMemberships, membershipInput.trim()];
      onChange('professionalMemberships', updatedMemberships);
      setMembershipInput('');
    }
  };

  const handleRemoveMembership = (index) => {
    const updatedMemberships = data.professionalMemberships.filter((_, i) => i !== index);
    onChange('professionalMemberships', updatedMemberships);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ mt: 2 }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          Provide complete information about your work history, education, and professional background. Include all relevant employment and educational experiences.
        </Alert>

        <Grid container spacing={3}>
          {/* Current Occupation/Education */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                <WorkIcon sx={{ mr: 1, verticalAlign: 'bottom' }} />
                Current Occupation/Education
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.isStudent || false}
                    onChange={(e) => onChange('isStudent', e.target.checked)}
                  />
                }
                label="Are you currently a student?"
              />

              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Present Occupation"
                    value={data.presentOccupation || ''}
                    onChange={(e) => onChange('presentOccupation', e.target.value)}
                    placeholder="e.g., Software Engineer, Student, Manager"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={data.isStudent ? "School/University Name" : "Employer Name"}
                    value={data.current?.employerOrSchool || ''}
                    onChange={(e) => handleCurrentChange('employerOrSchool', e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    value={data.current?.address || ''}
                    onChange={(e) => handleCurrentChange('address', e.target.value)}
                    multiline
                    rows={2}
                  />
                </Grid>

                {!data.isStudent && (
                  <>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Monthly Salary"
                        type="number"
                        value={data.current?.monthlySalary || ''}
                        onChange={(e) => handleCurrentChange('monthlySalary', e.target.value)}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <DatePicker
                        label="Start Date"
                        value={data.current?.startDate || null}
                        onChange={(date) => handleCurrentChange('startDate', date)}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Job Duties/Responsibilities"
                        value={data.current?.duties || ''}
                        onChange={(e) => handleCurrentChange('duties', e.target.value)}
                        multiline
                        rows={3}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Supervisor's Name"
                        value={data.current?.supervisorName || ''}
                        onChange={(e) => handleCurrentChange('supervisorName', e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Supervisor's Phone"
                        value={data.current?.supervisorPhone || ''}
                        onChange={(e) => handleCurrentChange('supervisorPhone', e.target.value)}
                      />
                    </Grid>
                  </>
                )}
              </Grid>
            </Paper>
          </Grid>

          {/* Previous Employment */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Previous Employment History
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Occupation/Position"
                    value={employmentInput.occupation}
                    onChange={(e) => handleEmploymentInputChange('occupation', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Employer"
                    value={employmentInput.employer}
                    onChange={(e) => handleEmploymentInputChange('employer', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <DatePicker
                    label="From"
                    value={employmentInput.dateFrom}
                    onChange={(date) => handleEmploymentInputChange('dateFrom', date)}
                    renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <DatePicker
                    label="To"
                    value={employmentInput.dateTo}
                    onChange={(date) => handleEmploymentInputChange('dateTo', date)}
                    renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                    minDate={employmentInput.dateFrom}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleAddEmployment}
                    disabled={!employmentInput.occupation || !employmentInput.employer}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>

              {data.previousEmployment.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>Previous Employment:</Typography>
                  {data.previousEmployment.map((job, index) => (
                    <Chip
                      key={index}
                      label={`${job.occupation} at ${job.employer}`}
                      onDelete={() => handleRemoveEmployment(index)}
                      deleteIcon={<DeleteIcon />}
                      color="primary"
                      variant="outlined"
                      sx={{ m: 0.5 }}
                    />
                  ))}
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Education History */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                <SchoolIcon sx={{ mr: 1, verticalAlign: 'bottom' }} />
                Education History
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    size="small"
                    label="School Name"
                    value={educationInput.schoolName}
                    onChange={(e) => handleEducationInputChange('schoolName', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Course of Study"
                    value={educationInput.courseOfStudy}
                    onChange={(e) => handleEducationInputChange('courseOfStudy', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Degree</InputLabel>
                    <Select
                      value={educationInput.degree || ''}
                      label="Degree"
                      onChange={(e) => handleEducationInputChange('degree', e.target.value)}
                    >
                      {degreeOptions.map((degree) => (
                        <MenuItem key={degree} value={degree}>{degree}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                  <DatePicker
                    label="To"
                    value={educationInput.dateTo}
                    onChange={(date) => handleEducationInputChange('dateTo', date)}
                    renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleAddEducation}
                    disabled={!educationInput.schoolName || !educationInput.courseOfStudy}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>

              {data.educationalHistory.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>Education History:</Typography>
                  {data.educationalHistory.map((education, index) => (
                    <Chip
                      key={index}
                      label={`${education.courseOfStudy} at ${education.schoolName}`}
                      onDelete={() => handleRemoveEducation(index)}
                      deleteIcon={<DeleteIcon />}
                      color="secondary"
                      variant="outlined"
                      sx={{ m: 0.5 }}
                    />
                  ))}
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Other Training & Professional Development */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Other Training & Professional Development
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Training Description"
                    value={trainingInput.description}
                    onChange={(e) => handleTrainingInputChange('description', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Institution"
                    value={trainingInput.institution}
                    onChange={(e) => handleTrainingInputChange('institution', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <DatePicker
                    label="Date Completed"
                    value={trainingInput.dateTo}
                    onChange={(date) => handleTrainingInputChange('dateTo', date)}
                    renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleAddTraining}
                    disabled={!trainingInput.description || !trainingInput.institution}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>

              {data.otherTraining.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>Training Programs:</Typography>
                  {data.otherTraining.map((training, index) => (
                    <Chip
                      key={index}
                      label={training.description}
                      onDelete={() => handleRemoveTraining(index)}
                      deleteIcon={<DeleteIcon />}
                      color="info"
                      variant="outlined"
                      sx={{ m: 0.5 }}
                    />
                  ))}
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Professional Memberships & Skills */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Professional Memberships & Skills
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>Professional Memberships:</Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <TextField
                      fullWidth
                      size="small"
                      value={membershipInput}
                      onChange={(e) => setMembershipInput(e.target.value)}
                      placeholder="e.g., IEEE, ACM, PMI"
                    />
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={handleAddMembership}
                      disabled={!membershipInput}
                    >
                      Add
                    </Button>
                  </Box>
                  {data.professionalMemberships.length > 0 && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {data.professionalMemberships.map((membership, index) => (
                        <Chip
                          key={index}
                          label={membership}
                          onDelete={() => handleRemoveMembership(index)}
                          deleteIcon={<DeleteIcon />}
                          size="small"
                        />
                      ))}
                    </Box>
                  )}
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>Specialized Skills:</Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <TextField
                      fullWidth
                      size="small"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      placeholder="e.g., Python, Project Management, CAD"
                    />
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={handleAddSkill}
                      disabled={!skillInput}
                    >
                      Add
                    </Button>
                  </Box>
                  {data.specializedSkills.length > 0 && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {data.specializedSkills.map((skill, index) => (
                        <Chip
                          key={index}
                          label={skill}
                          onDelete={() => handleRemoveSkill(index)}
                          deleteIcon={<DeleteIcon />}
                          size="small"
                          color="success"
                        />
                      ))}
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Important Notes */}
          <Grid item xs={12}>
            <Alert severity="warning">
              <Typography variant="body2" fontWeight="bold">
                Important:
              </Typography>
              <Typography variant="body2">
                • Provide complete and accurate employment history for the last 15 years<br />
                • Include all educational qualifications and training<br />
                • List relevant professional memberships and specialized skills<br />
                • Be consistent with information provided in other sections<br />
                • Gaps in employment/education history should be explained
              </Typography>
            </Alert>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default WorkEducationStep;