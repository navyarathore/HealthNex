import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const DashboardHeader = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', py: 1 }}>
      <IconButton onClick={() => navigate('/')} size="small">
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h5" component="h1" sx={{ ml: 1 }}>
        Dashboard
      </Typography>
    </Box>
  );
};

export default DashboardHeader;