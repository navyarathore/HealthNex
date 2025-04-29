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
  Card,
  CardContent,
  Breadcrumbs,
  Link,
  useTheme,
  Tabs,
  Tab
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import SecurityIcon from '@mui/icons-material/Security';
import Layout from '../components/Layout';

const PrivacyPolicy = () => {
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
    { label: "Information Collection", href: "#collection" },
    { label: "Information Use", href: "#use" },
    { label: "Information Sharing", href: "#sharing" },
    { label: "Data Security", href: "#security" },
    { label: "Children's Privacy", href: "#children" },
    { label: "Contact Us", href: "#contact" }
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
              background: 'url("/images/pattern-dot.png")',
              opacity: 0.1,
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
                <Typography color="rgba(255, 255, 255, 0.9)">Privacy Policy</Typography>
              </Breadcrumbs>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <SecurityIcon sx={{ fontSize: 36, mr: 2, color: 'white' }} />
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
                  Privacy Policy
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
                At HealthNex, we take your privacy seriously. This policy explains how we collect, use, 
                disclose, and safeguard your information when you use our platform.
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
                    At HealthNex, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, 
                    and safeguard your information when you use our platform. Please read this privacy policy carefully. 
                    If you do not agree with the terms of this privacy policy, please do not access the application.
                  </Typography>
                </Box>

                <Box id="collection" sx={{ mt: 5, scrollMarginTop: '100px' }}>
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
                    1. Collection of Your Information
                  </Typography>

                  <Typography variant="body1" paragraph>
                    We may collect information about you in a variety of ways. The information we may collect via the 
                    platform includes:
                  </Typography>

                  <List sx={{ ml: 2, mb: 3 }}>
                    <ListItem sx={{ py: 2, px: 3, mb: 2, bgcolor: 'rgba(255, 255, 255, 0.03)', borderRadius: 2 }}>
                      <ListItemText 
                        primary={
                          <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 600, mb: 1, color: theme.palette.primary.main }}>
                            Personal Data
                          </Typography>
                        } 
                        secondary={
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            This includes your name, email address, date of birth, gender, and other information you directly provide to us when creating your account or updating your profile.
                          </Typography>
                        }
                        disableTypography
                      />
                    </ListItem>
                    <ListItem sx={{ py: 2, px: 3, mb: 2, bgcolor: 'rgba(255, 255, 255, 0.03)', borderRadius: 2 }}>
                      <ListItemText 
                        primary={
                          <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 600, mb: 1, color: theme.palette.primary.main }}>
                            Health Information
                          </Typography>
                        } 
                        secondary={
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            We collect health-related information that you voluntarily provide, such as symptoms, medical history, medications, and other health metrics.
                          </Typography>
                        }
                        disableTypography
                      />
                    </ListItem>
                    <ListItem sx={{ py: 2, px: 3, mb: 2, bgcolor: 'rgba(255, 255, 255, 0.03)', borderRadius: 2 }}>
                      <ListItemText 
                        primary={
                          <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 600, mb: 1, color: theme.palette.primary.main }}>
                            Derivative Data
                          </Typography>
                        } 
                        secondary={
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Information our servers automatically collect when you access the platform, such as your IP address, browser type, operating system, access times, and the pages you have viewed.
                          </Typography>
                        }
                        disableTypography
                      />
                    </ListItem>
                    <ListItem sx={{ py: 2, px: 3, mb: 2, bgcolor: 'rgba(255, 255, 255, 0.03)', borderRadius: 2 }}>
                      <ListItemText 
                        primary={
                          <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 600, mb: 1, color: theme.palette.primary.main }}>
                            Device Data
                          </Typography>
                        } 
                        secondary={
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Information about your device, such as device type, operating system, unique device identifiers, and mobile network information.
                          </Typography>
                        }
                        disableTypography
                      />
                    </ListItem>
                  </List>
                </Box>

                <Box id="use" sx={{ mt: 5, scrollMarginTop: '100px' }}>
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
                    2. Use of Your Information
                  </Typography>

                  <Typography variant="body1" paragraph>
                    Having accurate information about you enables us to provide a smooth, efficient, and customized experience. We may use information collected about you via the platform to:
                  </Typography>

                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    {[

                      "Create and manage your account",
                      "Provide personalized health insights and recommendations",
                      "Analyze symptoms and provide information about potential conditions",
                      "Track health metrics and visualize progress over time",
                      "Improve our platform and user experience",
                      "Send you emails regarding your account or platform changes",
                      "Respond to customer service requests",
                      "Administer promotions, surveys, or other platform features"
                    ].map((item, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Box sx={{ 
                          p: 2, 
                          borderRadius: 2, 
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          height: '100%',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            borderColor: 'primary.main',
                            bgcolor: 'rgba(59, 130, 246, 0.05)'
                          }
                        }}>
                          <Box 
                            sx={{ 
                              width: 24, 
                              height: 24, 
                              borderRadius: '50%', 
                              bgcolor: 'primary.main',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mr: 2,
                              color: 'white',
                              fontSize: '0.8rem',
                              fontWeight: 'bold'
                            }}
                          >
                            {index + 1}
                          </Box>
                          <Typography variant="body2">{item}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                <Box id="sharing" sx={{ mt: 5, scrollMarginTop: '100px' }}>
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
                    3. Disclosure of Your Information
                  </Typography>

                  <Typography variant="body1" paragraph>
                    We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
                  </Typography>

                  <List sx={{ ml: 2, mb: 3 }}>
                    <ListItem>
                      <ListItemText 
                        primary={
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            By Law or to Protect Rights
                          </Typography>
                        } 
                        secondary={
                          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                            If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
                          </Typography>
                        }
                        disableTypography
                      />
                    </ListItem>
                    <Divider sx={{ my: 2 }} />
                    <ListItem>
                      <ListItemText 
                        primary={
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            Third-Party Service Providers
                          </Typography>
                        } 
                        secondary={
                          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                            We may share your information with third parties that perform services for us or on our behalf, including data analysis, email delivery, hosting services, customer service, and marketing assistance.
                          </Typography>
                        }
                        disableTypography
                      />
                    </ListItem>
                    <Divider sx={{ my: 2 }} />
                    <ListItem>
                      <ListItemText 
                        primary={
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            Interactions with Other Users
                          </Typography>
                        } 
                        secondary={
                          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                            If you interact with other users of our platform, those users may see your name, profile photo, and descriptions of your activity.
                          </Typography>
                        }
                        disableTypography
                      />
                    </ListItem>
                    <Divider sx={{ my: 2 }} />
                    <ListItem>
                      <ListItemText 
                        primary={
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            Business Transfers
                          </Typography>
                        } 
                        secondary={
                          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                            If we or our subsidiaries are involved in a merger, acquisition, or asset sale, your information may be transferred.
                          </Typography>
                        }
                        disableTypography
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
                    4. Security of Your Information
                  </Typography>

                  <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                    We use administrative, technical, and physical security measures to help protect your personal information. 
                    While we have taken reasonable steps to secure the personal information you provide to us, please be aware 
                    that despite our efforts, no security measures are perfect or impenetrable, and no method of data 
                    transmission can be guaranteed against any interception or other type of misuse.
                  </Typography>
                </Box>

                <Box id="children" sx={{ mt: 5, scrollMarginTop: '100px' }}>
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
                    5. Policy for Children
                  </Typography>

                  <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                    We do not knowingly solicit information from or market to children under the age of 13. If you become 
                    aware of any data we have collected from children under age 13, please contact us using the contact 
                    information provided below.
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
                    6. Contact Us
                  </Typography>

                  <Typography variant="body1" paragraph>
                    If you have questions or concerns about this Privacy Policy, please contact us at:
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
                        privacy@healthnex.com<br />
                        1234 Health Avenue<br />
                        San Francisco, CA 94103
                      </Typography>
                    </CardContent>
                  </Card>
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
                    Need More Information?
                  </Typography>
                  
                  <Typography variant="body2" paragraph sx={{ color: 'text.secondary' }}>
                    If you have any questions about our privacy practices or your rights, you can:
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
                      <Link href="/contact" color="primary" underline="hover">
                        Contact our support team
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
                      <Link href="/faq" color="primary" underline="hover">
                        Read our FAQs
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
                        Review our Data Protection Policy
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

export default PrivacyPolicy;