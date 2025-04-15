import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  useTheme,
  useMediaQuery,
  Alert
} from '@mui/material';
import LandingNav from '../components/LandingNav';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { login, getProfile } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await login(formData.email, formData.password);
      // Get user profile data
      const profile = await getProfile();
      if (!profile) {
        navigate('/profile-setup');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #121212 0%, #1a1a1a 100%)',
      color: 'rgba(255, 255, 255, 0.87)'
    }}>
      <LandingNav />
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', py: 8 }}>
        <Container maxWidth="sm">
          <Paper
            elevation={3}
            sx={{
              p: 4,
              background: 'linear-gradient(145deg, #1a1a1a, #2a2a2a)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              position: 'relative',
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
                border: '1px solid rgba(64, 196, 255, 0.15)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
              }
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              align="center"
              gutterBottom
              sx={{ 
                color: '#40C4FF', 
                mb: 3,
                textShadow: '0 0 20px rgba(64, 196, 255, 0.2)',
                fontWeight: 500
              }}
            >
              Welcome Back
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
                disabled={loading}
                sx={{ 
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.08)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(64, 196, 255, 0.15)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#40C4FF',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                  },
                  '& .MuiInputBase-input': {
                    color: 'rgba(255, 255, 255, 0.87)',
                  }
                }}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                required
                disabled={loading}
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.08)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(64, 196, 255, 0.15)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#40C4FF',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                  },
                  '& .MuiInputBase-input': {
                    color: 'rgba(255, 255, 255, 0.87)',
                  }
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  mb: 2,
                  backgroundColor: '#40C4FF',
                  color: '#121212',
                  boxShadow: '0 4px 14px rgba(64, 196, 255, 0.2)',
                  '&:hover': {
                    backgroundColor: '#33B8FF',
                    boxShadow: '0 6px 20px rgba(64, 196, 255, 0.3)',
                  }
                }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
              <Box sx={{ textAlign: 'center' }}>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => navigate('/register')}
                  sx={{ 
                    color: '#40C4FF',
                    '&:hover': {
                      color: '#33B8FF'
                    }
                  }}
                >
                  Don't have an account? Sign Up
                </Link>
              </Box>
            </form>
          </Paper>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Login; 