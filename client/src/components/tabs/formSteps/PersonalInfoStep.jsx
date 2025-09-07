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
  Chip,
  Button,
  InputAdornment,
  IconButton,
  Alert
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const PersonalInfoStep = ({ data, onChange }) => {
  const [otherNameInput, setOtherNameInput] = useState('');
  const [otherNationalityInput, setOtherNationalityInput] = useState('');

  const handleAddOtherName = () => {
    if (otherNameInput.trim()) {
      const updatedNames = [...data.otherNamesList, otherNameInput.trim()];
      onChange('otherNamesList', updatedNames);
      setOtherNameInput('');
    }
  };

  const handleRemoveOtherName = (index) => {
    const updatedNames = data.otherNamesList.filter((_, i) => i !== index);
    onChange('otherNamesList', updatedNames);
  };

  const handleAddOtherNationality = () => {
    if (otherNationalityInput.trim()) {
      const updatedNationalities = [...data.otherNationalities, otherNationalityInput.trim()];
      onChange('otherNationalities', updatedNationalities);
      setOtherNationalityInput('');
    }
  };

  const handleRemoveOtherNationality = (index) => {
    const updatedNationalities = data.otherNationalities.filter((_, i) => i !== index);
    onChange('otherNationalities', updatedNationalities);
  };

  const handleDateChange = (date) => {
    onChange('dateOfBirth', date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ mt: 2 }}>
        <Alert   sx={{ mb: 3 }}>
          Please provide your personal information exactly as it appears in your passport.
        </Alert>

        <Grid container spacing={3}>
          {/* Name Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Name Information
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Surname (Family Name)"
              value={data.surname || ''}
              onChange={(e) => onChange('surname', e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Given Names"
              value={data.givenNames || ''}
              onChange={(e) => onChange('givenNames', e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Full Name in Native Alphabet (if applicable)"
              value={data.fullNameNative || ''}
              onChange={(e) => onChange('fullNameNative', e.target.value)}
              helperText="If your language does not use Latin characters"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Telecode Name (if applicable)"
              value={data.telecode || ''}
              onChange={(e) => onChange('telecode', e.target.value)}
              helperText="Telecode version of your name if using Chinese, Arabic, etc."
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.hasOtherNames || false}
                  onChange={(e) => onChange('hasOtherNames', e.target.checked)}
                />
              }
              label="Have you ever used other names? (maiden, religious, professional, alias)"
            />
          </Grid>

          {data.hasOtherNames && (
            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>
                  List all other names you have used:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
                  <TextField
                    size="small"
                    value={otherNameInput}
                    onChange={(e) => setOtherNameInput(e.target.value)}
                    placeholder="Enter other name"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddOtherName()}
                  />
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleAddOtherName}
                  >
                    Add
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {data.otherNamesList.map((name, index) => (
                    <Chip
                      key={index}
                      label={name}
                      onDelete={() => handleRemoveOtherName(index)}
                      deleteIcon={<DeleteIcon />}
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
          )}

          {/* Personal Details */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Personal Details
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth required>
              <InputLabel>Sex</InputLabel>
              <Select
                value={data.sex || ''}
                label="Sex"
                onChange={(e) => onChange('sex', e.target.value)}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
                <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth required>
              <InputLabel>Marital Status</InputLabel>
              <Select
                value={data.maritalStatus || ''}
                label="Marital Status"
                onChange={(e) => onChange('maritalStatus', e.target.value)}
              >
                <MenuItem value="Single">Single</MenuItem>
                <MenuItem value="Married">Married</MenuItem>
                <MenuItem value="Divorced">Divorced</MenuItem>
                <MenuItem value="Widowed">Widowed</MenuItem>
                <MenuItem value="Separated">Separated</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <DatePicker
              label="Date of Birth"
              value={data.dateOfBirth || null}
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField {...params} fullWidth required />
              )}
            />
          </Grid>

          {/* Birth Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Birth Information
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="City of Birth"
              value={data.birthCity || ''}
              onChange={(e) => onChange('birthCity', e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="State/Province of Birth"
              value={data.birthState || ''}
              onChange={(e) => onChange('birthState', e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Country of Birth"
              value={data.birthCountry || ''}
              onChange={(e) => onChange('birthCountry', e.target.value)}
              required
            />
          </Grid>

          {/* Nationality Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Nationality Information
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Nationality"
              value={data.nationality || ''}
              onChange={(e) => onChange('nationality', e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.hasOtherNationality || false}
                  onChange={(e) => onChange('hasOtherNationality', e.target.checked)}
                />
              }
              label="Do you hold or have you held any other nationality?"
            />
          </Grid>

          {data.hasOtherNationality && (
            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>
                  List all other nationalities you hold or have held:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
                  <TextField
                    size="small"
                    value={otherNationalityInput}
                    onChange={(e) => setOtherNationalityInput(e.target.value)}
                    placeholder="Enter nationality"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddOtherNationality()}
                  />
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleAddOtherNationality}
                  >
                    Add
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {data.otherNationalities.map((nationality, index) => (
                    <Chip
                      key={index}
                      label={nationality}
                      onDelete={() => handleRemoveOtherNationality(index)}
                      deleteIcon={<DeleteIcon />}
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
          )}

          {/* Identification Numbers */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Identification Numbers
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="National ID Number (if applicable)"
              value={data.nationalIdNumber || ''}
              onChange={(e) => onChange('nationalIdNumber', e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.hasUsSocialSecurityNumber || false}
                  onChange={(e) => onChange('hasUsSocialSecurityNumber', e.target.checked)}
                />
              }
              label="Do you have a U.S. Social Security Number?"
            />
          </Grid>

          {data.hasUsSocialSecurityNumber && (
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="U.S. Social Security Number"
                value={data.usSocialSecurityNumber || ''}
                onChange={(e) => onChange('usSocialSecurityNumber', e.target.value)}
                inputProps={{ pattern: '[0-9]{3}-[0-9]{2}-[0-9]{4}' }}
                placeholder="XXX-XX-XXXX"
              />
            </Grid>
          )}

          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.hasUsTaxpayerId || false}
                  onChange={(e) => onChange('hasUsTaxpayerId', e.target.checked)}
                />
              }
              label="Do you have a U.S. Taxpayer ID Number?"
            />
          </Grid>

          {data.hasUsTaxpayerId && (
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="U.S. Taxpayer ID Number"
                value={data.usTaxpayerIdNumber || ''}
                onChange={(e) => onChange('usTaxpayerIdNumber', e.target.value)}
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default PersonalInfoStep;