import React from 'react';
import { Box, Tabs, Tab } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ProfileTabs = ({ tabValue, onTabChange, children }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabValue}
          onChange={onTabChange}
          aria-label="profile tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Health Metrics" />
          <Tab label="Diagnosis History" />
          <Tab label="Emergency Contact" />
        </Tabs>
      </Box>
      {children}
    </Box>
  );
};

export { TabPanel, ProfileTabs }; 