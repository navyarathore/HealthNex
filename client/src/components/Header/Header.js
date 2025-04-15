import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import NavButtons from './NavButtons';
import AuthButtons from './AuthButtons';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          HealthNex
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          {isAuthenticated ? (
            <NavButtons isActive={isActive} navigate={navigate} />
          ) : (
            <AuthButtons isActive={isActive} navigate={navigate} />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 