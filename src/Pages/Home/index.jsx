import React from 'react';
import Navbar from '../../Components/Navbar';
import { Box, Container, CssBaseline, TextField, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import Img1 from '../../assets/img1.png'
import Img2 from '../../assets/img2.png'
import Img3 from '../../assets/img10.png'
import Img4 from '../../assets/img3.jpg'
import Img5 from '../../assets/img5.jpg'
import Img6 from '../../assets/img6.jpeg'
import Img7 from '../../assets/img7.png'
import Img11 from '../../assets/im11.png'
import Img12 from '../../assets/img12.png'
import HeroSection from '../../Components/HeroSection';
import FeaturedProducts from '../../Components/FeaturedProductsSection';
import CategoriesSection from '../../Components/CategoriesSection';
import PromotionalBanners from '../../Components/PromotionalBanners';
import TestimonialsSection from '../../Components/ReviewsSection';
import NewsletterSignup from '../../Components/NewsletterSignup';


const Home = () => {
  const featuredProducts = [
    { id: 1, name: 'Product 1', price: 49.99, image: Img1 },
    { id: 2, name: 'Product 2', price: 59.99, image: Img2 },
    { id: 3, name: 'Product 3', price: 69.99, image: Img3 },

    // Add more products
  ];

  const categories = [
    { id: 1, name: 'Category 1', image: Img5 },
    { id: 2, name: 'Category 2', image: Img6 },
    { id: 3, name: 'Category 3', image: Img7 },

    // Add more categories
  ];

  const banners = [
    { id: 1, title: 'Sale!', ctaText: 'Shop Now', image: Img11 },
    { id: 2, title: 'New Arrivals', ctaText: 'Explore', image: Img12 },
    
  ];

  const testimonials = [
    {
      "id": 0,
      "name": "Golden Shepherd",
      "comment": "Quis ad Lorem quis consequat cupidatat quis fugiat deserunt do laboris pariatur.",
      "rating": 3,
      "avatar": "https://randomuser.me/api/portraits/male/0.jpg"
    },
    {
      "id": 1,
      "name": "Dolores Bennett",
      "comment": "Enim anim tempor sunt exercitation dolore veniam eu sint.",
      "rating": 1,
      "avatar": "https://randomuser.me/api/portraits/female/1.jpg"
    },
    {
      "id": 2,
      "name": "Sofia Hyde",
      "comment": "Proident eu id ad tempor laborum cupidatat labore amet consectetur id dolore.",
      "rating": 2,
      "avatar": "https://randomuser.me/api/portraits/female/2.jpg"
    },
    {
      "id": 3,
      "name": "Suarez Reeves",
      "comment": "Quis deserunt sint in magna duis occaecat veniam dolore voluptate aliquip non.",
      "rating": 5,
      "avatar": "https://randomuser.me/api/portraits/male/3.jpg"
    },
    {
      "id": 4,
      "name": "Lila Greene",
      "comment": "Officia reprehenderit exercitation sint enim ea qui non aliqua do.",
      "rating": 1,
      "avatar": "https://randomuser.me/api/portraits/female/4.jpg"
    }
  ];

  return (
    <>
      <CssBaseline />
      <HeroSection />
      <FeaturedProducts products={featuredProducts} />
      <CategoriesSection categories={categories} />
      <PromotionalBanners banners={banners} />
      <TestimonialsSection testimonials={testimonials} />
      <NewsletterSignup />
    </>
  );
};

export default Home;







// import React, { useState } from 'react';
// import { Box, Container, CssBaseline, Typography, Grid } from '@mui/material';
// import Navbar from '../../Components/Navbar';
// import Cards from '../../Components/Cards';

// const Home = () => {
//   const [searchQuery, setSearchQuery] = useState('');

//   return (
//     <>
//       <CssBaseline />
//       <Container maxWidth="xl">
//         <Box sx={{ marginTop: '100px' }}>
//           <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
//           <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
//             <Typography variant="h4" gutterBottom>
//               Shop All Products
//             </Typography>
//           </Box>
//           <Grid container spacing={3} sx={{ marginTop: '20px' }}>
//             <Cards searchQuery={searchQuery} />
//           </Grid>
//         </Box>
//       </Container>
//     </>
//   );
// };

// export default Home;








