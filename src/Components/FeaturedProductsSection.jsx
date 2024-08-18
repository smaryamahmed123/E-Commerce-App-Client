import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';

const FeaturedProducts = ({ products }) => {
  return (
    <Box sx={{ padding: '40px 20px', backgroundColor: '#faf0ca' }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
        Featured Products
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ borderRadius: '10px', boxShadow: 3, '&:hover': { boxShadow: 6 } }}>
              <CardMedia
                component="img"
                height="250"
                image={product.image}
                alt={product.name}
              />
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {product.name}
                </Typography>
                <Typography variant="body1" sx={{ color: '#f95738', mb: 2 }}>
                  ${product.price}
                </Typography>
                <Button variant="contained" color="primary" sx={{ backgroundColor: '#f4d35e' }}>
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeaturedProducts;
