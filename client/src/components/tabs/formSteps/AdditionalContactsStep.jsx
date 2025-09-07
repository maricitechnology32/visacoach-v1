// /* eslint-disable no-unused-vars */
// import React, { useState } from 'react';
// import {
//   Box,
//   TextField,
//   Grid,
//   Typography,
//   Divider,
//   Alert,
//   Paper,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   FormControlLabel,
//   Checkbox
// } from '@mui/material';
// import PhoneIcon from '@mui/icons-material/Phone';
// import EmailIcon from '@mui/icons-material/Email';
// import PersonIcon from '@mui/icons-material/Person';

// const AdditionalContactsStep = ({ data, onChange, onNestedChange }) => {
//   const relationshipOptions = [
//     'Parent',
//     'Sibling',
//     'Spouse',
//     'Child',
//     'Friend',
//     'Colleague',
//     'Employer',
//     'Teacher',
//     'Neighbor',
//     'Other Relative',
//     'Other'
//   ];

//   const handleContactChange = (contactType, field, value) => {
//     onNestedChange(contactType, field, value);
//   };

//   const isContactComplete = (contact) => {
//     return contact.fullName && contact.relationship && contact.phone;
//   };

//   const isHomeCountryContactComplete = isContactComplete(data?.contactInHomeCountry || {});
//   const isEmergencyContactComplete = isContactComplete(data?.emergencyContact || {});

//   return (
//     <Box sx={{ mt: 2 }}>
//       <Alert severity="info" sx={{ mb: 3 }}>
//         <Typography variant="body2" fontWeight="bold">
//           Contact Information
//         </Typography>
//         <Typography variant="body2">
//           Provide contact information for someone in your home country and an emergency contact.
//           These contacts should be able to reach you if needed and should not be traveling with you.
//         </Typography>
//       </Alert>

//       <Grid container spacing={3}>
//         {/* Contact in Home Country */}
//         <Grid item xs={12}>
//           <Paper elevation={2} sx={{ p: 3 }}>
//             <Typography variant="h6" gutterBottom>
//               <PersonIcon sx={{ mr: 1, verticalAlign: 'bottom' }} />
//               Contact in Home Country
//             </Typography>
//             <Divider sx={{ mb: 2 }} />

//             <Alert severity="info" sx={{ mb: 2 }}>
//               Provide information for someone in your home country who can verify your information
//               if needed. This should not be someone traveling with you.
//             </Alert>

//             <Grid container spacing={2}>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Full Name"
//                   value={data?.contactInHomeCountry?.fullName || ''}
//                   onChange={(e) => handleContactChange('contactInHomeCountry', 'fullName', e.target.value)}
//                   required
//                   helperText="Full legal name of your contact"
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <FormControl fullWidth required>
//                   <InputLabel>Relationship</InputLabel>
//                   <Select
//                     value={data?.contactInHomeCountry?.relationship || ''}
//                     label="Relationship"
//                     onChange={(e) => handleContactChange('contactInHomeCountry', 'relationship', e.target.value)}
//                   >
//                     {relationshipOptions.map((relationship) => (
//                       <MenuItem key={relationship} value={relationship}>
//                         {relationship}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Address"
//                   value={data?.contactInHomeCountry?.address || ''}
//                   onChange={(e) => handleContactChange('contactInHomeCountry', 'address', e.target.value)}
//                   required
//                   multiline
//                   rows={2}
//                   helperText="Complete address in your home country"
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Phone Number"
//                   value={data?.contactInHomeCountry?.phone || ''}
//                   onChange={(e) => handleContactChange('contactInHomeCountry', 'phone', e.target.value)}
//                   required
//                   placeholder="+1-555-123-4567"
//                   InputProps={{
//                     startAdornment: <PhoneIcon sx={{ mr: 1, color: 'action.active' }} />,
//                   }}
//                   helperText="Include country code"
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Email Address"
//                   type="email"
//                   value={data?.contactInHomeCountry?.email || ''}
//                   onChange={(e) => handleContactChange('contactInHomeCountry', 'email', e.target.value)}
//                   placeholder="contact@example.com"
//                   InputProps={{
//                     startAdornment: <EmailIcon sx={{ mr: 1, color: 'action.active' }} />,
//                   }}
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       checked={data?.contactInHomeCountry?.canVerifyInformation || false}
//                       onChange={(e) => handleContactChange('contactInHomeCountry', 'canVerifyInformation', e.target.checked)}
//                     />
//                   }
//                   label="This contact can verify my information if contacted by authorities"
//                 />
//               </Grid>
//             </Grid>

