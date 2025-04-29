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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import CookieIcon from '@mui/icons-material/Cookie';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SecurityIcon from '@mui/icons-material/Security';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import InfoIcon from '@mui/icons-material/Info';
import Layout from '../components/Layout';

const CookiePolicy = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [cookieConsent, setCookieConsent] = useState({
    necessary: true,
    preferences: false,
    analytics: false,
    marketing: false
  });
  
  // Last updated date
  const lastUpdated = "April 25, 2025";

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Handle cookie consent change
  const handleConsentChange = (event) => {
    setCookieConsent({
      ...cookieConsent,
      [event.target.name]: event.target.checked
    });
  };

  // Tab sections
  const sections = [
    { label: "About Cookies", href: "#about" },
    { label: "Types of Cookies", href: "#types" },
    { label: "Cookies We Use", href: "#our-cookies" },
    { label: "Third-Party Cookies", href: "#third-party" },
    { label: "Managing Cookies", href: "#managing" },
    { label: "Contact", href: "#contact" }
  ];

  // Cookie categories
  const cookieCategories = [
    {
      id: "necessary",
      name: "Necessary Cookies",
      description: "These cookies are essential for the proper functioning of our website and cannot be switched off. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in, or filling in forms.",
      required: true,
      examples: [
        { name: "JSESSIONID", purpose: "Session management", expiry: "Session" },
        { name: "XSRF-TOKEN", purpose: "Security", expiry: "Session" },
        { name: "auth_token", purpose: "Authentication", expiry: "30 days" }
      ]
    },
    {
      id: "preferences",
      name: "Preference Cookies",
      description: "These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.",
      required: false,
      examples: [
        { name: "ui_theme", purpose: "Remember user interface preferences", expiry: "1 year" },
        { name: "language", purpose: "Store language preferences", expiry: "1 year" },
        { name: "font_size", purpose: "Customize display settings", expiry: "1 year" }
      ]
    },
    {
      id: "analytics",
      name: "Analytics Cookies",
      description: "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.",
      required: false,
      examples: [
        { name: "_ga", purpose: "Google Analytics tracking", expiry: "2 years" },
        { name: "_gid", purpose: "Google Analytics user differentiation", expiry: "24 hours" },
        { name: "_gat", purpose: "Google Analytics throttling", expiry: "1 minute" }
      ]
    },
    {
      id: "marketing",
      name: "Marketing Cookies",
      description: "These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant advertisements on other sites.",
      required: false,
      examples: [
        { name: "_fbp", purpose: "Facebook pixel tracking", expiry: "3 months" },
        { name: "IDE", purpose: "Google DoubleClick targeting", expiry: "1 year" },
        { name: "guest_id", purpose: "Twitter advertising", expiry: "2 years" }
      ]
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
              background: 'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.15), transparent 500px)',
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
                <Typography color="rgba(255, 255, 255, 0.9)">Cookie Policy</Typography>
              </Breadcrumbs>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <CookieIcon sx={{ fontSize: 36, mr: 2, color: 'white' }} />
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
                  Cookie Policy
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
                This Cookie Policy explains how HealthNex uses cookies and similar technologies to recognize you when you 
                visit our website. It explains what these technologies are and why we use them, as well as your rights to 
                control our use of them.
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
                <Box id="about" sx={{ scrollMarginTop: '100px' }}>
                  <Typography variant="body1" paragraph>
                    This Cookie Policy explains how HealthNex ("we", "us", "our") uses cookies and similar technologies 
                    when you visit our website at healthnex.com (the "Website"), or any other websites, pages, features, 
                    or content we own or operate (collectively, the "Services").
                  </Typography>

                  <Typography variant="body1" paragraph>
                    This Cookie Policy should be read together with our Privacy Policy and our Terms of Service.
                  </Typography>
                  
                  {/* What are Cookies */}
                  <Typography variant="h5" gutterBottom sx={{ mt: 5, mb: 3, fontWeight: 700 }}>
                    What Are Cookies?
                  </Typography>
                  
                  <Card sx={{ 
                    mt: 2, 
                    mb: 4, 
                    borderRadius: 2, 
                    bgcolor: 'rgba(59, 130, 246, 0.08)', 
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    boxShadow: 'none'
                  }}>
                    <CardContent>
                      <Typography variant="body1" paragraph>
                        Cookies are small text files that are stored on your computer or mobile device when you visit a website. 
                        They are widely used to make websites work more efficiently and provide information to the owners of the site.
                      </Typography>
                      
                      <Typography variant="body1">
                        Cookies allow a website to recognize your device and remember if you've been to the website before. 
                        They help with authentication, storing preferences, and providing personalized content.
                      </Typography>
                    </CardContent>
                  </Card>
                  
                  {/* How Cookies Work - Visual Explanation */}
                  <Box 
                    sx={{ 
                      mt: 4, 
                      mb: 5, 
                      display: 'flex', 
                      flexDirection: { xs: 'column', md: 'row' },
                      gap: 3,
                      p: 3,
                      borderRadius: 2,
                      background: 'rgba(0, 0, 0, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        How Cookies Work
                      </Typography>
                      <Typography variant="body2" paragraph>
                        When you visit our website, we may place cookies on your browser. These cookies can:
                      </Typography>
                      <List sx={{ listStyleType: 'disc', pl: 2 }}>
                        <ListItem sx={{ display: 'list-item', p: 0.5 }}>
                          <Typography variant="body2">Remember your login details</Typography>
                        </ListItem>
                        <ListItem sx={{ display: 'list-item', p: 0.5 }}>
                          <Typography variant="body2">Remember your preferences</Typography>
                        </ListItem>
                        <ListItem sx={{ display: 'list-item', p: 0.5 }}>
                          <Typography variant="body2">Measure how you use the website</Typography>
                        </ListItem>
                        <ListItem sx={{ display: 'list-item', p: 0.5 }}>
                          <Typography variant="body2">Personalize content to match your interests</Typography>
                        </ListItem>
                      </List>
                    </Box>
                    <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />
                    <Divider sx={{ display: { xs: 'block', md: 'none' } }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        Session vs. Persistent Cookies
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Card 
                            elevation={0} 
                            sx={{ 
                              height: '100%',
                              bgcolor: 'rgba(59, 130, 246, 0.05)', 
                              border: '1px solid rgba(59, 130, 246, 0.1)'
                            }}
                          >
                            <CardContent>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                Session Cookies
                              </Typography>
                              <Typography variant="body2">
                                Temporary cookies that expire when you close your browser. These help with 
                                tasks during your browser session.
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Card 
                            elevation={0} 
                            sx={{ 
                              height: '100%',
                              bgcolor: 'rgba(59, 130, 246, 0.05)', 
                              border: '1px solid rgba(59, 130, 246, 0.1)'
                            }}
                          >
                            <CardContent>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                Persistent Cookies
                              </Typography>
                              <Typography variant="body2">
                                Remain on your device between browser sessions. These help with 
                                remembering preferences and settings.
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Box>

                <Box id="types" sx={{ mt: 5, scrollMarginTop: '100px' }}>
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
                    Types of Cookies
                  </Typography>

                  <Typography variant="body1" paragraph>
                    Cookies are typically classified based on their characteristics and purposes. Here are the 
                    main types of cookies we use:
                  </Typography>
                  
                  <Box sx={{ mb: 4 }}>
                    <Grid container spacing={3}>
                      {cookieCategories.map((category, index) => (
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
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                <CookieIcon sx={{ color: 'primary.main', mr: 1.5 }} />
                                <Typography variant="h6" component="h3" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>
                                  {category.name}
                                </Typography>
                                {category.required && (
                                  <Chip 
                                    label="Essential" 
                                    size="small" 
                                    sx={{ 
                                      ml: 1.5,
                                      bgcolor: 'success.light',
                                      color: 'white',
                                      fontWeight: 500,
                                      fontSize: '0.7rem'
                                    }} 
                                  />
                                )}
                              </Box>
                              <Typography variant="body2" sx={{ mb: 2 }}>
                                {category.description}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                  <Typography variant="body1" paragraph>
                    In addition to the cookies we set when you visit our website (first-party cookies), 
                    we also use third-party cookies from our partners for various purposes. These are cookies 
                    that are set by a domain other than our website.
                  </Typography>
                </Box>

                <Box id="our-cookies" sx={{ mt: 5, scrollMarginTop: '100px' }}>
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
                    Cookies We Use
                  </Typography>

                  <Typography variant="body1" paragraph>
                    The following table provides more information about the individual cookies we use and the 
                    purposes for which we use them:
                  </Typography>

                  {cookieCategories.map((category, index) => (
                    <Accordion 
                      key={index} 
                      disableGutters 
                      elevation={0} 
                      sx={{ 
                        mb: 2, 
                        borderRadius: '8px', 
                        backgroundColor: 'rgba(255, 255, 255, 0.02)', 
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        '&::before': {
                          display: 'none'
                        },
                        '&.Mui-expanded': {
                          margin: 0,
                          mb: 2
                        }
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{ 
                          borderRadius: '8px', 
                          '&.Mui-expanded': {
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '8px 8px 0 0',
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, flex: 1 }}>
                            {category.name}
                          </Typography>
                          {category.required ? (
                            <Chip 
                              label="Always Active" 
                              size="small" 
                              sx={{ 
                                bgcolor: 'success.light',
                                color: 'white'
                              }} 
                            />
                          ) : (
                            <FormControlLabel
                              control={
                                <Switch 
                                  checked={cookieConsent[category.id]} 
                                  onChange={handleConsentChange} 
                                  name={category.id}
                                  color="primary"
                                  size="small"
                                  onClick={(e) => e.stopPropagation()}
                                />
                              }
                              label={cookieConsent[category.id] ? "Active" : "Inactive"}
                              sx={{ 
                                m: 0,
                                '.MuiFormControlLabel-label': {
                                  fontSize: '0.8rem',
                                  color: cookieConsent[category.id] ? 'primary.main' : 'text.secondary'
                                }
                              }}
                              onClick={(e) => e.stopPropagation()}
                            />
                          )}
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        <TableContainer component={Paper} elevation={0} sx={{ bgcolor: 'transparent' }}>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell sx={{ fontWeight: 600 }}>Cookie Name</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Purpose</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Expiry</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {category.examples.map((cookie, idx) => (
                                <TableRow key={idx}>
                                  <TableCell sx={{ fontFamily: 'monospace' }}>{cookie.name}</TableCell>
                                  <TableCell>{cookie.purpose}</TableCell>
                                  <TableCell>{cookie.expiry}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Box>

                <Box id="third-party" sx={{ mt: 5, scrollMarginTop: '100px' }}>
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
                    Third-Party Cookies
                  </Typography>

                  <Typography variant="body1" paragraph>
                    Some of the cookies used on our website are set by third parties that deliver services on our behalf. 
                    These third parties may use cookies, web beacons, and similar technologies to collect information about 
                    your use of our website.
                  </Typography>

                  <Card sx={{ 
                    mt: 2, 
                    mb: 4, 
                    borderRadius: 2, 
                    bgcolor: 'rgba(230, 165, 12, 0.05)', 
                    border: '1px solid rgba(230, 165, 12, 0.2)',
                    boxShadow: 'none'
                  }}>
                    <CardContent sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <WarningAmberIcon sx={{ color: theme.palette.warning.main, mr: 2, mt: 0.5 }} />
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                          Third-Party Control
                        </Typography>
                        <Typography variant="body2">
                          Please note that we do not have control over the cookies placed by third parties. For more 
                          information about these cookies and how to manage them, please refer to the privacy policies 
                          of the respective third parties.
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>

                  <Typography variant="body1" paragraph>
                    We work with the following third parties who may set cookies on our website:
                  </Typography>

                  <TableContainer component={Paper} elevation={0} sx={{ mb: 4, bgcolor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600 }}>Third Party</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Purpose</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Privacy Policy</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>Google Analytics</TableCell>
                          <TableCell>Web analytics service that tracks and reports website traffic</TableCell>
                          <TableCell>
                            <Link href="https://policies.google.com/privacy" target="_blank" rel="noopener">
                              Privacy Policy
                            </Link>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Facebook</TableCell>
                          <TableCell>Social media features and targeted advertising</TableCell>
                          <TableCell>
                            <Link href="https://www.facebook.com/policy.php" target="_blank" rel="noopener">
                              Privacy Policy
                            </Link>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Stripe</TableCell>
                          <TableCell>Payment processing</TableCell>
                          <TableCell>
                            <Link href="https://stripe.com/privacy" target="_blank" rel="noopener">
                              Privacy Policy
                            </Link>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Zendesk</TableCell>
                          <TableCell>Customer support system</TableCell>
                          <TableCell>
                            <Link href="https://www.zendesk.com/company/privacy-and-data-protection/" target="_blank" rel="noopener">
                              Privacy Policy
                            </Link>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>

                <Box id="managing" sx={{ mt: 5, scrollMarginTop: '100px' }}>
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
                    Managing Cookies
                  </Typography>

                  <Typography variant="body1" paragraph>
                    You have the right to decide whether to accept or reject cookies. You can exercise your cookie 
                    preferences in the following ways:
                  </Typography>

                  {/* Cookie settings in our platform */}
                  <Box 
                    sx={{ 
                      p: 3, 
                      mb: 4, 
                      borderRadius: 2,
                      bgcolor: 'rgba(59, 130, 246, 0.1)',
                      border: '1px solid rgba(59, 130, 246, 0.2)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                      Cookie Settings on Our Platform
                    </Typography>
                    <Typography variant="body2" paragraph>
                      You can set or amend your cookie preferences at any time by using our cookie consent tool. 
                      This can be found in the footer of our website or by clicking the button below:
                    </Typography>
                    
                    <Button 
                      variant="contained" 
                      color="primary"
                      sx={{ mt: 1, mb: 3 }}
                    >
                      Manage Cookie Preferences
                    </Button>
                    
                    {/* Cookie Consent Manager */}
                    <Box 
                      sx={{ 
                        p: 2,
                        borderRadius: 2,
                        bgcolor: 'rgba(0, 0, 0, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                        Cookie Consent Settings
                      </Typography>
                      
                      {cookieCategories.map((category, idx) => (
                        <Box 
                          key={idx} 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            py: 1,
                            borderBottom: idx < cookieCategories.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CookieIcon sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                            <Typography variant="body2">
                              {category.name}
                            </Typography>
                          </Box>
                          
                          {category.required ? (
                            <Chip 
                              label="Required" 
                              size="small" 
                              sx={{ 
                                bgcolor: 'success.light',
                                color: 'white',
                                fontSize: '0.7rem'
                              }} 
                            />
                          ) : (
                            <Switch
                              checked={cookieConsent[category.id]}
                              onChange={handleConsentChange}
                              name={category.id}
                              size="small"
                              color="primary"
                            />
                          )}
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  {/* Browser settings */}
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 4 }}>
                    Browser Settings
                  </Typography>
                  
                  <Typography variant="body1" paragraph>
                    Most web browsers allow you to control cookies through their settings preferences. 
                    To find out more about cookies and how to manage them through your browser:
                  </Typography>

                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    {[
                      { browser: "Chrome", url: "https://support.google.com/chrome/answer/95647" },
                      { browser: "Firefox", url: "https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" },
                      { browser: "Safari", url: "https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" },
                      { browser: "Edge", url: "https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" }
                    ].map((item, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Card 
                          elevation={0} 
                          sx={{ 
                            p: 2, 
                            borderRadius: 2, 
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            bgcolor: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 255, 255, 0.05)'
                          }}
                        >
                          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                            {item.browser}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 2 }}>
                            How to manage cookies in {item.browser}
                          </Typography>
                          <Box sx={{ mt: 'auto' }}>
                            <Button 
                              variant="outlined" 
                              size="small" 
                              href={item.url}
                              target="_blank"
                              rel="noopener"
                            >
                              Instructions
                            </Button>
                          </Box>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>

                  <Card sx={{ 
                    mt: 3, 
                    mb: 4, 
                    borderRadius: 2, 
                    bgcolor: 'rgba(59, 130, 246, 0.08)', 
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    boxShadow: 'none'
                  }}>
                    <CardContent sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <InfoIcon sx={{ color: theme.palette.info.main, mr: 2, mt: 0.5 }} />
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                          Necessary Cookies
                        </Typography>
                        <Typography variant="body2">
                          Please note that if you reject or block necessary cookies, you may not be able to use all of the 
                          features of our website or services. Necessary cookies are essential for the proper functioning 
                          of the website and cannot be disabled.
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>

                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 4 }}>
                    Opt-Out of Analytics Cookies
                  </Typography>
                  
                  <Typography variant="body1" paragraph>
                    To opt-out of Google Analytics tracking across all websites, you can install the Google Analytics 
                    Opt-out Browser Add-on. This add-on instructs the Google Analytics JavaScript not to send information 
                    about website visits to Google Analytics.
                  </Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <Button 
                      variant="outlined" 
                      color="primary"
                      href="https://tools.google.com/dlpage/gaoptout"
                      target="_blank"
                      rel="noopener"
                      sx={{ mr: 2 }}
                    >
                      Google Analytics Opt-out
                    </Button>
                  </Box>
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
                    Contact Us
                  </Typography>

                  <Typography variant="body1" paragraph>
                    If you have any questions about our use of cookies or other technologies, please contact us at:
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
                      Cookie Policy Status
                    </Typography>
                    
                    <Typography variant="body2" paragraph sx={{ mb: 2 }}>
                      This Cookie Policy is compliant with the EU ePrivacy Directive, GDPR, and CCPA requirements
                      for cookie transparency and user consent.
                    </Typography>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <SecurityIcon sx={{ color: theme.palette.success.main, mr: 1.5 }} />
                      <Typography variant="body2">
                        Last compliance review: {lastUpdated}
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
                    For more information about how we protect your data:
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
                      <Link href="/terms-of-service" color="primary" underline="hover">
                        Terms of Service
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

export default CookiePolicy;