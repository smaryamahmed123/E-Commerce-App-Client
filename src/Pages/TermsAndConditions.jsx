import React from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';
import Navbar from '../Components/Navbar';

const TermsAndConditions = () => {
  return (
    <Container>
      <Navbar />
      <Box my={4} sx={{ marginTop: '100px' }}>
        <Typography variant="h4" gutterBottom>
          Terms and Conditions
        </Typography>
        <Typography variant="h6" gutterBottom>
          1. Introduction
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to [Your Company Name]. These terms and conditions outline the rules and regulations for the use of our website and services. By accessing or using our services, you agree to comply with and be bound by these terms.
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          2. Use of Service
        </Typography>
        <Typography variant="body1" paragraph>
          You must use our services in accordance with applicable laws and regulations. You agree not to engage in any conduct that could harm, disable, or impair our services or interfere with any other party's use of the services.
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          3. Account Responsibilities
        </Typography>
        <Typography variant="body1" paragraph>
          If you create an account with us, you are responsible for maintaining the confidentiality of your account and password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          4. Intellectual Property
        </Typography>
        <Typography variant="body1" paragraph>
          All content and materials on our website are the property of [Your Company Name] or its licensors. You may not reproduce, distribute, or otherwise use any content from our site without our express written permission.
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          5. Limitation of Liability
        </Typography>
        <Typography variant="body1" paragraph>
          We are not liable for any indirect, incidental, or consequential damages arising from the use of our services. Our liability is limited to the maximum extent permitted by law.
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          6. Changes to Terms
        </Typography>
        <Typography variant="body1" paragraph>
          We may update these terms from time to time. We will notify you of any changes by posting the new terms on our website. Your continued use of our services after such changes constitutes your acceptance of the new terms.
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          7. Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions about these terms and conditions, please contact us at [Your Contact Information].
        </Typography>
      </Box>
    </Container>
  );
};

export default TermsAndConditions;
