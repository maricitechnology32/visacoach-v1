// src/components/summary/InfoSection.jsx

import React from 'react';
import { Box, Typography, Grid, Divider, Paper } from '@mui/material';
import DetailItem from './DetailItem';

// Helper to format camelCase keys into readable titles
const formatLabel = (key) => {
  return key
    .replace(/([A-Z])/g, ' $1') // Add space before capital letters
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
};

const InfoSection = ({ title, data }) => {
  if (!data || Object.keys(data).length === 0) return null;

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom color="primary">
        {title}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={2}>
        {Object.entries(data).map(([key, value]) => {
          // Render arrays
          if (Array.isArray(value) && value.length > 0) {
            return (
              <Grid item xs={12} key={key}>
                <Typography variant="subtitle2" sx={{ mt: 1 }}>{formatLabel(key)}:</Typography>
                {value.map((item, index) => (
                  <Paper key={index} variant="outlined" sx={{ p: 1, my: 1 }}>
                    {typeof item === 'object' ? (
                      <Grid container spacing={1}>
                        {Object.entries(item).map(([itemKey, itemValue]) => (
                          <DetailItem key={itemKey} label={formatLabel(itemKey)} value={itemValue} />
                        ))}
                      </Grid>
                    ) : (
                      <Typography variant="body2">{item.toString()}</Typography>
                    )}
                  </Paper>
                ))}
              </Grid>
            );
          }
          // Render nested objects
          if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            return (
              <Grid item xs={12} key={key}>
                <Typography variant="subtitle2" sx={{ mt: 1 }}>{formatLabel(key)}:</Typography>
                <Paper variant="outlined" sx={{ p: 2, mt: 1 }}>
                  <Grid container spacing={2}>
                    {Object.entries(value).map(([nestedKey, nestedValue]) => (
                      <DetailItem key={nestedKey} label={formatLabel(nestedKey)} value={nestedValue} />
                    ))}
                  </Grid>
                </Paper>
              </Grid>
            );
          }
          // Render simple key-value pairs
          return <DetailItem key={key} label={formatLabel(key)} value={value} />;
        })}
      </Grid>
    </Box>
  );
};

export default InfoSection;