import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography, Divider } from '@mui/material';
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

  const firstName = profileData?.firstName || userProfile?.firstName || 'User';
  const today = new Date();
  const hour = today.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <DashboardHeader />
      
      <Box sx={{ my: 3 }}>
        <Typography variant="h5" color="text.secondary">
          {greeting}, {firstName}!
        </Typography>
        <Divider sx={{ my: 2 }} />
      </Box>
      
      <StatsOverview loading={loading} profileData={profileData} />
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Box sx={{ mb: 3 }}>
            <HealthOverview />
          </Box>
          <HealthGoals />
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <WeatherWidget />
            <RecentActivity />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;