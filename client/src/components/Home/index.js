import React from 'react';
import { Box } from '@mui/material';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import TestimonialsSection from './TestimonialsSection';
import InnovationsSection from './InnovationsSection';
import Layout from '../Layout';

const Home = () => {
  return (
    <Layout>
      <Box sx={{ flex: 1 }}>
        <HeroSection />
        <FeaturesSection />
        <InnovationsSection />
        <TestimonialsSection />
      </Box>
    </Layout>
  );
};

export default Home; 