import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import { Box, Button, Container, CssBaseline, Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Facebook, Instagram, LinkedIn, Twitter } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { BASE_URL3 } from '../Constants';

// Styled Paper component
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
}));

const Contact = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const contactData = { name, email, message };
      const token = localStorage.getItem('authToken');
      await axios.post(`${BASE_URL3}/contact`, contactData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setName('');
      setEmail('');
      setMessage('');
      toast.success('Message sent successfully!');
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="lg" sx={{ marginTop: '80px', paddingY: 4 }}>
        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={6}>
            <Item>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                Get In Touch
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <WhatsAppIcon color="success" sx={{ mr: 2 }} />
                <Typography variant="body1">
                  <a href="tel:03332298285" style={{ textDecoration: 'none', color: 'inherit' }}>0333 2298285</a>
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EmailIcon color="primary" sx={{ mr: 2 }} />
                <Typography variant="body1">
                  <a href="mailto:kamalsahmed@gmail.com" style={{ textDecoration: 'none', color: 'inherit' }}>kamalsahmed@gmail.com</a>
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOnIcon color="action" sx={{ mr: 2 }} />
                <Typography variant="body1">
                  1234 Street Name, City, State, ZIP
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <IconButton component={Link} href="https://www.facebook.com" target="_blank" aria-label="Facebook" sx={{ color: '#faf0ca', mx: 1 }}>
                  <Facebook />
                </IconButton>
                <IconButton component={Link} href="https://www.twitter.com" target="_blank" aria-label="Twitter" sx={{ color: '#faf0ca', mx: 1 }}>
                  <Twitter />
                </IconButton>
                <IconButton component={Link} href="https://www.instagram.com" target="_blank" aria-label="Instagram" sx={{ color: '#faf0ca', mx: 1 }}>
                  <Instagram />
                </IconButton>
                <IconButton component={Link} href="https://www.linkedin.com" target="_blank" aria-label="LinkedIn" sx={{ color: '#faf0ca', mx: 1 }}>
                  <LinkedIn />
                </IconButton>
              </Box>
            </Item>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={6}>
            <Item>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                Contact Form
              </Typography>
              <form onSubmit={handleFormSubmit}>
                <TextField
                  label="Name"
                  fullWidth
                  margin="normal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <TextField
                  label="Email"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                />
                <TextField
                  label="Message"
                  multiline
                  rows={4}
                  fullWidth
                  margin="normal"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
                {error && (
                  <Typography color="error" sx={{ mt: 2 }}>
                    {error}
                  </Typography>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ mt: 2 }}
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send'}
                </Button>
              </form>
            </Item>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Contact;
