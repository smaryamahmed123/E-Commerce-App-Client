import React, { useState } from 'react';
import { Box, Container, CssBaseline, Grid, Typography, TextField, Button } from '@mui/material';
import Cards from '../Components/Cards';
import Navbar from '../Components/Navbar';

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box sx={{ marginTop: { xs: '80px', sm: '100px' }, paddingX: 2 }}>
          <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
              Shop All Products
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Search products..."
              fullWidth
              sx={{ maxWidth: '600px', margin: '20px auto', borderRadius: '20px' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="contained" color="primary" sx={{ borderRadius: '20px', marginTop: '10px' }}>
              Search
            </Button>
          </Box>
          <Grid container spacing={3} sx={{ marginTop: '20px' }}>
            <Cards searchQuery={searchQuery} />
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Shop;
