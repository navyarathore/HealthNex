import React from 'react';
import {
  Paper,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Box,
  Skeleton,
  Divider,
  Chip,
} from '@mui/material';
// import MedicalServices from '@mui/icons-material/MedicalServices';
import AccessTime from '@mui/icons-material/AccessTime';
// import LocalHospital from '@mui/icons-material/LocalHospital';
// import FitnessCenter from '@mui/icons-material/FitnessCenter';
import MonitorHeart from '@mui/icons-material/MonitorHeart';
import Bloodtype from '@mui/icons-material/Bloodtype';
import Height from '@mui/icons-material/Height';
import Scale from '@mui/icons-material/Scale';
import CalendarMonth from '@mui/icons-material/CalendarMonth';
import Medication from '@mui/icons-material/Medication';
import Warning from '@mui/icons-material/Warning';
import Coronavirus from '@mui/icons-material/Coronavirus';

const ProfileMetrics = ({ profileData, loading = false }) => {
  // Format metrics with appropriate units
  const formatHeight = (height) => {
    if (!height) return 'Not specified';
    return `${height} cm`;
  };
  
  const formatWeight = (weight) => {
    if (!weight) return 'Not specified';
    return `${weight} kg`;
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };
  
  const getBMICategory = (bmi) => {
    if (!bmi) return '';
    const numBmi = parseFloat(bmi);
    if (numBmi < 18.5) return '(Underweight)';
    if (numBmi < 25) return '(Normal)';
    if (numBmi < 30) return '(Overweight)';
    return '(Obese)';
  };

  const healthMetrics = [
    { icon: <Bloodtype />, label: 'Blood Type', value: profileData?.bloodType || 'Not specified' },
    { icon: <Height />, label: 'Height', value: formatHeight(profileData?.height) },
    { icon: <Scale />, label: 'Weight', value: formatWeight(profileData?.weight) },
    { icon: <MonitorHeart />, label: 'BMI', value: profileData?.bmi ? `${profileData.bmi} ${getBMICategory(profileData.bmi)}` : 'Not calculated' },
    // { icon: <LocalHospital />, label: 'Blood Pressure', value: profileData?.bloodPressure || 'Not specified' },
    // { icon: <FitnessCenter />, label: 'Heart Rate', value: profileData?.heartRate ? `${profileData.heartRate} bpm` : 'Not specified' },
  ];

  const medicalInfo = [
    { icon: <CalendarMonth />, label: 'Last Checkup', value: formatDate(profileData?.lastCheckup) },
    { icon: <AccessTime />, label: 'Next Checkup', value: formatDate(profileData?.nextCheckup) },
  ];

  return (
    <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Health Metrics
          </Typography>
          {loading ? (
            <Box sx={{ pt: 1 }}>
              {[...Array(6)].map((_, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
                  <Skeleton variant="text" width="60%" height={40} />
                </Box>
              ))}
            </Box>
          ) : (
            <List>
              {healthMetrics.map((metric, index) => (
                <ListItem key={index} sx={{ py: 1 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {metric.icon}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={metric.label}
                    secondary={metric.value}
                    primaryTypographyProps={{ fontWeight: 'medium' }}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Medical Information
          </Typography>
          {loading ? (
            <Box sx={{ pt: 1 }}>
              {[...Array(2)].map((_, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
                  <Skeleton variant="text" width="60%" height={40} />
                </Box>
              ))}
            </Box>
          ) : (
            <List>
              {medicalInfo.map((info, index) => (
                <ListItem key={index} sx={{ py: 1 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.light' }}>
                      {info.icon}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={info.label}
                    secondary={info.value}
                    primaryTypographyProps={{ fontWeight: 'medium' }}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Grid>
        
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Medical Conditions
          </Typography>
          {loading ? (
            <Skeleton variant="rectangular" height={100} />
          ) : (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              {profileData?.conditions && profileData.conditions.length > 0 ? (
                profileData.conditions.map((condition, index) => (
                  <Chip 
                    key={index} 
                    icon={<Coronavirus />} 
                    label={condition} 
                    color="default" 
                    variant="outlined" 
                  />
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">No medical conditions reported</Typography>
              )}
            </Box>
          )}
        </Grid>
        
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Allergies
          </Typography>
          {loading ? (
            <Skeleton variant="rectangular" height={100} />
          ) : (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              {profileData?.allergies && profileData.allergies.length > 0 ? (
                profileData.allergies.map((allergy, index) => (
                  <Chip 
                    key={index} 
                    icon={<Warning />} 
                    label={allergy} 
                    color="error" 
                    variant="outlined" 
                  />
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">No allergies reported</Typography>
              )}
            </Box>
          )}
        </Grid>
        
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Current Medications
          </Typography>
          {loading ? (
            <Skeleton variant="rectangular" height={100} />
          ) : (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              {profileData?.medications && profileData.medications.length > 0 ? (
                profileData.medications.map((medication, index) => (
                  <Chip 
                    key={index} 
                    icon={<Medication />} 
                    label={medication} 
                    color="primary" 
                    variant="outlined"
                  />
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">No medications reported</Typography>
              )}
            </Box>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProfileMetrics;