import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid,
  TextField,
  Button,
  Stack,
  Link,
  Divider,
  Alert,
  Snackbar
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Layout from '../components/Layout';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, you would send the form data to your backend
      console.log('Form submitted:', formData);
      
      // Show success message
      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }
  };
  
  const handleCloseSnackbar = () => {
    setSubmitSuccess(false);
    setSubmitError(false);
  };
  
  return (
    <Layout>
      <Box sx={{ flex: 1 }}>
        {/* Hero Section */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
            color: 'white',
            py: 8,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at top right, rgba(96, 165, 250, 0.1), transparent 40%)',
              pointerEvents: 'none'
            }
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              component="h1"
              align="center"
              gutterBottom
              sx={{ fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
            >
              Contact Us
            </Typography>
            <Typography
              variant="h6"
              align="center"
              sx={{ maxWidth: 800, mx: 'auto', opacity: 0.9 }}
            >
              Have questions about HealthNex? We're here to help you.
            </Typography>
          </Container>
        </Box>

        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  background: 'linear-gradient(145deg, #1E293B, #0F172A)',
                  border: '1px solid rgba(96, 165, 250, 0.1)',
                  borderRadius: 2
                }}
              >
                <Typography variant="h4" component="h2" gutterBottom sx={{ color: 'primary.light', mb: 4 }}>
                  Get In Touch
                </Typography>
                
                <Box sx={{ mb: 4 }}>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    We value your feedback and questions. Reach out to us using any of the methods below, or fill out the contact form.
                  </Typography>
                </Box>
                
                <Stack spacing={3}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <LocationOnIcon sx={{ color: 'primary.light', mr: 2, mt: 0.5 }} />
                    <Box>
                      <Typography variant="subtitle1" sx={{ color: 'primary.light', fontWeight: 'bold' }}>
                        Address
                      </Typography>
                      <Typography variant="body2">
                        Bennett University<br />
                        Tech Zone 2, Gautam Buddh Nagar<br />
                        Greater Noida, Uttar Pradesh 201310<br />
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <PhoneIcon sx={{ color: 'primary.light', mr: 2, mt: 0.5 }} />
                    <Box>
                      <Typography variant="subtitle1" sx={{ color: 'primary.light', fontWeight: 'bold' }}>
                        Phone
                      </Typography>
                      <Typography variant="body2">
                        +91 xxxxx xxxxx<br />
                        Mon-Fri 9AM to 6PM
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <EmailIcon sx={{ color: 'primary.light', mr: 2, mt: 0.5 }} />
                    <Box>
                      <Typography variant="subtitle1" sx={{ color: 'primary.light', fontWeight: 'bold' }}>
                        Email
                      </Typography>
                      <Typography variant="body2">
                        <Link href="mailto:info@healthnex.com" color="inherit">
                          info@healthnex.com
                        </Link>
                        <br />
                        We'll respond within 24 hours
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <AccessTimeIcon sx={{ color: 'primary.light', mr: 2, mt: 0.5 }} />
                    <Box>
                      <Typography variant="subtitle1" sx={{ color: 'primary.light', fontWeight: 'bold' }}>
                        Office Hours
                      </Typography>
                      <Typography variant="body2">
                        Monday - Friday: 9AM - 6PM<br />
                        Saturday & Sunday: Closed<br />
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
                
                <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                
                <Typography variant="h6" gutterBottom sx={{ color: 'primary.light' }}>
                  Follow Us
                </Typography>
                
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <Button variant="outlined" color="primary" size="small">Twitter</Button>
                  <Button variant="outlined" color="primary" size="small">LinkedIn</Button>
                  <Button variant="outlined" color="primary" size="small">GitHub</Button>
                </Stack>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={7}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  background: 'linear-gradient(145deg, #1E293B, #0F172A)',
                  border: '1px solid rgba(96, 165, 250, 0.1)',
                  borderRadius: 2
                }}
              >
                <Typography variant="h4" component="h2" gutterBottom sx={{ color: 'primary.light', mb: 4 }}>
                  Send Us a Message
                </Typography>
                
                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        variant="outlined"
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: 'rgba(96, 165, 250, 0.2)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.light',
                            },
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        variant="outlined"
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: 'rgba(96, 165, 250, 0.2)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.light',
                            },
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        error={!!errors.subject}
                        helperText={errors.subject}
                        variant="outlined"
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: 'rgba(96, 165, 250, 0.2)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.light',
                            },
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        error={!!errors.message}
                        helperText={errors.message}
                        multiline
                        rows={5}
                        variant="outlined"
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: 'rgba(96, 165, 250, 0.2)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.light',
                            },
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      startIcon={<SendIcon />}
                      sx={{ px: 4 }}
                    >
                      Send Message
                    </Button>
                  </Box>
                </Box>
              </Paper>
              
              {/* Map */}
              <Paper
                elevation={0}
                sx={{
                  mt: 4,
                  p: 2,
                  background: 'linear-gradient(145deg, #1E293B, #0F172A)',
                  border: '1px solid rgba(96, 165, 250, 0.1)',
                  borderRadius: 2,
                  height: 300,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Box sx={{ width: '100%', height: '100%' }}>
                  <iframe 
                    title="Bennett University Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.9591933958527!2d77.58162287528204!3d28.450646475764593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cbf94deb6bc39%3A0x7ba6bedc9a2b537f!2sBennett%20University!5e0!3m2!1sen!2sin!4v1745535562222!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* FAQ Section */}
          <Box sx={{ mt: 8 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ color: 'primary.light', mb: 4, textAlign: 'center' }}>
              Frequently Asked Questions
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    background: 'linear-gradient(145deg, #1E293B, #0F172A)',
                    border: '1px solid rgba(96, 165, 250, 0.1)',
                    borderRadius: 2
                  }}
                >
                  <Typography variant="h6" gutterBottom sx={{ color: 'primary.light' }}>
                    How do I reset my password?
                  </Typography>
                  <Typography variant="body2">
                    You can reset your password by clicking on the "Forgot Password" link on the login page. You will receive an email with instructions to reset your password.
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    background: 'linear-gradient(145deg, #1E293B, #0F172A)',
                    border: '1px solid rgba(96, 165, 250, 0.1)',
                    borderRadius: 2
                  }}
                >
                  <Typography variant="h6" gutterBottom sx={{ color: 'primary.light' }}>
                    Is my health data secure?
                  </Typography>
                  <Typography variant="body2">
                    Yes, we use industry-standard encryption and security measures to protect your health data. All information is stored securely and only accessible to authorized individuals.
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    background: 'linear-gradient(145deg, #1E293B, #0F172A)',
                    border: '1px solid rgba(96, 165, 250, 0.1)',
                    borderRadius: 2
                  }}
                >
                  <Typography variant="h6" gutterBottom sx={{ color: 'primary.light' }}>
                    How accurate is the AI diagnosis?
                  </Typography>
                  <Typography variant="body2">
                    Our AI diagnosis tool is designed to provide preliminary insights based on the symptoms you report. It's not a replacement for professional medical advice, but can help identify potential issues to discuss with your healthcare provider.
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    background: 'linear-gradient(145deg, #1E293B, #0F172A)',
                    border: '1px solid rgba(96, 165, 250, 0.1)',
                    borderRadius: 2
                  }}
                >
                  <Typography variant="h6" gutterBottom sx={{ color: 'primary.light' }}>
                    Can I export my health data?
                  </Typography>
                  <Typography variant="body2">
                    Yes, HealthNex allows you to export your health data in various formats, including PDF and CSV. You can also share specific reports with your healthcare provider directly from the platform.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      
      {/* Success/Error messages */}
      <Snackbar
        open={submitSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Your message has been sent successfully! We'll get back to you soon.
        </Alert>
      </Snackbar>
      
      <Snackbar
        open={submitError}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          There was an error sending your message. Please try again later.
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export default Contact;