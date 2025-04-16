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
  useMediaQuery,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Card,
  CardContent,
  CardMedia,
  Fade
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Timeline as TimelineIcon,
  NotificationsActive as NotificationsActiveIcon,
  Assessment as AssessmentIcon,
  Share as ShareIcon,
  Security as SecurityIcon,
  DevicesOther as DevicesOtherIcon,
  Psychology as PsychologyIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
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
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
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
            transform: 'translateY(-5px)',
            border: '1px solid rgba(64, 196, 255, 0.15)',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.25), 0 0 15px rgba(64, 196, 255, 0.1)'
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {icon}
          <Typography variant="h5" component="h3" sx={{ ml: 2, color: '#40C4FF', fontWeight: 600 }}>
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

const DetailedFeatureSection = ({ title, description, image, reverse }) => {
  return (
    <Box 
      sx={{ 
        py: 8,
        background: reverse ? 'linear-gradient(145deg, rgba(26,26,26,0.7), rgba(18,18,18,0.7))' : 'transparent',
        borderRadius: reverse ? 2 : 0
      }}
    >
      <Container>
        <Grid 
          container 
          spacing={4} 
          alignItems="center"
          direction={reverse ? 'row-reverse' : 'row'}
        >
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h4" component="h2" sx={{ color: '#40C4FF', mb: 2, fontWeight: 600 }}>
                {title}
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: 'rgba(255, 255, 255, 0.87)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                {description}
              </Typography>
              <Button 
                variant="outlined" 
                component={RouterLink} 
                to="/signup" 
                endIcon={<ArrowForwardIcon />}
                sx={{ 
                  borderColor: '#40C4FF', 
                  color: '#40C4FF',
                  '&:hover': {
                    backgroundColor: 'rgba(64, 196, 255, 0.08)',
                    borderColor: '#40C4FF'
                  }
                }}
              >
                Try it now
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              bgcolor: 'transparent', 
              boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 3,
              overflow: 'hidden',
              height: '100%'
            }}>
              <CardMedia
                component="img"
                image={image || `https://via.placeholder.com/500x300?text=${title}`}
                alt={title}
                height={300}
                sx={{
                  objectFit: 'cover',
                }}
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const ComparisonTable = () => {
  return (
    <TableContainer component={Paper} sx={{ 
      my: 8,
      background: 'rgba(26, 26, 26, 0.7)',
      borderRadius: 3,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
    }}>
      <Table>
        <TableHead sx={{ bgcolor: 'rgba(0, 0, 0, 0.2)' }}>
          <TableRow>
            <TableCell sx={{ color: 'rgba(255, 255, 255, 0.87)', fontWeight: 600, fontSize: '1.1rem' }}>Features</TableCell>
            <TableCell align="center" sx={{ color: '#40C4FF', fontWeight: 600, fontSize: '1.1rem' }}>HealthNex</TableCell>
            <TableCell align="center" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontWeight: 600, fontSize: '1.1rem' }}>Other Solutions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[
            { feature: 'AI-Powered Diagnostics', healthnex: true, others: false },
            { feature: 'Comprehensive Health Analytics', healthnex: true, others: true },
            { feature: 'Personalized Health Insights', healthnex: true, others: false },
            { feature: 'Real-time Symptom Tracking', healthnex: true, others: true },
            { feature: 'Secure Data Encryption', healthnex: true, others: true },
            { feature: 'Healthcare Provider Integration', healthnex: true, others: false },
            { feature: 'Custom Health Reports', healthnex: true, others: false },
          ].map((row, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row" sx={{ color: 'rgba(255, 255, 255, 0.87)' }}>
                {row.feature}
              </TableCell>
              <TableCell align="center" sx={{ color: '#40C4FF' }}>
                {row.healthnex ? <CheckIcon color="inherit" /> : <CloseIcon color="error" />}
              </TableCell>
              <TableCell align="center" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                {row.others ? <CheckIcon color="inherit" /> : <CloseIcon color="error" />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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
    },
    {
      title: 'Data Security',
      description: 'Your health data is protected with enterprise-grade encryption and security protocols.',
      icon: <SecurityIcon sx={{ fontSize: 40, color: '#40C4FF' }} />,
      features: [
        'End-to-end encryption',
        'IT Act & DISHA compliance',
        'Granular privacy controls',
        'Regular security audits'
      ]
    },
    {
      title: 'AI Health Insights',
      description: 'Leverage artificial intelligence to get personalized health recommendations and insights.',
      icon: <PsychologyIcon sx={{ fontSize: 40, color: '#40C4FF' }} />,
      features: [
        'Personalized health suggestions',
        'Risk assessment',
        'Lifestyle optimization',
        'Trend analysis'
      ]
    }
  ];

  const detailedFeatures = [
    {
      title: 'AI-Powered Health Analysis',
      description: 'Our advanced AI algorithms analyze your symptoms, vital metrics, and health history to provide personalized insights and recommendations. The system continuously learns from your data to improve accuracy over time, helping you make informed decisions about your health and wellbeing.',
      image: '/health-tracking.svg',
    },
    {
      title: 'User-Friendly Health Tracking',
      description: 'Our intuitive interface makes it simple to record and monitor your health data. The easy-to-use dashboard provides clear visualizations of your health metrics, helping you spot trends and patterns in your wellbeing over time without any technical complexity.',
      image: '/health-tracking.svg',
      reverse: true
    },
    {
      title: 'Healthcare Provider Integration',
      description: 'Bridge the gap between self-monitoring and professional healthcare with our seamless provider integration. Share detailed health reports directly with your doctors, receive feedback within the app, and maintain a continuous dialogue about your health without switching between different platforms.',
      image: '/health-tracking.svg',
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #121212 0%, #1a1a1a 100%)',
      color: 'rgba(255, 255, 255, 0.87)'
    }}>
      <LandingNav />
      
      {/* Hero Section */}
      <Box sx={{
        position: 'relative',
        py: { xs: 10, md: 15 },
        textAlign: 'center',
        background: 'linear-gradient(180deg, rgba(18,18,18,0.7) 0%, rgba(26,26,26,0.7) 100%)',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url(/health-tracking.svg) center center no-repeat',
          backgroundSize: 'cover',
          opacity: 0.1,
          zIndex: -1,
        }
      }}>
        <Container maxWidth="md">
          <Fade in={true} timeout={1000}>
            <Box>
              <Typography
                variant="h2"
                component="h1"
                sx={{ 
                  color: '#FFFFFF', 
                  mb: 3,
                  fontWeight: 700,
                  textShadow: '0 0 30px rgba(64, 196, 255, 0.3)',
                }}
              >
                Powerful Features for <Box component="span" sx={{ color: '#40C4FF' }}>Better Health</Box>
              </Typography>
              <Typography
                variant="h5"
                component="h2"
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.7)', 
                  mb: 6, 
                  px: { xs: 2, md: 10 },
                  fontWeight: 400,
                  lineHeight: 1.5
                }}
              >
                Discover the comprehensive tools designed to help you monitor, understand, and optimize your health journey
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                {['AI Analytics', 'Health Tracking', 'Secure Sharing', 'Smart Reminders', 'Provider Integration'].map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    sx={{
                      bgcolor: 'rgba(64, 196, 255, 0.1)',
                      color: '#40C4FF',
                      border: '1px solid rgba(64, 196, 255, 0.2)',
                      '&:hover': {
                        bgcolor: 'rgba(64, 196, 255, 0.15)',
                      }
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Features Grid */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{ 
              color: '#40C4FF', 
              mb: 2,
              textShadow: '0 0 20px rgba(64, 196, 255, 0.2)',
              fontWeight: 600
            }}
          >
            Core Features
          </Typography>
          
          <Typography
            variant="h6"
            component="p"
            align="center"
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)', 
              mb: 6,
              maxWidth: '800px',
              mx: 'auto'
            }}
          >
            HealthNex combines cutting-edge technology with user-friendly design to deliver a comprehensive health management experience
          </Typography>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <FeatureSection key={index} {...feature} />
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Detailed Feature Sections */}
      <Box sx={{ py: 4, mt: 4 }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ 
            color: '#40C4FF', 
            mb: 6,
            textShadow: '0 0 20px rgba(64, 196, 255, 0.2)',
            fontWeight: 600
          }}
        >
          Spotlight Features
        </Typography>
        
        {detailedFeatures.map((feature, index) => (
          <DetailedFeatureSection key={index} {...feature} />
        ))}
      </Box>

      {/* Comparison Section */}
      <Box sx={{ py: 6, mt: 2 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{ 
              color: '#40C4FF', 
              mb: 2,
              textShadow: '0 0 20px rgba(64, 196, 255, 0.2)',
              fontWeight: 600
            }}
          >
            Why Choose HealthNex?
          </Typography>
          
          <Typography
            variant="h6"
            component="p"
            align="center"
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)', 
              mb: 6,
              maxWidth: '800px',
              mx: 'auto'
            }}
          >
            See how HealthNex compares to other health tracking solutions in the market
          </Typography>
          
          <ComparisonTable />
        </Container>
      </Box>

      {/* Call to Action */}
      <Box 
        sx={{ 
          py: 10, 
          background: 'linear-gradient(145deg, rgba(0,0,0,0.7), rgba(0,0,0,0.9))',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at center, rgba(64, 196, 255, 0.05), transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0
          },
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Box textAlign="center">
            <Typography variant="h3" component="h2" sx={{ color: '#FFFFFF', mb: 3, fontWeight: 700 }}>
              Ready to Transform Your Health Journey?
            </Typography>
            <Typography variant="h6" component="p" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 5, maxWidth: '800px', mx: 'auto' }}>
              Join thousands of users who are taking control of their health with HealthNex's powerful features
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                size="large"
                component={RouterLink}
                to="/signup"
                sx={{ 
                  bgcolor: '#40C4FF',
                  color: '#000',
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: '#00b0ff',
                  }
                }}
              >
                Get Started for Free
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                component={RouterLink}
                to="/about"
                sx={{ 
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  color: '#FFFFFF',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    borderColor: '#FFFFFF',
                    bgcolor: 'rgba(255, 255, 255, 0.05)'
                  }
                }}
              >
                Learn More
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default Features;