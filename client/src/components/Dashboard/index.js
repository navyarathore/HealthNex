import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography, TextField, MenuItem, Divider, Paper, Skeleton } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { format, subDays } from 'date-fns';
import DashboardHeader from './DashboardHeader';
import StatsOverview from './StatsOverview';
import HealthOverview from './HealthOverview';
import RecentActivity from './RecentActivity';
import HealthGoals from './HealthGoals';
import WeatherWidget from './WeatherWidget';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
  const { userProfile, getProfile } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('week');
  const [customDate, setCustomDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(subDays(new Date(), 7));

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const data = await getProfile();
        setProfileData(data);
      } catch (error) {
        console.error("Error loading profile data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProfileData();
  }, [getProfile]);

  const handleDateRangeChange = (event) => {
    const value = event.target.value;
    setDateRange(value);
    
    // Update the selected date based on the range
    switch (value) {
      case 'today':
        setSelectedDate(new Date());
        break;
      case 'week':
        setSelectedDate(subDays(new Date(), 7));
        break;
      case 'month':
        setSelectedDate(subDays(new Date(), 30));
        break;
      case 'custom':
        setSelectedDate(customDate);
        break;
      default:
        setSelectedDate(new Date());
    }
  };

  const handleCustomDateChange = (newDate) => {
    setCustomDate(newDate);
    if (dateRange === 'custom') {
      setSelectedDate(newDate);
    }
  };

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const firstName = profileData?.firstName || userProfile?.firstName || 'User';

  return (
    <Container maxWidth="lg">
      <Box mb={4} mt={2}>
        <DashboardHeader />
        
        <Box sx={{ my: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          {loading ? (
            <Skeleton variant="text" width={300} height={40} />
          ) : (
            <Typography variant="h5" color="text.secondary" sx={{ mb: { xs: 2, md: 0 } }}>
              {getGreeting()}, {firstName}!
            </Typography>
          )}
          
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              select
              label="Date Range"
              value={dateRange}
              onChange={handleDateRangeChange}
              size="small"
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="week">Past Week</MenuItem>
              <MenuItem value="month">Past Month</MenuItem>
              <MenuItem value="custom">Custom</MenuItem>
            </TextField>
            
            {dateRange === 'custom' && (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Custom Date"
                  value={customDate}
                  onChange={handleCustomDateChange}
                  renderInput={(params) => <TextField size="small" {...params} />}
                />
              </LocalizationProvider>
            )}
          </Box>
        </Box>
      </Box>
      
      {loading ? (
        <Skeleton variant="rectangular" width="100%" height={200} sx={{ mb: 3 }} />
      ) : (
        <StatsOverview startDate={selectedDate} profileData={profileData} />
      )}
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {loading ? (
              <Skeleton variant="rectangular" width="100%" height={300} />
            ) : (
              <HealthOverview startDate={selectedDate} profileData={profileData} />
            )}
            <HealthGoals profileData={profileData} loading={loading} />
          </Box>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <WeatherWidget />
            {loading ? (
              <Skeleton variant="rectangular" width="100%" height={200} />
            ) : (
              <RecentActivity startDate={selectedDate} />
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;