import * as React from 'react';
import { Button, TextField, Box, Typography, Container } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL1 } from '../Constants';

function AdminRequestForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const token = localStorage.getItem('authToken');
      await axios.post(`${BASE_URL1}api/admin/request-admin`, { email }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Admin request submitted successfully', { position: 'top-center' });
      setEmail('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit request', { position: 'top-center' });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 8,
        }}
      >
        <Typography component="h1" variant="h5">
          Request Admin Access
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit Request
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default AdminRequestForm;
