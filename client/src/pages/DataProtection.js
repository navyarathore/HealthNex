import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Fade,
  Chip,
  Grid,
  Breadcrumbs,
  Link,
  useTheme,
  Tabs,
  Tab,
  Button,
  Card,
  CardContent,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from '@mui/lab';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import ShieldIcon from '@mui/icons-material/Shield';
import LockIcon from '@mui/icons-material/Lock';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import GppGoodIcon from '@mui/icons-material/GppGood';
import StorageIcon from '@mui/icons-material/Storage';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PolicyIcon from '@mui/icons-material/Policy';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PhishingIcon from '@mui/icons-material/Phishing';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InfoIcon from '@mui/icons-material/Info';
import SecurityIcon from '@mui/icons-material/Security';
import Layout from '../components/Layout';

const DataProtection = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  
  // Last updated date
  const lastUpdated = "April 25, 2025";

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Capture scroll position for animation effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Tab sections
  const sections = [
    { label: "Overview", href: "#overview" },
    { label: "GDPR Compliance", href: "#gdpr" },
    { label: "Data Processing", href: "#processing" },
    { label: "Data Security", href: "#security" },
    { label: "Data Retention", href: "#retention" },
    { label: "Data Rights", href: "#rights" },
    { label: "Third Parties", href: "#third-parties" },
    { label: "Contact", href: "#contact" }
  ];

  // Data Principles
  const dataPrinciples = [
    {
      title: "Lawfulness, Fairness, and Transparency",
      icon: <FactCheckIcon />,
      description: "We process your data lawfully, fairly, and in a transparent manner."
    },
    {
      title: "Purpose Limitation",
      icon: <GppGoodIcon />,
      description: "We collect data for specified, explicit, and legitimate purposes."
    },
    {
      title: "Data Minimization",
      icon: <StorageIcon />,
      description: "We limit our data collection to what is necessary for the purposes for which it is processed."
    },
    {
      title: "Accuracy",
      icon: <VerifiedUserIcon />,
      description: "We ensure personal data is accurate and kept up-to-date."
    },
    {
      title: "Storage Limitation",
      icon: <DeleteForeverIcon />,
      description: "We keep data for no longer than necessary for the purposes for which it is processed."
    },
    {
      title: "Security",
      icon: <LockIcon />,
      description: "We process data securely using appropriate technical and organizational measures."
    }
  ];

  return (
    <Layout>
      <Box 
        sx={{ 
          bgcolor: 'background.default',
          position: 'relative',
          overflow: 'hidden',
          pt: 0,
          minHeight: '100vh'
        }}
      >
        {/* Hero Header */}
        <Box 
          sx={{
            position: 'relative',
            background: 'linear-gradient(135deg, rgba(43, 108, 176, 0.95) 0%, rgba(59, 130, 246, 0.9) 100%)',
            pt: 8,
            pb: 6,
            mb: 6,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.15), transparent 500px)',
              zIndex: 1
            }
          }}
        >
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
            <Box sx={{ mb: 2 }}>
              <Breadcrumbs 
                separator={<NavigateNextIcon fontSize="small" sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />}
                aria-label="breadcrumb"
                sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
              >
                <Link
                  underline="hover"
                  sx={{ display: 'flex', alignItems: 'center', color: 'rgba(255, 255, 255, 0.9)' }}
                  href="/"
                >
                  <HomeIcon sx={{ mr: 0.5, fontSize: 18 }} />
                  Home
                </Link>
                <Link
                  underline="hover"
                  sx={{ color: 'rgba(255, 255, 255, 0.9)' }}
                  href="/legal"
                >
                  Legal
                </Link>
                <Typography color="rgba(255, 255, 255, 0.9)">Data Protection</Typography>
              </Breadcrumbs>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <ShieldIcon sx={{ fontSize: 36, mr: 2, color: 'white' }} />
              <Fade in={true} timeout={1000}>
                <Typography 
                  variant="h2" 
                  component="h1" 
                  sx={{ 
                    fontWeight: 700,
                    color: 'white',
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  Data Protection Policy
                </Typography>
              </Fade>
            </Box>
            
            <Fade in={true} timeout={1500}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  Last Updated:
                </Typography>
                <Chip 
                  label={lastUpdated} 
                  size="small" 
                  sx={{ 
                    ml: 1, 
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    color: 'white',
                    fontWeight: 500
                  }} 
                />
              </Box>
            </Fade>
            
            <Fade in={true} timeout={2000}>
              <Typography 
                variant="h6" 
                sx={{ 
                  maxWidth: '800px',
                  mb: 4,
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 400,
                  lineHeight: 1.6
                }}
              >
                At HealthNex, we are committed to protecting your personal data. This policy outlines how we collect, process, 
                and safeguard your information in compliance with global data protection standards.
              </Typography>
            </Fade>
            
            {/* Navigation Tabs */}
            <Fade in={true} timeout={2500}>
              <Box 
                sx={{ 
                  bgcolor: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: 2,
                  p: 0.5,
                  mt: 3,
                  overflowX: 'auto',
                  maxWidth: { xs: '100%', md: '800px' }
                }}
              >
                <Tabs 
                  value={activeTab} 
                  onChange={handleTabChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  allowScrollButtonsMobile
                  sx={{ 
                    minHeight: '48px',
                    '& .MuiTab-root': {
                      minHeight: '40px',
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '0.9rem',
                      textTransform: 'none',
                      fontWeight: 500,
                      mx: 0.5,
                      '&.Mui-selected': {
                        color: 'white'
                      }
                    },
                    '& .MuiTabs-indicator': {
                      backgroundColor: 'white',
                      height: 3,
                      borderRadius: '3px 3px 0 0'
                    }
                  }}
                >
                  {sections.map((section, index) => (
                    <Tab 
                      key={index} 
                      label={section.label}
                      onClick={() => {
                        const element = document.querySelector(section.href);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    />
                  ))}
                </Tabs>
              </Box>
            </Fade>
          </Container>
        </Box>
        
        <Container maxWidth="lg" sx={{ mb: 8 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: { xs: 3, md: 5 }, 
                  borderRadius: 3,
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '5px',
                    background: 'linear-gradient(90deg, #3B82F6, #60A5FA)',
                    zIndex: 1
                  }
                }}
              >
                <Box id="overview" sx={{ scrollMarginTop: '100px' }}>
                  <Typography variant="body1" paragraph>
                    This Data Protection Policy details how HealthNex collects, uses, and protects your personal information. 
                    We are committed to ensuring that your privacy is protected. We comply with all applicable data protection 
                    laws, including the General Data Protection Regulation (GDPR) and other regional privacy laws.
                  </Typography>
                  
                  <Card sx={{ 
                    mt: 3, 
                    mb: 4, 
                    borderRadius: 2, 
                    bgcolor: 'rgba(59, 130, 246, 0.08)', 
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    boxShadow: 'none'
                  }}>
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                        Our Data Protection Commitment
                      </Typography>
                      <Typography variant="body2">
                        As a health technology platform, we understand the sensitive nature of health data. 
                        We implement robust security measures and follow data minimization principles to provide 
                        you with control over your information while ensuring your data is protected.
                      </Typography>
                    </CardContent>
                  </Card>
                  
                  {/* Core Data Protection Principles */}
                  <Typography variant="h5" gutterBottom sx={{ mt: 5, mb: 3, fontWeight: 700 }}>
                    Core Data Protection Principles
                  </Typography>
                  
                  <Grid container spacing={2}>
                    {dataPrinciples.map((principle, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            height: '100%',
                            borderRadius: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-5px)',
                              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                              borderColor: 'primary.main'
                            }
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                            <Box 
                              sx={{ 
                                color: 'white', 
                                bgcolor: 'primary.main', 
                                borderRadius: '50%', 
                                p: 1,
                                display: 'flex',
                                mr: 1.5
                              }}
                            >
                              {principle.icon}
                            </Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              {principle.title}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {principle.description}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                <Box id="gdpr" sx={{ mt: 5, scrollMarginTop: '100px' }}>
                  <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 700, position: 'relative' }}>
                    <Box component="span" sx={{
                      position: 'absolute',
                      left: '-20px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '5px',
                      height: '25px',
                      bgcolor: 'primary.main',
                      borderRadius: '5px'
                    }}></Box>
                    1. GDPR Compliance
                  </Typography>

                  <Typography variant="body1" paragraph>
                    HealthNex is fully compliant with the General Data Protection Regulation (GDPR). As part of our commitment to data 
                    protection, we adhere to the following principles:
                  </Typography>
                  
                  <Box sx={{ position: 'relative', my: 4 }}>
                    <Box 
                      sx={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: '2px',
                        bgcolor: 'divider',
                        zIndex: 0
                      }}
                    />
                    
                    {[

                      {
                        title: "Transparency",
                        content: "We are clear about what data we collect and how we use it. Our privacy notices are written in plain language."
                      },
                      {
                        title: "Data Subject Rights",
                        content: "We respect your rights to access, rectify, erase, restrict processing, object to processing, and data portability."
                      },
                      {
                        title: "Data Protection by Design",
                        content: "We implement appropriate technical and organizational measures to ensure data protection principles are met effectively."
                      },
                      {
                        title: "Data Protection Impact Assessments",
                        content: "We conduct DPIAs for processing activities that may result in high risk to individuals' rights and freedoms."
                      }
                    ].map((item, index) => (
                      <Box key={index} sx={{ position: 'relative', pl: 4, pb: 3 }}>
                        <Box 
                          sx={{ 
                            position: 'absolute',
                            left: -8,
                            bgcolor: 'primary.main',
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            zIndex: 1
                          }}
                        />
                        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem', mb: 1 }}>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.content}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  
                  <Card 
                    sx={{ 
                      mt: 2, 
                      mb: 3, 
                      borderRadius: 2, 
                      bgcolor: 'rgba(229, 62, 62, 0.05)', 
                      border: '1px solid rgba(229, 62, 62, 0.2)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <InfoIcon sx={{ color: theme.palette.warning.main, mr: 2, mt: 0.5 }} />
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                            Special Category Data
                          </Typography>
                          <Typography variant="body2">
                            Health data is considered "special category data" under the GDPR. We apply additional safeguards and security 
                            measures to protect this sensitive information, and we only process it with your explicit consent or under 
                            other valid legal bases specified in the GDPR.
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>

                <Box id="processing" sx={{ mt: 5, scrollMarginTop: '100px' }}>
                  <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 700, position: 'relative' }}>
                    <Box component="span" sx={{
                      position: 'absolute',
                      left: '-20px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '5px',
                      height: '25px',
                      bgcolor: 'primary.main',
                      borderRadius: '5px'
                    }}></Box>
                    2. Data Processing
                  </Typography>

                  <Typography variant="body1" paragraph>
                    We collect and process personal data for specific purposes. The types of personal data we collect include:
                  </Typography>

                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    {[

                      {
                        title: "Health Information",
                        content: "Medical history, symptoms, diagnoses, medications, health metrics"
                      },
                      {
                        title: "Technical Data",
                        content: "IP address, browser type, device information, access times"
                      },
                      {
                        title: "Usage Data",
                        content: "Information about how you use our website and services"
                      }
                    ].map((item, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Paper 
                          elevation={0} 
                          sx={{ 
                            p: 2, 
                            height: '100%',
                            borderRadius: 2,
                            bgcolor: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                          }}
                        >
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                            {item.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.content}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}

                  </Grid>

                  <Typography variant="body1" paragraph>
                    We process your data for the following purposes:
                  </Typography>

                  <List sx={{ pl: 2 }}>
                    <ListItem sx={{ py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Box 
                          component="span" 
                          sx={{ 
                            width: 8, 
                            height: 8, 
                            borderRadius: '50%', 
                            bgcolor: 'primary.main', 
                            display: 'inline-block' 
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText 
                        primary="To provide and improve our health services and platform"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem sx={{ py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Box 
                          component="span" 
                          sx={{ 
                            width: 8, 
                            height: 8, 
                            borderRadius: '50%', 
                            bgcolor: 'primary.main', 
                            display: 'inline-block' 
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText 
                        primary="To personalize your experience and provide health insights"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem sx={{ py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Box 
                          component="span" 
                          sx={{ 
                            width: 8, 
                            height: 8, 
                            borderRadius: '50%', 
                            bgcolor: 'primary.main', 
                            display: 'inline-block' 
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText 
                        primary="To communicate with you about your account and our services"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem sx={{ py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Box 
                          component="span" 
                          sx={{ 
                            width: 8, 
                            height: 8, 
                            borderRadius: '50%', 
                            bgcolor: 'primary.main', 
                            display: 'inline-block' 
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText 
                        primary="To ensure the security and proper functioning of our platform"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem sx={{ py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Box 
                          component="span" 
                          sx={{ 
                            width: 8, 
                            height: 8, 
                            borderRadius: '50%', 
                            bgcolor: 'primary.main', 
                            display: 'inline-block' 
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText 
                        primary="To comply with legal obligations and protect our legal rights"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  </List>
                </Box>

                <Box id="security" sx={{ mt: 5, scrollMarginTop: '100px' }}>
                  <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 700, position: 'relative' }}>
                    <Box component="span" sx={{
                      position: 'absolute',
                      left: '-20px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '5px',
                      height: '25px',
                      bgcolor: 'primary.main',
                      borderRadius: '5px'
                    }}></Box>
                    3. Data Security
                  </Typography>

                  <Typography variant="body1" paragraph>
                    We implement robust security measures to protect your personal data from unauthorized access, alteration, 
                    disclosure, or destruction. Our security measures include:
                  </Typography>

                  <Timeline position="alternate" sx={{ mb: 3 }}>
                    <TimelineItem>
                      <TimelineOppositeContent sx={{ m: 'auto 0' }}>
                        <Typography variant="body2" color="text.secondary">
                          Network Protection
                        </Typography>
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineConnector />
                        <TimelineDot color="primary">
                          <SecurityIcon />
                        </TimelineDot>
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent sx={{ py: 2, px: 2 }}>
                        <Typography variant="h6" component="span" sx={{ fontSize: '1rem', fontWeight: 600 }}>
                          End-to-End Encryption
                        </Typography>
                        <Typography variant="body2">
                          Data transmitted between your device and our servers is encrypted using TLS/SSL protocols.
                        </Typography>
                      </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineOppositeContent sx={{ m: 'auto 0' }}>
                        <Typography variant="body2" color="text.secondary">
                          Storage Security
                        </Typography>
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineConnector />
                        <TimelineDot color="primary">
                          <StorageIcon />
                        </TimelineDot>
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent sx={{ py: 2, px: 2 }}>
                        <Typography variant="h6" component="span" sx={{ fontSize: '1rem', fontWeight: 600 }}>
                          Encrypted Databases
                        </Typography>
                        <Typography variant="body2">
                          All stored data is encrypted at rest using industry-standard algorithms.
                        </Typography>
                      </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineOppositeContent sx={{ m: 'auto 0' }}>
                        <Typography variant="body2" color="text.secondary">
                          Access Control
                        </Typography>
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineConnector />
                        <TimelineDot color="primary">
                          <LockIcon />
                        </TimelineDot>
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent sx={{ py: 2, px: 2 }}>
                        <Typography variant="h6" component="span" sx={{ fontSize: '1rem', fontWeight: 600 }}>
                          Strict Access Policies
                        </Typography>
                        <Typography variant="body2">
                          Internal access to user data is restricted, logged, and regularly audited.
                        </Typography>
                      </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineOppositeContent sx={{ m: 'auto 0' }}>
                        <Typography variant="body2" color="text.secondary">
                          Threat Protection
                        </Typography>
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineConnector />
                        <TimelineDot color="primary">
                          <PhishingIcon />
                        </TimelineDot>
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent sx={{ py: 2, px: 2 }}>
                        <Typography variant="h6" component="span" sx={{ fontSize: '1rem', fontWeight: 600 }}>
                          Regular Security Testing
                        </Typography>
                        <Typography variant="body2">
                          We conduct penetration testing and vulnerability assessments to identify and address security risks.
                        </Typography>
                      </TimelineContent>
                    </TimelineItem>
                  </Timeline>

                  <Typography variant="body1" paragraph>
                    We maintain a comprehensive information security program that includes:
                  </Typography>

                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    {[

                      "Regular security assessments and audits",
                      "Employee security training and awareness",
                      "Incident response procedures",
                      "Business continuity and disaster recovery plans"
                    ].map((item, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Box sx={{ 
                          p: 2, 
                          borderRadius: 2, 
                          bgcolor: 'rgba(56, 161, 105, 0.08)', 
                          display: 'flex',
                          alignItems: 'center',
                          height: '100%',
                          border: '1px solid rgba(56, 161, 105, 0.2)'
                        }}>
                          <GppGoodIcon sx={{ color: theme.palette.success.main, mr: 2 }} />
                          <Typography variant="body2">{item}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                <Box id="retention" sx={{ mt: 5, scrollMarginTop: '100px' }}>
                  <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 700, position: 'relative' }}>
                    <Box component="span" sx={{
                      position: 'absolute',
                      left: '-20px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '5px',
                      height: '25px',
                      bgcolor: 'primary.main',
                      borderRadius: '5px'
                    }}></Box>
                    4. Data Retention
                  </Typography>

                  <Typography variant="body1" paragraph>
                    We retain your personal data only for as long as necessary to fulfill the purposes for which we collected it, 
                    including to satisfy legal, accounting, or reporting requirements.
                  </Typography>

                  <Box sx={{ 
                    p: 3, 
                    mb: 3,
                    borderRadius: 2, 
                    bgcolor: 'rgba(255, 255, 255, 0.03)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                          Account Information
                        </Typography>
                        <Typography variant="body2" paragraph>
                          We retain your account information for as long as your account is active, and for a 
                          reasonable period thereafter to handle any account-related inquiries.
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                          Health Data
                        </Typography>
                        <Typography variant="body2" paragraph>
                          We retain health data according to applicable healthcare record retention laws, typically 
                          for a period of 5-10 years depending on the jurisdiction.
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                          Technical Logs
                        </Typography>
                        <Typography variant="body2" paragraph>
                          System logs and technical data are typically retained for 90 days for security and debugging purposes.
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                          Deleted Accounts
                        </Typography>
                        <Typography variant="body2" paragraph>
                          When you delete your account, we follow a secure deletion process and remove your personal data 
                          within 30 days, except where retention is necessary for legal purposes.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>

                  <Typography variant="body1" paragraph>
                    To determine the appropriate retention period for personal data, we consider:
                  </Typography>

                  <List sx={{ pl: 2 }}>
                    <ListItem sx={{ py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Box 
                          component="span" 
                          sx={{ 
                            width: 8, 
                            height: 8, 
                            borderRadius: '50%', 
                            bgcolor: 'primary.main', 
                            display: 'inline-block' 
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText 
                        primary="The amount, nature, and sensitivity of the personal data"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem sx={{ py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Box 
                          component="span" 
                          sx={{ 
                            width: 8, 
                            height: 8, 
                            borderRadius: '50%', 
                            bgcolor: 'primary.main', 
                            display: 'inline-block' 
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText 
                        primary="The potential risk of harm from unauthorized use or disclosure"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem sx={{ py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Box 
                          component="span" 
                          sx={{ 
                            width: 8, 
                            height: 8, 
                            borderRadius: '50%', 
                            bgcolor: 'primary.main', 
                            display: 'inline-block' 
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText 
                        primary="The purposes for which we process your personal data"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem sx={{ py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Box 
                          component="span" 
                          sx={{ 
                            width: 8, 
                            height: 8, 
                            borderRadius: '50%', 
                            bgcolor: 'primary.main', 
                            display: 'inline-block' 
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Whether we can achieve those purposes through other means"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem sx={{ py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Box 
                          component="span" 
                          sx={{ 
                            width: 8, 
                            height: 8, 
                            borderRadius: '50%', 
                            bgcolor: 'primary.main', 
                            display: 'inline-block' 
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText 
                        primary="The applicable legal, regulatory, or contractual requirements"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  </List>
                </Box>

                <Box id="rights" sx={{ mt: 5, scrollMarginTop: '100px' }}>
                  <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 700, position: 'relative' }}>
                    <Box component="span" sx={{
                      position: 'absolute',
                      left: '-20px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '5px',
                      height: '25px',
                      bgcolor: 'primary.main',
                      borderRadius: '5px'
                    }}></Box>
                    5. Data Subject Rights
                  </Typography>

                  <Typography variant="body1" paragraph>
                    Under data protection laws, you have certain rights regarding your personal data. These include:
                  </Typography>

                  <Box sx={{ mb: 4 }}>
                    <Grid container spacing={3}>
                      {[

                        {
                          right: "Right to Access",
                          description: "You can request a copy of the personal information we hold about you."
                        },
                        {
                          right: "Right to Rectification",
                          description: "You can request that we correct any inaccurate or incomplete information."
                        },
                        {
                          right: "Right to Erasure",
                          description: "You can request that we delete your personal data in certain circumstances."
                        },
                        {
                          right: "Right to Restrict Processing",
                          description: "You can request that we limit how we use your data in certain circumstances."
                        },
                        {
                          right: "Right to Data Portability",
                          description: "You can request to receive your data in a structured, commonly used format."
                        },
                        {
                          right: "Right to Object",
                          description: "You can object to our processing of your data for certain purposes."
                        }
                      ].map((item, index) => (
                        <Grid item xs={12} md={6} key={index}>
                          <Card 
                            elevation={0}
                            sx={{ 
                              borderRadius: 2,
                              height: '100%',
                              transition: 'all 0.3s ease',
                              border: '1px solid rgba(59, 130, 246, 0.1)',
                              '&:hover': {
                                borderColor: 'primary.main',
                                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
                                transform: 'translateY(-3px)'
                              }
                            }}
                          >
                            <CardContent>
                              <Typography variant="h6" component="h3" gutterBottom sx={{ fontSize: '1.1rem', color: 'primary.main', fontWeight: 600 }}>
                                {item.right}
                              </Typography>
                              <Typography variant="body2">
                                {item.description}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                  <Typography variant="body1" paragraph>
                    To exercise any of these rights, please contact us using the information provided in the "Contact Us" section.
                    We will respond to your request within 30 days.
                  </Typography>

                  <Box sx={{ 
                    p: 3, 
                    mb: 3,
                    borderRadius: 2, 
                    bgcolor: 'rgba(56, 161, 105, 0.1)', 
                    border: '1px solid rgba(56, 161, 105, 0.2)',
                    display: 'flex',
                    alignItems: 'flex-start'
                  }}>
                    <ContentCopyIcon sx={{ color: theme.palette.success.main, mr: 2, mt: 0.5 }} />
                    <Box>
                      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, color: theme.palette.success.main }}>
                        Exercise Your Rights
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        You can access and update most of your personal information directly through your account settings.
                        For more complex requests or to exercise other rights, please email us at:
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <Box 
                          component="span" 
                          sx={{ 
                            p: 1.5, 
                            borderRadius: 1, 
                            bgcolor: 'rgba(56, 161, 105, 0.2)',
                            color: theme.palette.success.main,
                            fontWeight: 500,
                            fontSize: '0.9rem',
                            fontFamily: 'monospace',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          privacy@healthnex.com
                          <Tooltip title="Copy email">
                            <IconButton 
                              size="small" 
                              sx={{ ml: 1, color: theme.palette.success.main }}
                              onClick={() => {
                                navigator.clipboard.writeText('privacy@healthnex.com');
                              }}
                            >
                              <ContentCopyIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Box id="third-parties" sx={{ mt: 5, scrollMarginTop: '100px' }}>
                  <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 700, position: 'relative' }}>
                    <Box component="span" sx={{
                      position: 'absolute',
                      left: '-20px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '5px',
                      height: '25px',
                      bgcolor: 'primary.main',
                      borderRadius: '5px'
                    }}></Box>
                    6. Third-Party Data Processing
                  </Typography>

                  <Typography variant="body1" paragraph>
                    We may share your personal data with third-party service providers who process data on our behalf. 
                    These providers are subject to appropriate data protection agreements and are required to respect the 
                    security of your personal data.
                  </Typography>

                  <Typography variant="body1" paragraph>
                    Categories of third parties with whom we may share your data include:
                  </Typography>

                  <List>
                    <ListItem sx={{ py: 2, px: 3, mb: 2, bgcolor: 'rgba(255, 255, 255, 0.03)', borderRadius: 2 }}>
                      <ListItemText 
                        primary={

                          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                            Cloud Infrastructure Providers
                          </Typography>
                        } 
                        secondary={

                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            We use secure cloud services to host our application and store data. All providers are contractually 
                            obligated to maintain appropriate security measures and only process data as instructed by us.
                          </Typography>
                        }
                        disableTypography
                      />
                    </ListItem>
                    <ListItem sx={{ py: 2, px: 3, mb: 2, bgcolor: 'rgba(255, 255, 255, 0.03)', borderRadius: 2 }}>
                      <ListItemText 
                        primary={

                          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                            Analytics Providers
                          </Typography>
                        } 
                        secondary={

                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            We use analytics services to help us understand how users interact with our platform. These services 
                            receive anonymized or pseudonymized data where possible.
                          </Typography>
                        }
                        disableTypography
                      />
                    </ListItem>
                    <ListItem sx={{ py: 2, px: 3, mb: 2, bgcolor: 'rgba(255, 255, 255, 0.03)', borderRadius: 2 }}>
                      <ListItemText 
                        primary={

                          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                            Communication Service Providers
                          </Typography>
                        } 
                        secondary={

                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            We use email and notification service providers to communicate with you about your account and our services.
                          </Typography>
                        }
                        disableTypography
                      />
                    </ListItem>
                  </List>

                  <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                    We do not sell your personal data to third parties. We may disclose your personal information if required 
                    by law or in response to valid requests by public authorities.
                  </Typography>

                  <Typography variant="body1" paragraph>
                    When we transfer your data to service providers outside your country, we ensure appropriate safeguards are 
                    in place to protect your data, such as Standard Contractual Clauses or adequacy decisions.
                  </Typography>
                </Box>

                <Box id="contact" sx={{ mt: 5, scrollMarginTop: '100px' }}>
                  <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 700, position: 'relative' }}>
                    <Box component="span" sx={{
                      position: 'absolute',
                      left: '-20px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '5px',
                      height: '25px',
                      bgcolor: 'primary.main',
                      borderRadius: '5px'
                    }}></Box>
                    7. Contact Us
                  </Typography>

                  <Typography variant="body1" paragraph>
                    If you have any questions or concerns about this Data Protection Policy or our data practices, please contact us at:
                  </Typography>

                  <Card 
                    sx={{ 
                      mt: 2, 
                      mb: 3, 
                      background: 'linear-gradient(135deg, rgba(43, 108, 176, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
                      borderRadius: 3,
                      border: '1px solid rgba(59, 130, 246, 0.2)'
                    }}
                  >
                    <CardContent>
                      <Typography variant="body1" paragraph sx={{ fontWeight: 500 }}>
                        Data Protection Officer<br />
                        HealthNex, Inc.<br />
                        privacy@healthnex.com<br />
                        1234 Health Avenue<br />
                        San Francisco, CA 94103
                      </Typography>
                    </CardContent>
                  </Card>
                  
                  <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      size="large"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      sx={{ 
                        px: 4, 
                        py: 1.5,
                        borderRadius: '50px',
                        boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)'
                      }}
                    >
                      Back to Top
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            
            {/* Sidebar */}
            <Grid item xs={12} md={4}>
              <Box sx={{ position: 'sticky', top: 100 }}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 3, 
                    mb: 4, 
                    borderRadius: 3,
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                  }}
                >
                  <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                    On This Page
                  </Typography>
                  
                  <List disablePadding>
                    {sections.map((section, index) => (
                      <ListItem 
                        key={index} 
                        disablePadding 
                        sx={{ 
                          mb: 0.5,
                          borderLeft: '2px solid',
                          borderColor: activeTab === index ? 'primary.main' : 'transparent',
                          pl: 2,
                          position: 'relative',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            borderColor: 'primary.main',
                            backgroundColor: 'rgba(59, 130, 246, 0.05)'
                          }
                        }}
                      >
                        <Link
                          href={section.href}
                          underline="none"
                          color={activeTab === index ? 'primary.main' : 'text.secondary'}
                          sx={{ 
                            py: 1.5, 
                            display: 'block', 
                            width: '100%',
                            fontWeight: activeTab === index ? 600 : 400,
                            '&:hover': {
                              color: 'primary.main'
                            }
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            const element = document.querySelector(section.href);
                            if (element) {
                              setActiveTab(index);
                              element.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                        >
                          {section.label}
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
                
                <Card 
                  sx={{ 
                    mb: 4, 
                    borderRadius: 3,
                    background: 'rgba(56, 161, 105, 0.1)',
                    border: '1px solid rgba(56, 161, 105, 0.3)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: theme.palette.success.main }}>
                      Data Protection Compliance
                    </Typography>
                    
                    <Typography variant="body2" paragraph sx={{ mb: 2 }}>
                      HealthNex is fully compliant with major data protection regulations including GDPR, CCPA, HIPAA, 
                      and other regional privacy laws.
                    </Typography>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <GppGoodIcon sx={{ color: theme.palette.success.main, mr: 1.5 }} />
                      <Typography variant="body2">
                        Last compliance audit: March 15, 2025
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
                
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 3, 
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, rgba(43, 108, 176, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    position: 'relative'
                  }}
                >
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Related Policies
                  </Typography>
                  
                  <Typography variant="body2" paragraph sx={{ color: 'text.secondary' }}>
                    Please also review our other policies:
                  </Typography>
                  
                  <List sx={{ pl: 1 }}>
                    <ListItem disableGutters sx={{ py: 0.5 }}>
                      <Box component="span" sx={{ 
                        width: 6, 
                        height: 6, 
                        borderRadius: '50%', 
                        bgcolor: 'primary.main', 
                        display: 'inline-block',
                        mr: 1.5
                      }}></Box>
                      <Link href="/privacy-policy" color="primary" underline="hover">
                        Privacy Policy
                      </Link>
                    </ListItem>
                    <ListItem disableGutters sx={{ py: 0.5 }}>
                      <Box component="span" sx={{ 
                        width: 6, 
                        height: 6, 
                        borderRadius: '50%', 
                        bgcolor: 'primary.main', 
                        display: 'inline-block',
                        mr: 1.5
                      }}></Box>
                      <Link href="/terms-of-service" color="primary" underline="hover">
                        Terms of Service
                      </Link>
                    </ListItem>
                    <ListItem disableGutters sx={{ py: 0.5 }}>
                      <Box component="span" sx={{ 
                        width: 6, 
                        height: 6, 
                        borderRadius: '50%', 
                        bgcolor: 'primary.main', 
                        display: 'inline-block',
                        mr: 1.5
                      }}></Box>
                      <Link href="/cookie-policy" color="primary" underline="hover">
                        Cookie Policy
                      </Link>
                    </ListItem>
                  </List>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
};

export default DataProtection;