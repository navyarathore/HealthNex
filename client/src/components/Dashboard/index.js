import React from 'react';
import { Container, Grid } from '@mui/material';
import DashboardHeader from './DashboardHeader';
import StatsOverview from './StatsOverview';
import HealthOverview from './HealthOverview';
import RecentActivity from './RecentActivity';

const Dashboard = () => {
  return (
    <Container maxWidth="lg">
      <DashboardHeader />
      <StatsOverview />
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <HealthOverview />
        </Grid>
        <Grid item xs={12} md={4}>
          <RecentActivity />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 