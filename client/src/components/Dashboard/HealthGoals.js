import React from 'react';
import { Paper, Typography, Box, LinearProgress, Chip } from '@mui/material';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import HotelIcon from '@mui/icons-material/Hotel';

const HealthGoals = () => {
  const goals = [
    {
      id: 'steps',
      icon: <DirectionsRunIcon fontSize="small" />,
      name: 'Daily Steps',
      current: 8542,
      target: 10000,
      unit: 'steps',
      color: '#3f51b5'
    },
    {
      id: 'heartRate',
      icon: <FavoriteIcon fontSize="small" />,
      name: 'Cardio Exercise',
      current: 25,
      target: 30,
      unit: 'minutes',
      color: '#f44336'
    },
    {
      id: 'nutrition',
      icon: <LocalDiningIcon fontSize="small" />,
      name: 'Water Intake',
      current: 1.8,
      target: 2.5,
      unit: 'liters',
      color: '#2196f3'
    },
    {
      id: 'sleep',
      icon: <HotelIcon fontSize="small" />,
      name: 'Sleep',
      current: 6.5,
      target: 8,
      unit: 'hours',
      color: '#9c27b0'
    }
  ];

  const calculateProgress = (current, target) => {
    return Math.min(Math.round((current / target) * 100), 100);
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">Health Goals</Typography>
        <Chip 
          label="Weekly View" 
          color="primary" 
          size="small" 
          variant="outlined" 
        />
      </Box>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {goals.map((goal) => (
          <Box key={goal.id}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ 
                  mr: 1, 
                  bgcolor: `${goal.color}20`, 
                  color: goal.color,
                  borderRadius: '50%',
                  width: 28,
                  height: 28,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {goal.icon}
                </Box>
                <Typography variant="body2">{goal.name}</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {goal.current} / {goal.target} {goal.unit}
              </Typography>
            </Box>
            
            <Box sx={{ position: 'relative' }}>
              <LinearProgress 
                variant="determinate" 
                value={calculateProgress(goal.current, goal.target)} 
                sx={{ 
                  height: 8, 
                  borderRadius: 1,
                  backgroundColor: `${goal.color}20`,
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: goal.color
                  }
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default HealthGoals;