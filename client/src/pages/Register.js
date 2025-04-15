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

const Register = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const result = await register(formData.name, formData.email, formData.password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: '#121212',
      color: 'rgba(255, 255, 255, 0.87)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <LandingNav />
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        py: 8,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at center, rgba(0, 255, 200, 0.02) 0%, transparent 70%)',
          pointerEvents: 'none'
        }
      }}>
        <Container maxWidth="sm">
          <Paper
            elevation={3}
            sx={{
              p: 4,
              background: 'linear-gradient(145deg, #1a1a1a, #2a2a2a)',
              border: '1px solid rgba(0, 255, 200, 0.08)',
              position: 'relative',
              backdropFilter: 'blur(10px)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at top right, rgba(0, 255, 200, 0.03), transparent 40%)',
                pointerEvents: 'none'
              },
              '&:hover': {
                border: '1px solid rgba(0, 255, 200, 0.15)',
                boxShadow: '0 8px 24px rgba(0, 255, 200, 0.1)',
                transform: 'translateY(-2px)',
                transition: 'all 0.3s ease-in-out'
              }
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              align="center"
              gutterBottom
              sx={{ 
                color: '#00FFC8', 
                mb: 3,
                textShadow: '0 0 20px rgba(64, 196, 255, 0.2)',
                fontWeight: 500
              }}
            >
              Create Account
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
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
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
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
                {loading ? 'Creating Account...' : 'Sign Up'}
              </Button>
              <Box sx={{ textAlign: 'center' }}>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => navigate('/login')}
                  sx={{ 
                    color: '#40C4FF',
                    '&:hover': {
                      color: '#33B8FF'
                    }
                  }}
                >
                  Already have an account? Sign In
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

export default Register; 