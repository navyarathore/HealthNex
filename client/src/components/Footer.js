import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Link,
  Grid,
  IconButton,
  Divider
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              HealthNex
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Empowering individuals to take control of their health through innovative tracking and analysis.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton 
                color="primary" 
                aria-label="Facebook"
                sx={{
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                    color: 'primary.light',
                  },
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton 
                color="primary" 
                aria-label="Twitter"
                sx={{
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                    color: 'primary.light',
                  },
                }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton 
                color="primary" 
                aria-label="LinkedIn"
                sx={{
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                    color: 'primary.light',
                  },
                }}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton 
                color="primary" 
                aria-label="Instagram"
                sx={{
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                    color: 'primary.light',
                  },
                }}
              >
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/" color="text.secondary" underline="hover">
                Home
              </Link>
              <Link href="/dashboard" color="text.secondary" underline="hover">
                Dashboard
              </Link>
              <Link href="/about" color="text.secondary" underline="hover">
                About Us
              </Link>
              <Link href="/contact" color="text.secondary" underline="hover">
                Contact
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Have questions? We're here to help.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: support@healthnex.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: (123) 456-7890
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Address: 123 Health Street, Wellness City
            </Typography>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} HealthNex. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="/privacy" color="text.secondary" variant="body2" underline="hover">
              Privacy Policy
            </Link>
            <Link href="/terms" color="text.secondary" variant="body2" underline="hover">
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;