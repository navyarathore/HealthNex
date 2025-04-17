import React, { useState } from 'react';
import { Container, Box, Alert } from '@mui/material';
import DiagnosisHeader from './DiagnosisHeader';
import DiagnosisForm from './DiagnosisForm';
import DiagnosisResults from './DiagnosisResults';
import { useAuth } from '../../contexts/AuthContext';

const Diagnosis = () => {
  const [symptoms, setSymptoms] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);
  const [error, setError] = useState(null);
  const { getToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const token = await getToken();
      const response = await fetch('/api/diagnosis/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ symptoms })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const diagnosisData = await response.json();
      setDiagnosis(diagnosisData);
    } catch (err) {
      console.error("Error getting diagnosis:", err);
      setError("Failed to get diagnosis. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <DiagnosisHeader />
        <DiagnosisForm
          symptoms={symptoms}
          isLoading={isLoading}
          onSubmit={handleSubmit}
          onInputChange={(e) => setSymptoms(e.target.value)}
        />
        {diagnosis && <DiagnosisResults diagnosis={diagnosis} />}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default Diagnosis;