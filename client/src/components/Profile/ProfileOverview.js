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
  Skeleton,
  MenuItem,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const ProfileOverview = ({ 
  profileData, 
  isEditing, 
  onEdit, 
  onSave, 
  onInputChange,
  loading = false 
}) => {
  // Calculate health score based on profile completeness
  const calculateHealthScore = () => {
    if (!profileData) return 0;
    
    const fields = [
      'firstName', 'lastName', 'age', 'gender', 'bloodType', 
      'height', 'weight', 'bloodPressure', 'heartRate'
    ];
    
    const filledFields = fields.filter(field => !!profileData[field]).length;
    return Math.round((filledFields / fields.length) * 100);
  };
  
  const healthScore = calculateHealthScore();
  
  const getHealthStatus = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Attention';
  };
  
  const fullName = profileData ? 
    `${profileData.firstName} ${profileData.lastName}`.trim() : 
    'Loading...';

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
            {loading ? (
              <Skeleton variant="circular" width={120} height={120} sx={{ mb: 2 }} />
            ) : (
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
            )}
            
            {loading ? (
              <Skeleton variant="text" width={150} height={30} />
            ) : (
              <Typography variant="h5" gutterBottom>
                {fullName}
              </Typography>
            )}
            
            {loading ? (
              <Skeleton variant="text" width={120} height={20} />
            ) : (
              <Typography variant="body2" color="text.secondary">
                Member since {new Date().getFullYear()}
              </Typography>
            )}
            
            <Box sx={{ mt: 2, width: '100%' }}>
              <Typography variant="subtitle2" gutterBottom>
                Profile Completeness
              </Typography>
              {loading ? (
                <Skeleton variant="rectangular" width="100%" height={10} sx={{ borderRadius: 5 }} />
              ) : (
                <>
                  <LinearProgress
                    variant="determinate"
                    value={healthScore}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: 'background.paper',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: healthScore >= 80 ? 'success.main' : 
                                        healthScore >= 60 ? 'warning.main' : 'error.main',
                      },
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {healthScore}% - {getHealthStatus(healthScore)}
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            {loading ? (
              <Skeleton variant="rectangular" width={120} height={36} sx={{ borderRadius: 1 }} />
            ) : isEditing ? (
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
              {loading ? (
                <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
              ) : (
                <TextField
                  label="First Name"
                  value={profileData?.firstName || ''}
                  onChange={onInputChange('firstName')}
                  fullWidth
                  disabled={!isEditing || loading}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              {loading ? (
                <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
              ) : (
                <TextField
                  label="Last Name"
                  value={profileData?.lastName || ''}
                  onChange={onInputChange('lastName')}
                  fullWidth
                  disabled={!isEditing || loading}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              {loading ? (
                <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
              ) : (
                <TextField
                  label="Email"
                  value={profileData?.email || ''}
                  onChange={onInputChange('email')}
                  fullWidth
                  disabled={true} // Email should not be editable
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              {loading ? (
                <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
              ) : (
                <TextField
                  label="Age"
                  value={profileData?.age || ''}
                  onChange={onInputChange('age')}
                  fullWidth
                  type="number"
                  disabled={!isEditing || loading}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              {loading ? (
                <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
              ) : (
                <TextField
                  select
                  label="Gender"
                  value={profileData?.gender || ''}
                  onChange={onInputChange('gender')}
                  fullWidth
                  disabled={!isEditing || loading}
                >
                  <MenuItem value="">Select Gender</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                  <MenuItem value="prefer-not-to-say">Prefer not to say</MenuItem>
                </TextField>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              {loading ? (
                <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
              ) : (
                <TextField
                  select
                  label="Blood Type"
                  value={profileData?.bloodType || ''}
                  onChange={onInputChange('bloodType')}
                  fullWidth
                  disabled={!isEditing || loading}
                >
                  <MenuItem value="">Select Blood Type</MenuItem>
                  <MenuItem value="A+">A+</MenuItem>
                  <MenuItem value="A-">A-</MenuItem>
                  <MenuItem value="B+">B+</MenuItem>
                  <MenuItem value="B-">B-</MenuItem>
                  <MenuItem value="AB+">AB+</MenuItem>
                  <MenuItem value="AB-">AB-</MenuItem>
                  <MenuItem value="O+">O+</MenuItem>
                  <MenuItem value="O-">O-</MenuItem>
                </TextField>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProfileOverview;