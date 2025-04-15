import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '@mui/material/styles';

const HealthOverview = () => {
  const theme = useTheme();

  // Sample data for the chart
  const healthData = [
    { name: 'Mon', heartRate: 72, steps: 8542 },
    { name: 'Tue', heartRate: 75, steps: 9200 },
    { name: 'Wed', heartRate: 70, steps: 7800 },
    { name: 'Thu', heartRate: 68, steps: 9500 },
    { name: 'Fri', heartRate: 71, steps: 8800 },
    { name: 'Sat', heartRate: 73, steps: 10000 },
    { name: 'Sun', heartRate: 69, steps: 7500 },
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
        Health Overview
      </Typography>
      <Box sx={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={healthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="heartRate"
              stroke={theme.palette.primary.main}
              name="Heart Rate"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="steps"
              stroke={theme.palette.secondary.main}
              name="Steps"
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default HealthOverview; 