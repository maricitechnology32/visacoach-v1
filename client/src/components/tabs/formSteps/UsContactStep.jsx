// import React, { useState } from 'react';
// import {
//   Box,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Grid,
//   Typography,
//   Divider,
//   Alert,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   FormLabel
// } from '@mui/material';

// const UsContactStep = ({ data, onChange }) => {
//   const [contactType, setContactType] = useState(data?.organizationOrPerson || 'Person');

//   const handleContactTypeChange = (event) => {
//     const newType = event.target.value;
//     setContactType(newType);
//     onChange('organizationOrPerson', newType);

//     // Clear fields when switching type
//     if (newType === 'Organization') {
//       onChange('contactName', '');
//       onChange('relationship', '');
//     } else {
//       onChange('organizationName', '');
//     }
//   };

//   return (
//     <Box sx={{ mt: 2 }}>
//       <Alert severity="info" sx={{ mb: 3 }}>
//         Provide information about your point of contact in the United States. This could be a person you know or an organization you'll be visiting.
//       </Alert>

//       <Grid container spacing={3}>
//         {/* Contact Type Selection */}
//         <Grid item xs={12}>
//           <Typography variant="h6" gutterBottom>
//             Type of Contact
//           </Typography>
//           <Divider />
//         </Grid>

//         <Grid item xs={12}>
//           <FormControl component="fieldset">
//             <FormLabel component="legend">Is your U.S. contact a person or organization?</FormLabel>
//             <RadioGroup
//               row
//               value={contactType}
//               onChange={handleContactTypeChange}
//             >
//               <FormControlLabel value="Person" control={<Radio />} label="Person" />
//               <FormControlLabel value="Organization" control={<Radio />} label="Organization" />
//             </RadioGroup>
//           </FormControl>
//         </Grid>

//         {/* Contact Details */}
//         <Grid item xs={12}>
//           <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
//             Contact Details
//           </Typography>
//           <Divider />
//         </Grid>

//         {contactType === 'Person' ? (
//           <>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Contact Person's Full Name"
//                 value={data?.contactName || ''}
//                 onChange={(e) => onChange('contactName', e.target.value)}
//                 required
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Relationship to You"
//                 value={data?.relationship || ''}
//                 onChange={(e) => onChange('relationship', e.target.value)}
//                 required
//                 placeholder="e.g., Friend, Relative, Colleague"
//               />
//             </Grid>
//           </>
//         ) : (
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Organization Name"
//               value={data?.organizationName || ''}
//               onChange={(e) => onChange('organizationName', e.target.value)}
//               required
//               placeholder="e.g., Company Name, University, Hotel"
//             />
//           </Grid>
//         )}

//         {/* Contact Information */}
//         <Grid item xs={12}>
//           <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
//             Contact Information
//           </Typography>
//           <Divider />
//         </Grid>

//         <Grid item xs={12}>
//           <TextField
//             fullWidth
//             label="U.S. Contact Address"
//             value={data?.contactAddress || ''}
//             onChange={(e) => onChange('contactAddress', e.target.value)}
//             required
//             multiline
//             rows={2}
//             placeholder="Full street address including city, state, and ZIP code"
//           />
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <TextField
//             fullWidth
//             label="Phone Number"
//             value={data?.contactPhone || ''}
//             onChange={(e) => onChange('contactPhone', e.target.value)}
//             placeholder="+1-555-123-4567"
//           />
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <TextField
//             fullWidth
//             label="Email Address"
//             type="email"
//             value={data?.contactEmail || ''}
//             onChange={(e) => onChange('contactEmail', e.target.value)}
//             placeholder="contact@example.com"
//           />
//         </Grid>

//         {/* Additional Information for Person Contact */}
//         {contactType === 'Person' && !data?.relationship && (
//           <Grid item xs={12}>
//             <Alert severity="info">
//               Please specify your relationship to this person (e.g., friend, family member, business associate).
//             </Alert>
//           </Grid>
//         )}

