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
  Alert
} from '@mui/material';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, getProfile } = useAuth();
  const [formData, setFormData] = useState({
    email: 'test@gmail.com',
    password: 'testingpassword'
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
    <Layout>
      <Box sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
        color: 'rgba(255, 255, 255, 0.87)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Flowing Circles Background */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
            overflow: 'hidden',
            '& .circle': {
              position: 'absolute',
              borderRadius: '50%',
              opacity: '0.15',
              animation: 'flow 20s linear infinite',
            },
            '& .c1': {
              width: '150px',
              height: '150px',
              background: '#40C4FF',
              left: '10%',
              animationDelay: '0s',
            },
            '& .c2': {
              width: '100px',
              height: '100px',
              background: '#29B6F6',
              left: '35%',
              animationDelay: '-5s',
            },
            '& .c3': {
              width: '120px',
              height: '120px',
              background: '#03A9F4',
              left: '60%',
              animationDelay: '-10s',
            },
            '& .c4': {
              width: '80px',
              height: '80px',
              background: '#0288D1',
              left: '85%',
              animationDelay: '-15s',
            },
            '@keyframes flow': {
              '0%': {
                top: '-20%',
                transform: 'translateX(0) rotate(0deg)',
              },
              '50%': {
                transform: 'translateX(-100px) rotate(180deg)',
              },
              '100%': {
                top: '120%',
                transform: 'translateX(0) rotate(360deg)',
              }
            },
          }}
        >
          <div className="circle c1" />
          <div className="circle c2" />
          <div className="circle c3" />
          <div className="circle c4" />
          <div className="circle c1" style={{ left: '25%', animationDelay: '-7s' }} />
          <div className="circle c2" style={{ left: '50%', animationDelay: '-12s' }} />
          <div className="circle c3" style={{ left: '75%', animationDelay: '-17s' }} />
          <div className="circle c4" style={{ left: '95%', animationDelay: '-3s' }} />
        </Box>

        {/* Enhanced Animated Background Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
            overflow: 'hidden',
            '& .orb': {
              position: 'absolute',
              borderRadius: '50%',
              filter: 'blur(60px)',
              opacity: 0.5,
              transition: 'all 0.3s ease',
            },
            '& .orb1': {
              top: '-5%',
              left: '-5%',
              width: '500px',
              height: '500px',
              background: 'radial-gradient(circle, rgba(64, 196, 255, 0.4), transparent 70%)',
              animation: 'float1 15s infinite ease-in-out',
            },
            '& .orb2': {
              top: '50%',
              right: '-10%',
              width: '600px',
              height: '600px',
              background: 'radial-gradient(circle, rgba(100, 220, 255, 0.3), transparent 70%)',
              animation: 'float2 20s infinite ease-in-out',
            },
            '& .orb3': {
              bottom: '-10%',
              left: '30%',
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(0, 150, 255, 0.35), transparent 70%)',
              animation: 'float3 17s infinite ease-in-out',
            },
            '& .orb4': {
              top: '20%',
              right: '20%',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(128, 206, 255, 0.25), transparent 70%)',
              animation: 'float4 22s infinite ease-in-out',
            },
            '@keyframes float1': {
              '0%, 100%': {
                transform: 'translate(0, 0) scale(1)',
              },
              '50%': {
                transform: 'translate(100px, 50px) scale(1.1)',
              }
            },
            '@keyframes float2': {
              '0%, 100%': {
                transform: 'translate(0, 0) scale(1)',
              },
              '50%': {
                transform: 'translate(-100px, -50px) scale(0.9)',
              }
            },
            '@keyframes float3': {
              '0%, 100%': {
                transform: 'translate(0, 0) rotate(0)',
              },
              '50%': {
                transform: 'translate(50px, -30px) rotate(180deg)',
              }
            },
            '@keyframes float4': {
              '0%, 100%': {
                transform: 'translate(0, 0) scale(1)',
              },
              '50%': {
                transform: 'translate(-30px, 50px) scale(1.2)',
              }
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
              pointerEvents: 'none',
            }
          }}
        >
          <div className="orb orb1" />
          <div className="orb orb2" />
          <div className="orb orb3" />
          <div className="orb orb4" />
        </Box>

        <Box sx={{ 
          flex: 1, 
          display: 'flex', 
          alignItems: 'center', 
          py: 8, 
          position: 'relative', 
          zIndex: 1,
          backdropFilter: 'blur(5px)'
        }}>
          <Container maxWidth="sm">
            <Paper
              elevation={3}
              sx={{
                p: 4,
                background: 'linear-gradient(145deg, rgba(26, 26, 26, 0.8), rgba(42, 42, 42, 0.9))',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'radial-gradient(circle at top right, rgba(64, 196, 255, 0.1), transparent 60%)',
                  pointerEvents: 'none'
                },
                '&:hover': {
                  border: '1px solid rgba(64, 196, 255, 0.2)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  '& .orb': {
                    opacity: 0.6,
                  }
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
                  textShadow: '0 0 20px rgba(0, 255, 200, 0.2)',
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
                        borderColor: 'rgba(0, 255, 200, 0.15)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#00FFC8',
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
                    backgroundColor: '#00FFC8',
                    color: '#121212',
                    boxShadow: '0 4px 14px rgba(0, 255, 200, 0.2)',
                    '&:hover': {
                      backgroundColor: '#00E6B5',
                      boxShadow: '0 6px 20px rgba(0, 255, 200, 0.3)',
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
                      color: '#00FFC8',
                      '&:hover': {
                        color: '#00E6B5'
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
      </Box>
    </Layout>
  );
};

export default Login;