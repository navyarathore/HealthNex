import React from 'react';
import { Button } from '@mui/material';

const NavButtons = ({ isActive, navigate }) => {
  return (
    <>
      <Button
        color="inherit"
        onClick={() => navigate('/dashboard')}
        sx={{
          backgroundColor: isActive('/dashboard') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
        }}
      >
        Dashboard
      </Button>
      <Button
        color="inherit"
        onClick={() => navigate('/diagnosis')}
        sx={{
          backgroundColor: isActive('/diagnosis') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
        }}
      >
        Diagnosis
      </Button>
      <Button
        color="inherit"
        onClick={() => navigate('/profile')}
        sx={{
          backgroundColor: isActive('/profile') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
        }}
      >
        Profile
      </Button>
      <Button
        color="inherit"
        onClick={() => navigate('/logout')}
      >
        Logout
      </Button>
    </>
  );
};

export default NavButtons;