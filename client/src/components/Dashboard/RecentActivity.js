import React, { useState, useMemo } from 'react';
import { 
  Paper, Typography, List, ListItem, ListItemText, ListItemIcon, 
  ListItemSecondaryAction, IconButton, Divider, Box, Pagination, 
  Chip, Button
} from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import { differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';

const RecentActivity = ({ startDate = new Date() }) => {
  const [page, setPage] = useState(1);
  const [viewAll, setViewAll] = useState(false);
  
  const itemsPerPage = 4;
  
  // Generate mock activities based on the selected start date
  const allActivities = useMemo(() => {
    const now = new Date();
    const mockActivities = [
      {
        id: 1,
        type: 'vitals',
        icon: <TimelineIcon color="primary" />,
        primary: 'Blood Pressure Check',
        secondary: '120/80 mmHg - Normal',
        timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
        chipLabel: 'Vitals'
      },
      {
        id: 2,
        type: 'exercise',
        icon: <FitnessCenterIcon color="secondary" />,
        primary: 'Morning Walk',
        secondary: '30 minutes - 2.5 miles',
        timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000), // 4 hours ago
        chipLabel: 'Exercise'
      },
      {
        id: 3,
        type: 'appointment',
        icon: <LocalHospitalIcon sx={{ color: '#f44336' }} />,
        primary: 'Doctor Appointment',
        secondary: 'Dr. Smith - General checkup',
        timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000), // yesterday
        chipLabel: 'Appointment'
      },
      {
        id: 4,
        type: 'medication',
        icon: <NotificationsIcon sx={{ color: '#ff9800' }} />,
        primary: 'Medication Reminder',
        secondary: 'Vitamin D - Daily supplement',
        timestamp: new Date(now.getTime() - 12 * 60 * 60 * 1000), // 12 hours ago
        chipLabel: 'Medication'
      },
      {
        id: 5,
        type: 'exercise',
        icon: <SportsGymnasticsIcon color="secondary" />,
        primary: 'Yoga Session',
        secondary: '45 minutes - Flexibility focus',
        timestamp: new Date(now.getTime() - 8 * 60 * 60 * 1000), // 8 hours ago
        chipLabel: 'Exercise'
      },
      {
        id: 6,
        type: 'nutrition',
        icon: <LocalDiningIcon sx={{ color: '#4caf50' }} />,
        primary: 'Meal Tracking',
        secondary: 'Lunch - 650 calories',
        timestamp: new Date(now.getTime() - 6 * 60 * 60 * 1000), // 6 hours ago
        chipLabel: 'Nutrition'
      }
    ];
    
    // Filter activities based on the start date
    return mockActivities.filter(activity => activity.timestamp >= startDate);
  }, [startDate]);
  
  // Apply pagination
  const paginatedActivities = useMemo(() => {
    if (viewAll) {
      return allActivities;
    }
    const startIndex = (page - 1) * itemsPerPage;
    return allActivities.slice(startIndex, startIndex + itemsPerPage);
  }, [allActivities, page, viewAll, itemsPerPage]);

  const getTimeString = (timestamp) => {
    const now = new Date();
    const diffDays = differenceInDays(now, timestamp);
    const diffHours = differenceInHours(now, timestamp);
    const diffMinutes = differenceInMinutes(now, timestamp);
    
    if (diffDays > 0) {
      return diffDays === 1 ? 'Yesterday' : `${diffDays} days ago`;
    } else if (diffHours > 0) {
      return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      return `${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`;
    }
  };
  
  const getChipColor = (type) => {
    switch (type) {
      case 'vitals':
        return 'primary';
      case 'exercise':
        return 'secondary';
      case 'appointment':
        return 'error';
      case 'medication':
        return 'warning';
      case 'nutrition':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Paper elevation={0} sx={{ 
      p: 3, 
      border: '1px solid', 
      borderColor: 'divider',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
      }
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          Recent Activity
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {allActivities.length} activities
        </Typography>
      </Box>

      {paginatedActivities.length > 0 ? (
        <List sx={{ minHeight: 290 }}>
          {paginatedActivities.map((activity, index) => (
            <React.Fragment key={activity.id}>
              <ListItem 
                sx={{ 
                  pr: 6, 
                  bgcolor: 'transparent',
                  transition: 'background-color 0.2s',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  }
                }}
              >
                <ListItemIcon>
                  {activity.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, mr: 1 }}>
                        {activity.primary}
                      </Typography>
                      <Chip 
                        label={activity.chipLabel} 
                        size="small" 
                        color={getChipColor(activity.type)}
                        variant="outlined"
                        sx={{ height: 20, fontSize: '0.625rem' }}
                      />
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" component="span">
                        {activity.secondary}
                      </Typography>
                      <Typography variant="caption" component="div" color="text.secondary">
                        {getTimeString(activity.timestamp)}
                      </Typography>
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="more" size="small">
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              {index < paginatedActivities.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Box sx={{ py: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
          <Typography color="text.secondary">
            No activities found for this time period
          </Typography>
        </Box>
      )}
      
      {allActivities.length > 0 && (
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {!viewAll && allActivities.length > itemsPerPage && (
            <Pagination 
              count={Math.ceil(allActivities.length / itemsPerPage)} 
              page={page} 
              onChange={(e, value) => setPage(value)}
              size="small"
              shape="rounded"
            />
          )}
          
          <Button 
            onClick={() => setViewAll(!viewAll)} 
            size="small" 
            color="primary"
            sx={{ ml: 'auto' }}
          >
            {viewAll ? 'Show Less' : 'View All'}
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default RecentActivity;