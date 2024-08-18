import React from 'react';
import { Container, Typography, Box, Divider, Button } from '@mui/material';
import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md">
      <Navbar />
      <Box my={4} sx={{ marginTop: '100px' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.6, color: '#555' }}>
          At [Your Company Name], we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website and use our services.
        </Typography>
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          1. Information We Collect
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.6, color: '#555' }}>
          We collect information that you provide to us directly, such as your name, email address, and any other details you choose to share when you use our services or contact us. We also collect information automatically through cookies and other tracking technologies.
        </Typography>
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          2. How We Use Your Information
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.6, color: '#555' }}>
          The information we collect is used to provide, maintain, and improve our services. This includes responding to your inquiries, processing transactions, and sending you updates or promotional information related to our services.
        </Typography>
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          3. Sharing Your Information
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.6, color: '#555' }}>
          We do not sell or rent your personal information to third parties. We may share your information with third parties who perform services on our behalf, such as payment processors or email service providers, under strict confidentiality agreements.
        </Typography>
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          4. Data Security
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.6, color: '#555' }}>
          We implement security measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
        </Typography>
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          5. Your Choices
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.6, color: '#555' }}>
          You may access, update, or delete your personal information by contacting us. You can also opt-out of receiving promotional emails from us by following the instructions provided in those emails.
        </Typography>
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          6. Cookies and Tracking Technologies
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.6, color: '#555' }}>
          We use cookies and other tracking technologies to enhance your browsing experience and analyze site traffic. You can control the use of cookies through your browser settings.
        </Typography>
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          7. Changes to This Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.6, color: '#555' }}>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on our website. Your continued use of our services after such changes constitutes your acceptance of the new policy.
        </Typography>
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          8. Contact Us
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.6, color: '#555' }}>
          If you have any questions or concerns about this Privacy Policy, please contact us at <Button component={Link} to={'/contact-us'} >Go To Contact Page</Button>.
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
