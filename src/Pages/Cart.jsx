import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, removeAddToCart, updateQuantity } from '../store/slices/CartSlice';
import { Box, Container, Grid, Card, CardContent, CardMedia, Typography, TextField, IconButton, Button, CssBaseline } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import RemoveShoppingCartTwoToneIcon from '@mui/icons-material/RemoveShoppingCartTwoTone';

const AddToCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: addToCart, error, isLoading } = useSelector((state) => state.cart);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await dispatch(fetchCart()).unwrap();
        console.log('Cart items fetched:', response);
      } catch (err) {
        console.error('Failed to fetch cart items:', err);
      }
    };

    fetchCartItems();
  }, [dispatch]);

  const handleQuantityChange = (productId, quantity) => {
    if (quantity >= 0) {
      dispatch(updateQuantity({ productId, quantity }));
    }
  };

  const calculateSubtotal = () => {
    return addToCart
      .reduce((acc, item) => {
        const price = item.product?.price || 0;
        const quantity = item.quantity || 0;
        // console.log(`Calculating item: ${item.product?.title}, Price: ${price}, Quantity: ${quantity}`); // Debugging line
        return acc + price * quantity;
      }, 0)
      .toFixed(2);
  };

  const calculateTotal = (shippingCost) => {
    const subtotal = parseFloat(calculateSubtotal());
    return (subtotal + parseFloat(shippingCost)).toFixed(2);
  };

  const shippingOptions = [
    { label: 'Standard Shipping - Rs 50', cost: 50 },
    { label: 'Express Shipping - Rs 100', cost: 100 },
  ];

  const [selectedShipping, setSelectedShipping] = React.useState(shippingOptions[0].cost);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ marginTop: '100px' }}>
        <Box sx={{ bgcolor: '#f5f5f5', padding: 4, borderRadius: 2 }}>
          {addToCart.length > 0 ? (
            <>
              {addToCart.map((cart) => (
                <Card
                  key={cart.product.id}
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 2,
                    marginBottom: 3,
                    boxShadow: 3,
                    backgroundColor: '#fff',
                  }}>
                  <Link style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', width: '100%' }} to={`/DetailedPg/${cart.product.id}`}>
                    <CardMedia
                      component="img"
                      height="100"
                      image={cart.product.thumbnail}
                      alt="Product Image"
                      sx={{
                        width: { xs: '100%', sm: '150px' },
                        height: { xs: 'auto', sm: '150px' },
                        objectFit: 'contain',
                      }}
                    />
                    <CardContent sx={{ flex: 1, paddingLeft: { sm: 3 }, textAlign: { xs: 'center', sm: 'left' } }}>
                      <Typography variant="body1" component="div" sx={{ fontWeight: 'bold' }}>
                        {cart.product.description}
                      </Typography>
                    </CardContent>
                  </Link>
                  <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1" component="div" sx={{ marginTop: 1 }}>
                      Rs {cart.product.price}
                    </Typography>
                    <TextField
                      type="number"
                      value={cart.quantity}
                      onChange={(e) => handleQuantityChange(cart.product.id, parseInt(e.target.value))}
                      inputProps={{ min: 1 }}
                      sx={{ width: '60px', marginRight: 2 }}
                    />
                    <IconButton
                      size="large"
                      color="error"
                      onClick={() => dispatch(removeAddToCart(cart.product.id))}
                    >
                      <RemoveShoppingCartTwoToneIcon />
                    </IconButton>
                  </CardContent>
                </Card>
              ))}
              <Box sx={{ marginTop: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Shipping Options:
                </Typography>
                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                  {shippingOptions.map((option) => (
                    <Grid item key={option.label}>
                      <Button
                        onClick={() => setSelectedShipping(option.cost)}
                        variant={selectedShipping === option.cost ? 'contained' : 'outlined'}
                        sx={{ width: '100%' }}
                      >
                        {option.label} (Rs {option.cost})
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Box sx={{ marginTop: 4 }}>
                <Typography variant="h6">
                  Subtotal: <strong>Rs {calculateSubtotal()}</strong>
                </Typography>
                <Typography variant="h6">
                  Total: <strong>Rs {calculateTotal(selectedShipping)}</strong>
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCheckout}
                  sx={{ marginTop: 3, padding: '10px 20px' }}
                >
                  Proceed to Checkout
                </Button>
              </Box>
            </>
          ) : (
            <Typography variant="h6" sx={{ textAlign: 'center' }}>
              Your cart is empty.
            </Typography>
          )}
        </Box>
      </Container>
    </>
  );
};

export default AddToCart;
