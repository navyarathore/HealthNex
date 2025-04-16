import React, { useState } from 'react';
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
  Stack,
  TextField,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Tooltip,
  Fade,
  Zoom,
  Grow,
  CircularProgress
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
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PersonIcon from '@mui/icons-material/Person';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import SpeedIcon from '@mui/icons-material/Speed';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import SendIcon from '@mui/icons-material/Send';

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
    <Box
      sx={{
        width: 64,
        height: 64,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 2,
        background: 'rgba(96, 165, 250, 0.1)',
        border: '1px solid rgba(96, 165, 250, 0.2)',
      }}
    >
      {icon}
    </Box>
    <Typography variant="h6" sx={{ mt: 2, mb: 1, color: 'primary.light' }}>
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {description}
    </Typography>
  </Paper>
);

const TestimonialCard = ({ name, role, content }) => (
  <Card 
    sx={{ 
      height: '100%', 
      background: 'linear-gradient(145deg, #1E293B, #0F172A)',
      border: '1px solid rgba(96, 165, 250, 0.1)',
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 16px rgba(96, 165, 250, 0.2)',
        border: '1px solid rgba(96, 165, 250, 0.2)',
      }
    }}
  >
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar 
          sx={{ 
            bgcolor: 'primary.main', 
            mr: 2,
            width: 56,
            height: 56,
            border: '2px solid rgba(96, 165, 250, 0.2)'
          }}
        >
          {name[0]}
        </Avatar>
        <Box>
          <Typography variant="subtitle1" color="primary.light" sx={{ fontWeight: 600 }}>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {role}
          </Typography>
        </Box>
      </Box>
      <Typography 
        variant="body1" 
        color="text.secondary"
        sx={{
          position: 'relative',
          pl: 2,
          '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 4,
            background: 'linear-gradient(to bottom, #60A5FA, #3B82F6)',
            borderRadius: 2
          }
        }}
      >
        {content}
      </Typography>
    </CardContent>
  </Card>
);

const InnovationCard = ({ icon, title, description, features }) => (
  <Card 
    sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      background: 'linear-gradient(145deg, #1E293B, #0F172A)',
      border: '1px solid rgba(96, 165, 250, 0.1)',
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 16px rgba(96, 165, 250, 0.2)',
        border: '1px solid rgba(96, 165, 250, 0.2)',
      }
    }}
  >
    <CardContent sx={{ flexGrow: 1, p: 3 }}>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mb: 3,
          '& svg': {
            fontSize: 48,
            color: 'primary.main'
          }
        }}
      >
        {icon}
      </Box>
      <Typography 
        variant="h5" 
        component="h3" 
        gutterBottom 
        align="center"
        sx={{ 
          color: 'primary.light',
          fontWeight: 600,
          mb: 2
        }}
      >
        {title}
      </Typography>
      <Typography 
        variant="body1" 
        color="text.secondary" 
        align="center"
        sx={{ lineHeight: 1.7, mb: 3 }}
      >
        {description}
      </Typography>
      <List dense>
        {features.map((feature, index) => (
          <ListItem key={index} sx={{ py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <CheckCircleIcon color="primary" fontSize="small" />
            </ListItemIcon>
            <ListItemText 
              primary={feature} 
              sx={{ 
                '& .MuiListItemText-primary': {
                  color: 'text.secondary',
                  fontSize: '0.9rem'
                }
              }}
            />
          </ListItem>
        ))}
      </List>
    </CardContent>
  </Card>
);

const StatsCard = ({ icon, value, label, color }) => (
  <Paper
    elevation={0}
    sx={{
      p: 3,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      backgroundColor: 'transparent',
      border: '1px solid rgba(96, 165, 250, 0.1)',
      borderRadius: 3,
      overflow: 'hidden',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '4px',
        background: `linear-gradient(90deg, ${color} 0%, rgba(96, 165, 250, 0.3) 100%)`,
      }
    }}
  >
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 1,
      }}
    >
      {icon}
    </Box>
    <Typography variant="h3" sx={{ fontWeight: 'bold', color: color }}>
      {value}
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
      {label}
    </Typography>
  </Paper>
);

