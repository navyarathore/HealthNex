import React from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import TestimonialCard from './TestimonialCard';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Fitness Enthusiast',
      image: 'https://i.pravatar.cc/150?img=1',
      rating: 5,
      content: 'HealthNex has transformed how I track my health. The AI-powered insights are incredibly accurate and helpful.'
    },
    {
      name: 'Michael Chen',
      role: 'Health Professional',
      image: 'https://i.pravatar.cc/150?img=2',
      rating: 5,
      content: 'As a healthcare provider, I recommend HealthNex to my patients. The symptom tracking and analysis features are exceptional.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Wellness Coach',
      image: 'https://i.pravatar.cc/150?img=3',
      rating: 5,
      content: 'The personalized health insights have helped me and my clients achieve better health outcomes.'
    }
  ];

  return (
    <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          align="center"
          sx={{ mb: 6, fontWeight: 700 }}
        >
          What Our Users Say
        </Typography>
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <TestimonialCard {...testimonial} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TestimonialsSection; 