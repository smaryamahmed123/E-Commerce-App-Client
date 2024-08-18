import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, CardActionArea } from '@mui/material';
import Navbar from '../Components/Navbar';
import image1 from '../assets/img7.png';
import image2 from '../assets/img8.png';
import image3 from '../assets/img9.png';

const blogPosts = [
  {
    "id": 0,
    "title": "exercitation culpa enim",
    "excerpt": "Sit aliquip cillum incididunt ea exercitation ea velit fugiat consectetur est amet.",
    "image": "https://source.unsplash.com/random/300x200",
    "date": "2023-06-09",
    "author": "Soto Hamilton"
  },
  {
    "id": 1,
    "title": "minim esse excepteur",
    "excerpt": "Et do duis qui ut occaecat fugiat quis ex adipisicing aliquip sunt excepteur anim esse.",
    "image": "https://source.unsplash.com/random/300x200",
    "date": "2024-05-26",
    "author": "Tiffany Bernard"
  },
  {
    "id": 2,
    "title": "quis Lorem est",
    "excerpt": "In officia cillum cillum laboris nisi ullamco.",
    "image": "https://source.unsplash.com/random/300x200",
    "date": "2023-09-18",
    "author": "Stevenson Barnes"
  },
  {
    "id": 3,
    "title": "non velit exercitation",
    "excerpt": "Minim irure nisi reprehenderit magna irure id.",
    "image": "https://source.unsplash.com/random/300x200",
    "date": "2024-01-17",
    "author": "Jerry Obrien"
  },
  {
    "id": 4,
    "title": "nostrud non eiusmod",
    "excerpt": "Anim velit sunt voluptate voluptate duis enim ad eiusmod consectetur aute.",
    "image": "https://source.unsplash.com/random/300x200",
    "date": "2023-08-13",
    "author": "Hanson Parker"
  },
  {
    "id": 5,
    "title": "ullamco culpa laborum",
    "excerpt": "Dolor excepteur duis ea incididunt eu ipsum enim veniam sint.",
    "image": "https://source.unsplash.com/random/300x200",
    "date": "2023-03-30",
    "author": "Virginia Lowe"
  }
];

const Blog = () => {
  return (
    <Container>
      <Navbar />
      <Box my={4} sx={{ marginTop: '100px' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          Blog
        </Typography>
        <Grid container spacing={4}>
          {blogPosts.map((post, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CardActionArea component="a" href="#">
                <Card sx={{ boxShadow: 3, borderRadius: 2, overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    image={post.image}
                    alt={post.title}
                    sx={{ height: 180 }}
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#555' }}>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {post.date}
                    </Typography>
                    <Typography variant="body2" paragraph sx={{ color: '#777' }}>
                      {post.excerpt}
                    </Typography>
                  </CardContent>
                </Card>
              </CardActionArea>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Blog;