//             {isHomeCountryContactComplete && (
//               <Alert severity="success" sx={{ mt: 2 }}>
//                 Home country contact information is complete.
//               </Alert>
//             )}
//           </Paper>
//         </Grid>

//         {/* Emergency Contact */}
//         <Grid item xs={12}>
//           <Paper elevation={2} sx={{ p: 3 }}>
//             <Typography variant="h6" gutterBottom>
//               <PersonIcon sx={{ mr: 1, verticalAlign: 'bottom' }} />
//               Emergency Contact
//             </Typography>
//             <Divider sx={{ mb: 2 }} />

//             <Alert severity="info" sx={{ mb: 2 }}>
//               Provide information for someone who should be contacted in case of an emergency.
//               This can be someone in your home country or in the United States.
//             </Alert>

//             <Grid container spacing={2}>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Full Name"
//                   value={data?.emergencyContact?.fullName || ''}
//                   onChange={(e) => handleContactChange('emergencyContact', 'fullName', e.target.value)}
//                   required
//                   helperText="Full legal name of your emergency contact"
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <FormControl fullWidth required>
//                   <InputLabel>Relationship</InputLabel>
//                   <Select
//                     value={data?.emergencyContact?.relationship || ''}
//                     label="Relationship"
//                     onChange={(e) => handleContactChange('emergencyContact', 'relationship', e.target.value)}
//                   >
//                     {relationshipOptions.map((relationship) => (
//                       <MenuItem key={relationship} value={relationship}>
//                         {relationship}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Address"
//                   value={data?.emergencyContact?.address || ''}
//                   onChange={(e) => handleContactChange('emergencyContact', 'address', e.target.value)}
//                   required
//                   multiline
//                   rows={2}
//                   helperText="Complete address where your contact can be reached"
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Phone Number"
//                   value={data?.emergencyContact?.phone || ''}
//                   onChange={(e) => handleContactChange('emergencyContact', 'phone', e.target.value)}
//                   required
//                   placeholder="+1-555-123-4567"
//                   InputProps={{
//                     startAdornment: <PhoneIcon sx={{ mr: 1, color: 'action.active' }} />,
//                   }}
//                   helperText="Include country code"
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Email Address"
//                   type="email"
//                   value={data?.emergencyContact?.email || ''}
//                   onChange={(e) => handleContactChange('emergencyContact', 'email', e.target.value)}
//                   placeholder="contact@example.com"
//                   InputProps={{
//                     startAdornment: <EmailIcon sx={{ mr: 1, color: 'action.active' }} />,
//                   }}
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <FormControl fullWidth>
//                   <InputLabel>Contact Location</InputLabel>
//                   <Select
//                     value={data?.emergencyContact?.location || ''}
//                     label="Contact Location"
//                     onChange={(e) => handleContactChange('emergencyContact', 'location', e.target.value)}
//                   >
//                     <MenuItem value="Home Country">Home Country</MenuItem>
//                     <MenuItem value="United States">United States</MenuItem>
//                     <MenuItem value="Other Country">Other Country</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       checked={data?.emergencyContact?.canMakeDecisions || false}
//                       onChange={(e) => handleContactChange('emergencyContact', 'canMakeDecisions', e.target.checked)}
//                     />
//                   }
//                   label="This contact can make decisions on my behalf in emergencies"
//                 />
//               </Grid>
//             </Grid>

//             {isEmergencyContactComplete && (
//               <Alert severity="success" sx={{ mt: 2 }}>
//                 Emergency contact information is complete.
//               </Alert>
//             )}
//           </Paper>
//         </Grid>

//         {/* Additional Contact Instructions */}
//         <Grid item xs={12}>
//           <Paper elevation={2} sx={{ p: 3 }}>
//             <Typography variant="h6" gutterBottom>
//               Additional Instructions & Notes
//             </Typography>
//             <divider sx={{ mb: 2 }} />

