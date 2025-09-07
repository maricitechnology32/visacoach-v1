/* eslint-disable no-unused-vars */
// src/components/summary/DetailItem.jsx

import React from 'react';
import { Grid, Typography } from '@mui/material';

// A helper to format dates nicely
const formatDate = (dateString) => {
  if (!dateString) return 'Not Provided';
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    return dateString; // Return original string if formatting fails
  }
};

const DetailItem = ({ label, value }) => {
  let displayValue = value;

  // Format value based on its type
  if (typeof value === 'boolean') {
    displayValue = value ? 'Yes' : 'No';
  } else if (typeof value === 'string' && !isNaN(Date.parse(value)) && value.includes('T')) {
    // Basic check if the string looks like an ISO date
    displayValue = formatDate(value);
  } else if (!value && typeof value !== 'boolean') {
    displayValue = 'Not Provided';
  }

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Typography variant="caption" color="text.secondary" component="div">
        {label}
      </Typography>
      <Typography variant="body1" sx={{ wordWrap: 'break-word' }}>
        {displayValue}
      </Typography>
    </Grid>
  );
};

export default DetailItem;