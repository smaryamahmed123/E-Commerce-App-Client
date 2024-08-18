import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper, Container, CircularProgress, Divider } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { BASE_URL1 } from '../Constants';

const OrderDetailed = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL1}/api/orders/${id}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
        navigate('/order-history');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id, navigate]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: '80px', paddingY: 4 }}>
      <Navbar />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Paper elevation={6} sx={{ padding: 4, maxWidth: '700px', width: '100%', borderRadius: '12px' }}>
          {order ? (
            <>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 2, color: '#0d3b66' }}>
                Order Details
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                <strong>Order Number:</strong> {order._id}
              </Typography>
              <Typography variant="h6" gutterBottom>
                <strong>Total Amount:</strong> {order.total.toFixed(2)} Rs.
              </Typography>
              <Typography variant="h6" gutterBottom>
                <strong>Shipping Address:</strong> {order.shippingAddress}
              </Typography>
              <Typography variant="h6" gutterBottom>
                <strong>Payment Method:</strong> {order.paymentMethod}
              </Typography>
              <Typography variant="h6" gutterBottom>
                <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}
              </Typography>
              <Typography variant="h6" gutterBottom>
                <strong>Items Purchased:</strong>
              </Typography>
              <Box component="ul" sx={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                {order.items.map((item, index) => (
                  <Box component="li" key={index} sx={{ mb: 1 }}>
                    <Typography variant="body1">
                      {item.title} x {item.quantity} - {item.price.toFixed(2)} Rs.
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom sx={{ mt: 2, color: '#555' }}>
                Thank you for your purchase!
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/')}
                sx={{
                  mt: 2,
                  backgroundColor: '#f4d35e',
                  '&:hover': {
                    backgroundColor: '#f95738',
                  },
                }}
              >
                Back to Home
              </Button>
            </>
          ) : (
            <Typography variant="h6">No order details found.</Typography>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default OrderDetailed;