const StepCard = ({ number, title, description }) => (
  <Paper
    elevation={0}
    sx={{
      p: 3,
      height: '100%',
      display: 'flex',
      background: 'linear-gradient(145deg, #1E293B, #0F172A)',
      borderRadius: 3,
      border: '1px solid rgba(96, 165, 250, 0.1)',
      position: 'relative',
      transition: 'all 0.3s ease',
      overflow: 'hidden',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
        border: '1px solid rgba(96, 165, 250, 0.3)',
      }
    }}
  >
    <Typography
      variant="h2"
      sx={{
        position: 'absolute',
        top: -20,
        left: -10,
        fontWeight: 800,
        fontSize: '8rem',
        opacity: 0.1,
        color: 'primary.main',
      }}
    >
      {number}
    </Typography>
    <Box sx={{ position: 'relative', zIndex: 1, pl: 1 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.light' }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Box>
  </Paper>
);

const FaqItem = ({ question, answer }) => {
  return (
    <Accordion
      sx={{
        background: 'linear-gradient(145deg, #1E293B, #0F172A)',
        border: '1px solid rgba(96, 165, 250, 0.1)',
        mb: 1.5,
        '&:before': {
          display: 'none',
        },
        '&:hover': {
          borderColor: 'rgba(96, 165, 250, 0.3)',
        }
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: 'primary.light' }} />}
        sx={{
          '& .MuiAccordionSummary-content': {
            alignItems: 'center'
          }
        }}
      >
        <Typography variant="subtitle1" sx={{ color: 'primary.light', fontWeight: 600 }}>
          {question}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {answer}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

  const handleSubscribe = () => {
    if (!email) return;
    
    setIsSubscribing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribing(false);
      setSubscriptionStatus('success');
      setEmail('');
      
      // Reset status after 3 seconds
      setTimeout(() => setSubscriptionStatus(null), 3000);
    }, 1500);
  };

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
      description: 'Our advanced AI system analyzes symptom patterns with unprecedented accuracy, providing personalized health insights and early detection capabilities.',
      features: [
        'Real-time symptom pattern recognition',
        'Predictive health analytics',
        'Personalized health recommendations',
        'Continuous learning and improvement'
      ]
    },
    {
      icon: <InsightsIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
      title: 'Smart Health Monitoring',
      description: 'Comprehensive health tracking system that monitors vital signs, activity levels, and wellness metrics to provide actionable insights.',
      features: [
        '24/7 health monitoring',
        'Smart alerts and notifications',
        'Trend analysis and reporting',
        'Integration with wearables'
      ]
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
      title: 'Advanced Data Security',
      description: 'Enterprise-grade security measures protecting your sensitive health data with state-of-the-art encryption and privacy controls.',
      features: [
        'End-to-end encryption',
        'IT Act & DISHA compliance',
        'Multi-factor authentication',
        'Regular security audits'
      ]
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

  const stats = [
    {
      icon: <PersonIcon sx={{ color: '#3B82F6', fontSize: 40 }} />,
      value: '100K+',
      label: 'Active Users',
      color: '#3B82F6'
    },
    {
      icon: <MedicalInformationIcon sx={{ color: '#10B981', fontSize: 40 }} />,
      value: '95%',
      label: 'Diagnostic Accuracy',
      color: '#10B981'
    },
    {
      icon: <SpeedIcon sx={{ color: '#F59E0B', fontSize: 40 }} />,
      value: '24/7',
      label: 'Health Monitoring',
      color: '#F59E0B'
    },
    {
      icon: <HealthAndSafetyIcon sx={{ color: '#EF4444', fontSize: 40 }} />,
      value: '50+',
      label: 'Health Metrics Tracked',
      color: '#EF4444'
    }
  ];

  const steps = [
    {
      number: '1',
      title: 'Create Your Profile',
      description: 'Set up your personal health profile with your medical history, allergies, and current conditions for tailored insights.'
    },
    {
      number: '2',
      title: 'Track Your Symptoms',
      description: 'Record your symptoms, their severity, duration, and other relevant health metrics for accurate analysis.'
    },
    {
      number: '3',
      title: 'Get AI Analysis',
      description: 'Our advanced AI analyzes your symptoms and health data to provide personalized health insights and recommendations.'
    },
    {
      number: '4',
      title: 'Monitor Your Progress',
      description: 'Track your health progress over time, identify patterns, and make informed decisions about your wellness journey.'
    }
  ];

  const faqs = [
    {
      question: 'How accurate is the AI diagnostic system?',
      answer: 'Our AI diagnostic system achieves over 95% accuracy in identifying common health conditions. Its continuously trained on the latest medical research and validated by healthcare professionals. However, it is designed to complement, not replace, professional medical advice.'
    },
    {
      question: 'Is my health data secure and private?',
      answer: 'Absolutely. We implement enterprise-grade security with end-to-end encryption for all your health data. We comply with the Information Technology Act and Digital Information Security in Healthcare Act (DISHA) guidelines, ensuring your medical data is protected according to Indian healthcare regulations. We never share your personal information with third parties without your explicit consent.'
    },
    {
      question: 'Can I manually track my health data?',
      answer: 'Yes! HealthNex provides a simple and intuitive interface for manually tracking your symptoms, medications, and other health metrics. Our goal is to make health tracking as straightforward as possible so you can focus on your wellness journey.'
    },
    {
      question: 'How often should I track my symptoms?',
      answer: 'For optimal results, we recommend tracking your symptoms daily or whenever they occur. The more consistent your tracking, the more accurate and personalized your health insights will be.'
    }
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <LandingNav />
      <Box sx={{ flex: 1 }}>
        {/* Hero Section - Enhanced with animations */}
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
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -20,
              left: 0,
              right: 0,
              height: '120px',
              background: 'linear-gradient(to top, #0F172A, transparent)',
              zIndex: 1
            }
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Fade in={true} timeout={1000}>
                  <Box>
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
                        color="primary"
                        size="large"
                        onClick={() => navigate('/register')}
                        sx={{
                          px: 4,
                          py: 1.5,
                          fontWeight: 'bold',
                          borderRadius: 2,
                          background: 'rgba(255, 255, 255, 0.9)',
                          color: '#1E40AF',
                          '&:hover': {
                            background: 'white',
                            transform: 'translateY(-2px)',
                          },
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                        }}
                      >
                        Get Started Free
                      </Button>
                      <Button
                        variant="outlined"
                        color="inherit"
                        size="large"
                        onClick={() => navigate('/login')}
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                          px: 4,
                          py: 1.5,
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                          '&:hover': {
                            borderColor: 'white',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            transform: 'translateY(-2px)',
                          }
                        }}
                      >
                        Sign In
                      </Button>
                    </Stack>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <VerifiedUserIcon sx={{ color: 'rgba(255, 255, 255, 0.9)', mr: 1, fontSize: 20 }} />
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Indian IT Act & DISHA Compliant
                      </Typography>
                    </Box>
                  </Box>
                </Fade>
              </Grid>
              <Grid item xs={12} md={6}>
                <Zoom in={true} timeout={1000} style={{ transitionDelay: '300ms' }}>
                  <Box
                    sx={{
                      p: 4,
                      background: 'linear-gradient(145deg, #1E293B, #0F172A)',
                      borderRadius: 3,
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(96, 165, 250, 0.1)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: 'linear-gradient(90deg, #3B82F6, #60A5FA)',
                      }
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 2, 
                        color: 'primary.light',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}
                    >
                      <MedicalServicesIcon fontSize="small" /> AI Symptom Analysis
                    </Typography>
                    
                    {/* Severity Meter */}
                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Severity Level:
                        </Typography>
                        <Typography variant="body2" color="warning.main" fontWeight="500">
                          Moderate
                        </Typography>
                      </Box>
                      <Box sx={{ width: '100%', height: 8, borderRadius: 4, bgcolor: 'rgba(96, 165, 250, 0.1)', overflow: 'hidden' }}>
                        <Box sx={{ width: '60%', height: '100%', background: 'linear-gradient(90deg, #3B82F6, #F59E0B)' }}></Box>
                      </Box>
                    </Box>
                    
                    {/* Symptoms Section with Animation */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <TimelineIcon fontSize="small" /> Recent Symptoms:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {['Headache', 'Fatigue', 'Fever', 'Cough', 'Sore Throat'].map((symptom, index) => (
                          <Grow
                            in={true}
                            timeout={1000}
                            style={{ transformOrigin: '0 0 0', transitionDelay: `${index * 100}ms` }}
                            key={symptom}
                          >
                            <Chip
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
                          </Grow>
                        ))}
                      </Box>
                    </Box>
                    
                    {/* Duration and Pattern Analysis */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <InsightsIcon fontSize="small" /> Symptom Pattern:
                      </Typography>
                      <Box sx={{ 
                        p: 1.5, 
                        background: 'rgba(96, 165, 250, 0.03)',
                        borderRadius: 1,
                        border: '1px solid rgba(96, 165, 250, 0.05)'
                      }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="caption" color="text.secondary">Duration:</Typography>
                          <Typography variant="caption" color="primary.light">3 days</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="caption" color="text.secondary">Pattern:</Typography>
                          <Typography variant="caption" color="primary.light">Progressive</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="caption" color="text.secondary">Recurrence:</Typography>
                          <Typography variant="caption" color="primary.light">First occurrence</Typography>
                        </Box>
                      </Box>
                    </Box>

                    {/* Analysis Results with enhanced styling */}
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <PsychologyIcon fontSize="small" /> Analysis Results:
                      </Typography>
                      <Box sx={{ 
                        p: 2, 
                        background: 'linear-gradient(145deg, rgba(96, 165, 250, 0.05), rgba(59, 130, 246, 0.1))',
                        borderRadius: 2,
                        border: '1px solid rgba(96, 165, 250, 0.1)',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <Typography variant="body2" color="primary.light" fontWeight="500">
                          Based on your symptoms, our AI suggests:
                        </Typography>
                        
                        <List dense sx={{ mt: 1 }}>
                          <ListItem>
                            <ListItemIcon>
                              <CheckCircleIcon color="primary" fontSize="small" />
                            </ListItemIcon>
                            <ListItemText 
                              primary="Possible viral infection (89% confidence)" 
                              secondary="Common cold or mild influenza"
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <CheckCircleIcon color="primary" fontSize="small" />
                            </ListItemIcon>
                            <ListItemText 
                              primary="Recommended rest and hydration" 
                              secondary="Limit physical exertion for 2-3 days"
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <NotificationsActiveIcon color="warning" fontSize="small" />
                            </ListItemIcon>
                            <ListItemText 
                              primary="Consider medical consultation" 
                              secondary="If fever persists beyond 3 days"
                            />
                          </ListItem>
                        </List>
                        
                        <Box
                          sx={{
                            position: 'absolute',
                            top: -30,
                            right: -30,
                            width: 100,
                            height: 100,
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(96, 165, 250, 0.1), transparent 70%)',
                            pointerEvents: 'none'
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Zoom>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Stats Section - New */}
        <Box sx={{ py: 6, background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 100%)' }}>
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              {stats.map((stat, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <StatsCard {...stat} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* How It Works Section - New */}
        <Box sx={{ py: 8, background: 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)' }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Fade in={true} timeout={1000}>
                <Typography
                  variant="h3"
                  component="h2"
                  sx={{ 
                    fontWeight: 800,
                    color: 'primary.light',
                    position: 'relative',
                    display: 'inline-block',
                    mb: 2,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: -8,
                      left: -8,
                      right: -8,
                      bottom: -8,
                      background: 'rgba(96, 165, 250, 0.1)',
                      borderRadius: '50%',
                      zIndex: -1
                    }
                  }}
                >
                  How It Works
                </Typography>
              </Fade>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ 
                  maxWidth: '700px',
                  mx: 'auto',
                  lineHeight: 1.6
                }}
              >
                Get started with HealthNex in just a few simple steps and take control of your health journey
              </Typography>
            </Box>
            <Grid container spacing={4}>
              {steps.map((step, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <StepCard {...step} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Features Section */}
        <Box sx={{ py: 8, background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 100%)' }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography
                variant="h3"
                component="h2"
                sx={{ 
                  fontWeight: 800,
                  color: 'primary.light',
                  position: 'relative',
                  display: 'inline-block',
                  mb: 2,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -8,
                    left: -8,
                    right: -8,
                    bottom: -8,
                    background: 'rgba(96, 165, 250, 0.1)',
                    borderRadius: '50%',
                    zIndex: -1
                  }
                }}
              >
                Features
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ 
                  maxWidth: '600px',
                  mx: 'auto',
                  lineHeight: 1.6
                }}
              >
                Discover the powerful features that make HealthNex your ultimate health companion
              </Typography>
            </Box>
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <FeatureCard {...feature} />
                </Grid>
              ))}
            </Grid>
            <Box sx={{ mt: 6, textAlign: 'center' }}>
              <Button 
                variant="outlined" 
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/features')}
                sx={{
                  borderColor: 'primary.main',
                  color: 'primary.light',
                  px: 4,
                  py: 1.2,
                  borderRadius: 2,
                  '&:hover': {
                    borderColor: 'primary.light',
                    background: 'rgba(96, 165, 250, 0.05)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Explore All Features
              </Button>
            </Box>
          </Container>
        </Box>

        {/* Innovations Section */}
        <Box sx={{ py: 8, background: 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)' }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography 
                variant="h3" 
                component="h2"
                sx={{ 
                  fontWeight: 800,
                  color: 'primary.light',
                  position: 'relative',
                  display: 'inline-block',
                  mb: 2,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -8,
                    left: -8,
                    right: -8,
                    bottom: -8,
                    background: 'rgba(96, 165, 250, 0.1)',
                    borderRadius: '50%',
                    zIndex: -1
                  }
                }}
              >
                Our Innovations
              </Typography>
              <Typography 
                variant="h6" 
                color="text.secondary"
                sx={{ 
                  maxWidth: '600px',
                  mx: 'auto',
                  lineHeight: 1.6
                }}
              >
                Revolutionizing healthcare through cutting-edge technology and AI
              </Typography>
            </Box>
            <Grid container spacing={4} justifyContent="center">
              {innovations.map((innovation, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <InnovationCard {...innovation} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* FAQ Section - New */}
        <Box sx={{ py: 8, background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 100%)' }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography
                variant="h3"
                component="h2"
                sx={{ 
                  fontWeight: 800,
                  color: 'primary.light',
                  position: 'relative',
                  display: 'inline-block',
                  mb: 2,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -8,
                    left: -8,
                    right: -8,
                    bottom: -8,
                    background: 'rgba(96, 165, 250, 0.1)',
                    borderRadius: '50%',
                    zIndex: -1
                  }
                }}
              >
                Frequently Asked Questions
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ 
                  maxWidth: '700px',
                  mx: 'auto',
                  lineHeight: 1.6
                }}
              >
                Find answers to commonly asked questions about HealthNex
              </Typography>
            </Box>
            
            <Grid container spacing={4}>
              <Grid item xs={12}>
                {faqs.map((faq, index) => (
                  <FaqItem key={index} question={faq.question} answer={faq.answer} />
                ))}
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Newsletter Section - New
        <Box
          sx={{
            py: 8,
            background: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at bottom left, rgba(96, 165, 250, 0.1), transparent 40%)',
              pointerEvents: 'none'
            }
          }}
        >
          <Container maxWidth="md">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={7}>
                <Typography
                  variant="h3"
                  component="h2"
                  sx={{ 
                    fontWeight: 800,
                    color: 'white',
                    mb: 2,
                  }}
                >
                  Stay Updated
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.9)',
                    mb: 3,
                    lineHeight: 1.6
                  }}
                >
                  Subscribe to our newsletter for the latest health insights, tips, and feature updates.
                </Typography>
              </Grid>
              <Grid item xs={12} md={5}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 1
                  }}
                >
                  <TextField
                    fullWidth
                    placeholder="Enter your email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubscribing || subscriptionStatus === 'success'}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: 2,
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'white',
                        },
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    disabled={!email || isSubscribing || subscriptionStatus === 'success'}
                    onClick={handleSubscribe}
                    startIcon={
                      isSubscribing ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : subscriptionStatus === 'success' ? (
                        <CheckCircleIcon />
                      ) : (
                        <SendIcon />
                      )
                    }
                    sx={{
                      py: isMobile ? 1.5 : 2,
                      px: 3,
                      bgcolor: 'white',
                      color: 'primary.main',
                      fontWeight: 'bold',
                      borderRadius: 2,
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        transform: 'translateY(-2px)',
                      },
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {isSubscribing
                      ? 'Subscribing...'
                      : subscriptionStatus === 'success'
                      ? 'Subscribed!'
                      : 'Subscribe'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box> */}

        {/* Testimonials Section */}
        <Box sx={{ py: 8, background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 100%)' }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography
                variant="h3"
                component="h2"
                sx={{ 
                  fontWeight: 800,
                  color: 'primary.light',
                  position: 'relative',
                  display: 'inline-block',
                  mb: 2,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -8,
                    left: -8,
                    right: -8,
                    bottom: -8,
                    background: 'rgba(96, 165, 250, 0.1)',
                    borderRadius: '50%',
                    zIndex: -1
                  }
                }}
              >
                What Our Users Say
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ 
                  maxWidth: '600px',
                  mx: 'auto',
                  lineHeight: 1.6
                }}
              >
                Hear from our community of health-conscious individuals and professionals
              </Typography>
            </Box>
            <Grid container spacing={4}>
              {testimonials.map((testimonial, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <TestimonialCard {...testimonial} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* CTA Section - Final call to action */}
        <Box
          sx={{
            py: 10,
            background: 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.3), transparent)',
            },
          }}
        >
          <Container maxWidth="md">
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h3"
                component="h2"
                sx={{ 
                  fontWeight: 800,
                  color: 'primary.light',
                  mb: 2,
                }}
              >
                Ready to Take Control of Your Health?
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ 
                  maxWidth: '700px',
                  mx: 'auto',
                  mb: 4,
                  lineHeight: 1.6
                }}
              >
                Join thousands of users who are experiencing better health outcomes with HealthNex's AI-powered health assistant.
              </Typography>
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={() => navigate('/register')}
                sx={{
                  px: 5,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  borderRadius: 2,
                  boxShadow: '0 10px 25px rgba(59, 130, 246, 0.5)',
                  background: 'linear-gradient(90deg, #3B82F6, #2563EB)',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #2563EB, #1D4ED8)',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 15px 30px rgba(59, 130, 246, 0.6)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Get Started for Free
              </Button>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 2 }}>
                No credit card required • Free sign-up • Cancel anytime
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default LandingPage;