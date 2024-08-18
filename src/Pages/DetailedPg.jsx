import React, { useEffect } from 'react';
import axios from 'axios'; // Import axios for HTTP requests
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Container, CssBaseline, Grid, Typography, Stack } from '@mui/material';
import Navbar from '../Components/Navbar';
import { TextRating } from '../Components/Icons';
import { fetchData } from '../store/slices/ProductSlice';
import { addCart, removeAddToCart } from '../store/slices/CartSlice';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const DetailedPg = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allProducts } = useSelector((state) => state.product);
  const { items: cartItems } = useSelector((state) => state.cart);

  // Extracting products array from allProducts object
  const products = allProducts.products || [];

  // Finding the selected product from the products array
  const selectedProduct = products.find((product) => product.id === parseInt(id));
  const isInCart = () => cartItems.some((product) => product.id === selectedProduct?.id);

  const handleCartToggle = () => {
    if (!selectedProduct) {
      console.error('No product selected');
      return;
    }

    const product = {
      id: selectedProduct.id,
      title: selectedProduct.title,
      price: selectedProduct.price,
      thumbnail: selectedProduct.thumbnail,
      description: selectedProduct.description,
      category: selectedProduct.category,
      brand: selectedProduct.brand,
      stock: selectedProduct.stock,
      discountPercentage: selectedProduct.discountPercentage,
      rating: selectedProduct.rating,
    };
    const quantity = 1;

    if (isInCart()) {
      dispatch(removeAddToCart(product));
    } else {
      dispatch(addCart({ product, quantity }));
    }
    navigate('/cart'); // Redirect to the cart page
  };

  const buyNow = async () => {
    localStorage.setItem('checkoutItem', JSON.stringify({
      ...selectedProduct,
      quantity: 1,
    }));
    navigate('/checkout');
  };

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ marginTop: '100px' }}>
        <Navbar />
        <Grid container spacing={4}>
          {selectedProduct ? (
            <>
              <Grid item xs={12} md={6}>
                <MyCarousel images={selectedProduct.images} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#333' }}>{selectedProduct.title}</Typography>
                <Typography variant="h5" sx={{ color: '#555' }}>{selectedProduct.category}</Typography>
                <Typography variant="h6" sx={{ color: '#f57c00' }}>{selectedProduct.discountPercentage}% off</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#000' }}>{selectedProduct.price} Rs.</Typography>
                <Typography variant="body1" sx={{ mt: 2, color: '#333' }}>{selectedProduct.description}</Typography>
                <Typography sx={{ mt: 2, color: '#555' }}>Brand: {selectedProduct.brand}</Typography>
                <Typography sx={{ color: '#555' }}>Stock: {selectedProduct.stock}</Typography>
                <TextRating rating={selectedProduct.rating} sx={{ mt: 2 }} />
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <Button variant="contained" color="secondary" onClick={buyNow} sx={{ flex: 1 }}>
                    Buy Now
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleCartToggle}
                    startIcon={isInCart() ? <RemoveShoppingCartIcon /> : <AddShoppingCartIcon />}
                    sx={{ flex: 1 }}
                  >
                    {isInCart() ? 'Remove from Cart' : 'Add to Cart'}
                  </Button>
                </Stack>
              </Grid>
            </>
          ) : (
            <Typography variant="h6" color="textSecondary">Product not found.</Typography>
          )}
        </Grid>
      </Container>
    </>
  );
};

const MyCarousel = ({ images }) => (
  <Carousel
    showThumbs={false}
    infiniteLoop
    useKeyboardArrows
    dynamicHeight
    autoPlay
    interval={5000}
  >
    {images.map((image, index) => (
      <div key={index}>
        <img src={image} alt={`Image ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
      </div>
    ))}
  </Carousel>
);

export default DetailedPg;
