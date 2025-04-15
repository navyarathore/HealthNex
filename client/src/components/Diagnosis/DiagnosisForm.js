import React from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';

const DiagnosisForm = ({ symptoms, isLoading, onSubmit, onInputChange }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        border: '1px solid',
        borderColor: 'divider',
        mb: 4,
      }}
    >
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Describe Your Symptoms
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Please describe your symptoms in detail. Include information about when they started, 
          their severity, and any other relevant details that might help with the diagnosis.
        </Typography>
        
        <TextField
          multiline
          rows={4}
          fullWidth
          value={symptoms}
          onChange={onInputChange}
          placeholder="Example: I've had a persistent cough for 3 days, along with a mild fever and fatigue..."
          required
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={20} /> : <PsychologyIcon />}
          sx={{ alignSelf: 'flex-start' }}
        >
          {isLoading ? 'Analyzing...' : 'Get Diagnosis'}
        </Button>
      </Box>
    </Paper>
  );
};

export default DiagnosisForm; 