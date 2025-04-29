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
  Stepper,
  Step,
  StepLabel,
  StepContent
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import GavelIcon from '@mui/icons-material/Gavel';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import PolicyIcon from '@mui/icons-material/Policy';
import Layout from '../components/Layout';

const TermsOfService = () => {
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
    { label: "Introduction", href: "#introduction" },
    { label: "Use of Service", href: "#use-of-service" },
    { label: "Accounts", href: "#accounts" },
    { label: "Content", href: "#content" },
    { label: "Medical Disclaimer", href: "#disclaimer" },
    { label: "Termination", href: "#termination" },
    { label: "Liability", href: "#liability" },
    { label: "Changes", href: "#changes" },
    { label: "Contact", href: "#contact" }
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
              background: 'radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.15), transparent 500px)',
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
                <Typography color="rgba(255, 255, 255, 0.9)">Terms of Service</Typography>
              </Breadcrumbs>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <GavelIcon sx={{ fontSize: 36, mr: 2, color: 'white' }} />
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
                  Terms of Service
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
                Please read these Terms of Service carefully. They govern your use of our platform and establish
                the rights, responsibilities, and limitations for users of HealthNex.
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
                <Box id="introduction" sx={{ scrollMarginTop: '100px' }}>
                  <Typography variant="body1" paragraph>
                    Please read these Terms of Service ("Terms") carefully before using the HealthNex website and platform 
                    (the "Service") operated by HealthNex, Inc. ("us", "we", or "our").
                  </Typography>

                  <Typography variant="body1" paragraph>
                    Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. 
                    These Terms apply to all visitors, users, and others who access or use the Service.
                  </Typography>
                  
                  <Typography variant="body1" paragraph>
                    By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the 
                    terms, then you may not access the Service.
                  </Typography>
                  
                  <Card sx={{ 
                    mt: 3, 
                    mb: 4, 
                    borderRadius: 2, 
                    bgcolor: 'rgba(59, 130, 246, 0.08)', 
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    boxShadow: 'none'
                  }}>
                    <CardContent sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <WarningAmberIcon sx={{ color: theme.palette.warning.main, mr: 2, mt: 0.5 }} />
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                          Important Notice
                        </Typography>
                        <Typography variant="body2">
                          These terms constitute a legally binding agreement. By clicking "I Agree" or by using our 
                          services, you acknowledge that you have read, understood, and agree to be bound by these terms.
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>

                <Box id="use-of-service" sx={{ mt: 5, scrollMarginTop: '100px' }}>
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
                    1. Use of Service
                  </Typography>

                  <Typography variant="body1" paragraph>
                    HealthNex provides a platform for health tracking, symptom analysis, and health insights. Our Service includes:
                  </Typography>

                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    {[
                      "AI-powered symptom analysis",
                      "Health tracking and metric visualization",
                      "Educational health resources",
                      "Personal health profile management"
                    ].map((item, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Box sx={{ 
                          p: 2, 
                          borderRadius: 2, 
                          bgcolor: 'rgba(255, 255, 255, 0.03)', 
                          display: 'flex',
                          alignItems: 'center',
                          height: '100%',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            borderColor: 'primary.main',
                            transform: 'translateY(-3px)',
                            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
                          }
                        }}>
                          <CheckCircleOutlineIcon sx={{ color: 'primary.main', mr: 2 }} />
                          <Typography variant="body2">{item}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>

                  <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                    Our Service is intended for informational and educational purposes only. While we strive to provide accurate 
                    and useful information, our Service should never be used as a substitute for professional medical advice, 
                    diagnosis, or treatment.
                  </Typography>
                </Box>

                <Box id="accounts" sx={{ mt: 5, scrollMarginTop: '100px' }}>
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
                    2. Accounts
                  </Typography>

                  <Stepper orientation="vertical" sx={{ mb: 4 }}>
                    <Step active={true}>
                      <StepLabel>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Account Accuracy</Typography>
                      </StepLabel>
                      <StepContent>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                          When you create an account with us, you must provide information that is accurate, complete, and current at all 
                          times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account 
                          on our Service.
                        </Typography>
                      </StepContent>
                    </Step>
                    <Step active={true}>
                      <StepLabel>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Account Security</Typography>
                      </StepLabel>
                      <StepContent>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                          You are responsible for safeguarding the password that you use to access the Service and for any activities or 
                          actions under your password, whether your password is with our Service or a third-party service.
                        </Typography>
                      </StepContent>
                    </Step>
                    <Step active={true}>
                      <StepLabel>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Password Confidentiality</Typography>
                      </StepLabel>
                      <StepContent>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                          You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of 
                          any breach of security or unauthorized use of your account.
                        </Typography>
                      </StepContent>
                    </Step>
                  </Stepper>
                </Box>

                <Box id="content" sx={{ mt: 5, scrollMarginTop: '100px' }}>
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
                    3. Content
                  </Typography>

                  <Typography variant="body1" paragraph>
                    Our Service allows you to post, store, share, and make available certain information, text, graphics, and data 
                    ("Content"). You are responsible for the Content that you post to the Service, including its legality, reliability, 
                    and appropriateness.
                  </Typography>

                  <Typography variant="body1" paragraph>
                    By posting Content to the Service, you grant us the right to use, modify, publicly perform, publicly display, 
                    reproduce, and distribute such Content on and through the Service. You retain any and all of your rights to any 
                    Content you submit, post, or display on or through the Service, and you are responsible for protecting those rights.
                  </Typography>

                  <Typography variant="body1" paragraph>
                    You represent and warrant that: (i) the Content is yours (you own it) or you have the right to use it and grant us 
                    the rights and license as provided in these Terms, and (ii) the posting of your Content on or through the Service 
                    does not violate the privacy rights, publicity rights, copyrights, contract rights, or any other rights of any person.
                  </Typography>
                </Box>

                <Box id="disclaimer" sx={{ mt: 5, scrollMarginTop: '100px' }}>
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
                    4. Medical Disclaimer
                  </Typography>

                  <Card sx={{ 
                    mb: 3, 
                    borderRadius: 2, 
                    bgcolor: 'rgba(229, 62, 62, 0.05)', 
                    border: '1px solid rgba(229, 62, 62, 0.2)',
                    boxShadow: 'none'
                  }}>
                    <CardContent sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <PolicyIcon sx={{ color: theme.palette.error.main, mr: 2, mt: 0.5 }} />
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: theme.palette.error.main }}>
                          Important Medical Disclaimer
                        </Typography>
                        <Typography variant="body2">
                          The information provided by HealthNex is not intended to replace the relationship that exists between a patient/site 
                          visitor and their existing physician. The Service is not designed to diagnose, treat, cure, or prevent any disease. 
                          The information provided should not be used for diagnosing or treating a health problem or disease.
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>

                  <Typography variant="body1" paragraph>
                    Always seek the advice of your physician or other qualified health provider with any questions you may have regarding 
                    a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have 
                    read on the HealthNex Service.
                  </Typography>

                  <Typography variant="body1" paragraph>
                    If you think you may have a medical emergency, call your doctor or 911 immediately. HealthNex does not recommend or 
                    endorse any specific tests, physicians, products, procedures, opinions, or other information that may be mentioned on the Service.
                  </Typography>
                </Box>

                <Box id="termination" sx={{ mt: 5, scrollMarginTop: '100px' }}>
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
                    5. Termination
                  </Typography>

                  <Typography variant="body1" paragraph>
                    We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, 
                    including without limitation if you breach the Terms.
                  </Typography>

                  <Typography variant="body1" paragraph>
                    Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may 
                    simply discontinue using the Service or request account deletion through your account settings.
                  </Typography>
                </Box>

                <Box id="liability" sx={{ mt: 5, scrollMarginTop: '100px' }}>
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
                    6. Limitation Of Liability
                  </Typography>

                  <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                    In no event shall HealthNex, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for 
                    any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, 
                    data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access 
                    or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the 
                    Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, 
                    contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility 
                    of such damage.
                  </Typography>
                </Box>

                <Box id="changes" sx={{ mt: 5, scrollMarginTop: '100px' }}>
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
                    7. Changes
                  </Typography>

                  <Typography variant="body1" paragraph>
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, 
                    we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change 
                    will be determined at our sole discretion.
                  </Typography>

                  <Typography variant="body1" paragraph>
                    By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised 
                    terms. If you do not agree to the new terms, please stop using the Service.
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
                    8. Contact Us
                  </Typography>

                  <Typography variant="body1" paragraph>
                    If you have any questions about these Terms, please contact us at:
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
                        HealthNex, Inc.<br />
                        terms@healthnex.com<br />
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
                    Document Overview
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
                      Effective Date
                    </Typography>
                    
                    <Typography variant="body2" paragraph sx={{ mb: 2 }}>
                      These Terms of Service are effective as of {lastUpdated} and will remain in effect except with respect 
                      to any changes in its provisions in the future.
                    </Typography>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CheckCircleOutlineIcon sx={{ color: theme.palette.success.main, mr: 1.5 }} />
                      <Typography variant="body2">
                        Latest version with all current provisions
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
                    Please also review our other policies that govern your use of our services:
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
                      <Link href="/data-protection" color="primary" underline="hover">
                        Data Protection Policy
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

export default TermsOfService;