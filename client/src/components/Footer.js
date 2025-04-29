import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Link,
  Grid,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
  Stack,
  // Divider
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
// import EmailIcon from '@mui/icons-material/Email';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));
  
  // Year for copyright
  const currentYear = new Date().getFullYear();
  
  // Function to handle navigation
  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        position: 'relative',
        borderTop: '1px solid',
        borderColor: 'divider',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(to right, #3B82F6, #60A5FA, #3B82F6)',
        },
      }}
    >
      {/* Main Footer Content */}
      <Container maxWidth="lg">
        <Grid container spacing={2} sx={{ py: 3 }}>
          {/* Left: Logo and Quick Description */}
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <MedicalServicesIcon sx={{ fontSize: 22, color: 'primary.main', mr: 1 }} />
              <Typography 
                variant="h6" 
                component="div"
                sx={{ 
                  fontWeight: 700,
                  background: 'linear-gradient(90deg, #3B82F6 0%, #60A5FA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                HealthNex
              </Typography>
            </Box>
            {!isSmall && (
              <>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                  Your AI-powered health partner
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                  <HealthAndSafetyIcon 
                    sx={{ 
                      fontSize: 16, 
                      color: 'success.main', 
                      mr: 0.5 
                    }} 
                  />
                  <Typography variant="caption" color="text.secondary">
                    Trusted by healthcare professionals
                  </Typography>
                </Box>
              </>
            )}
            <Stack direction="row" spacing={1}>
              <Tooltip title="Facebook">
                <IconButton size="small" aria-label="Facebook" sx={{ color: 'text.secondary' }}>
                  <FacebookIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Twitter">
                <IconButton size="small" aria-label="Twitter" sx={{ color: 'text.secondary' }}>
                  <TwitterIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="LinkedIn">
                <IconButton size="small" aria-label="LinkedIn" sx={{ color: 'text.secondary' }}>
                  <LinkedInIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Instagram">
                <IconButton size="small" aria-label="Instagram" sx={{ color: 'text.secondary' }}>
                  <InstagramIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Grid>
          
          {/* Center: Nav Links */}
          <Grid item xs={6} sm={6} md={3}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Navigation</Typography>
            <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
              <Box component="li" sx={{ mb: 0.5 }}>
                <Link 
                  href="#" 
                  color="text.secondary" 
                  variant="body2" 
                  underline="hover"
                  onClick={() => handleNavigation('/')}
                >
                  Home
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 0.5 }}>
                <Link 
                  href="#" 
                  color="text.secondary" 
                  variant="body2" 
                  underline="hover"
                  onClick={() => handleNavigation('/dashboard')}
                >
                  Dashboard
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 0.5 }}>
                <Link 
                  href="#" 
                  color="text.secondary" 
                  variant="body2" 
                  underline="hover"
                  onClick={() => handleNavigation('/diagnosis')}
                >
                  Diagnosis
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 0.5 }}>
                <Link 
                  href="#" 
                  color="text.secondary" 
                  variant="body2" 
                  underline="hover"
                  onClick={() => handleNavigation('/profile')}
                >
                  Profile
                </Link>
              </Box>
            </Box>
          </Grid>
          
          {/* Resources */}
          <Grid item xs={6} sm={6} md={3}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Resources</Typography>
            <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
              <Box component="li" sx={{ mb: 0.5 }}>
                <Link 
                  href="#" 
                  color="text.secondary" 
                  variant="body2" 
                  underline="hover"
                  onClick={() => handleNavigation('/about')}
                >
                  About Us
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 0.5 }}>
                <Link 
                  href="#" 
                  color="text.secondary" 
                  variant="body2" 
                  underline="hover"
                  onClick={() => handleNavigation('/features')}
                >
                  Features
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 0.5 }}>
                <Link 
                  href="#" 
                  color="text.secondary" 
                  variant="body2" 
                  underline="hover"
                  onClick={() => handleNavigation('/contact')}
                >
                  Contact Us
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 0.5 }}>
                <Link 
                  href="#" 
                  color="text.secondary" 
                  variant="body2" 
                  underline="hover"
                  onClick={() => handleNavigation('/faq')}
                >
                  FAQs
                </Link>
              </Box>
            </Box>
          </Grid>

          {/* Legal & Privacy */}
          <Grid item xs={6} sm={6} md={2}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Legal & Privacy</Typography>
            <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
              <Box component="li" sx={{ mb: 0.5 }}>
                <Link 
                  href="#" 
                  color="text.secondary" 
                  variant="body2" 
                  underline="hover"
                  onClick={() => handleNavigation('/privacy-policy')}
                >
                  Privacy Policy
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 0.5 }}>
                <Link 
                  href="#" 
                  color="text.secondary" 
                  variant="body2" 
                  underline="hover"
                  onClick={() => handleNavigation('/terms-of-service')}
                >
                  Terms of Service
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 0.5 }}>
                <Link 
                  href="#" 
                  color="text.secondary" 
                  variant="body2" 
                  underline="hover"
                  onClick={() => handleNavigation('/data-protection')}
                >
                  Data Protection
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 0.5 }}>
                <Link 
                  href="#" 
                  color="text.secondary" 
                  variant="body2" 
                  underline="hover"
                  onClick={() => handleNavigation('/cookie-policy')}
                >
                  Cookie Policy
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      
      {/* Bottom Bar */}
      <Box 
        sx={{ 
          py: 2, 
          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.02)',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Box 
            sx={{ 
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'center', sm: 'center' },
              textAlign: { xs: 'center', sm: 'left' },
              gap: { xs: 1, sm: 0 }
            }}
          >
            <Typography variant="caption" color="text.secondary">
              © {currentYear} HealthNex. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Footer;