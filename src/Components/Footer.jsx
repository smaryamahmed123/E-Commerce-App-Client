import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Instagram, LinkedIn, Twitter } from '@mui/icons-material';

function Footer() {
    return (
        <Box sx={{ bgcolor: '#0d3b66', color: '#faf0ca', padding: 3, width: '100%', mt: 5 }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {/* Company Information */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            About Us
                        </Typography>
                        <Typography variant="body2" sx={{ marginTop: 1 }}>
                            Welcome to [Your Store Name]! We offer a wide range of products to suit your needs. 
                            Our mission is to provide high-quality goods at affordable prices. 
                            Discover the latest trends and enjoy a seamless shopping experience with us.
                        </Typography>
                    </Grid>

                    {/* Quick Links */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Quick Links
                        </Typography>
                        <Link href="/" color="#faf0ca" display="block" sx={{ marginTop: 1 }}>
                            Home
                        </Link>
                        <Link href="/shop" color="#faf0ca" display="block" sx={{ marginTop: 1 }}>
                            Shop
                        </Link>
                        <Link href="/about-us" color="#faf0ca" display="block" sx={{ marginTop: 1 }}>
                            About Us
                        </Link>
                        <Link href="/contact-us" color="#faf0ca" display="block" sx={{ marginTop: 1 }}>
                            Contact Us
                        </Link>
                        <Link href="/faq" color="#faf0ca" display="block" sx={{ marginTop: 1 }}>
                            FAQ
                        </Link>
                        <Link href="/terms-and-conditions" color="#faf0ca" display="block" sx={{ marginTop: 1 }}>
                            Terms & Conditions
                        </Link>
                        <Link href="/privacy-policy" color="#faf0ca" display="block" sx={{ marginTop: 1 }}>
                            Privacy Policy
                        </Link>
                    </Grid>

                    {/* Contact Information */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Contact Us
                        </Typography>
                        <Typography variant="body2" sx={{ marginTop: 1 }}>
                            Address: 1234 E-Commerce St, Shop City, SH 56789
                        </Typography>
                        <Typography variant="body2" sx={{ marginTop: 1 }}>
                            Phone: +1 (123) 456-7890
                        </Typography>
                        <Typography variant="body2" sx={{ marginTop: 1 }}>
                            Email: support@yourstore.com
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                            <IconButton component={Link} href="https://www.facebook.com" target="_blank" aria-label="Facebook" sx={{ color: '#faf0ca' }}>
                                <Facebook />
                            </IconButton>
                            <IconButton component={Link} href="https://www.twitter.com" target="_blank" aria-label="Twitter" sx={{ color: '#faf0ca' }}>
                                <Twitter />
                            </IconButton>
                            <IconButton component={Link} href="https://www.instagram.com" target="_blank" aria-label="Instagram" sx={{ color: '#faf0ca' }}>
                                <Instagram />
                            </IconButton>
                            <IconButton component={Link} href="https://www.linkedin.com" target="_blank" aria-label="LinkedIn" sx={{ color: '#faf0ca' }}>
                                <LinkedIn />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>

                {/* Footer Bottom */}
                <Box sx={{ marginTop: 3, textAlign: 'center' }}>
                    <Typography variant="body2" color="#faf0ca">
                        © {new Date().getFullYear()} [Your Store Name]. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}

export default Footer;
