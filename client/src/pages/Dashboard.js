import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  Slider,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { format } from 'date-fns';
import axios from 'axios';

const Dashboard = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [newSymptom, setNewSymptom] = useState({
    name: '',
    severity: 5,
    notes: '',
    date: new Date()
  });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSymptoms();
  }, []);

  const fetchSymptoms = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/symptoms');
      setSymptoms(response.data);
    } catch (error) {
      setError('Failed to fetch symptoms');
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/symptoms', newSymptom);
      fetchSymptoms();
      handleClose();
      setNewSymptom({
        name: '',
        severity: 5,
        notes: '',
        date: new Date()
      });
    } catch (error) {
      setError('Failed to add symptom');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/symptoms/${id}`);
      fetchSymptoms();
    } catch (error) {
      setError('Failed to delete symptom');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="h1">
            Symptom Tracker
          </Typography>
          <Tooltip title="Add New Symptom">
            <Button 
              variant="contained" 
              onClick={handleOpen}
              startIcon={<AddIcon />}
            >
              Add Symptom
            </Button>
          </Tooltip>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          {symptoms.map((symptom) => (
            <Grid item xs={12} sm={6} md={4} key={symptom._id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Typography variant="h6" component="div">
                      {symptom.name}
                    </Typography>
                    <Tooltip title="Delete Symptom">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(symptom._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Typography color="text.secondary" gutterBottom>
                    {format(new Date(symptom.date), 'MMM dd, yyyy')}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Severity: {symptom.severity}/10
                  </Typography>
                  {symptom.notes && (
                    <Typography variant="body2" color="text.secondary">
                      Notes: {symptom.notes}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>Add New Symptom</DialogTitle>
          <DialogContent>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Symptom Name"
                value={newSymptom.name}
                onChange={(e) => setNewSymptom({ ...newSymptom, name: e.target.value })}
              />
              <Typography gutterBottom sx={{ mt: 2 }}>Severity</Typography>
              <Slider
                value={newSymptom.severity}
                onChange={(e, value) => setNewSymptom({ ...newSymptom, severity: value })}
                min={1}
                max={10}
                step={1}
                marks
                valueLabelDisplay="auto"
              />
              <TextField
                margin="normal"
                fullWidth
                label="Notes"
                multiline
                rows={4}
                value={newSymptom.notes}
                onChange={(e) => setNewSymptom({ ...newSymptom, notes: e.target.value })}
              />
              <DatePicker
                label="Date"
                value={newSymptom.date}
                onChange={(date) => setNewSymptom({ ...newSymptom, date })}
                sx={{ mt: 2, width: '100%' }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              Add Symptom
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </LocalizationProvider>
  );
};

export default Dashboard; 