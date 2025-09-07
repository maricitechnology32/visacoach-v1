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
  Button,
  IconButton,
  Paper,
  Chip,
  FormControlLabel,
  Checkbox,
  InputAdornment
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';

const SocialMediaStep = ({ data, onChange }) => {
  const [platformInput, setPlatformInput] = useState({ platform: '', username: '', isPublic: true });
  const [phoneInput, setPhoneInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [idInput, setIdInput] = useState('');

  const popularPlatforms = [
    'Facebook',
    'Twitter',
    'Instagram',
    'LinkedIn',
    'YouTube',
    'TikTok',
    'Snapchat',
    'WhatsApp',
    'WeChat',
    'QQ',
    'Weibo',
    'VKontakte',
    'Telegram',
    'Reddit',
    'Pinterest',
    'Tumblr',
    'Flickr',
    'Other'
  ];

  const handleAddPlatform = () => {
    if (platformInput.platform.trim() && platformInput.username.trim()) {
      const updatedPlatforms = [...data.platforms, { ...platformInput }];
      onChange('platforms', updatedPlatforms);
      setPlatformInput({ platform: '', username: '', isPublic: true });
    }
  };

  const handleRemovePlatform = (index) => {
    const updatedPlatforms = data.platforms.filter((_, i) => i !== index);
    onChange('platforms', updatedPlatforms);
  };

  const handleAddPhone = () => {
    if (phoneInput.trim()) {
      const updatedPhones = [...data.phoneNumbersUsedLast5Years, phoneInput.trim()];
      onChange('phoneNumbersUsedLast5Years', updatedPhones);
      setPhoneInput('');
    }
  };

  const handleRemovePhone = (index) => {
    const updatedPhones = data.phoneNumbersUsedLast5Years.filter((_, i) => i !== index);
    onChange('phoneNumbersUsedLast5Years', updatedPhones);
  };

  const handleAddEmail = () => {
    if (emailInput.trim()) {
      const updatedEmails = [...data.emailAddressesUsedLast5Years, emailInput.trim()];
      onChange('emailAddressesUsedLast5Years', updatedEmails);
      setEmailInput('');
    }
  };

  const handleRemoveEmail = (index) => {
    const updatedEmails = data.emailAddressesUsedLast5Years.filter((_, i) => i !== index);
    onChange('emailAddressesUsedLast5Years', updatedEmails);
  };

  const handleAddId = () => {
    if (idInput.trim()) {
      const updatedIds = [...data.internationalIdentityNumbers, idInput.trim()];
      onChange('internationalIdentityNumbers', updatedIds);
      setIdInput('');
    }
  };

  const handleRemoveId = (index) => {
    const updatedIds = data.internationalIdentityNumbers.filter((_, i) => i !== index);
    onChange('internationalIdentityNumbers', updatedIds);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone) => {
    // Basic phone validation - allows international formats
    const phoneRegex = /^[+]?[0-9\s\-().]{10,20}$/;
    return phoneRegex.test(phone);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2" fontWeight="bold">
          U.S. Department of State Requirement
        </Typography>
        <Typography variant="body2">
          You are required to provide information about your online presence for the last five years.
          This includes social media platforms, phone numbers, and email addresses used during this period.
        </Typography>
      </Alert>

      <Grid container spacing={3}>
        {/* Social Media Platforms */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Social Media Platforms
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Alert severity="warning" sx={{ mb: 2 }}>
              List all social media platforms you have used in the last 5 years. Include both current and past accounts.
            </Alert>

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Platform</InputLabel>
                  <Select
                    value={platformInput.platform}
                    label="Platform"
                    onChange={(e) => setPlatformInput(prev => ({ ...prev, platform: e.target.value }))}
                  >
                    {popularPlatforms.map((platform) => (
                      <MenuItem key={platform} value={platform}>
                        {platform}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  size="small"
                  label="Username/Handle"
                  value={platformInput.username}
                  onChange={(e) => setPlatformInput(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="Your username on this platform"
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={platformInput.isPublic}
                      onChange={(e) => setPlatformInput(prev => ({ ...prev, isPublic: e.target.checked }))}
                      icon={<LockIcon />}
                      checkedIcon={<PublicIcon />}
                    />
                  }
                  label="Public"
                  labelPlacement="top"
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={handleAddPlatform}
                  disabled={!platformInput.platform || !platformInput.username}
                  sx={{ height: '40px' }}
                >
                  Add
                </Button>
              </Grid>
            </Grid>

            {data.platforms.length > 0 ? (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Your Social Media Accounts:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {data.platforms.map((platform, index) => (
                    <Chip
                      key={index}
                      label={`${platform.platform}: ${platform.username}`}
                      onDelete={() => handleRemovePlatform(index)}
                      deleteIcon={<DeleteIcon />}
                      color={platform.isPublic ? "primary" : "default"}
                      variant="outlined"
                      icon={platform.isPublic ? <PublicIcon /> : <LockIcon />}
                    />
                  ))}
                </Box>
              </Box>
            ) : (
              <Alert severity="info" sx={{ mt: 2 }}>
                No social media accounts added yet. If you have not used any social media in the last 5 years, you may proceed.
              </Alert>
            )}
          </Paper>
        </Grid>

        {/* Phone Numbers */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Phone Numbers Used in Last 5 Years
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  size="small"
                  label="Phone Number"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  placeholder="+1-555-123-4567"
                  error={phoneInput && !isValidPhone(phoneInput)}
                  helperText={phoneInput && !isValidPhone(phoneInput) ? "Please enter a valid phone number" : "Include country code"}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">📱</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={handleAddPhone}
                  disabled={!phoneInput || !isValidPhone(phoneInput)}
                  sx={{ height: '40px' }}
                >
                  Add Number
                </Button>
              </Grid>
            </Grid>

            {data.phoneNumbersUsedLast5Years.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Phone Numbers:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {data.phoneNumbersUsedLast5Years.map((phone, index) => (
                    <Chip
                      key={index}
                      label={phone}
                      onDelete={() => handleRemovePhone(index)}
                      deleteIcon={<DeleteIcon />}
                      color="secondary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Email Addresses */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Email Addresses Used in Last 5 Years
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  size="small"
                  label="Email Address"
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="example@domain.com"
                  error={emailInput && !isValidEmail(emailInput)}
                  helperText={emailInput && !isValidEmail(emailInput) ? "Please enter a valid email address" : ""}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">✉️</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={handleAddEmail}
                  disabled={!emailInput || !isValidEmail(emailInput)}
                  sx={{ height: '40px' }}
                >
                  Add Email
                </Button>
              </Grid>
            </Grid>

            {data.emailAddressesUsedLast5Years.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Email Addresses:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {data.emailAddressesUsedLast5Years.map((email, index) => (
                    <Chip
                      key={index}
                      label={email}
                      onDelete={() => handleRemoveEmail(index)}
                      deleteIcon={<DeleteIcon />}
                      color="info"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* International Identity Numbers */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              International Identity Numbers
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Alert severity="info" sx={{ mb: 2 }}>
              Provide any national identity numbers, taxpayer IDs, or other government-issued identification numbers from any country.
            </Alert>

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  size="small"
                  label="Identity Number"
                  value={idInput}
                  onChange={(e) => setIdInput(e.target.value)}
                  placeholder="e.g., National ID, Tax ID, etc."
                  helperText="Include country and number type if possible"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={handleAddId}
                  disabled={!idInput}
                  sx={{ height: '40px' }}
                >
                  Add ID
                </Button>
              </Grid>
            </Grid>

            {data.internationalIdentityNumbers.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Identity Numbers:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {data.internationalIdentityNumbers.map((id, index) => (
                    <Chip
                      key={index}
                      label={id}
                      onDelete={() => handleRemoveId(index)}
                      deleteIcon={<DeleteIcon />}
                      color="warning"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Important Information */}
        <Grid item xs={12}>
          <Alert severity="warning">
            <Typography variant="body2" fontWeight="bold">
              Important Information:
            </Typography>
            <Typography variant="body2">
              • You must provide all social media identifiers you have used in the last 5 years<br />
              • Include platforms even if you no longer use them<br />
              • Provide all phone numbers and email addresses used during this period<br />
              • Failure to provide complete information may delay your visa processing<br />
              • This information is used for identity verification and background checks
            </Typography>
          </Alert>
        </Grid>

        {/* Privacy Notice */}
        <Grid item xs={12}>
          <Paper elevation={1} sx={{ p: 2, bgcolor: 'grey.50' }}>
            <Typography variant="subtitle2" gutterBottom color="primary">
              Privacy Notice
            </Typography>
            <Typography variant="body2" color="text.secondary">
              The information you provide is collected pursuant to INA 221(g) and 222(f). It will be used to
              determine your eligibility for a visa and may be used for identity verification and vetting purposes.
              The data may be shared with other U.S. government agencies as necessary.
            </Typography>
          </Paper>
        </Grid>

        {/* Completion Status */}
        <Grid item xs={12}>
          <Alert severity="info">
            <Typography variant="body2">
              You have provided {data.platforms.length} social media account(s),{' '}
              {data.phoneNumbersUsedLast5Years.length} phone number(s), and{' '}
              {data.emailAddressesUsedLast5Years.length} email address(es).
            </Typography>
          </Alert>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SocialMediaStep;