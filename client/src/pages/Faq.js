import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Divider,
  Paper,
  Button,
  TextField,
  InputAdornment,
  Fade,
  Grid,
  Breadcrumbs,
  Link,
  List,
  ListItem,
  Card,
  CardContent,
  useTheme,
  Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Layout from '../components/Layout';

const Faq = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  
  // Last updated date
  const lastUpdated = "April 20, 2025";

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

  // FAQ categories and IDs for navigation
  const faqSections = [
    { label: "General Questions", href: "#general", icon: <LiveHelpIcon /> },
    { label: "Health Data & Security", href: "#security", icon: <SecurityIcon /> },
    { label: "Using HealthNex", href: "#usage", icon: <HealthAndSafetyIcon /> },
    { label: "Account Management", href: "#account", icon: <AccountCircleIcon /> },
    { label: "Technical Support", href: "#support", icon: <SupportAgentIcon /> },
  ];
  
  // Handle tab change
  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  // FAQ data organized by categories
  const faqCategories = [
    {
      id: "general",
      title: "General Questions",
      icon: <LiveHelpIcon />,
      items: [
        {
          question: "What is HealthNex?",
          answer: "HealthNex is an AI-powered health platform that provides personalized health insights, symptom analysis, and health tracking tools to help you manage your wellbeing more effectively."
        },
        {
          question: "How does the AI diagnosis work?",
          answer: "Our AI diagnosis system analyzes the symptoms you provide against a comprehensive database of medical knowledge. It uses advanced language models to identify potential conditions and provides insights based on the information you share. Note that while our system is sophisticated, it's designed to be informative rather than replace professional medical advice."
        },
        {
          question: "Is there a cost to use HealthNex?",
          answer: "HealthNex offers both free and premium features. The basic health tracking and educational resources are available for free, while advanced analytics and personalized recommendations may require a subscription."
        }
      ]
    },
    {
      id: "security",
      title: "Health Data & Security",
      icon: <SecurityIcon />,
      items: [
        {
          question: "Is my health data secure?",
          answer: "Yes, we take data security very seriously. All your health information is encrypted and stored securely. We comply with industry standards for healthcare data protection and never share your personal information with third parties without your explicit consent."
        },
        {
          question: "Who can see my health information?",
          answer: "Your health information is private and only visible to you by default. You can choose to share specific health data with healthcare providers through our secure sharing features, but this is always under your control."
        },
        {
          question: "How do you handle my personal data?",
          answer: "We handle your data in accordance with our Data Protection and Privacy Policies. We implement robust security measures, including encryption, access controls, and regular security audits to keep your information safe."
        }
      ]
    },
    {
      id: "usage",
      title: "Using HealthNex",
      icon: <HealthAndSafetyIcon />,
      items: [
        {
          question: "Can I use HealthNex instead of seeing a doctor?",
          answer: "No, HealthNex is designed to be a supplementary tool to help you understand your health better and is not a replacement for professional medical advice. Always consult with a healthcare professional for proper diagnosis and treatment."
        },
        {
          question: "How accurate is the symptom analysis?",
          answer: "Our symptom analysis provides insights based on the information you provide and current medical knowledge. While we strive for high accuracy, the analysis is meant to be informative and educational rather than diagnostic. The accuracy depends on the details you provide and should be verified by healthcare professionals."
        },
        {
          question: "How do I track my health progress over time?",
          answer: "You can use the Dashboard feature to track various health metrics over time. Add your measurements regularly, and our system will generate visual representations of your progress and trends."
        },
        {
          question: "What should I do if I experience a medical emergency?",
          answer: "In case of a medical emergency, please contact emergency services immediately by calling 911 (or your local emergency number). HealthNex is not designed to handle emergency situations."
        }
      ]
    },
    {
      id: "account",
      title: "Account Management",
      icon: <AccountCircleIcon />,
      items: [
        {
          question: "How do I create an account?",
          answer: "To create an account, click on the 'Sign Up' button on the top right of our homepage. You'll need to provide your email address and create a password. You can also sign up using your Google or Apple account for faster registration."
        },
        {
          question: "How do I delete my account and data?",
          answer: "You can request account deletion from your Profile settings. Once confirmed, we will permanently delete your account and associated data in accordance with our data retention policies and applicable regulations."
        },
        {
          question: "Can I export my health data?",
          answer: "Yes, you can export your health data from the Profile section. We provide options to download your data in common formats like CSV or PDF, making it easy to share with healthcare providers or keep for your personal records."
        }
      ]
    },
    {
      id: "support",
      title: "Technical Support",
      icon: <SupportAgentIcon />,
      items: [
        {
          question: "Is HealthNex available on mobile devices?",
          answer: "Yes, HealthNex is designed to be responsive and works on various devices including smartphones and tablets. You can access all features through your mobile web browser."
        },
        {
          question: "What should I do if I encounter a technical issue?",
          answer: "If you encounter any technical issues, please visit our Help Center or contact our support team via the 'Support' section in your account. You can also email us directly at support@healthnex.com."
        },
        {
          question: "Does HealthNex work offline?",
          answer: "HealthNex has limited offline functionality. While you can view some previously loaded content offline, most features require an internet connection to access your data and the AI analysis tools."
        }
      ]
    }
  ];

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Filter FAQs based on search term
  const getFilteredFaqs = () => {
    if (!searchTerm) return faqCategories;
    
    return faqCategories.map(category => {
      const filteredItems = category.items.filter(
        item => item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                item.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return {
        ...category,
        items: filteredItems
      };
    }).filter(category => category.items.length > 0);
  };

  const filteredCategories = getFilteredFaqs();
  const noResults = filteredCategories.every(category => category.items.length === 0);

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
                  href="/support"
                >
                  Support
                </Link>
                <Typography color="rgba(255, 255, 255, 0.9)">FAQ</Typography>
              </Breadcrumbs>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <LiveHelpIcon sx={{ fontSize: 36, mr: 2, color: 'white' }} />
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
                  Frequently Asked Questions
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
                Find answers to common questions about HealthNex and our services. 
                If you can't find what you're looking for, feel free to contact our support team.
              </Typography>
            </Fade>
            
            <Fade in={true} timeout={2500}>
              <Box 
                sx={{ 
                  maxWidth: { xs: '100%', md: '70%' },
                  mx: 'auto'
                }}
              >
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 0.5, 
                    borderRadius: '50px',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(8px)',
                    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <TextField
                    fullWidth
                    placeholder="Search for answers..."
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: 'white' }} />
                        </InputAdornment>
                      ),
                      sx: { 
                        borderRadius: '50px', 
                        pr: 2,
                        height: '56px',
                        fontSize: '1.1rem',
                        color: 'white',
                        '& fieldset': { 
                          border: 'none' 
                        },
                        '&::placeholder': {
                          color: 'rgba(255, 255, 255, 0.7)'
                        },
                        '& .MuiInputBase-input': {
                          color: 'white'
                        }
                      }
                    }}
                  />
                </Paper>
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
                {noResults ? (
                  <Box sx={{ textAlign: 'center', py: 6 }}>
                    <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
                      No results found for "{searchTerm}"
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                      Try different keywords or browse all questions below
                    </Typography>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      size="large"
                      onClick={() => setSearchTerm("")}
                      sx={{ 
                        px: 4, 
                        py: 1.5,
                        borderRadius: '50px'
                      }}
                    >
                      Clear Search
                    </Button>
                  </Box>
                ) : (
                  filteredCategories.map((category, categoryIndex) => (
                    category.items.length > 0 && (
                      <Box 
                        key={category.id} 
                        id={category.id} 
                        sx={{ 
                          mt: categoryIndex === 0 ? 0 : 6, 
                          scrollMarginTop: '100px',
                          mb: 4
                        }}
                      >
                        <Typography variant="h4" component="h2" sx={{ mb: 4, fontWeight: 700, position: 'relative', display: 'flex', alignItems: 'center' }}>
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
                          <Box sx={{ mr: 2, color: 'primary.main' }}>
                            {category.icon}
                          </Box>
                          {category.title}
                        </Typography>
                        
                        {category.items.map((item, index) => (
                          <Fade in={true} timeout={800 + index * 150} key={`${category.id}-${index}`}>
                            <Accordion 
                              expanded={expanded === `${category.id}-panel${index}`}
                              onChange={handleAccordionChange(`${category.id}-panel${index}`)}
                              sx={{ 
                                mb: 2,
                                background: 'rgba(255, 255, 255, 0.03)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '10px !important',
                                overflow: 'hidden',
                                '&:before': {
                                  display: 'none',
                                },
                                boxShadow: expanded === `${category.id}-panel${index}` 
                                  ? '0 8px 20px rgba(0, 0, 0, 0.2)'
                                  : '0 2px 8px rgba(0, 0, 0, 0.1)',
                                transition: 'all 0.3s ease-in-out',
                                border: '1px solid',
                                borderColor: expanded === `${category.id}-panel${index}` 
                                  ? 'rgba(59, 130, 246, 0.3)'
                                  : 'rgba(255, 255, 255, 0.05)',
                                '&:hover': {
                                  borderColor: 'rgba(59, 130, 246, 0.3)',
                                  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.15)'
                                }
                              }}
                            >
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}
                                aria-controls={`${category.id}-panel${index}-content`}
                                id={`${category.id}-panel${index}-header`}
                                sx={{ 
                                  '& .MuiAccordionSummary-content': {
                                    my: 1.5
                                  }
                                }}
                              >
                                <Typography 
                                  variant="h6" 
                                  sx={{ 
                                    fontWeight: 600,
                                    color: expanded === `${category.id}-panel${index}` ? 'primary.main' : 'text.primary'
                                  }}
                                >
                                  {item.question}
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails sx={{ pt: 0, pb: 3, px: 3 }}>
                                <Divider sx={{ mb: 2 }} />
                                <Typography 
                                  variant="body1" 
                                  sx={{ 
                                    color: 'text.secondary',
                                    lineHeight: 1.7
                                  }}
                                >
                                  {item.answer}
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                          </Fade>
                        ))}
                      </Box>
                    )
                  ))
                )}
                
                {/* Contact CTA Section */}
                <Box sx={{ mt: 6, pt: 4, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <Card
                    elevation={0}
                    sx={{
                      p: 4,
                      borderRadius: 4,
                      textAlign: 'center',
                      background: 'linear-gradient(135deg, rgba(43, 108, 176, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
                      border: '1px solid rgba(59, 130, 246, 0.2)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at top right, rgba(59, 130, 246, 0.1), transparent 70%)',
                        zIndex: 0
                      }
                    }}
                  >
                    <Box sx={{ position: 'relative', zIndex: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <SupportAgentIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                      </Box>
                      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                        Couldn't find an answer to your question?
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 3, maxWidth: '600px', mx: 'auto', color: 'text.secondary' }}>
                        Our support team is here to help. Contact us anytime and we'll get back to you as soon as possible.
                      </Typography>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        size="large"
                        onClick={() => window.location.href = '/contact'}
                        sx={{ 
                          px: 4, 
                          py: 1.5,
                          borderRadius: '50px',
                          boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)'
                        }}
                      >
                        Contact Support
                      </Button>
                    </Box>
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
                    FAQ Categories
                  </Typography>
                  
                  <List disablePadding>
                    {faqSections.map((section, index) => (
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
                            display: 'flex', 
                            alignItems: 'center',
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
                              handleTabChange(index);
                              element.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                        >
                          <Box component="span" sx={{ mr: 1.5, display: 'flex', alignItems: 'center' }}>
                            {section.icon}
                          </Box>
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
                      Need Immediate Help?
                    </Typography>
                    
                    <Typography variant="body2" paragraph sx={{ mb: 2 }}>
                      Our support team is available 24/7 to assist you with any questions or issues you may have.
                    </Typography>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <SupportAgentIcon sx={{ color: theme.palette.success.main, mr: 1.5 }} />
                      <Typography variant="body2">
                        Live chat available Monday-Friday, 9am-5pm EST
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
                    Learn More
                  </Typography>
                  
                  <Typography variant="body2" paragraph sx={{ color: 'text.secondary' }}>
                    Check out these resources for more information:
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
                      <Link href="/help-center" color="primary" underline="hover">
                        Help Center
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
                      <Link href="/tutorials" color="primary" underline="hover">
                        Video Tutorials
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
                      <Link href="/user-guides" color="primary" underline="hover">
                        User Guides
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

export default Faq;