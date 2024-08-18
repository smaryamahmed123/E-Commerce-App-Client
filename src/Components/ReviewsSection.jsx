import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Avatar } from '@mui/material';

const TestimonialsSection = ({ testimonials }) => {
  return (
    <Box sx={{ padding: '40px 20px', backgroundColor: '#faf0ca' }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
        What Our Customers Say
      </Typography>
      <Grid container spacing={4}>
        {testimonials.map((testimonial) => (
          <Grid item xs={12} md={4} key={testimonial.id}>
            <Card sx={{ boxShadow: 3, borderRadius: '10px' }}>
              <CardContent>
                <Avatar src={testimonial.avatar} alt={testimonial.name} sx={{ width: 60, height: 60, mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {testimonial.name}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {testimonial.comment}
                </Typography>
                <Typography variant="body1" sx={{ color: '#f95738' }}>
                  {'⭐'.repeat(testimonial.rating)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TestimonialsSection;
