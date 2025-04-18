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
  Alert,
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

      {diagnosis.message && (
        <Alert severity="info" sx={{ mb: 3 }}>
          {diagnosis.message}
        </Alert>
      )}

      {diagnosis.condition && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            {diagnosis.condition}
          </Typography>
          {diagnosis.confidence > 0 && (
            <Chip
              label={`${diagnosis.confidence}% Confidence`}
              color="primary"
              variant="outlined"
              sx={{ mb: 2 }}
            />
          )}
        </Box>
      )}

      {diagnosis.symptoms && diagnosis.symptoms.length > 0 && (
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
      )}

      {diagnosis.recommendations && diagnosis.recommendations.length > 0 && (
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
      )}
    </Paper>
  );
};

export default DiagnosisResults;