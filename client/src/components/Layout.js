import React from 'react';
import { Box } from '@mui/material';
import Header from './Header/Header';
import Footer from './Footer';
import { useAuth } from '../contexts/AuthContext';

const Layout = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ flex: 1 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;