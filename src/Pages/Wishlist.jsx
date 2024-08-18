import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    axios.get('http://localhost:5000/api/wishlist', {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(response => setWishlist(response.data))
      .catch(error => console.error('Error fetching wishlist:', error));
  }, []);

  const handleRemove = (id) => {
    const token = localStorage.getItem('authToken');
    axios.delete(`http://localhost:5000/api/wishlist/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(response => setWishlist(wishlist.filter(item => item.id !== id)))
      .catch(error => console.error('Error removing item:', error));
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Wishlist
        </Typography>
        <List>
          {wishlist.map(item => (
            <ListItem key={item.id} divider>
              <ListItemText primary={item.title} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => handleRemove(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Wishlist;
