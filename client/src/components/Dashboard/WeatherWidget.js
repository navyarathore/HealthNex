import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box, CircularProgress } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import UmbrellaIcon from '@mui/icons-material/Umbrella';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock weather data fetch
    const fetchWeather = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock weather data
        setWeather({
          location: 'Greater Noida, UP',
          current: {
            temp: 72,
            condition: 'Clear',
            humidity: 45,
            healthIndex: 'Good',
            healthAdvice: 'Great day for outdoor activities!'
          }
        });
      } catch (err) {
        console.error('Failed to fetch weather data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <WbSunnyIcon sx={{ color: '#FFB300' }} />;
      case 'cloudy':
      case 'partly cloudy':
        return <CloudIcon sx={{ color: '#78909C' }} />;
      case 'rainy':
      case 'rain':
        return <UmbrellaIcon sx={{ color: '#42A5F5' }} />;
      case 'snow':
      case 'snowy':
        return <AcUnitIcon sx={{ color: '#90CAF9' }} />;
      case 'stormy':
      case 'thunderstorm':
        return <ThunderstormIcon sx={{ color: '#5C6BC0' }} />;
      default:
        return <CloudIcon sx={{ color: '#78909C' }} />;
    }
  };

  return (
    <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Weather</Typography>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
          <CircularProgress size={24} />
        </Box>
      ) : weather && (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="body2">{weather.location}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {getWeatherIcon(weather.current.condition)}
              <Typography variant="h6" sx={{ ml: 1 }}>{weather.current.temp}°F</Typography>
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {weather.current.healthAdvice}
          </Typography>
        </>
      )}
    </Paper>
  );
};

export default WeatherWidget;