//         {/* Additional Information for Organization Contact */}
//         {contactType === 'Organization' && data?.organizationName && (
//           <Grid item xs={12}>
//             <Alert severity="info">
//               If you know a specific contact person at {data?.organizationName}, you can add their name in the "Additional Information" section at the end of the form.
//             </Alert>
//           </Grid>
//         )}

//         {/* Validation and Important Notes */}
//         <Grid item xs={12}>
//           <Alert severity="warning" sx={{ mt: 2 }}>
//             <Typography variant="body2" fontWeight="bold">
//               Important:
//             </Typography>
//             <Typography variant="body2">
//               • Provide complete and accurate contact information<br />
//               • Ensure the address is valid and complete<br />
//               • If staying at a hotel, use the hotel's address and phone number<br />
//               • If attending an institution, use the institution's official contact information<br />
//               • You must have at least one point of contact in the United States
//             </Typography>
//           </Alert>
//         </Grid>

//         {/* Validation Check */}
//         <Grid item xs={12}>
//           <Alert
//             severity={
//               data?.contactAddress &&
//                 ((contactType === 'Person' && data?.contactName && data?.relationship) ||
//                   (contactType === 'Organization' && data.organizationName)) ?
//                 "success" : "info"
//             }
//             sx={{ mt: 2 }}
//           >
//             {data?.contactAddress &&
//               ((contactType === 'Person' && data?.contactName && data?.relationship) ||
//                 (contactType === 'Organization' && data?.organizationName)) ?
//               "U.S. contact information is complete" :
//               "Please complete all required U.S. contact information fields"}
//           </Alert>
//         </Grid>

//         {/* Examples */}
//         <Grid item xs={12}>
//           <Alert severity="info">
//             <Typography variant="body2" fontWeight="bold">
//               Examples of U.S. Contacts:
//             </Typography>
//             <Typography variant="body2">
//               • <strong>Person:</strong> Friend, family member, business colleague<br />
//               • <strong>Organization:</strong> Hotel, university, company, conference organizer<br />
//               • <strong>If tourism:</strong> First hotel you'll be staying at<br />
//               • <strong>If business:</strong> Company you'll be visiting<br />
//               • <strong>If education:</strong> School or university you'll be attending
//             </Typography>
//           </Alert>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default UsContactStep;


import React, { useState } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  Divider,
  Alert,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Paper,
  Card,
  CardContent,
  useTheme,
  useMediaQuery
} from '@mui/material';

