import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import { fetchData } from '../store/slices/ProductSlice';

const Cards = ({ searchQuery = '' }) => {
  const dispatch = useDispatch();
  const { allProducts, isLoading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const filteredProducts = allProducts?.products
    ? allProducts.products.filter(product => {
      const title = product.title?.toLowerCase() || '';
      const description = product.description?.toLowerCase() || '';
      return title.includes(searchQuery.toLowerCase()) || description.includes(searchQuery.toLowerCase());
    })
    : [];

  const renderSkeleton = () => (
    <Card sx={{ maxWidth: 280, cursor: 'pointer', marginTop: 3 }}>
      <Skeleton variant="rectangular" height={150} />
      <CardContent>
        <Skeleton variant="text" sx={{ marginBottom: 1 }} />
        <Skeleton variant="text" />
      </CardContent>
    </Card>
  );

  return (
    <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
      {isLoading ? (
        Array.from(new Array(12)).map((_, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            {renderSkeleton()}
          </Grid>
        ))
      ) : error ? (
        <Typography color="error" variant="h6">
          {`Error: ${error}`}
        </Typography>
      ) : filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
              <Card
                sx={{
                  maxWidth: 345,
                  cursor: 'pointer',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
                  },
                }}
              >
                <CardMedia
                  sx={{ height: 250 }}
                  image={product.thumbnail}
                  alt={product.title}
                />
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    Rs {product.price}
                  </Typography>
                  <Typography variant="subtitle1" component="div" color="textSecondary">
                    {product.title}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))
      ) : (
        <Typography variant="h6" sx={{ textAlign: 'center', width: '100%', marginTop: 5 }}>
          No products available.
        </Typography>
      )}
    </Grid>
  );
};

export default Cards;
