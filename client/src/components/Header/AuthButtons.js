import React from 'react';
import { Button } from '@mui/material';

const AuthButtons = ({ isActive, navigate }) => {
  return (
    <>
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