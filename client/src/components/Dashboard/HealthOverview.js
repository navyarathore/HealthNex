import React, { useState, useMemo } from 'react';
import { Paper, Typography, Box, ToggleButtonGroup, ToggleButton, Tooltip, useTheme } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { format, subDays, eachDayOfInterval } from 'date-fns';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HotelIcon from '@mui/icons-material/Hotel';

const HealthOverview = ({ startDate = new Date() }) => {
  const theme = useTheme();
  const [selectedMetrics, setSelectedMetrics] = useState(['heartRate', 'steps']);

  // Generate health data based on the selected date range
  const healthData = useMemo(() => {
    const endDate = new Date();
    const dateRange = eachDayOfInterval({ start: startDate, end: endDate });
    
    return dateRange.map(date => {
      const formattedDate = format(date, 'MMM dd');
      // Generate some random data fluctuating around a baseline
      const heartRateBase = 70;
      const heartRate = Math.round(heartRateBase + (Math.random() * 10 - 5));
      
      const stepsBase = 8000;
      const steps = Math.round(stepsBase + (Math.random() * 3000 - 1000));
      
      const caloriesBase = 2000;
      const calories = Math.round(caloriesBase + (Math.random() * 400 - 200));
      
      const sleepBase = 7;
      const sleep = parseFloat((sleepBase + (Math.random() * 2 - 1)).toFixed(1));
      
      return {
        name: formattedDate,
        date: date,
        heartRate,
        steps,
        calories,
        sleep
      };
    });
  }, [startDate]);

  const handleMetricsChange = (event, newMetrics) => {
    if (newMetrics.length) {
      setSelectedMetrics(newMetrics);
    }
  };

  const metricConfig = {
    heartRate: { 
      name: 'Heart Rate',
      color: theme.palette.primary.main,
      unit: 'BPM',
      icon: <FavoriteIcon fontSize="small" />,
      recommendedRange: { min: 60, max: 100 }
    },
    steps: { 
      name: 'Steps', 
      color: theme.palette.secondary.main,
      unit: 'steps',
      icon: <DirectionsRunIcon fontSize="small" />,
      recommendedRange: { min: 7500, max: null }
    },
    calories: { 
      name: 'Calories', 
      color: '#FF9800',
      unit: 'cal',
      icon: <RestaurantIcon fontSize="small" />,
      recommendedRange: { min: 1800, max: 2500 }
    },
    sleep: { 
      name: 'Sleep', 
      color: '#9C27B0',
      unit: 'hrs',
      icon: <HotelIcon fontSize="small" />,
      recommendedRange: { min: 7, max: 9 }
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            bgcolor: 'background.paper',
            p: 2,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            boxShadow: 1
          }}
        >
          <Typography variant="subtitle2">{label}</Typography>
          {payload.map((entry, index) => {
            const metric = Object.keys(metricConfig).find(key => key === entry.dataKey);
            const config = metricConfig[metric];
            
            return (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Box 
                  sx={{ 
                    width: 12, 
                    height: 12, 
                    borderRadius: '50%', 
                    backgroundColor: entry.color, 
                    mr: 1 
                  }} 
                />
                <Typography variant="body2" color="text.secondary">
                  {config.name}: <strong>{entry.value} {config.unit}</strong>
                </Typography>
              </Box>
            );
          })}
        </Box>
      );
    }
    return null;
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Health Overview
        </Typography>
        
        <ToggleButtonGroup 
          value={selectedMetrics}
          onChange={handleMetricsChange}
          aria-label="health metrics"
          size="small"
        >
          {Object.entries(metricConfig).map(([key, config]) => (
            <ToggleButton value={key} key={key} aria-label={config.name}>
              <Tooltip title={config.name}>
                {config.icon}
              </Tooltip>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
      
      <Box sx={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={healthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              tickMargin={10}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              tick={{ fontSize: 12 }}
              tickMargin={10}
              domain={['dataMin - 10', 'dataMax + 10']}
              hide={!selectedMetrics.includes('heartRate')}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 12 }}
              tickMargin={10}
              domain={['dataMin - 1000', 'dataMax + 1000']}
              hide={!selectedMetrics.includes('steps')}
            />
            <YAxis
              yAxisId="calories"
              orientation="right"
              tick={{ fontSize: 12 }}
              tickMargin={10}
              domain={['dataMin - 200', 'dataMax + 200']}
              hide={!selectedMetrics.includes('calories')}
            />
            <YAxis
              yAxisId="sleep"
              orientation="right"
              tick={{ fontSize: 12 }}
              tickMargin={10}
              domain={[0, 12]}
              hide={!selectedMetrics.includes('sleep')}
            />
            <RechartsTooltip content={<CustomTooltip />} />
            <Legend />
            
            {selectedMetrics.includes('heartRate') && (
              <>
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="heartRate"
                  stroke={metricConfig.heartRate.color}
                  name="Heart Rate"
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
                {metricConfig.heartRate.recommendedRange.min && (
                  <ReferenceLine 
                    y={metricConfig.heartRate.recommendedRange.min} 
                    yAxisId="left" 
                    stroke={metricConfig.heartRate.color}
                    strokeDasharray="3 3" 
                  />
                )}
                {metricConfig.heartRate.recommendedRange.max && (
                  <ReferenceLine 
                    y={metricConfig.heartRate.recommendedRange.max} 
                    yAxisId="left" 
                    stroke={metricConfig.heartRate.color} 
                    strokeDasharray="3 3" 
                  />
                )}
              </>
            )}
            
            {selectedMetrics.includes('steps') && (
              <>
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="steps"
                  stroke={metricConfig.steps.color}
                  name="Steps"
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
                {metricConfig.steps.recommendedRange.min && (
                  <ReferenceLine 
                    y={metricConfig.steps.recommendedRange.min} 
                    yAxisId="right" 
                    stroke={metricConfig.steps.color} 
                    strokeDasharray="3 3" 
                  />
                )}
              </>
            )}
            
            {selectedMetrics.includes('calories') && (
              <>
                <Line
                  yAxisId="calories"
                  type="monotone"
                  dataKey="calories"
                  stroke={metricConfig.calories.color}
                  name="Calories"
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
                {metricConfig.calories.recommendedRange.min && (
                  <ReferenceLine 
                    y={metricConfig.calories.recommendedRange.min} 
                    yAxisId="calories" 
                    stroke={metricConfig.calories.color} 
                    strokeDasharray="3 3" 
                  />
                )}
                {metricConfig.calories.recommendedRange.max && (
                  <ReferenceLine 
                    y={metricConfig.calories.recommendedRange.max} 
                    yAxisId="calories" 
                    stroke={metricConfig.calories.color} 
                    strokeDasharray="3 3" 
                  />
                )}
              </>
            )}
            
            {selectedMetrics.includes('sleep') && (
              <>
                <Line
                  yAxisId="sleep"
                  type="monotone"
                  dataKey="sleep"
                  stroke={metricConfig.sleep.color}
                  name="Sleep"
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
                {metricConfig.sleep.recommendedRange.min && (
                  <ReferenceLine 
                    y={metricConfig.sleep.recommendedRange.min} 
                    yAxisId="sleep" 
                    stroke={metricConfig.sleep.color} 
                    strokeDasharray="3 3" 
                  />
                )}
                {metricConfig.sleep.recommendedRange.max && (
                  <ReferenceLine 
                    y={metricConfig.sleep.recommendedRange.max} 
                    yAxisId="sleep" 
                    stroke={metricConfig.sleep.color} 
                    strokeDasharray="3 3" 
                  />
                )}
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </Box>
      
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Reference lines indicate recommended ranges
        </Typography>
      </Box>
    </Paper>
  );
};

export default HealthOverview;