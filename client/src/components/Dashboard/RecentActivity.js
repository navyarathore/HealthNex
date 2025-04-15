import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText, ListItemIcon, Divider } from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const RecentActivity = () => {
  const activities = [
    {
      icon: <TimelineIcon color="primary" />,
      primary: 'Blood Pressure Check',
      secondary: '2 hours ago'
    },
    {
      icon: <FitnessCenterIcon color="primary" />,
      primary: 'Morning Walk',
      secondary: '4 hours ago'
    },
    {
      icon: <LocalHospitalIcon color="primary" />,
      primary: 'Doctor Appointment',
      secondary: 'Yesterday'
    }
  ];

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
      <Typography variant="h6" gutterBottom>
        Recent Activity
      </Typography>
      <List>
        {activities.map((activity, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemIcon>
                {activity.icon}
              </ListItemIcon>
              <ListItemText
                primary={activity.primary}
                secondary={activity.secondary}
              />
            </ListItem>
            {index < activities.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default RecentActivity; 