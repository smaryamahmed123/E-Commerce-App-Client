import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, CardContent, Tabs, Tab } from '@mui/material';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { BASE_URL1, BASE_URL2 } from '../Constants';
import { toast } from 'react-toastify';


const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const getToken = () => localStorage.getItem('authToken'); // Helper function to get token

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${BASE_URL1}/api/admin/request-admin`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRequests(response.data);
      } catch (error) {
        toast.error('Failed to fetch requests', { position: 'top-center' });
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (email) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(`${BASE_URL1}/api/admin/approve-request`, { email }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log('Request approved:', response.data);
      setRequests(prevRequests => prevRequests.filter(request => request.email !== email));
      toast.success('Request approved', { position: 'top-center' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to approve request', { position: 'top-center' });
    }
  };

  const handleDeny = async (email) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.post(`${BASE_URL1}/api/admin/deny-request`, { email }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRequests(prevRequests => prevRequests.filter(request => request.email !== email));
      toast.success('Request denied', { position: 'top-center' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to deny request', { position: 'top-center' });
    }
  };


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = getToken(); // or however you store the token
        const response = await axios.get(`${BASE_URL2}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log('Users fetched:', response.data); // Debugging
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Retrieve the token from local storage
        const response = await axios.get(`${BASE_URL1}/api/orders/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to fetch orders', { position: 'top-center' });
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);
  return (
    <Container sx={{ mt: 4, mb: 4, backgroundColor: '#faf0ca', borderRadius: 2, boxShadow: 2 }}>
      <Navbar />
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold', color: '#0d3b66' }}>
        Admin Dashboard
      </Typography>

      <Box>
        <Tabs
          value={tabIndex}
          onChange={(e, newValue) => setTabIndex(newValue)}
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
        >
          <Tab label="Admin Requests" sx={{ fontWeight: 'bold', color: '#0d3b66' }} />
          <Tab label="Manage Products" sx={{ fontWeight: 'bold', color: '#0d3b66' }} />
          <Tab label="View Orders" sx={{ fontWeight: 'bold', color: '#0d3b66' }} />
          <Tab label="Users" sx={{ fontWeight: 'bold', color: '#0d3b66' }} />
        </Tabs>

        <Box p={3}>
          {tabIndex === 0 && (
            <Grid container spacing={3}>
              {requests.map((request) => (
                <Grid item xs={12} sm={6} md={4} key={request.email}>
                  <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ color: '#0d3b66' }}>{request.email}</Typography>
                      <Box mt={2}>
                        <Button
                          variant="contained"
                          color="success"
                          sx={{ mr: 1 }}
                          onClick={() => handleApprove(request.email)}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDeny(request.email)}
                        >
                          Deny
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
          {tabIndex === 1 && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Button variant="contained" color="primary">
                  Manage Products
                </Button>
              </Grid>
            </Grid>
          )}
          {tabIndex === 2 && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <Typography variant="h4" gutterBottom sx={{ mb: 2, fontWeight: 'bold', color: '#0d3b66' }}>
                  Orders
                </Typography>
                <Box mt={4}>
                  <Paper>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', color: '#0d3b66' }}>Order ID</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#0d3b66' }}>Item</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#0d3b66' }}>Quantity</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#0d3b66' }}>Price</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {orders.map((order) => (
                            order.items.map((item) => (
                              <TableRow key={item._id}>
                                <TableCell>{order._id}</TableCell>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.price}</TableCell>
                              </TableRow>
                            ))
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </Box>
              </Grid>
            </Grid>
          )}
          {tabIndex === 3 && (
            <Box mt={4}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 'bold', color: '#0d3b66' }}>
                Users
              </Typography>
              <Paper>
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: '#0d3b66' }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#0d3b66' }}>Email</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#0d3b66' }}>Messages</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#0d3b66' }}>Orders</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user._id}>
                          <TableCell>{`${user.firstName} ${user.lastName} (ID: ${user._id})`}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            {user.messages.length > 0 ? (
                              user.messages.map((message) => (
                                <Typography variant="body2" key={message._id}>{message.message}</Typography>
                              ))
                            ) : (
                              <Typography variant="body2">No messages</Typography>
                            )}
                          </TableCell>
                          <TableCell>
                            {user.orders.length > 0 ? (
                              user.orders.map((order) => (
                                <Typography variant="body2" key={order._id}>Order ID: {order._id}, Total: {order.total} Rs.</Typography>
                              ))
                            ) : (
                              <Typography variant="body2">No orders</Typography>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
