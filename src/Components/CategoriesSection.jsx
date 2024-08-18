import React from 'react';
import { Grid, Box, Typography } from '@mui/material';

const CategoriesSection = ({ categories }) => {
  return (
    <Box sx={{ padding: '40px 20px' }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
        Shop by Category
      </Typography>
      <Grid container spacing={4}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={3} key={category.id}>
            <Box
              sx={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '10px',
                '&:hover img': {
                  transform: 'scale(1.1)',
                },
              }}
            >
              <img
                src={category.image}
                alt={category.name}
                style={{
                  width: '500px',
                  height: '250px',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease-in-out',
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: '#fff',
                  padding: '10px',
                  textAlign: 'center',
                }}
              >
                {category.name}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoriesSection;