//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   multiline
//                   rows={3}
//                   label="Special Instructions for Contacts"
//                   value={data?.specialInstructions || ''}
//                   onChange={(e) => onChange('specialInstructions', e.target.value)}
//                   helperText="Any special instructions or information your contacts should know"
//                   placeholder="e.g., Best time to call, language preferences, alternative contact methods, etc."
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       checked={data?.contactsNotified || false}
//                       onChange={(e) => onChange('contactsNotified', e.target.checked)}
//                     />
//                   }
//                   label="I have notified these contacts that I am listing them and they agree to be contacted if necessary"
//                 />
//               </Grid>
//             </Grid>
//           </Paper>
//         </Grid>

//         {/* Important Information */}
//         <Grid item xs={12}>
//           <Alert severity="warning">
//             <Typography variant="body2" fontWeight="bold">
//               Important Information:
//             </Typography>
//             <Typography variant="body2">
//               • Provide accurate and current contact information<br />
//               • Ensure your contacts are aware they are being listed<br />
//               • Choose contacts who will be available during your travel period<br />
//               • Emergency contact should be someone who can make decisions on your behalf<br />
//               • Home country contact should be able to verify your information if needed
//             </Typography>
//           </Alert>
//         </Grid>

//         {/* Completion Status */}
//         <Grid item xs={12}>
//           <Alert
//             severity={
//               isHomeCountryContactComplete && isEmergencyContactComplete ?
//                 "success" : "info"
//             }
//           >
//             {isHomeCountryContactComplete && isEmergencyContactComplete ?
//               "Both contact sections are complete" :
//               "Please complete both contact information sections"
//             }
//           </Alert>
//         </Grid>

//         {/* Privacy Notice */}
//         <Grid item xs={12}>
//           <Paper elevation={1} sx={{ p: 2, bgcolor: 'grey.50' }}>
//             <Typography variant="subtitle2" gutterBottom color="primary">
//               Privacy Notice
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               The contact information you provide may be used to verify your application information
//               or in case of emergency. Contacts will only be reached when necessary and for official purposes.
//             </Typography>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default AdditionalContactsStep;

/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Box,
  TextField,
  Grid,
  Typography,
  Divider,
  Alert,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';

