import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import Slider from 'react-slick'; // Using react-slick for carousel functionality
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

const PromotionalBanners = ({ banners }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,         // Enable autoplay
        autoplaySpeed: 1000,
    };

    return (
        <Container>
            <Slider {...settings}>
                {banners.map((banner) => (
                    <Box
                        key={banner.id}
                        sx={{
                            height: '400px',
                            backgroundImage: `url(${banner.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: '#fff',
                            textAlign: 'center',
                            padding: '0 20px',
                        }}
                    >
                        <Box>
                            <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                                {banner.title}
                            </Typography>
                            <Button
                                variant="contained"
                                component={Link} 
                                to="/shop"
                                sx={{
                                    backgroundColor: '#f4d35e',
                                    '&:hover': {
                                        backgroundColor: '#ee964b',
                                    },
                                    padding: '10px 30px',
                                }}
                            >
                                {banner.ctaText}
                            </Button>
                        </Box>
                    </Box>
                ))}
            </Slider>
        </Container>
    );
};

export default PromotionalBanners;
