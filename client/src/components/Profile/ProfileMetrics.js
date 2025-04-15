import React from 'react';
import {
  Paper,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
  Box,
} from '@mui/material';
import MedicalServices from '@mui/icons-material/MedicalServices';
import AccessTime from '@mui/icons-material/AccessTime';
import LocalHospital from '@mui/icons-material/LocalHospital';
import FitnessCenter from '@mui/icons-material/FitnessCenter';
import MonitorHeart from '@mui/icons-material/MonitorHeart';
import Bloodtype from '@mui/icons-material/Bloodtype';
import Height from '@mui/icons-material/Height';
import Scale from '@mui/icons-material/Scale';
import CalendarMonth from '@mui/icons-material/CalendarMonth';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ProfileMetrics = ({ profileData, healthMetrics }) => {
  const metrics = [
    { icon: <Bloodtype />, label: 'Blood Type', value: profileData.bloodType },
    { icon: <Height />, label: 'Height', value: profileData.height },
    { icon: <Scale />, label: 'Weight', value: profileData.weight },
    { icon: <MonitorHeart />, label: 'BMI', value: profileData.bmi },
    { icon: <LocalHospital />, label: 'Blood Pressure', value: profileData.bloodPressure },
    { icon: <FitnessCenter />, label: 'Heart Rate', value: `${profileData.heartRate} bpm` },
    { icon: <CalendarMonth />, label: 'Last Checkup', value: profileData.lastCheckup },
    { icon: <AccessTime />, label: 'Next Checkup', value: profileData.nextCheckup },
  ];

  return (
    <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Health Metrics
          </Typography>
          <List>
            {metrics.map((metric, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {metric.icon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={metric.label}
                  secondary={metric.value}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Health Trends
          </Typography>
          <Box sx={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={healthMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                <Line type="monotone" dataKey="bmi" stroke="#82ca9d" />
                <Line type="monotone" dataKey="heartRate" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProfileMetrics; 