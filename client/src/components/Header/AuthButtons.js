import React from 'react';
import { Button } from '@mui/material';

const AuthButtons = ({ isActive, navigate }) => {
  return (
    <>
      <Button
        color="inherit"
        onClick={() => navigate('/features')}
        sx={{
          backgroundColor: isActive('/features') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
        }}
      >
        Features
      </Button>
      <Button
        color="inherit"
        onClick={() => navigate('/about')}
        sx={{
          backgroundColor: isActive('/about') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
        }}
      >
        About
      </Button>
      <Button
        color="inherit"
        onClick={() => navigate('/contact')}
        sx={{
          backgroundColor: isActive('/contact') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
        }}
      >
        Contact
      </Button>
      <Button
        color="inherit"
        onClick={() => navigate('/login')}
        sx={{
          backgroundColor: isActive('/login') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
        }}
      >
        Login
      </Button>
      <Button
        color="inherit"
        onClick={() => navigate('/register')}
        sx={{
          backgroundColor: isActive('/register') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
        }}
      >
        Register
      </Button>
    </>
  );
};

export default AuthButtons;