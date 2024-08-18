import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const NewsletterSignup = () => {
  return (
    <Box
      sx={{
        padding: '40px 20px',
        backgroundColor: '#0d3b66',
        color: '#fff',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
        Subscribe to Our Newsletter
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Get 10% off your first order and stay updated with the latest news and offers!
      </Typography>
      <TextField
        variant="outlined"
        placeholder="Enter your email"
        sx={{
          mb: 2,
          backgroundColor: '#fff',
          borderRadius: '5px',
          width: '300px',
          '& input': {
            paddingLeft: '8px',
          },
        }}
      />
      <br />
      <Button variant="contained" color="primary" sx={{ backgroundColor: '#f4d35e' }}>
        Subscribe
      </Button>
    </Box>
  );
};

export default NewsletterSignup;
