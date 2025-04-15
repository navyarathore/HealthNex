import React, { useState } from 'react';
import { Container, Box, Alert } from '@mui/material';
import DiagnosisHeader from './DiagnosisHeader';
import DiagnosisForm from './DiagnosisForm';
import DiagnosisResults from './DiagnosisResults';

const Diagnosis = () => {
  const [symptoms, setSymptoms] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate AI diagnosis (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock diagnosis response
      setDiagnosis({
        condition: "Common Cold",
        confidence: 85,
        symptoms: [
          "Runny nose",
          "Sore throat",
          "Cough",
          "Mild fever"
        ],
        recommendations: [
          "Get plenty of rest",
          "Stay hydrated",
          "Use over-the-counter cold medicine",
          "Monitor temperature",
          "Consult a doctor if symptoms worsen"
        ]
      });
    } catch (err) {
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
        <DiagnosisResults diagnosis={diagnosis} />
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