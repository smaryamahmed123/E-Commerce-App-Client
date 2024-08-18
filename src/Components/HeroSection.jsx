import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import BannerImage from '../assets/img3.jpg'
import { Link } from 'react-router-dom';
const HeroSection = () => {
    return (
        <Box
            sx={{
                height: '90vh',
                backgroundImage: `url(${BannerImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                color: '#fff',
                padding: '0 20px',
            }}
        >
            <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                Catchy Tagline
            </Typography>
            <Typography variant="h5" sx={{ mb: 4 }}>
                Brief description that captivates your audience.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                component={Link} 
                to="/shop"
                sx={{
                    padding: '10px 30px',
                    fontSize: '18px',
                    backgroundColor: '#f4d35e',
                    '&:hover': {
                        backgroundColor: '#ee964b',
                    },
                }}
            >
                Shop Now
            </Button>
        </Box>
    );
};

export default HeroSection;
