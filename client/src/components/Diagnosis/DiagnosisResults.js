import React from 'react';
import {
  Paper,
  Box,
  Typography,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const DiagnosisResults = ({ diagnosis }) => {
  if (!diagnosis) return null;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <MedicalServicesIcon sx={{ mr: 2, color: 'primary.main' }} />
        <Typography variant="h5" component="h2">
          Diagnosis Results
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          {diagnosis.condition}
        </Typography>
        <Chip
          label={`${diagnosis.confidence}% Confidence`}
          color="primary"
          variant="outlined"
          sx={{ mb: 2 }}
        />
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" gutterBottom>
          Identified Symptoms:
        </Typography>
        <List dense>
          {diagnosis.symptoms.map((symptom, index) => (
            <ListItem key={index}>
              <ListItemText primary={symptom} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Recommendations:
        </Typography>
        <List dense>
          {diagnosis.recommendations.map((recommendation, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText primary={recommendation} />
              </ListItem>
              {index < diagnosis.recommendations.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default DiagnosisResults; 