import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Grid, Typography, TextField, Button, CssBaseline, FormControl, InputLabel, Select, MenuItem, Card, CardContent } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BASE_URL1 } from '../Constants';

const validateOrderData = (orderData) => {
  if (!orderData.billingAddress || !orderData.shippingAddress || !orderData.paymentMethod) {
    console.error('Missing required fields:', orderData);
    return false;
  }

  if (!Array.isArray(orderData.items) || orderData.items.length === 0) {
    console.error('Items array is empty or not an array:', orderData.items);
    return false;
  }

  for (const item of orderData.items) {
    if (!item.id || !item.title || !item.quantity || !item.price) {
      console.error('Invalid item data:', item);
      return false;
    }
    if (typeof item.price !== 'number' || isNaN(item.price) || item.price <= 0) {
      console.error('Invalid item price:', item.price);
      return false;
    }
    if (typeof item.quantity !== 'number' || isNaN(item.quantity) || item.quantity <= 0) {
      console.error('Invalid item quantity:', item.quantity);
      return false;
    }
  }

  return true;
};

const Checkout = () => {
  const navigate = useNavigate();
  const { items: cartItems } = useSelector((state) => state.cart);
  const [billingAddress, setBillingAddress] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [checkoutItems, setCheckoutItems] = useState([]);

  useEffect(() => {
    const checkoutItem = JSON.parse(localStorage.getItem('checkoutItem'));
    if (checkoutItem) {
      setCheckoutItems([{
        id: checkoutItem.id || checkoutItem._id,
        title: checkoutItem.title || 'No Title',
        quantity: checkoutItem.quantity || 1,
        price: checkoutItem.price || 0
      }]);
    } else {
      const itemsToAdd = cartItems.map(item => ({
        id: item.product.id,
        title: item.product.title,
        quantity: item.quantity,
        price: item.product.price
      }));
      setCheckoutItems(itemsToAdd);
    }
  }, [cartItems]);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePlaceOrder = async () => {
    const orderData = {
      items: checkoutItems.map((item) => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        price: item.price,
      })),
      billingAddress,
      shippingAddress,
      paymentMethod,
    };

    if (!validateOrderData(orderData)) {
      console.error('Invalid order data:', orderData);
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No token found');
      }
      const response = await axios.post(`${BASE_URL1}/api/checkout`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      localStorage.setItem('orderDetails', JSON.stringify(response.data.order));
      localStorage.removeItem('checkoutItem'); // Clear item after order is placed
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Error placing order:', error.response?.data || error.message);
      toast.error('Failed to place the order. Please try again.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" sx={{ marginTop: '100px' }}>
        <Box sx={{ padding: 3, borderRadius: 2, boxShadow: 3, backgroundColor: '#fff' }}>
          <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: 'bold' }}>
            Checkout
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Billing Address"
                fullWidth
                value={billingAddress}
                onChange={(e) => setBillingAddress(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Shipping Address"
                fullWidth
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel>Payment Method</InputLabel>
                <Select
                  value={paymentMethod}
                  onChange={handlePaymentMethodChange}
                  label="Payment Method"
                >
                  <MenuItem value="creditCard">Credit Card</MenuItem>
                  <MenuItem value="paypal">PayPal</MenuItem>
                  <MenuItem value="bankTransfer">Bank Transfer</MenuItem>
                  <MenuItem value="cashOnDelivery">Cash on Delivery</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Typography variant="h5" sx={{ marginTop: 3, marginBottom: 2, fontWeight: 'bold' }}>
            Order Summary
          </Typography>
          {checkoutItems.map((item) => (
            <Card key={item.id} sx={{ marginBottom: 2, boxShadow: 1 }}>
              <CardContent>
                <Typography variant="body1">
                  {item.title} - {item.quantity} x Rs {item.price}
                </Typography>
              </CardContent>
            </Card>
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={handlePlaceOrder}
            sx={{ marginTop: 3 }}
          >
            Place Order
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Checkout;
