import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import LandingNav from '../components/LandingNav';
import Footer from '../components/Footer';

const PageNotFound = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <LandingNav />
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <Container maxWidth="md">
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at center, rgba(144, 202, 249, 0.1), transparent 60%)',
                pointerEvents: 'none'
              }
            }}
          >
            <ErrorOutlineIcon
              sx={{
                fontSize: 120,
                color: 'primary.main',
                mb: 4,
                filter: 'drop-shadow(0 0 20px rgba(144, 202, 249, 0.3))'
              }}
            />
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #90caf9 0%, #42a5f5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2
              }}
            >
              404
            </Typography>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{ mb: 2, color: 'text.primary' }}
            >
              Page Not Found
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}
            >
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/')}
              sx={{
                boxShadow: '0 4px 14px rgba(144, 202, 249, 0.3)',
                '&:hover': {
                  boxShadow: '0 6px 20px rgba(144, 202, 249, 0.4)'
                }
              }}
            >
              Go to Homepage
            </Button>
          </Box>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default PageNotFound; 