import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Paper,
  Avatar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import PsychologyIcon from '@mui/icons-material/Psychology';
import LandingNav from '../components/LandingNav';
import Footer from '../components/Footer';

const MissionCard = ({ icon, title, description }) => (
  <Paper
    elevation={3}
    sx={{
      p: 4,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      transition: 'all 0.3s ease-in-out',
      background: 'linear-gradient(145deg, #1E293B, #0F172A)',
      border: '1px solid rgba(96, 165, 250, 0.1)',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 16px rgba(96, 165, 250, 0.2)',
        border: '1px solid rgba(96, 165, 250, 0.2)',
        background: 'linear-gradient(145deg, #1E293B, #1A1F2C)',
      }
    }}
  >
    <Avatar
      sx={{
        width: 80,
        height: 80,
        bgcolor: 'primary.main',
        mb: 2,
        boxShadow: '0 4px 8px rgba(96, 165, 250, 0.2)'
      }}
    >
      {icon}
    </Avatar>
    <Typography variant="h5" component="h3" gutterBottom sx={{ color: 'primary.light' }}>
      {title}
    </Typography>
    <Typography variant="body1" color="text.secondary">
      {description}
    </Typography>
  </Paper>
);

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const missions = [
    {
      icon: <MedicalServicesIcon sx={{ fontSize: 40 }} />,
      title: 'Empower Health Management',
      description: 'We believe in giving individuals the tools they need to take control of their health journey through comprehensive symptom tracking and analysis.'
    },
    {
      icon: <HealthAndSafetyIcon sx={{ fontSize: 40 }} />,
      title: 'Promote Preventive Care',
      description: 'Our platform encourages proactive health management by helping users identify patterns and trends in their symptoms before they become serious concerns.'
    },
    {
      icon: <PsychologyIcon sx={{ fontSize: 40 }} />,
      title: 'Enhance Doctor-Patient Communication',
      description: 'We facilitate better healthcare experiences by enabling users to share accurate, detailed health data with their healthcare providers.'
    }
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <LandingNav />
      <Box
        sx={{
          background: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
          color: 'white',
          py: 8,
          mb: 8,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at top right, rgba(96, 165, 250, 0.1), transparent 40%)',
            pointerEvents: 'none'
          }
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
          >
            About HealthNex
          </Typography>
          <Typography
            variant="h5"
            align="center"
            sx={{ maxWidth: 800, mx: 'auto', opacity: 0.9 }}
          >
            Empowering individuals to take control of their health through innovative tracking and analysis
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          {missions.map((mission, index) => (
            <Grid item xs={12} md={4} key={index}>
              <MissionCard {...mission} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box
        sx={{
          background: 'linear-gradient(145deg, #1E293B, #0F172A)',
          py: 8,
          color: 'white',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at center, rgba(96, 165, 250, 0.1), transparent 60%)',
            pointerEvents: 'none'
          }
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            sx={{ color: 'primary.light' }}
          >
            Our Story
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 4, opacity: 0.9 }}
          >
            HealthNex was born from a simple observation: managing health symptoms can be overwhelming and disorganized. 
            We created this platform to provide a comprehensive solution that makes health tracking simple, insightful, 
            and actionable. Our team of healthcare professionals, developers, and designers work together to ensure 
            that HealthNex remains at the forefront of health management technology.
          </Typography>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ mt: 4, color: 'primary.light' }}
          >
            Join us in revolutionizing personal health management
          </Typography>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default About;