import React, { useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Alert,
  Chip,
  Grid,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import WarningIcon from '@mui/icons-material/Warning';

const DiagnosisForm = ({ onSubmit, isLoading, apiAvailable = true }) => {
  const [symptoms, setSymptoms] = useState([]);
  const [currentSymptom, setCurrentSymptom] = useState({
    description: '',
    severity: 5,
    duration: '',
    category: 'general'
  });
  const [patientInfo, setPatientInfo] = useState({
    age: '',
    gender: '',
    height: '',
    weight: '',
    medicalConditions: [],
    medications: [],
    allergies: [],
    familyHistory: ''
  });
  const [showPatientInfo, setShowPatientInfo] = useState(false);
  const [error, setError] = useState('');

  const handleAddSymptom = () => {
    if (!currentSymptom.description.trim()) {
      setError('Please enter a symptom description');
      return;
    }

    setSymptoms([...symptoms, { ...currentSymptom, id: Date.now() }]);
    setCurrentSymptom({
      description: '',
      severity: 5,
      duration: '',
      category: 'general'
    });
    setError('');
  };

  const handleRemoveSymptom = (id) => {
    setSymptoms(symptoms.filter(symptom => symptom.id !== id));
  };

  const handleSymptomChange = (e) => {
    setCurrentSymptom({
      ...currentSymptom,
      [e.target.name]: e.target.value
    });
  };

  const handlePatientInfoChange = (e) => {
    const { name, value } = e.target;
    
    // Handle array fields
    if (['medicalConditions', 'medications', 'allergies'].includes(name)) {
      // Split comma-separated values into an array
      const arrayValue = value.split(',').map(item => item.trim()).filter(item => item);
      setPatientInfo({
        ...patientInfo,
        [name]: arrayValue
      });
    } else {
      setPatientInfo({
        ...patientInfo,
        [name]: value
      });
    }
  };

  const handleSeverityChange = (_, newValue) => {
    setCurrentSymptom({
      ...currentSymptom,
      severity: newValue
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (symptoms.length === 0) {
      setError('Please add at least one symptom');
      return;
    }

    onSubmit({ symptoms, patientInfo });
  };

  const symptomsCategories = [
    'general', 'respiratory', 'cardiovascular', 'digestive', 
    'neurological', 'musculoskeletal', 'skin', 'mental', 
    'emotional', 'other'
  ];

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
      {!apiAvailable && (
        <Alert 
          severity="warning" 
          icon={<WarningIcon />}
          sx={{ mb: 3 }}
        >
          AI diagnosis service is temporarily unavailable. Results will be limited.
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ color: '#40C4FF' }}>
          Describe Your Symptoms
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Please add your symptoms one by one. Be as specific as possible about each symptom.
        </Typography>

        {/* Symptom input form */}
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              label="Symptom Description"
              name="description"
              value={currentSymptom.description}
              onChange={handleSymptomChange}
              placeholder="E.g., Persistent dry cough"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={currentSymptom.category}
                onChange={handleSymptomChange}
                label="Category"
              >
                {symptomsCategories.map(category => (
                  <MenuItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Duration"
              name="duration"
              value={currentSymptom.duration}
              onChange={handleSymptomChange}
              placeholder="E.g., 3 days"
            />
          </Grid>
          <Grid item xs={12}>
            <Slider
              value={currentSymptom.severity}
              onChange={handleSeverityChange}
              aria-labelledby="severity-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={10}
              sx={{
                color: '#40C4FF',
                '& .MuiSlider-thumb': {
                  '&:hover, &.Mui-focusVisible': {
                    boxShadow: '0px 0px 0px 8px rgba(64, 196, 255, 0.16)'
                  }
                }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              startIcon={<AddCircleOutlineIcon />}
              onClick={handleAddSymptom}
              sx={{
                color: '#40C4FF',
                borderColor: '#40C4FF',
                '&:hover': {
                  borderColor: '#29B6F6',
                  backgroundColor: 'rgba(64, 196, 255, 0.04)'
                }
              }}
            >
              Add Symptom
            </Button>
          </Grid>
        </Grid>

        {/* Error message */}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {/* Symptoms list */}
        {symptoms.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Added Symptoms:
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {symptoms.map((symptom) => (
                <Chip
                  key={symptom.id}
                  label={`${symptom.description} (${symptom.severity}/10${symptom.duration ? `, ${symptom.duration}` : ''})`}
                  onDelete={() => handleRemoveSymptom(symptom.id)}
                  sx={{ m: 0.5 }}
                />
              ))}
            </Stack>
          </Box>
        )}

        {/* Toggle patient info section */}
        <Button 
          variant="text" 
          onClick={() => setShowPatientInfo(!showPatientInfo)}
          sx={{ 
            alignSelf: 'flex-start',
            color: '#40C4FF'
          }}
        >
          {showPatientInfo ? 'Hide' : 'Show'} Additional Patient Information (Recommended)
        </Button>

        {/* Patient information form */}
        {showPatientInfo && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                type="number"
                value={patientInfo.age}
                onChange={handlePatientInfoChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={patientInfo.gender}
                  onChange={handlePatientInfoChange}
                  label="Gender"
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Height (cm)"
                name="height"
                type="number"
                value={patientInfo.height}
                onChange={handlePatientInfoChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Weight (kg)"
                name="weight"
                type="number"
                value={patientInfo.weight}
                onChange={handlePatientInfoChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Known Medical Conditions (separate with commas)"
                name="medicalConditions"
                value={patientInfo.medicalConditions.join(', ')}
                onChange={handlePatientInfoChange}
                placeholder="E.g., Asthma, Diabetes, Hypertension"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Current Medications (separate with commas)"
                name="medications"
                value={patientInfo.medications.join(', ')}
                onChange={handlePatientInfoChange}
                placeholder="E.g., Aspirin, Metformin, Lisinopril"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Allergies (separate with commas)"
                name="allergies"
                value={patientInfo.allergies.join(', ')}
                onChange={handlePatientInfoChange}
                placeholder="E.g., Penicillin, Peanuts, Latex"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Family Medical History"
                name="familyHistory"
                value={patientInfo.familyHistory}
                onChange={handlePatientInfoChange}
                placeholder="E.g., Heart disease in father, breast cancer in mother"
              />
            </Grid>
          </Grid>
        )}

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={20} /> : <PsychologyIcon />}
          sx={{ 
            alignSelf: 'flex-start', 
            mt: 2,
            backgroundColor: '#40C4FF',
            color: '#121212',
            '&:hover': {
              backgroundColor: '#29B6F6'
            },
            '&.Mui-disabled': {
              backgroundColor: 'rgba(64, 196, 255, 0.3)'
            }
          }}
        >
          {isLoading ? 'Analyzing...' : 'Get Diagnosis'}
        </Button>
      </Box>
    </Paper>
  );
};

export default DiagnosisForm;