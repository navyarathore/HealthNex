import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import InsightsIcon from '@mui/icons-material/Insights';
import SecurityIcon from '@mui/icons-material/Security';

const InnovationCard = ({ icon, title, description }) => (
  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2 }}>
    <CardContent sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        {icon}
      </Box>
      <Typography variant="h5" component="h3" gutterBottom align="center">
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

const InnovationsSection = () => {
  const innovations = [
    {
      icon: <PsychologyIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
      title: 'AI-Powered Symptom Analysis',
      description: 'Leveraging advanced AI to analyze symptom patterns over time, providing more precise and accurate diagnoses instead of broad symptom matching.'
    },
    {
      icon: <InsightsIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
      title: 'Personalized Health Insights',
      description: 'Based on your diagnosis, receive tailored health insights and recommendations for lifestyle changes, including dietary adjustments and wellness practices.'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
      title: 'Advanced Data Security',
      description: 'Your medical information is protected with state-of-the-art encryption and security measures against various cyber threats, ensuring complete privacy.'
    }
  ];

  return (
    <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          Our Innovations
        </Typography>
        <Typography variant="h6" color="text.secondary" align="center" sx={{ mb: 6 }}>
          Revolutionizing healthcare through technology
        </Typography>
        <Grid container spacing={4}>
          {innovations.map((innovation, index) => (
            <Grid item xs={12} md={4} key={index}>
              <InnovationCard {...innovation} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default InnovationsSection; 