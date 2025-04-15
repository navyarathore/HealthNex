import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const StatCard = ({ icon, title, subtitle, value, footer }) => (
  <Card elevation={0} sx={{ 
    border: '1px solid', 
    borderColor: 'divider',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'translateY(-4px)',
    }
  }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.light', mr: 2 }}>
          {icon}
        </Avatar>
        <Box>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2" color="text.secondary">{subtitle}</Typography>
        </Box>
      </Box>
      <Typography variant="h4" color="primary.main">{value}</Typography>
      <Typography variant="body2" color="text.secondary">{footer}</Typography>
    </CardContent>
  </Card>
);

const StatsOverview = () => {
  const stats = [
    {
      icon: <MonitorHeartIcon />,
      title: 'Heart Rate',
      subtitle: '72 BPM',
      value: '72',
      footer: 'Normal Range'
    },
    {
      icon: <FitnessCenterIcon />,
      title: 'Steps',
      subtitle: 'Today',
      value: '8,542',
      footer: 'Goal: 10,000'
    },
    {
      icon: <LocalHospitalIcon />,
      title: 'Appointments',
      subtitle: 'Upcoming',
      value: '2',
      footer: 'Next: Tomorrow'
    },
    {
      icon: <NotificationsActiveIcon />,
      title: 'Medications',
      subtitle: 'Due Today',
      value: '3',
      footer: 'Next: 2 hours'
    }
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <StatCard {...stat} />
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsOverview; 