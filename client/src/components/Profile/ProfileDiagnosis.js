import React, { useState, useEffect } from 'react';
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
  CircularProgress,
  Alert
} from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { useAuth } from '../../contexts/AuthContext';

const ProfileDiagnosis = () => {
  const [diagnosisHistory, setDiagnosisHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchDiagnosisHistory = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const token = await getToken();
        const response = await fetch('/api/diagnosis/history', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setDiagnosisHistory(data);
      } catch (err) {
        console.error('Error fetching diagnosis history:', err);
        setError('Failed to load diagnosis history');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDiagnosisHistory();
  }, [getToken]);

  if (isLoading) {
    return (
      <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
        <CircularProgress size={40} />
        <Typography variant="body2" sx={{ mt: 2 }}>Loading diagnosis history...</Typography>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
        <Alert severity="error">{error}</Alert>
      </Paper>
    );
  }

  if (diagnosisHistory.length === 0) {
    return (
      <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6" gutterBottom>
          Diagnosis History
        </Typography>
        <Typography variant="body2" color="text.secondary">
          No previous diagnoses found. Use the AI Symptom Diagnosis feature to get health insights.
        </Typography>
      </Paper>
    );
  }

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
                    Date: {new Date(diagnosis.date).toLocaleDateString()}
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