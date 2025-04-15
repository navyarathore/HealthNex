import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Timeline as TimelineIcon,
  NotificationsActive as NotificationsActiveIcon,
  Assessment as AssessmentIcon,
  Share as ShareIcon
} from '@mui/icons-material';
import LandingNav from '../components/LandingNav';
import Footer from '../components/Footer';

const FeatureSection = ({ title, description, icon, features }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid item xs={12} md={6}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          height: '100%',
          background: 'linear-gradient(145deg, #1a1a1a, #2a2a2a)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at top right, rgba(64, 196, 255, 0.03), transparent 40%)',
            pointerEvents: 'none'
          },
          '&:hover': {
            border: '1px solid rgba(64, 196, 255, 0.15)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {icon}
          <Typography variant="h5" component="h3" sx={{ ml: 2, color: '#40C4FF' }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ mb: 3, color: 'rgba(255, 255, 255, 0.7)' }}>
          {description}
        </Typography>
        <List>
          {features.map((feature, index) => (
            <ListItem key={index} sx={{ py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CheckCircleIcon sx={{ color: '#40C4FF' }} />
              </ListItemIcon>
              <ListItemText 
                primary={feature} 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  '& .MuiListItemText-primary': {
                    fontSize: '0.95rem'
                  }
                }} 
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Grid>
  );
};

const Features = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const features = [
    {
      title: 'Symptom Tracking',
      description: 'Easily log and monitor your symptoms with our intuitive tracking system.',
      icon: <TimelineIcon sx={{ fontSize: 40, color: '#40C4FF' }} />,
      features: [
        'Real-time symptom logging',
        'Customizable symptom categories',
        'Detailed symptom history',
        'Visual symptom trends'
      ]
    },
    {
      title: 'Health Analytics',
      description: 'Gain insights into your health patterns with advanced analytics.',
      icon: <AssessmentIcon sx={{ fontSize: 40, color: '#40C4FF' }} />,
      features: [
        'Comprehensive health reports',
        'Pattern recognition',
        'Progress tracking',
        'Exportable data'
      ]
    },
    {
      title: 'Smart Reminders',
      description: 'Never miss a medication or appointment with our smart reminder system.',
      icon: <NotificationsActiveIcon sx={{ fontSize: 40, color: '#40C4FF' }} />,
      features: [
        'Customizable reminders',
        'Multiple notification methods',
        'Recurring schedules',
        'Priority settings'
      ]
    },
    {
      title: 'Secure Sharing',
      description: 'Safely share your health data with healthcare providers and loved ones.',
      icon: <ShareIcon sx={{ fontSize: 40, color: '#40C4FF' }} />,
      features: [
        'Encrypted data sharing',
        'Selective access control',
        'Real-time updates',
        'Secure messaging'
      ]
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #121212 0%, #1a1a1a 100%)',
      color: 'rgba(255, 255, 255, 0.87)'
    }}>
      <LandingNav />
      <Box sx={{ flex: 1, py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h1"
            align="center"
            gutterBottom
            sx={{ 
              color: '#40C4FF', 
              mb: 6,
              textShadow: '0 0 20px rgba(64, 196, 255, 0.2)',
              fontWeight: 500
            }}
          >
            Features
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <FeatureSection key={index} {...feature} />
            ))}
          </Grid>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Features; 