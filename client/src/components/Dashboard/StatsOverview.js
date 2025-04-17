import React, { useMemo } from 'react';
import { Grid, Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const StatCard = ({ icon, iconColor, title, value, footer }) => (
  <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
    <CardContent sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar sx={{ bgcolor: `${iconColor}20`, color: iconColor, mr: 1.5, width: 36, height: 36 }}>
          {icon}
        </Avatar>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }} color="primary.main">
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {footer}
      </Typography>
    </CardContent>
  </Card>
);

const StatsOverview = ({ loading, profileData }) => {
  const stats = useMemo(() => [
    {
      icon: <LocalHospitalIcon fontSize="small" />,
      iconColor: '#009688',
      title: 'Appointments',
      value: '2',
      footer: 'Next: Tomorrow, 10:00 AM'
    },
    {
      icon: <NotificationsActiveIcon fontSize="small" />,
      iconColor: '#ff9800',
      title: 'Medications',
      value: '3',
      footer: 'Next: Today, 2:00 PM'
    },
    {
      icon: <CalendarTodayIcon fontSize="small" />,
      iconColor: '#3f51b5',
      title: 'Health Checks',
      value: '1',
      footer: 'In 3 days'
    }
  ], []);

  if (loading) return null;

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={4} key={index}>
          <StatCard {...stat} />
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsOverview;