import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box, CircularProgress, Divider } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import UmbrellaIcon from '@mui/icons-material/Umbrella';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AirIcon from '@mui/icons-material/Air';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Mock weather data fetch - in a real app, you would fetch from a weather API
    const fetchWeather = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock weather data
        const mockWeather = {
          location: 'New York, NY',
          current: {
            temp: 72,
            condition: 'Clear',
            humidity: 45,
            windSpeed: 8,
            healthIndex: 'Good',
            healthAdvice: 'Great day for outdoor activities!'
          },
          forecast: [
            { day: 'Today', high: 75, low: 65, condition: 'Sunny' },
            { day: 'Tomorrow', high: 68, low: 60, condition: 'Cloudy' }
          ]
        };
        
        setWeather(mockWeather);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch weather data:', err);
        setError('Unable to load weather information');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
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

  const getHealthIndexColor = (index) => {
    switch (index.toLowerCase()) {
      case 'excellent':
        return '#4CAF50';
      case 'good':
        return '#8BC34A';
      case 'moderate':
        return '#FFC107';
      case 'poor':
        return '#FF9800';
      case 'unhealthy':
        return '#F44336';
      default:
        return '#8BC34A';
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
      <Typography variant="h6" gutterBottom>Weather & Health</Typography>
      
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress size={40} />
        </Box>
      )}
      
      {error && (
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Typography color="error">{error}</Typography>
        </Box>
      )}
      
      {!loading && !error && weather && (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box>
              <Typography variant="body2" color="text.secondary">{weather.location}</Typography>
              <Typography variant="h4">{weather.current.temp}°F</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {getWeatherIcon(weather.current.condition)}
                <Typography variant="body1" sx={{ ml: 0.5 }}>{weather.current.condition}</Typography>
              </Box>
            </Box>
            
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="body2" color="text.secondary">Health Index</Typography>
              <Typography 
                variant="h6" 
                sx={{ color: getHealthIndexColor(weather.current.healthIndex) }}
              >
                {weather.current.healthIndex}
              </Typography>
            </Box>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>Health Advice</Typography>
            <Typography variant="body2">{weather.current.healthAdvice}</Typography>
          </Box>
          
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-around' }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">Humidity</Typography>
              <Typography variant="body2">{weather.current.humidity}%</Typography>
            </Box>
            <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">Wind</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AirIcon fontSize="small" sx={{ mr: 0.5 }} />
                <Typography variant="body2">{weather.current.windSpeed} mph</Typography>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default WeatherWidget;