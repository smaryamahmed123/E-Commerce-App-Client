import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Grid, Card, CardContent, CardActions, Button, CardMedia, CircularProgress, Divider } from '@mui/material';
import { toast } from 'react-toastify';
import Img13 from '../assets/img13.jpeg'
import { BASE_URL1 } from '../Constants';
const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState('');
  const token = useSelector((state) => state.auth.token); // Get token from Redux store
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id || user?._id; // Adjust based on your user object structure

  useEffect(() => {
    if (!token || !userId) return;

    axios.get(`${BASE_URL1}/api/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { userId }, // Pass userId as a query parameter
    })
      .then(response => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
        setErrors('Error fetching orders');
        toast.error('Failed to fetch orders');
        setLoading(false);
      });
  }, [token, userId, navigate]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: '80px' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ color: '#0d3b66', fontWeight: 'bold' }}>
        Order History
      </Typography>
      {errors && <Typography color="error" variant="body1" align="center">{errors}</Typography>}
      <Grid container spacing={4}>
        {orders.map(order => (
          <Grid item xs={12} sm={6} md={4} key={order._id}>
            <Card sx={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <CardMedia
                component="img"
                height="140"
                image={Img13} // Replace with an actual image or order thumbnail
                alt="Order Thumbnail"
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Order ID: {order._id}</Typography>
                <Divider sx={{ marginY: 1 }} />
                {/* {order.items.map(item => ( */}
                  {/* // <Typography key={item.productId._id} variant="body2" sx={{ color: '#555' }}>
                  //   Product: {item.productId.title} | Quantity: {item.quantity} | Price: ${item.price.toFixed(2)}
                  // </Typography>
                // ))} */}
                <Typography variant="body2" sx={{ color: '#555' }}>Status: {order.status}</Typography>
                <Typography variant="body2" sx={{ color: '#555' }}>Total: ${order.total.toFixed(2)}</Typography>
                <Typography variant="body2" sx={{ color: '#555' }}>Date: {new Date(order.orderDate).toLocaleDateString()}</Typography>
              </CardContent>

              <CardActions sx={{ justifyContent: 'center' }}>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/order/${order._id}`)}
                  sx={{
                    backgroundColor: '#f4d35e',
                    '&:hover': {
                      backgroundColor: '#f95738',
                    },
                  }}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default OrderHistory;
