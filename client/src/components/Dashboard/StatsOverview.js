import React, { useMemo } from 'react';
import { Grid, Card, CardContent, Typography, Box, Avatar, Tooltip } from '@mui/material';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import TodayIcon from '@mui/icons-material/Today';

const StatCard = ({ icon, iconColor, title, subtitle, value, footer, trend, trendValue, trendDirection }) => {
  // Function to determine trend icon and color
  const getTrendIcon = () => {
    if (!trendDirection) return null;
    
    const trendProps = { fontSize: 'small', sx: { ml: 0.5 } };
    
    switch (trendDirection) {
      case 'up':
        return <TrendingUpIcon {...trendProps} color="success" />;
      case 'down':
        return <TrendingDownIcon {...trendProps} color="error" />;
      case 'flat':
        return <TrendingFlatIcon {...trendProps} color="action" />;
      default:
        return null;
    }
  };

  return (
    <Card elevation={0} sx={{ 
      border: '1px solid', 
      borderColor: 'divider',
      borderRadius: 2,
      transition: 'all 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      }
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: `${iconColor}20`, color: iconColor, mr: 1.5 }}>
              {icon}
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem', lineHeight: 1.2 }}>
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">{subtitle}</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TodayIcon fontSize="small" sx={{ color: 'text.disabled' }} />
          </Box>
        </Box>
        
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }} color="primary.main">
          {value}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            {footer}
          </Typography>
          
          {trendValue && (
            <Tooltip title={trend}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    fontWeight: 500,
                    color: trendDirection === 'up' ? 'success.main' : 
                           trendDirection === 'down' ? 'error.main' : 
                           'text.secondary'
                  }}
                >
                  {trendValue}
                </Typography>
                {getTrendIcon()}
              </Box>
            </Tooltip>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

const StatsOverview = ({ startDate = new Date() }) => {
  // Generate stats based on the selected date range
  const stats = useMemo(() => [
    {
      icon: <MonitorHeartIcon />,
      iconColor: '#f44336', // red
      title: 'Heart Rate',
      subtitle: 'Average',
      value: '72 BPM',
      footer: 'Normal Range',
      trend: 'Down from last week',
      trendValue: '2%',
      trendDirection: 'down'
    },
    {
      icon: <LocalHospitalIcon />,
      iconColor: '#009688', // teal
      title: 'Appointments',
      subtitle: 'Upcoming',
      value: '2',
      footer: 'Next: Tomorrow',
      trend: 'Same as last week',
      trendValue: '0',
      trendDirection: 'flat'
    },
    {
      icon: <NotificationsActiveIcon />,
      iconColor: '#ff9800', // orange
      title: 'Medications',
      subtitle: 'Due Today',
      value: '3',
      footer: 'Next: 2 hours',
      trend: 'Up from yesterday',
      trendValue: '1',
      trendDirection: 'up'
    }
  ], []);

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