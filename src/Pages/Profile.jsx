import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import Navbar from '../Components/Navbar';

const Profile = () => {
  // State to store user data
  const [user, setUser] = useState({ name: '', email: '' });

  // Effect to load user data from local storage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser({
        name: storedUser.name || `${storedUser.firstName} ${storedUser.lastName}`,
        email: storedUser.email,
        profilePic: storedUser.profilePic
      });
    }
  }, []);
  

  return (
    <Container maxWidth="sm">
      <Navbar />
      <Box sx={{ marginTop: '100px' }}>
        <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
            Profile
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ color: '#555' }}>
            Hello, {user.name}
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ color: '#555' }}>
            Email: {user.email}
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile;
