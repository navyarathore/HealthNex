import React from 'react';
import { Box } from '@mui/material';
import LandingNav from './LandingNav';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <LandingNav />
      <Box sx={{ flex: 1 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout; 