import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const OrderConfirmation = () => {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrder = JSON.parse(localStorage.getItem('orderDetails'));
    setOrder(storedOrder);
    localStorage.removeItem('orderDetails'); // Clear order details after use
  }, []);

  return (
    <Container maxWidth="md" sx={{ marginTop: '100px', paddingY: 4 }}>
      <Navbar />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Paper elevation={3} sx={{ padding: 4, maxWidth: '600px', width: '100%' }}>
          {order ? (
            <>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                Order Confirmation
              </Typography>
              <Typography variant="h6" gutterBottom>
                <strong>Order Number:</strong> {order._id}
              </Typography>
              <Typography variant="h6" gutterBottom>
                <strong>Total:</strong> {order.total} Rs.
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
                      {item.title} x {item.quantity} - {item.price} Rs.
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Thank you for your purchase!
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/')}
                sx={{ mt: 2 }}
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

export default OrderConfirmation;
