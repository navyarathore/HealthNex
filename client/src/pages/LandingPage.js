import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Stack
} from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import TimelineIcon from '@mui/icons-material/Timeline';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SecurityIcon from '@mui/icons-material/Security';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PsychologyIcon from '@mui/icons-material/Psychology';
import InsightsIcon from '@mui/icons-material/Insights';
import PatternIcon from '@mui/icons-material/Pattern';
import LandingNav from '../components/LandingNav';
import Footer from '../components/Footer';

const FeatureCard = ({ icon, title, description }) => (
  <Paper
    elevation={3}
    sx={{
      p: 3,
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
    {icon}
    <Typography variant="h6" sx={{ mt: 2, mb: 1, color: 'primary.light' }}>
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {description}
    </Typography>
  </Paper>
);

const TestimonialCard = ({ name, role, content }) => (
  <Card sx={{ height: '100%', background: 'rgba(255, 255, 255, 0.05)' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>{name[0]}</Avatar>
        <Box>
          <Typography variant="subtitle1" color="primary.light">{name}</Typography>
          <Typography variant="body2" color="text.secondary">{role}</Typography>
        </Box>
      </Box>
      <Typography variant="body1" color="text.secondary">{content}</Typography>
    </CardContent>
  </Card>
);

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

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
      icon: <SecurityIcon sx={{ color: 'success.main', fontSize: 32 }} />,
      title: 'Enterprise-Grade Security',
      description: 'Your health data is protected with advanced encryption and security measures.'
    },
    {
      icon: <PatternIcon sx={{ color: 'warning.main', fontSize: 32 }} />,
      title: 'Symptom Pattern Analysis',
      description: 'Track and analyze symptom patterns over time for more accurate diagnosis.'
    }
  ];

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
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <LandingNav />
      <Box sx={{ flex: 1 }}>
        {/* Hero Section */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
            color: 'white',
            py: 12,
            position: 'relative',
            overflow: 'hidden',
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
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h2"
                  component="h1"
                  gutterBottom
                  sx={{ fontWeight: 'bold', fontSize: isMobile ? '2.5rem' : '3.5rem' }}
                >
                  Your Personal Health Assistant
                </Typography>
                <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                  AI-powered health tracking and diagnosis for a healthier you
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => navigate('/register')}
                    sx={{
                      boxShadow: '0 4px 14px rgba(244, 143, 177, 0.3)',
                      '&:hover': {
                        boxShadow: '0 6px 20px rgba(244, 143, 177, 0.4)'
                      }
                    }}
                  >
                    Get Started Free
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    size="large"
                    onClick={() => navigate('/login')}
                    sx={{
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                      }
                    }}
                  >
                    Sign In
                  </Button>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    p: 4,
                    background: 'linear-gradient(145deg, #1E293B, #0F172A)',
                    borderRadius: 2,
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(96, 165, 250, 0.1)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2, color: 'primary.light' }}>
                    AI Symptom Analysis
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Recent Symptoms:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {['Headache', 'Fatigue', 'Fever', 'Cough'].map((symptom) => (
                        <Chip
                          key={symptom}
                          label={symptom}
                          size="small"
                          sx={{
                            background: 'rgba(96, 165, 250, 0.1)',
                            color: 'primary.light',
                            border: '1px solid rgba(96, 165, 250, 0.2)',
                            '&:hover': {
                              background: 'rgba(96, 165, 250, 0.2)',
                              transform: 'translateY(-1px)',
                              transition: 'all 0.2s ease-in-out'
                            }
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Analysis Results:
                    </Typography>
                    <Box sx={{ 
                      p: 2, 
                      background: 'rgba(96, 165, 250, 0.05)',
                      borderRadius: 1,
                      border: '1px solid rgba(96, 165, 250, 0.1)'
                    }}>
                      <Typography variant="body2" color="primary.light">
                        Based on your symptoms, our AI suggests:
                      </Typography>
                      <List dense>
                        <ListItem>
                          <ListItemIcon>
                            <CheckCircleIcon color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Possible viral infection" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <CheckCircleIcon color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Recommended rest and hydration" />
                        </ListItem>
                      </List>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Features Section */}
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

        {/* Innovations Section */}
        <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
          <Container maxWidth="lg">
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
          </Container>
        </Box>

        {/* Testimonials Section */}
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
      </Box>
      <Footer />
    </Box>
  );
};

export default LandingPage; 