import React from 'react';
import {
  Paper,
  Grid,
  Avatar,
  Typography,
  Box,
  LinearProgress,
  Button,
  TextField,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const ProfileOverview = ({ profileData, isEditing, onEdit, onSave, onInputChange }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        border: '1px solid',
        borderColor: 'divider',
        mb: 4,
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                bgcolor: 'primary.main',
                mb: 2,
              }}
            >
              <PersonIcon sx={{ fontSize: 60 }} />
            </Avatar>
            <Typography variant="h5" gutterBottom>
              {profileData.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Member since 2023
            </Typography>
            <Box sx={{ mt: 2, width: '100%' }}>
              <Typography variant="subtitle2" gutterBottom>
                Health Score
              </Typography>
              <LinearProgress
                variant="determinate"
                value={85}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: 'background.paper',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: 'success.main',
                  },
                }}
              />
              <Typography variant="caption" color="text.secondary">
                85% - Excellent
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            {isEditing ? (
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={onSave}
              >
                Save Changes
              </Button>
            ) : (
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={onEdit}
              >
                Edit Profile
              </Button>
            )}
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                value={profileData.name}
                onChange={onInputChange('name')}
                fullWidth
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                value={profileData.email}
                onChange={onInputChange('email')}
                fullWidth
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Age"
                value={profileData.age}
                onChange={onInputChange('age')}
                fullWidth
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Gender"
                value={profileData.gender}
                onChange={onInputChange('gender')}
                fullWidth
                disabled={!isEditing}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProfileOverview; 