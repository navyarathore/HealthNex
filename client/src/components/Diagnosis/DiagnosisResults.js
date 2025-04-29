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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WarningIcon from '@mui/icons-material/Warning';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import MarkdownRenderer from '../common/MarkdownRenderer';

const DiagnosisResults = ({ diagnosis, onRequestFollowUp, onAnalyzeCondition, loading }) => {
  if (!diagnosis) return null;

  // Check if this is an emergency diagnosis
  const isEmergency = diagnosis.isEmergency || 
                    diagnosis.condition === "POSSIBLE EMERGENCY" || 
                    diagnosis.message?.includes("emergency");

  // Function to convert plain text to JSX with line breaks and formatting
  const formatText = (text) => {
    if (!text) return null;
    
    // If we have a MarkdownRenderer component, use it
    if (typeof MarkdownRenderer !== 'undefined') {
      return <MarkdownRenderer content={text} />;
    }
    
    // Otherwise, format with simple line breaks
    return text.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        border: '1px solid',
        borderColor: isEmergency ? 'error.main' : 'divider',
        borderWidth: isEmergency ? 2 : 1,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <MedicalServicesIcon sx={{ mr: 2, color: isEmergency ? 'error.main' : '#40C4FF' }} />
        <Typography variant="h5" component="h2" color={isEmergency ? 'error.main' : '#40C4FF'}>
          Diagnosis Results
        </Typography>
      </Box>

      {/* Emergency alert */}
      {isEmergency && (
        <Alert 
          severity="error" 
          icon={<ReportProblemIcon />}
          sx={{ mb: 3, fontWeight: 'bold' }}
        >
          POSSIBLE EMERGENCY - Seek immediate medical attention
        </Alert>
      )}

      {/* API Unavailable Message */}
      {diagnosis.fallbackMode && (
        <Alert 
          severity="warning" 
          icon={<WarningIcon />}
          sx={{ mb: 3 }}
        >
          AI diagnosis service is temporarily unavailable. These results are limited.
        </Alert>
      )}

      {/* General Message */}
      {diagnosis.message && !diagnosis.assessment && (
        <Alert severity="info" sx={{ mb: 3 }}>
          {diagnosis.message}
        </Alert>
      )}

      {/* AI Assessment */}
      {diagnosis.assessment && (
        <Card variant="outlined" sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', color: '#40C4FF' }}>
              Assessment
              {diagnosis.confidence > 0 && (
                <Chip
                  label={`${diagnosis.confidence}% Confidence`}
                  sx={{ 
                    ml: 2,
                    color: '#40C4FF',
                    borderColor: '#40C4FF' 
                  }}
                  variant="outlined"
                  size="small"
                />
              )}
            </Typography>
            
            <Typography variant="body1" component="div" sx={{ mt: 2 }}>
              {formatText(diagnosis.assessment)}
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Condition if available */}
      {diagnosis.condition && diagnosis.condition !== "AI Assessment" && diagnosis.condition !== "POSSIBLE EMERGENCY" && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#40C4FF' }}>
            Condition: {diagnosis.condition}
          </Typography>
          
          {diagnosis.confidence > 0 && !diagnosis.assessment && (
            <Chip
              label={`${diagnosis.confidence}% Confidence`}
              sx={{ 
                mb: 2,
                color: '#40C4FF',
                borderColor: '#40C4FF' 
              }}
              variant="outlined"
            />
          )}
        </Box>
      )}

      {/* Symptoms */}
      {diagnosis.symptoms && diagnosis.symptoms.length > 0 && (
        <Accordion defaultExpanded sx={{ mb: 2 }}>
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon sx={{ color: '#40C4FF' }} />}
            sx={{ '&.Mui-expanded': { color: '#40C4FF' } }}
          >
            <Typography variant="subtitle1" sx={{ color: '#40C4FF' }}>Identified Symptoms</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {diagnosis.symptoms.map((symptom, index) => (
                <ListItem key={index}>
                  <ListItemText primary={symptom} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      )}

      {/* Recommendations */}
      {diagnosis.recommendations && diagnosis.recommendations.length > 0 && (
        <Accordion defaultExpanded sx={{ mb: 2 }}>
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon sx={{ color: '#40C4FF' }} />}
            sx={{ '&.Mui-expanded': { color: '#40C4FF' } }}
          >
            <Typography variant="subtitle1" sx={{ color: '#40C4FF' }}>Recommendations</Typography>
          </AccordionSummary>
          <AccordionDetails>
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
          </AccordionDetails>
        </Accordion>
      )}

      {/* Follow-up actions */}
      {!isEmergency && !diagnosis.fallbackMode && !loading && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="subtitle2" gutterBottom sx={{ color: '#40C4FF' }}>
            Further Analysis:
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            {onRequestFollowUp && (
              <Button 
                variant="outlined" 
                size="small"
                onClick={onRequestFollowUp}
                startIcon={<HelpOutlineIcon />}
                sx={{ 
                  color: '#40C4FF',
                  borderColor: '#40C4FF',
                  '&:hover': {
                    borderColor: '#29B6F6',
                    backgroundColor: 'rgba(64, 196, 255, 0.04)'
                  }
                }}
              >
                Get Follow-up Questions
              </Button>
            )}
            
            {onAnalyzeCondition && diagnosis.possibleConditions && diagnosis.possibleConditions.map(condition => (
              <Button
                key={condition}
                variant="outlined"
                size="small"
                onClick={() => onAnalyzeCondition(condition)}
                sx={{ 
                  color: '#40C4FF',
                  borderColor: '#40C4FF',
                  '&:hover': {
                    borderColor: '#29B6F6',
                    backgroundColor: 'rgba(64, 196, 255, 0.04)'
                  }
                }}
              >
                Analyze "{condition}"
              </Button>
            ))}
          </Stack>
        </Box>
      )}

      {/* Medical disclaimer */}
      <Alert severity="info" sx={{ mt: 4 }}>
        <Typography variant="caption">
          DISCLAIMER: This AI-generated assessment is for informational purposes only and does not constitute medical advice. 
          Always consult with a qualified healthcare provider for proper diagnosis and treatment.
        </Typography>
      </Alert>
    </Paper>
  );
};

export default DiagnosisResults;