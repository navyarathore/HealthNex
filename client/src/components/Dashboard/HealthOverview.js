import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import MedicationIcon from '@mui/icons-material/Medication';
import AssignmentIcon from '@mui/icons-material/Assignment';

const HealthOverview = () => {
  const healthItems = [
    {
      id: 'appointment1',
      icon: <EventAvailableIcon color="primary" />,
      title: 'General Checkup',
      details: 'Dr. Smith • April 20 • 10:00 AM'
    },
    {
      id: 'medication1',
      icon: <MedicationIcon sx={{ color: '#f44336' }} />,
      title: 'Vitamin D Supplement',
      details: 'Daily • Morning'
    },
    {
      id: 'medication2',
      icon: <MedicationIcon sx={{ color: '#f44336' }} />,
      title: 'Allergy Medication',
      details: 'Daily • Evening'
    },
    {
      id: 'report1',
      icon: <AssignmentIcon sx={{ color: '#009688' }} />,
      title: 'Blood Work Results',
      details: 'Available for review'
    }
  ];

  return (
    <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Health Overview</Typography>
      
      <List>
        {healthItems.map((item) => (
          <ListItem key={item.id} sx={{ py: 1.5 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.title}
              secondary={item.details}
              primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
              secondaryTypographyProps={{ variant: 'caption' }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default HealthOverview;