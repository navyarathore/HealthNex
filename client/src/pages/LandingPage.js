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
  Chip
} from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import TimelineIcon from '@mui/icons-material/Timeline';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SecurityIcon from '@mui/icons-material/Security';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
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

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Chronic Illness Patient",
      content: "This platform has transformed how I manage my symptoms. The tracking features are intuitive and the visualizations help me understand my patterns better."
    },
    {
      name: "Michael Chen",
      role: "Healthcare Professional",
      content: "As a doctor, I recommend this tool to my patients. It helps them track their symptoms accurately and provides valuable data for our consultations."
    },
    {
      name: "Emma Rodriguez",
      role: "Caregiver",
      content: "Being able to track my mother's symptoms has made our healthcare journey much smoother. The reminders and reports are incredibly helpful."
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
                  Your Personal Health Companion
                </Typography>
                <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                  Monitor symptoms, track progress, and take control of your health journey with our intuitive platform
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
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
                </Box>
                <Box sx={{ mt: 4 }}>
                  <List sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {['Real-time tracking', 'Data visualization', 'Secure storage', 'Mobile friendly'].map((item) => (
                      <ListItem key={item} sx={{ width: 'auto', p: 0 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckCircleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
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
                            border: '1px solid rgba(96, 165, 250, 0.2)'
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      AI Diagnosis:
                    </Typography>
                    <Paper
                      sx={{
                        p: 2,
                        background: 'rgba(96, 165, 250, 0.05)',
                        border: '1px solid rgba(96, 165, 250, 0.1)'
                      }}
                    >
                      <Typography variant="body2" color="primary.light">
                        Based on your symptoms, there's a high probability of a common cold or flu. 
                        Consider resting and staying hydrated. If symptoms persist, consult a healthcare provider.
                      </Typography>
                    </Paper>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Recommended Actions:
                    </Typography>
                    <List dense>
                      {['Rest and hydration', 'Monitor temperature', 'Take over-the-counter medication', 'Consult doctor if symptoms worsen'].map((action) => (
                        <ListItem key={action} sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <CheckCircleIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                          </ListItemIcon>
                          <ListItemText primary={action} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Features Section */}
        <Container maxWidth="lg" sx={{ py: 12 }}>
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{ mb: 6, color: 'primary.main' }}
          >
            Why Choose Our Symptom Tracker?
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard
                icon={<MedicalServicesIcon sx={{ fontSize: 40, color: 'primary.main' }} />}
                title="Easy Tracking"
                description="Quickly log your symptoms and track their progression over time with our intuitive interface"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard
                icon={<TimelineIcon sx={{ fontSize: 40, color: 'primary.main' }} />}
                title="Visual Analytics"
                description="View your health data through intuitive charts and graphs to identify patterns and trends"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard
                icon={<NotificationsActiveIcon sx={{ fontSize: 40, color: 'primary.main' }} />}
                title="Smart Reminders"
                description="Set personalized reminders to track symptoms and medications at the right time"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard
                icon={<SecurityIcon sx={{ fontSize: 40, color: 'primary.main' }} />}
                title="Secure & Private"
                description="Your health data is encrypted and protected with enterprise-grade security"
              />
            </Grid>
          </Grid>
        </Container>

        {/* How It Works Section */}
        <Box sx={{ py: 12, bgcolor: 'background.paper' }}>
          <Container maxWidth="lg">
            <Typography variant="h3" align="center" gutterBottom sx={{ mb: 6, color: 'primary.main' }}>
              How It Works
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    background: 'linear-gradient(145deg, #1E293B, #0F172A)',
                    border: '1px solid rgba(96, 165, 250, 0.1)',
                  }}
                >
                  <Typography variant="h4" sx={{ color: 'primary.main', mb: 2 }}>1</Typography>
                  <Typography variant="h6" sx={{ mb: 2, color: 'primary.light' }}>Log Your Symptoms</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Record your symptoms, their severity, and duration using our simple tracking interface
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    background: 'linear-gradient(145deg, #1E293B, #0F172A)',
                    border: '1px solid rgba(96, 165, 250, 0.1)',
                  }}
                >
                  <Typography variant="h4" sx={{ color: 'primary.main', mb: 2 }}>2</Typography>
                  <Typography variant="h6" sx={{ mb: 2, color: 'primary.light' }}>AI Analysis</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Our advanced AI analyzes your symptom patterns and medical history to provide insights
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    background: 'linear-gradient(145deg, #1E293B, #0F172A)',
                    border: '1px solid rgba(96, 165, 250, 0.1)',
                  }}
                >
                  <Typography variant="h4" sx={{ color: 'primary.main', mb: 2 }}>3</Typography>
                  <Typography variant="h6" sx={{ mb: 2, color: 'primary.light' }}>Get Diagnoses</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Receive potential diagnoses and recommendations based on your symptom patterns
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Testimonials Section */}
        <Box sx={{ py: 12, bgcolor: 'background.default' }}>
          <Container maxWidth="lg">
            <Typography variant="h3" align="center" gutterBottom sx={{ mb: 6, color: 'primary.main' }}>
              What Our Users Say
            </Typography>
            <Grid container spacing={4}>
              {testimonials.map((testimonial, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <TestimonialCard
                    name={testimonial.name}
                    role={testimonial.role}
                    content={testimonial.content}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* CTA Section */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
            py: 8,
            textAlign: 'center',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at bottom left, rgba(144, 202, 249, 0.1), transparent 40%)',
              pointerEvents: 'none'
            }
          }}
        >
          <Container maxWidth="md">
            <Typography variant="h4" component="h2" gutterBottom>
              Ready to Take Control of Your Health?
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
              Join thousands of users who are already tracking their health journey
            </Typography>
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
              Start Tracking Now
            </Button>
          </Container>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default LandingPage; 