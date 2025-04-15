import React from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import InsightsIcon from '@mui/icons-material/Insights';
import ShieldIcon from '@mui/icons-material/Shield';
import PatternIcon from '@mui/icons-material/Pattern';
import FeatureCard from './FeatureCard';

const FeaturesSection = () => {
  const features = [
    {
      icon: <PsychologyIcon sx={{ color: 'primary.main', fontSize: 32 }} />,
      title: 'AI-Powered Diagnosis',
      description: 'Advanced artificial intelligence for accurate health assessments and pattern recognition.'
    },
    {
      icon: <InsightsIcon sx={{ color: 'error.main', fontSize: 32 }} />,
      title: 'Personalized Health Insights',
      description: 'Get tailored recommendations for diet, lifestyle, and preventive care based on your health data.'
    },
    {
      icon: <ShieldIcon sx={{ color: 'success.main', fontSize: 32 }} />,
      title: 'Enterprise-Grade Security',
      description: 'Your health data is protected with advanced encryption and security measures.'
    },
    {
      icon: <PatternIcon sx={{ color: 'warning.main', fontSize: 32 }} />,
      title: 'Symptom Pattern Analysis',
      description: 'Track and analyze symptom patterns over time for more accurate diagnosis.'
    }
  ];

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          align="center"
          sx={{ mb: 6, fontWeight: 700 }}
        >
          Features
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <FeatureCard {...feature} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesSection; 