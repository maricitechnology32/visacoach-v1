
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
  FormHelperText
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const PassportInfoStep = ({ data, onChange }) => {
  const [passportIssueDate, setPassportIssueDate] = useState(data.passportIssueDate || null);
  const [passportExpiryDate, setPassportExpiryDate] = useState(data.passportExpiryDate || null);

  const handleIssueDateChange = (date) => {
    setPassportIssueDate(date);
    onChange('passportIssueDate', date);
  };

  const handleExpiryDateChange = (date) => {
    setPassportExpiryDate(date);
    onChange('passportExpiryDate', date);
  };

  // Validate passport expiry date is after issue date
  const isExpiryDateValid = () => {
    if (!passportIssueDate || !passportExpiryDate) return true;
    return passportExpiryDate > passportIssueDate;
  };

  // Check if passport is expired or expiring soon (within 6 months)
  const getPassportStatus = () => {
    if (!passportExpiryDate) return null;

    const today = new Date();
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(today.getMonth() + 6);

    if (passportExpiryDate < today) {
      return { severity: 'error', message: 'Passport has expired' };
    } else if (passportExpiryDate < sixMonthsFromNow) {
      return { severity: 'warning', message: 'Passport expires within 6 months' };
    }

    return null;
  };

  const passportStatus = getPassportStatus();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ mt: 2 }}>
        <Alert   sx={{ mb: 3 }}>
          Provide your passport details exactly as they appear in your passport.
          Your passport must be valid for at least 6 months beyond your intended stay in the U.S.
        </Alert>

        <Grid container spacing={3}>
          {/* Passport Details */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Passport Details
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Passport Number"
              value={data.passportNumber || ''}
              onChange={(e) => onChange('passportNumber', e.target.value)}
              required
              inputProps={{
                pattern: '[A-Z0-9]{6,9}',
                title: 'Passport number typically contains 6-9 alphanumeric characters'
              }}
              helperText="Enter exactly as shown in your passport"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Passport Book Number (if applicable)"
              value={data.passportBookNumber || ''}
              onChange={(e) => onChange('passportBookNumber', e.target.value)}
              helperText="Usually found on the inside back cover"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DatePicker
              label="Passport Issue Date"
              value={passportIssueDate}
              onChange={handleIssueDateChange}
              maxDate={new Date()}
              renderInput={(params) => (
                <TextField {...params} fullWidth required />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DatePicker
              label="Passport Expiry Date"
              value={passportExpiryDate}
              onChange={handleExpiryDateChange}
              minDate={passportIssueDate || new Date()}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  required
                  error={!isExpiryDateValid()}
                  helperText={!isExpiryDateValid() ? "Expiry date must be after issue date" : ""}
                />
              )}
            />
          </Grid>

          {passportStatus && (
            <Grid item xs={12}>
              <Alert severity={passportStatus.severity}>
                {passportStatus.message}
              </Alert>
            </Grid>
          )}

          {/* Issuing Authority */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Issuing Authority
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Issuing Country"
              value={data.passportIssueCountry || ''}
              onChange={(e) => onChange('passportIssueCountry', e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Issuing Authority"
              value={data.passportIssueAuthority || ''}
              onChange={(e) => onChange('passportIssueAuthority', e.target.value)}
              helperText="e.g., Ministry of Foreign Affairs, Passport Office"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="City of Issue"
              value={data.passportIssueCity || ''}
              onChange={(e) => onChange('passportIssueCity', e.target.value)}
            />
          </Grid>

          {/* Lost or Stolen Passport */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Passport History
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.isPassportLostOrStolen || false}
                  onChange={(e) => onChange('isPassportLostOrStolen', e.target.checked)}
                />
              }
              label="Has this passport been lost or stolen?"
            />
          </Grid>

          {data.isPassportLostOrStolen && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Details of Loss or Theft"
                value={data.lostOrStolenDetails || ''}
                onChange={(e) => onChange('lostOrStolenDetails', e.target.value)}
                placeholder="Please provide details including when and where the passport was lost or stolen, and whether it was reported to authorities."
                helperText="Provide as much detail as possible"
              />
            </Grid>
          )}

          {/* Additional Information */}
          <Grid item xs={12}>
            <Alert severity="warning" sx={{ mt: 2 }}>
              <Typography variant="body2" fontWeight="bold">
                Important:
              </Typography>
              <Typography variant="body2">
                • Your passport must be valid for at least 6 months beyond your intended period of stay in the United States<br />
                • Ensure all information matches exactly with your passport<br />
                • Citizens of some countries may be exempt from the 6-month rule under certain conditions
              </Typography>
            </Alert>
          </Grid>

          {/* Validation Summary */}
          {passportIssueDate && passportExpiryDate && isExpiryDateValid() && (
            <Grid item xs={12}>
              <Alert
                severity={passportStatus?.severity === 'error' ? 'error' : 'success'}
                sx={{ mt: 2 }}
              >
                <Typography variant="body2">
                  Passport validity: {Math.ceil((passportExpiryDate - passportIssueDate) / (1000 * 60 * 60 * 24 * 30))} months
                </Typography>
                {!passportStatus && (
                  <Typography variant="body2">
                    Your passport meets the validity requirements for U.S. travel
                  </Typography>
                )}
              </Alert>
            </Grid>
          )}
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default PassportInfoStep;