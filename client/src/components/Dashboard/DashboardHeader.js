import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const DashboardHeader = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
      <IconButton 
        onClick={() => navigate('/')}
        sx={{ mr: 2 }}
      >
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
        Dashboard
      </Typography>
    </Box>
  );
};

export default DashboardHeader; 