const AdditionalContactsStep = ({ data = {}, onChange, onNestedChange }) => {
  const relationshipOptions = [
    'Parent',
    'Sibling',
    'Spouse',
    'Child',
    'Friend',
    'Colleague',
    'Employer',
    'Teacher',
    'Neighbor',
    'Other Relative',
    'Other',
  ];

  // Safely initialize nested objects
  const homeContact = data.contactInHomeCountry || {};
  const emergencyContact = data.emergencyContact || {};

  const handleContactChange = (contactType, field, value) => {
    if (typeof onNestedChange === 'function') {
      onNestedChange(contactType, field, value);
    }
  };

  const isContactComplete = (contact) => {
    return contact?.fullName && contact?.relationship && contact?.phone;
  };

  const isHomeCountryContactComplete = isContactComplete(homeContact);
  const isEmergencyContactComplete = isContactComplete(emergencyContact);

  return (
    <Box sx={{ mt: 2 }}>
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2" fontWeight="bold">
          Contact Information
        </Typography>
        <Typography variant="body2">
          Provide contact information for someone in your home country and an emergency contact.
          These contacts should be able to reach you if needed and should not be traveling with you.
        </Typography>
      </Alert>

      <Grid container spacing={3}>
        {/* Contact in Home Country */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <PersonIcon sx={{ mr: 1, verticalAlign: 'bottom' }} />
              Contact in Home Country
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Alert severity="info" sx={{ mb: 2 }}>
              Provide information for someone in your home country who can verify your information if needed. This should not be someone traveling with you.
            </Alert>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={homeContact.fullName || ''}
                  onChange={(e) => handleContactChange('contactInHomeCountry', 'fullName', e.target.value)}
                  required
                  helperText="Full legal name of your contact"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Relationship</InputLabel>
                  <Select
                    value={homeContact.relationship || ''}
                    label="Relationship"
                    onChange={(e) => handleContactChange('contactInHomeCountry', 'relationship', e.target.value)}
                  >
                    {relationshipOptions.map((rel) => (
                      <MenuItem key={rel} value={rel}>
                        {rel}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  value={homeContact.address || ''}
                  onChange={(e) => handleContactChange('contactInHomeCountry', 'address', e.target.value)}
                  required
                  multiline
                  rows={2}
                  helperText="Complete address in your home country"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={homeContact.phone || ''}
                  onChange={(e) => handleContactChange('contactInHomeCountry', 'phone', e.target.value)}
                  required
                  placeholder="+1-555-123-4567"
                  InputProps={{
                    startAdornment: <PhoneIcon sx={{ mr: 1, color: 'action.active' }} />,
                  }}
                  helperText="Include country code"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={homeContact.email || ''}
                  onChange={(e) => handleContactChange('contactInHomeCountry', 'email', e.target.value)}
                  placeholder="contact@example.com"
                  InputProps={{
                    startAdornment: <EmailIcon sx={{ mr: 1, color: 'action.active' }} />,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={homeContact.canVerifyInformation || false}
                      onChange={(e) =>
                        handleContactChange('contactInHomeCountry', 'canVerifyInformation', e.target.checked)
                      }
                    />
                  }
                  label="This contact can verify my information if contacted by authorities"
                />
              </Grid>
            </Grid>

            {isHomeCountryContactComplete && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Home country contact information is complete.
              </Alert>
            )}
          </Paper>
        </Grid>

        {/* Emergency Contact */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <PersonIcon sx={{ mr: 1, verticalAlign: 'bottom' }} />
              Emergency Contact
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Alert severity="info" sx={{ mb: 2 }}>
              Provide information for someone who should be contacted in case of an emergency. This can be someone in your home country or in the United States.
            </Alert>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={emergencyContact.fullName || ''}
                  onChange={(e) => handleContactChange('emergencyContact', 'fullName', e.target.value)}
                  required
                  helperText="Full legal name of your emergency contact"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Relationship</InputLabel>
                  <Select
                    value={emergencyContact.relationship || ''}
                    label="Relationship"
                    onChange={(e) => handleContactChange('emergencyContact', 'relationship', e.target.value)}
                  >
                    {relationshipOptions.map((rel) => (
                      <MenuItem key={rel} value={rel}>
                        {rel}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  value={emergencyContact.address || ''}
                  onChange={(e) => handleContactChange('emergencyContact', 'address', e.target.value)}
                  required
                  multiline
                  rows={2}
                  helperText="Complete address where your contact can be reached"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={emergencyContact.phone || ''}
                  onChange={(e) => handleContactChange('emergencyContact', 'phone', e.target.value)}
                  required
                  placeholder="+1-555-123-4567"
                  InputProps={{
                    startAdornment: <PhoneIcon sx={{ mr: 1, color: 'action.active' }} />,
                  }}
                  helperText="Include country code"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={emergencyContact.email || ''}
                  onChange={(e) => handleContactChange('emergencyContact', 'email', e.target.value)}
                  placeholder="contact@example.com"
                  InputProps={{
                    startAdornment: <EmailIcon sx={{ mr: 1, color: 'action.active' }} />,
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Contact Location</InputLabel>
                  <Select
                    value={emergencyContact.location || ''}
                    label="Contact Location"
                    onChange={(e) => handleContactChange('emergencyContact', 'location', e.target.value)}
                  >
                    <MenuItem value="Home Country">Home Country</MenuItem>
                    <MenuItem value="United States">United States</MenuItem>
                    <MenuItem value="Other Country">Other Country</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={emergencyContact.canMakeDecisions || false}
                      onChange={(e) =>
                        handleContactChange('emergencyContact', 'canMakeDecisions', e.target.checked)
                      }
                    />
                  }
                  label="This contact can make decisions on my behalf in emergencies"
                />
              </Grid>
            </Grid>

            {isEmergencyContactComplete && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Emergency contact information is complete.
              </Alert>
            )}
          </Paper>
        </Grid>

        {/* Additional Instructions */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Additional Instructions & Notes
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Special Instructions for Contacts"
                  value={data.specialInstructions || ''}
                  onChange={(e) => onChange('specialInstructions', e.target.value)}
                  helperText="Any special instructions your contacts should know"
                  placeholder="e.g., Best time to call, language preferences"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={data.contactsNotified || false}
                      onChange={(e) => onChange('contactsNotified', e.target.checked)}
                    />
                  }
                  label="I have notified these contacts and they agree to be contacted if necessary"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdditionalContactsStep;
