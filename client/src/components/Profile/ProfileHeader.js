import React from 'react';
import { Box, Typography, Button, Skeleton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const ProfileHeader = ({ loading = false }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/dashboard')}
        sx={{ 
          mr: 2,
          color: '#40C4FF'
        }}
        disabled={loading}
      >
        Back to Dashboard
      </Button>
      {loading ? (
        <Skeleton variant="text" width={120} height={40} />
      ) : (
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: '#40C4FF' }}>
          My Profile
        </Typography>
      )}
    </Box>
  );
};

export default ProfileHeader;