import React, { useState } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
  Divider,
  Alert,
  Chip,
  Button,
  IconButton,
  InputAdornment
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const TravelInfoStep = ({ data, onChange }) => {
  const [intendedArrivalDate, setIntendedArrivalDate] = useState(data.intendedArrivalDate || null);
  const [companionInput, setCompanionInput] = useState({ name: '', relationship: '' });

  const travelPurposes = [
    'Business',
    'Tourism/Vacation',
    'Study',
    'Work',
    'Exchange Visitor',
    'Transit',
    'Diplomatic/Official',
    'Medical Treatment',
    'Other'
  ];

  const paymentOptions = [
    'Self',
    'Family',
    'Employer',
    'Company',
    'Educational Institution',
    'Other Organization',
    'Other'
  ];

  const handleArrivalDateChange = (date) => {
    setIntendedArrivalDate(date);
    onChange('intendedArrivalDate', date);
  };

  const handleAddCompanion = () => {
    if (companionInput.name.trim() && companionInput.relationship.trim()) {
      const updatedCompanions = [...data.travelCompanions, {
        name: companionInput.name.trim(),
        relationship: companionInput.relationship.trim()
      }];
      onChange('travelCompanions', updatedCompanions);
      setCompanionInput({ name: '', relationship: '' });
    }
  };

  const handleRemoveCompanion = (index) => {
    const updatedCompanions = data.travelCompanions.filter((_, i) => i !== index);
    onChange('travelCompanions', updatedCompanions);
  };

  const handleCompanionInputChange = (field, value) => {
    setCompanionInput(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePayerTypeChange = (value) => {
    onChange('personPayingForTrip', value);
    // Clear payer details if payer type changes
    if (value === 'Self') {
      onChange('payerName', '');
      onChange('payerRelationship', '');
      onChange('payerAddress', '');
      onChange('payerPhone', '');
      onChange('payerEmail', '');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ mt: 2 }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          Provide details about your planned trip to the United States. Be as specific as possible about your travel plans.
        </Alert>

        <Grid container spacing={3}>
          {/* Trip Purpose */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Purpose of Trip
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel>Primary Purpose of Trip</InputLabel>
              <Select
                value={data.purposeOfTrip || ''}
                label="Primary Purpose of Trip"
                onChange={(e) => onChange('purposeOfTrip', e.target.value)}
              >
                {travelPurposes.map((purpose) => (
                  <MenuItem key={purpose} value={purpose}>
                    {purpose}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Travel Plans */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Travel Plans
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.hasSpecificTravelPlans || false}
                  onChange={(e) => onChange('hasSpecificTravelPlans', e.target.checked)}
                />
              }
              label="Do you have specific travel plans already made?"
            />
          </Grid>

          {data.hasSpecificTravelPlans && (
            <>
              <Grid item xs={12} md={6}>
                <DatePicker
                  label="Intended Date of Arrival in U.S."
                  value={intendedArrivalDate}
                  onChange={handleArrivalDateChange}
                  minDate={new Date()}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth required />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Intended Length of Stay"
                  value={data.intendedLengthOfStay || ''}
                  onChange={(e) => onChange('intendedLengthOfStay', e.target.value)}
                  placeholder="e.g., 2 weeks, 3 months, 1 year"
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Address Where You Will Stay in U.S."
                  value={data.addressInUS || ''}
                  onChange={(e) => onChange('addressInUS', e.target.value)}
                  placeholder="Include street address, city, state, and ZIP code"
                  helperText="Provide complete address of hotel, friend/family, or institution"
                />
              </Grid>
            </>
          )}

          {/* Travel Companions */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Travel Companions
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2" gutterBottom>
              Are you traveling with anyone? List all companions:
            </Typography>

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  size="small"
                  label="Companion Name"
                  value={companionInput.name}
                  onChange={(e) => handleCompanionInputChange('name', e.target.value)}
                  placeholder="Full name"
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  size="small"
                  label="Relationship"
                  value={companionInput.relationship}
                  onChange={(e) => handleCompanionInputChange('relationship', e.target.value)}
                  placeholder="e.g., Spouse, Child, Friend, Colleague"
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={handleAddCompanion}
                  disabled={!companionInput.name || !companionInput.relationship}
                  sx={{ height: '40px' }}
                >
                  Add
                </Button>
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {data.travelCompanions.map((companion, index) => (
                <Chip
                  key={index}
                  label={`${companion.name} (${companion.relationship})`}
                  onDelete={() => handleRemoveCompanion(index)}
                  deleteIcon={<DeleteIcon />}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </Grid>

          {/* Financial Support */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Financial Support
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel>Who Will Pay for Your Trip?</InputLabel>
              <Select
                value={data.personPayingForTrip || ''}
                label="Who Will Pay for Your Trip?"
                onChange={(e) => handlePayerTypeChange(e.target.value)}
              >
                {paymentOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {data.personPayingForTrip && data.personPayingForTrip !== 'Self' && (
            <>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Payer's Full Name"
                  value={data.payerName || ''}
                  onChange={(e) => onChange('payerName', e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Relationship to Payer"
                  value={data.payerRelationship || ''}
                  onChange={(e) => onChange('payerRelationship', e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Payer's Address"
                  value={data.payerAddress || ''}
                  onChange={(e) => onChange('payerAddress', e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Payer's Phone Number"
                  value={data.payerPhone || ''}
                  onChange={(e) => onChange('payerPhone', e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Payer's Email"
                  type="email"
                  value={data.payerEmail || ''}
                  onChange={(e) => onChange('payerEmail', e.target.value)}
                />
              </Grid>
            </>
          )}

          {/* Important Notes */}
          <Grid item xs={12}>
            <Alert severity="warning" sx={{ mt: 2 }}>
              <Typography variant="body2" fontWeight="bold">
                Important:
              </Typography>
              <Typography variant="body2">
                • Be honest and accurate about your travel plans<br />
                • Your intended length of stay should match your visa type<br />
                • You must have sufficient funds to cover your expenses<br />
                • Provide complete information about who is funding your trip
              </Typography>
            </Alert>
          </Grid>

          {/* Validation Check */}
          <Grid item xs={12}>
            <Alert
              severity={
                data.purposeOfTrip && data.personPayingForTrip ? "success" : "info"
              }
              sx={{ mt: 2 }}
            >
              {data.purposeOfTrip && data.personPayingForTrip ?
                "Required travel information is complete" :
                "Please complete all required travel information fields"}
            </Alert>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default TravelInfoStep;