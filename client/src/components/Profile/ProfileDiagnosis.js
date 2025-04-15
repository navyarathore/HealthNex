import React from 'react';
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Chip,
  Box,
} from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const ProfileDiagnosis = ({ diagnosisHistory }) => {
  return (
    <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
      <Typography variant="h6" gutterBottom>
        Diagnosis History
      </Typography>
      <List>
        {diagnosisHistory.map((diagnosis) => (
          <ListItem
            key={diagnosis.id}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              mb: 2,
            }}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <MedicalServicesIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="subtitle1">
                    {diagnosis.condition}
                  </Typography>
                  <Chip
                    label={`${diagnosis.confidence}% confidence`}
                    size="small"
                    color="primary"
                  />
                </Box>
              }
              secondary={
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Date: {diagnosis.date}
                  </Typography>
                  <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {diagnosis.symptoms.map((symptom, index) => (
                      <Chip
                        key={index}
                        label={symptom}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default ProfileDiagnosis; 