const UsContactStep = ({ data, onChange }) => {
  const [contactType, setContactType] = useState(data?.organizationOrPerson || 'Person');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleContactTypeChange = (event) => {
    const newType = event.target.value;
    setContactType(newType);
    onChange('organizationOrPerson', newType);

    // Clear fields when switching type
    if (newType === 'Organization') {
      onChange('contactName', '');
      onChange('relationship', '');
    } else {
      onChange('organizationName', '');
    }
  };

  return (
    <Box sx={{
      mt: 2,
      p: isMobile ? 1 : 3,
      background: 'linear-gradient(135deg, #f5f9f0 0%, #e8f5e9 100%)',
      borderRadius: 2
    }}>
      <Paper elevation={0} sx={{
        p: 3,
        mb: 3,
        background: 'transparent',
        border: '1px solid #c8e6c9',
        borderRadius: 2
      }}>
        <Alert
          severity="info"
          sx={{
            mb: 0,
            backgroundColor: 'rgba(232, 245, 233, 0.5)',
            color: '#2e7d32',
            '& .MuiAlert-icon': { color: '#388e3c' }
          }}
          icon={false}
        >
          <Typography variant="h6" sx={{ color: '#1b5e20', mb: 1, display: 'flex', alignItems: 'center' }}>
            <Box component="span" sx={{ mr: 1, fontSize: '1.5rem' }}>💁</Box>
            U.S. Contact Information
          </Typography>
          <Typography variant="body2">
            Provide information about your point of contact in the United States. This could be a person you know or an organization you'll be visiting.
          </Typography>
        </Alert>
      </Paper>

      <Grid container spacing={3}>
        {/* Contact Type Selection */}
        <Grid item xs={12}>
          <Card sx={{
            backgroundColor: 'transparent',
            boxShadow: 'none',
            border: '1px solid #c8e6c9',
            borderRadius: 2
          }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#2e7d32', display: 'flex', alignItems: 'center' }}>
                <Box component="span" sx={{ mr: 1 }}>📋</Box>
                Type of Contact
              </Typography>
              <Divider sx={{ mb: 2, borderColor: '#a5d6a7' }} />

              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend" sx={{ color: '#388e3c', mb: 1, fontWeight: 'bold' }}>
                  Is your U.S. contact a person or organization?
                </FormLabel>
                <RadioGroup
                  row={!isMobile}
                  value={contactType}
                  onChange={handleContactTypeChange}
                  sx={{
                    '& .MuiFormControlLabel-label': { color: '#424242' },
                    '& .Mui-checked': { color: '#4caf50' }
                  }}
                >
                  <FormControlLabel
                    value="Person"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box component="span" sx={{ mr: 1 }}>👤</Box>
                        Person
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="Organization"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box component="span" sx={{ mr: 1 }}>🏢</Box>
                        Organization
                      </Box>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        {/* Contact Details */}
        <Grid item xs={12}>
          <Card sx={{
            backgroundColor: 'transparent',
            boxShadow: 'none',
            border: '1px solid #c8e6c9',
            borderRadius: 2
          }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#2e7d32', display: 'flex', alignItems: 'center' }}>
                <Box component="span" sx={{ mr: 1 }}>📇</Box>
                Contact Details
              </Typography>
              <Divider sx={{ mb: 2, borderColor: '#a5d6a7' }} />

              {contactType === 'Person' ? (
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Contact Person's Full Name"
                      value={data?.contactName || ''}
                      onChange={(e) => onChange('contactName', e.target.value)}
                      required
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&.Mui-focused fieldset': {
                            borderColor: '#4caf50',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Relationship to You"
                      value={data?.relationship || ''}
                      onChange={(e) => onChange('relationship', e.target.value)}
                      required
                      placeholder="e.g., Friend, Relative, Colleague"
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&.Mui-focused fieldset': {
                            borderColor: '#4caf50',
                          },
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              ) : (
                <TextField
                  fullWidth
                  label="Organization Name"
                  value={data?.organizationName || ''}
                  onChange={(e) => onChange('organizationName', e.target.value)}
                  required
                  placeholder="e.g., Company Name, University, Hotel"
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: '#4caf50',
                      },
                    },
                  }}
                />
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Contact Information */}
        <Grid item xs={12}>
          <Card sx={{
            backgroundColor: 'transparent',
            boxShadow: 'none',
            border: '1px solid #c8e6c9',
            borderRadius: 2
          }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#2e7d32', display: 'flex', alignItems: 'center' }}>
                <Box component="span" sx={{ mr: 1 }}>📍</Box>
                Contact Information
              </Typography>
              <Divider sx={{ mb: 2, borderColor: '#a5d6a7' }} />

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="U.S. Contact Address"
                    value={data?.contactAddress || ''}
                    onChange={(e) => onChange('contactAddress', e.target.value)}
                    required
                    multiline
                    rows={2}
                    placeholder="Full street address including city, state, and ZIP code"
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: '#4caf50',
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={data?.contactPhone || ''}
                    onChange={(e) => onChange('contactPhone', e.target.value)}
                    placeholder="+1-555-123-4567"
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: '#4caf50',
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={data?.contactEmail || ''}
                    onChange={(e) => onChange('contactEmail', e.target.value)}
                    placeholder="contact@example.com"
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: '#4caf50',
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Additional Information for Person Contact */}
        {contactType === 'Person' && !data?.relationship && (
          <Grid item xs={12}>
            <Alert
              severity="info"
              sx={{
                backgroundColor: 'rgba(232, 245, 233, 0.5)',
                color: '#2e7d32',
                '& .MuiAlert-icon': { color: '#388e3c' }
              }}
            >
              Please specify your relationship to this person (e.g., friend, family member, business associate).
            </Alert>
          </Grid>
        )}

        {/* Additional Information for Organization Contact */}
        {contactType === 'Organization' && data?.organizationName && (
          <Grid item xs={12}>
            <Alert
              severity="info"
              sx={{
                backgroundColor: 'rgba(232, 245, 233, 0.5)',
                color: '#2e7d32',
                '& .MuiAlert-icon': { color: '#388e3c' }
              }}
            >
              If you know a specific contact person at {data?.organizationName}, you can add their name in the "Additional Information" section at the end of the form.
            </Alert>
          </Grid>
        )}

        {/* Validation and Important Notes */}
        <Grid item xs={12}>
          <Card sx={{
            backgroundColor: 'rgba(255, 245, 157, 0.2)',
            boxShadow: 'none',
            border: '1px solid #ffd54f',
            borderRadius: 2
          }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#f57f17', display: 'flex', alignItems: 'center' }}>
                <Box component="span" sx={{ mr: 1 }}>⚠️</Box>
                Important Notes
              </Typography>
              <Divider sx={{ mb: 2, borderColor: '#ffd54f' }} />
              <Typography variant="body2" sx={{ color: '#5d4037' }}>
                • Provide complete and accurate contact information<br />
                • Ensure the address is valid and complete<br />
                • If staying at a hotel, use the hotel's address and phone number<br />
                • If attending an institution, use the institution's official contact information<br />
                • You must have at least one point of contact in the United States
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Validation Check */}
        <Grid item xs={12}>
          <Card sx={{
            backgroundColor:
              data?.contactAddress &&
                ((contactType === 'Person' && data?.contactName && data?.relationship) ||
                  (contactType === 'Organization' && data.organizationName)) ?
                'rgba(232, 245, 233, 0.7)' : 'rgba(237, 247, 237, 0.7)',
            boxShadow: 'none',
            border: data?.contactAddress &&
              ((contactType === 'Person' && data?.contactName && data?.relationship) ||
                (contactType === 'Organization' && data.organizationName)) ?
              '1px solid #81c784' : '1px solid #a5d6a7',
            borderRadius: 2
          }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="body1" sx={{
                color: data?.contactAddress &&
                  ((contactType === 'Person' && data?.contactName && data?.relationship) ||
                    (contactType === 'Organization' && data.organizationName)) ?
                  '#2e7d32' : '#388e3c',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Box component="span" sx={{ mr: 1, fontSize: '1.2rem' }}>
                  {data?.contactAddress &&
                    ((contactType === 'Person' && data?.contactName && data?.relationship) ||
                      (contactType === 'Organization' && data.organizationName)) ?
                    '✅' : 'ℹ️'}
                </Box>
                {data?.contactAddress &&
                  ((contactType === 'Person' && data?.contactName && data?.relationship) ||
                    (contactType === 'Organization' && data?.organizationName)) ?
                  "U.S. contact information is complete" :
                  "Please complete all required U.S. contact information fields"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Examples */}
        <Grid item xs={12}>
          <Card sx={{
            backgroundColor: 'rgba(232, 245, 233, 0.5)',
            boxShadow: 'none',
            border: '1px solid #c8e6c9',
            borderRadius: 2
          }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#2e7d32', display: 'flex', alignItems: 'center' }}>
                <Box component="span" sx={{ mr: 1 }}>💡</Box>
                Examples of U.S. Contacts
              </Typography>
              <Divider sx={{ mb: 2, borderColor: '#a5d6a7' }} />
              <Typography variant="body2" sx={{ color: '#424242' }}>
                • <strong>Person:</strong> Friend, family member, business colleague<br />
                • <strong>Organization:</strong> Hotel, university, company, conference organizer<br />
                • <strong>If tourism:</strong> First hotel you'll be staying at<br />
                • <strong>If business:</strong> Company you'll be visiting<br />
                • <strong>If education:</strong> School or university you'll be attending
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UsContactStep;
