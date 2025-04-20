import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout();
        navigate('/');
      } catch (error) {
        console.error('Logout error:', error);
        navigate('/');
      }
    };

    performLogout();
  }, [logout, navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        bgcolor: 'background.default'
      }}
    >
      <CircularProgress size={60} sx={{ mb: 4, color: 'primary.main' }} />
      <Typography variant="h5" color="text.primary">
        Logging out...
      </Typography>
    </Box>
  );
};

export default Logout;