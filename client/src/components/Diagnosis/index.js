import React, { useState, useEffect } from 'react';
import { Container, Box, Alert, Typography, Button } from '@mui/material';
import DiagnosisHeader from './DiagnosisHeader';
import DiagnosisForm from './DiagnosisForm';
import DiagnosisResults from './DiagnosisResults';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const Diagnosis = () => {
  const { currentUser, getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);
  const [error, setError] = useState(null);
  const [apiAvailable, setApiAvailable] = useState(true);
  const [token, setToken] = useState(null);

  // Get authentication token and check API availability on component mount
  useEffect(() => {
    const initialize = async () => {
      // Check if user is authenticated
      if (!currentUser) {
        setError("Please log in to use the diagnosis feature");
        return;
      }

      try {
        // Get token from AuthContext
        const authToken = await getToken();
        setToken(authToken);
        
        // Store token in localStorage for API interceptors to use
        localStorage.setItem('token', authToken);
        
        // Then check API status
        try {
          await api.get('/health');
          console.log("Health check passed successfully");
          
          const statusResponse = await api.get('/api/diagnosis/status');
          console.log("Diagnosis API status:", statusResponse.data);
          setApiAvailable(true);
        } catch (err) {
          console.error("API check failed:", err);
          
          if (err.response?.status === 503) {
            setApiAvailable(false);
          }
        }
      } catch (err) {
        console.error("Error getting authentication token:", err);
        setError("Authentication error. Please log in again.");
      }
    };
    
    initialize();
  }, [currentUser, getToken]);

  // Handle the symptom data submitted from DiagnosisForm
  const handleSubmit = async (data) => {
    if (!currentUser || !token) {
      setError("Please log in to use the diagnosis feature");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setDiagnosis(null);
    
    // Log the data being sent for debugging
    console.log("Submitting diagnosis data:", data);
    
    try {
      // Make API call to the backend with the auth token
      const response = await api.post('/api/diagnosis/analyze', data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Set the diagnosis from the API response
      setDiagnosis(response.data);
      
      // Check if API is in fallback mode
      if (response.data.fallbackMode) {
        setApiAvailable(false);
      }
    } catch (err) {
      console.error('Diagnosis error:', err);
      
      if (!currentUser) {
        setError("Please log in to use the diagnosis feature");
      } else if (err.response?.status === 401) {
        setError("Your session has expired. Please log in again.");
        localStorage.removeItem('token');
      } else if (err.response?.status === 503) {
        setApiAvailable(false);
        setDiagnosis({
          condition: "Common Cold (Demo Only)",
          confidence: 85,
          symptoms: data.symptoms.map(s => s.description),
          recommendations: [
            "Get plenty of rest",
            "Stay hydrated",
            "Use over-the-counter cold medicine",
            "Monitor temperature",
            "Consult a doctor if symptoms worsen"
          ],
          message: "This is a demonstration diagnosis. The AI service is currently unavailable.",
          fallbackMode: true
        });
      } else if (err.response) {
        // Show specific error message from server if available
        setError(err.response.data.message || 
                "There was a problem with your request. Please try again.");
      } else if (err.request) {
        // Network error - no response received
        setError("Cannot connect to the server. Please check your internet connection and try again.");
      } else {
        // Other errors
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Follow-up questions handler
  const handleRequestFollowUp = async () => {
    if (!diagnosis || !diagnosis.id) {
      setError("Cannot generate follow-up questions for this diagnosis.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Make API call for follow-up questions
      const response = await api.post(`/api/diagnosis/follow-up/${diagnosis.id}`, {
        symptoms: diagnosis.symptoms,
        patientInfo: diagnosis.patientInfo || {}
      });
      
      // Update diagnosis with follow-up questions
      setDiagnosis({
        ...diagnosis,
        followUpQuestions: response.data.followUpQuestions
      });
    } catch (err) {
      console.error('Follow-up questions error:', err);
      
      if (!apiAvailable) {
        // If API is unavailable, show mock follow-up questions
        setDiagnosis({
          ...diagnosis,
          followUpQuestions: "What other symptoms have you experienced? How long have you had these symptoms? Any history of similar symptoms in the past?"
        });
      } else {
        setError("Failed to get follow-up questions.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Analyze specific condition handler
  const handleAnalyzeCondition = async (condition) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Make API call for condition analysis
      const response = await api.post('/api/diagnosis/analyze-condition', {
        symptoms: diagnosis.symptoms,
        patientInfo: diagnosis.patientInfo || {},
        condition: condition
      });
      
      // Update diagnosis with condition analysis
      setDiagnosis({
        ...diagnosis,
        conditionAnalysis: response.data.analysis,
        analyzedCondition: condition
      });
    } catch (err) {
      console.error('Condition analysis error:', err);
      
      if (!apiAvailable) {
        // If API is unavailable, show mock condition analysis
        setDiagnosis({
          ...diagnosis,
          conditionAnalysis: `This is a demo analysis of ${condition}. The actual AI-powered analysis is currently unavailable.`,
          analyzedCondition: condition
        });
      } else {
        setError(`Failed to analyze ${condition}.`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Reset error and retry connection
  const handleRetry = async () => {
    setError(null);
    
    // Try to get a fresh token
    if (currentUser) {
      try {
        const authToken = await getToken();
        setToken(authToken);
        localStorage.setItem('token', authToken);
        
        // Refresh the page after getting a new token
        window.location.reload();
      } catch (err) {
        setError("Failed to refresh authentication. Please log in again.");
      }
    } else {
      // Redirect to login if no user
      window.location.href = '/login';
    }
  };

  // If user is not authenticated, show login prompt
  if (!currentUser) {
    return (
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <DiagnosisHeader />
          <Alert 
            severity="warning" 
            sx={{ mt: 4, mb: 2 }}
            action={
              <Button color="inherit" size="small" href="/login">
                Log In
              </Button>
            }
          >
            Please log in to use the diagnosis feature
          </Alert>
          <Typography variant="body1" sx={{ mt: 2 }}>
            You need to be logged in to use the diagnosis feature.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <DiagnosisHeader />
        <DiagnosisForm
          isLoading={isLoading}
          onSubmit={handleSubmit}
          apiAvailable={apiAvailable}
        />
        {diagnosis && (
          <DiagnosisResults 
            diagnosis={diagnosis} 
            loading={isLoading}
            onRequestFollowUp={handleRequestFollowUp}
            onAnalyzeCondition={handleAnalyzeCondition}
          />
        )}
        {error && (
          <Alert 
            severity="error" 
            sx={{ mt: 2 }}
            action={
              <Button color="inherit" size="small" onClick={handleRetry}>
                Retry
              </Button>
            }
          >
            {error}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default Diagnosis;