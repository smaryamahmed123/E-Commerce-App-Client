import React from 'react';
import { Box, Container, CssBaseline, Typography } from '@mui/material';

const AboutUs = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Box sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            About Us
          </Typography>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            Our Mission
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            At [Your Company Name], we deliver top-quality products with exceptional customer service, building long-term relationships with our customers.
          </Typography>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            Our Values
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            <strong>Customer Focus:</strong> We prioritize customer needs.<br />
            <strong>Integrity:</strong> We operate with honesty and transparency.<br />
            <strong>Innovation:</strong> We constantly improve our offerings.<br />
            <strong>Community:</strong> We give back to the community.
          </Typography>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            Our Story
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            Founded in [Year], we’ve grown from a small startup to a leader in our industry, driven by a commitment to quality and customer satisfaction.
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default AboutUs;
