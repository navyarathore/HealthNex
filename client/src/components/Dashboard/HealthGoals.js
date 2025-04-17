import React from 'react';
import { Paper, Typography, Box, Checkbox, List, ListItem, ListItemText } from '@mui/material';

const HealthGoals = () => {
  const goals = [
    {
      id: 'medication',
      text: 'Take all medications today',
      completed: true,
    },
    {
      id: 'checkup',
      text: 'Schedule annual physical',
      completed: false,
    },
    {
      id: 'nutrition',
      text: 'Log today\'s meals',
      completed: false,
    },
    {
      id: 'labwork',
      text: 'Review lab results',
      completed: false,
    }
  ];

  const completedCount = goals.filter(goal => goal.completed).length;

  return (
    <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Health Goals</Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {completedCount} of {goals.length} completed
      </Typography>
      
      <List>
        {goals.map((goal) => (
          <ListItem 
            key={goal.id}
            disableGutters
            sx={{ py: 1.5 }}
          >
            <Checkbox 
              edge="start"
              checked={goal.completed}
              size="small"
              sx={{ ml: -0.5, mr: 0.5 }}
            />
            <ListItemText 
              primary={goal.text}
              primaryTypographyProps={{ 
                variant: 'body2',
                sx: { 
                  textDecoration: goal.completed ? 'line-through' : 'none',
                  color: goal.completed ? 'text.disabled' : 'text.primary',
                }
              }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default HealthGoals;