import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const ProfileHeader = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{ mr: 2 }}
      >
        Back
      </Button>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
        Profile
      </Typography>
    </Box>
  );
};

export default ProfileHeader; 