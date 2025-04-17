import React from 'react';
import { 
  Paper, Typography, List, ListItem, ListItemText,
  Divider, Box, Button
} from '@mui/material';
import { format } from 'date-fns';

const RecentActivity = () => {
  // Simplified activities with minimal styling and details
  const activities = [
    {
      id: 1,
      primary: 'Doctor Appointment',
      date: new Date(2025, 3, 16), // April 16, 2025
      details: 'Dr. Smith - General checkup'
    },
    {
      id: 2,
      primary: 'Medication Taken',
      date: new Date(2025, 3, 17), // April 17, 2025
      details: 'Vitamin D supplement'
    },
    {
      id: 3,
      primary: 'Lab Results',
      date: new Date(2025, 3, 15), // April 15, 2025
      details: 'Blood work completed'
    },
    {
      id: 4,
      primary: 'Appointment Scheduled',
      date: new Date(2025, 3, 17), // April 17, 2025
      details: 'Dental check-up for May 2'
    }
  ];

  // Format date in a simple format
  const formatDate = (date) => {
    return format(date, 'MMM d');
  };

  return (
    <Paper elevation={0} sx={{ 
      p: 3, 
      border: '1px solid', 
      borderColor: 'divider'
    }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Recent Activity
      </Typography>

      <List disablePadding>
        {activities.map((activity, index) => (
          <React.Fragment key={activity.id}>
            <ListItem disableGutters sx={{ py: 1.5 }}>
              <ListItemText
                primary={activity.primary}
                secondary={
                  <Typography variant="caption" color="text.secondary" component="span">
                    {formatDate(activity.date)} · {activity.details}
                  </Typography>
                }
                primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
              />
            </ListItem>
            {index < activities.length - 1 && <Divider component="li" />}
          </React.Fragment>
        ))}
      </List>
      
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <Button 
          size="small" 
          color="primary"
          sx={{ mt: 1 }}
        >
          View All Activity
        </Button>
      </Box>
    </Paper>
  );
};

export default RecentActivity;