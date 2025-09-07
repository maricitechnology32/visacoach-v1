import React, { useState, useEffect } from 'react';
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
  Paper,
  InputAdornment,
  FormHelperText,
  MenuItem
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import SchoolIcon from '@mui/icons-material/School';
import BadgeIcon from '@mui/icons-material/Badge';

const SevisInfoStep = ({ data, onChange }) => {
  const [programStartDate, setProgramStartDate] = useState(data?.programStartDate || null);
  const [programEndDate, setProgramEndDate] = useState(data?.programEndDate || null);

  // Common school types for suggestions
  const schoolTypes = [
    'University',
    'College',
    'Community College',
    'Language School',
    'High School',
    'Elementary School',
    'Vocational School',
    'Technical Institute',
    'Research Institution',
    'Other'
  ];

  // Common fields of study
  const studyFields = [
    'Computer Science',
    'Engineering',
    'Business Administration',
    'Medicine',
    'Law',
    'Arts & Humanities',
    'Social Sciences',
    'Natural Sciences',
    'Mathematics',
    'Education',
    'Other'
  ];

  useEffect(() => {
    if (data.hasSevisId && !data.sevisId) {
      // Generate a sample SEVIS ID format when checkbox is checked but no ID exists
      const randomId = `N${Math.floor(1000000000 + Math.random() * 9000000000)}`;
      onChange('sevisId', randomId);
    }
  }, [data.hasSevisId, data.sevisId, onChange]);

  const handleProgramStartDateChange = (date) => {
    setProgramStartDate(date);
    onChange('programStartDate', date);
  };

  const handleProgramEndDateChange = (date) => {
    setProgramEndDate(date);
    onChange('programEndDate', date);
  };

  const handleSevisCheckboxChange = (checked) => {
    onChange('hasSevisId', checked);
    if (!checked) {
      // Clear SEVIS-related fields when unchecked
      onChange('sevisId', '');
      onChange('schoolProgramNumber', '');
      onChange('schoolName', '');
      onChange('courseOfStudy', '');
      onChange('schoolAddress', '');
      onChange('programStartDate', null);
      onChange('programEndDate', null);
      setProgramStartDate(null);
      setProgramEndDate(null);
    }
  };

  const validateSevisId = (id) => {
    // SEVIS ID validation: typically starts with N followed by 10 digits
    const sevisRegex = /^N\d{10}$/;
    return sevisRegex.test(id);
  };

  const validateSchoolProgramNumber = (number) => {
    // School program number validation: typically specific format
    const programRegex = /^[A-Z0-9]{10,12}$/;
    return programRegex.test(number);
  };

  const isSevisSectionComplete = () => {
    if (!data.hasSevisId) return true;

    return data.sevisId &&
      data.schoolName &&
      data.courseOfStudy &&
      data.schoolAddress &&
      data.programStartDate &&
      data.programEndDate;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ mt: 2 }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2" fontWeight="bold">
            SEVIS (Student and Exchange Visitor Information System)
          </Typography>
          <Typography variant="body2">
            Complete this section only if you are applying for a student (F-1) or exchange visitor (J-1) visa.
            You will need your SEVIS ID and school information from your I-20 or DS-2019 form.
          </Typography>
        </Alert>

        <Grid container spacing={3}>
          {/* SEVIS Eligibility */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                <BadgeIcon sx={{ mr: 1, verticalAlign: 'bottom' }} />
                SEVIS Information
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.hasSevisId || false}
                    onChange={(e) => handleSevisCheckboxChange(e.target.checked)}
                  />
                }
                label="Do you have a SEVIS ID? (For F-1/J-1 visa applicants)"
              />

              {data.hasSevisId && (
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="SEVIS ID"
                      value={data.sevisId || ''}
                      onChange={(e) => onChange('sevisId', e.target.value)}
                      required
                      error={data.sevisId && !validateSevisId(data.sevisId)}
                      helperText={
                        data.sevisId && !validateSevisId(data.sevisId)
                          ? "SEVIS ID should start with N followed by 10 digits"
                          : "Found on your I-20 or DS-2019 form (e.g., N1234567890)"
                      }
                      InputProps={{
                        startAdornment: <InputAdornment position="start">N</InputAdornment>,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="School Program Number"
                      value={data.schoolProgramNumber || ''}
                      onChange={(e) => onChange('schoolProgramNumber', e.target.value)}
                      error={data.schoolProgramNumber && !validateSchoolProgramNumber(data.schoolProgramNumber)}
                      helperText={
                        data.schoolProgramNumber && !validateSchoolProgramNumber(data.schoolProgramNumber)
                          ? "Please check the format"
                          : "Optional - provided by your school"
                      }
                    />
                  </Grid>
                </Grid>
              )}
            </Paper>
          </Grid>

          {/* School Information - Only shown if SEVIS ID exists */}
          {data.hasSevisId && (
            <>
              <Grid item xs={12}>
                <Paper elevation={2} sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    <SchoolIcon sx={{ mr: 1, verticalAlign: 'bottom' }} />
                    School/Program Information
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="School Name"
                        value={data.schoolName || ''}
                        onChange={(e) => onChange('schoolName', e.target.value)}
                        required
                        helperText="Full name of the educational institution"
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Course of Study/Major"
                        value={data.courseOfStudy || ''}
                        onChange={(e) => onChange('courseOfStudy', e.target.value)}
                        required
                        helperText="Your field of study or major"
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Type of School/Program"
                        select
                        value={data.schoolType || ''}
                        onChange={(e) => onChange('schoolType', e.target.value)}
                        helperText="Select the type of institution"
                      >
                        {schoolTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="School Address"
                        value={data.schoolAddress || ''}
                        onChange={(e) => onChange('schoolAddress', e.target.value)}
                        required
                        multiline
                        rows={2}
                        helperText="Complete address of the school including street, city, state, and ZIP code"
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Level of Study"
                        select
                        value={data.levelOfStudy || ''}
                        onChange={(e) => onChange('levelOfStudy', e.target.value)}
                        helperText="Select your level of education"
                      >
                        <MenuItem value="Primary">Primary School</MenuItem>
                        <MenuItem value="Secondary">Secondary School</MenuItem>
                        <MenuItem value="Undergraduate">Undergraduate</MenuItem>
                        <MenuItem value="Graduate">Graduate</MenuItem>
                        <MenuItem value="Doctorate">Doctorate</MenuItem>
                        <MenuItem value="Language Training">Language Training</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </TextField>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Field of Study Category"
                        select
                        value={data.fieldOfStudy || ''}
                        onChange={(e) => onChange('fieldOfStudy', e.target.value)}
                        helperText="General category of your field of study"
                      >
                        {studyFields.map((field) => (
                          <MenuItem key={field} value={field}>
                            {field}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              {/* Program Dates */}
              <Grid item xs={12}>
                <Paper elevation={2} sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Program Dates
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <DatePicker
                        label="Program Start Date"
                        value={programStartDate}
                        onChange={handleProgramStartDateChange}
                        minDate={new Date()}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            required
                            helperText="From your I-20 or DS-2019 form"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <DatePicker
                        label="Program End Date"
                        value={programEndDate}
                        onChange={handleProgramEndDateChange}
                        minDate={programStartDate || new Date()}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            required
                            helperText="From your I-20 or DS-2019 form"
                          />
                        )}
                      />
                    </Grid>

                    {programStartDate && programEndDate && (
                      <Grid item xs={12}>
                        <Alert severity="info">
                          Program Duration: {Math.ceil((programEndDate - programStartDate) / (1000 * 60 * 60 * 24 * 30))} months
                        </Alert>
                      </Grid>
                    )}
                  </Grid>
                </Paper>
              </Grid>

              {/* Additional Information for Students */}
              <Grid item xs={12}>
                <Paper elevation={2} sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Additional Student Information
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Estimated Tuition & Fees ($)"
                        type="number"
                        value={data.estimatedTuition || ''}
                        onChange={(e) => onChange('estimatedTuition', e.target.value)}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        helperText="Annual estimated cost"
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Source of Funding"
                        select
                        value={data.fundingSource || ''}
                        onChange={(e) => onChange('fundingSource', e.target.value)}
                        helperText="Primary source of financial support"
                      >
                        <MenuItem value="Personal/Family">Personal/Family Funds</MenuItem>
                        <MenuItem value="School Scholarship">School Scholarship</MenuItem>
                        <MenuItem value="Government Scholarship">Government Scholarship</MenuItem>
                        <MenuItem value="Employer Sponsorship">Employer Sponsorship</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </TextField>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Previous U.S. Study Experience"
                        multiline
                        rows={2}
                        value={data.previousStudyExperience || ''}
                        onChange={(e) => onChange('previousStudyExperience', e.target.value)}
                        helperText="If you have studied in the U.S. before, provide details"
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </>
          )}

          {/* Important Notes */}
          <Grid item xs={12}>
            <Alert severity={data.hasSevisId ? "warning" : "info"}>
              <Typography variant="body2" fontWeight="bold">
                Important Information:
              </Typography>
              <Typography variant="body2">
                {data.hasSevisId ? (
                  <>
                    • Your SEVIS ID must match exactly with your I-20 or DS-2019 form<br />
                    • Program dates should correspond with your admission documents<br />
                    • Ensure all information is consistent with your school records<br />
                    • You must pay the SEVIS fee before your visa interview<br />
                    • Bring your original I-20 or DS-2019 to the visa interview
                  </>
                ) : (
                  <>
                    • This section is only required for F-1 (student) and J-1 (exchange visitor) visa applicants<br />
                    • If you are applying for a different visa type, you can skip this section<br />
                    • Tourist/Business (B-1/B-2) applicants do not need SEVIS information
                  </>
                )}
              </Typography>
            </Alert>
          </Grid>

          {/* Validation Status */}
          <Grid item xs={12}>
            <Alert
              severity={
                !data.hasSevisId ? "success" :
                  isSevisSectionComplete() ? "success" : "warning"
              }
            >
              {!data.hasSevisId
                ? "SEVIS section not required for your visa type"
                : isSevisSectionComplete()
                  ? "SEVIS information complete"
                  : "Please complete all required SEVIS information fields"
              }
            </Alert>
          </Grid>

          {/* Help Resources */}
          {data.hasSevisId && (
            <Grid item xs={12}>
              <Paper elevation={1} sx={{ p: 2, bgcolor: 'grey.50' }}>
                <Typography variant="subtitle2" gutterBottom color="primary">
                  Need Help Finding Your SEVIS Information?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • SEVIS ID: Located in the top right corner of your I-20 form or on your DS-2019<br />
                  • School Program Number: Provided by your designated school official (DSO)<br />
                  • Program Dates: See section 5 on your I-20 or section 3 on your DS-2019<br />
                  • Contact your school's international student office for assistance
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default SevisInfoStep;