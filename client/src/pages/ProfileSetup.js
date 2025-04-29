import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Form, Alert } from 'react-bootstrap';
import { Button, Box, Container, Paper } from '@mui/material';

export default function ProfileSetup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    bloodGroup: '',
    medicalConditions: '',
    allergies: '',
    medications: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: ''
  });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { updateProfile } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user makes changes
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }

  function validateForm() {
    const newErrors = {};
    const requiredFields = [
      { field: 'firstName', label: 'First Name' },
      { field: 'lastName', label: 'Last Name' },
      { field: 'age', label: 'Age' },
      { field: 'gender', label: 'Gender' },
      { field: 'height', label: 'Height' },
      { field: 'weight', label: 'Weight' },
      { field: 'bloodGroup', label: 'Blood Group' },
      { field: 'emergencyContactName', label: 'Emergency Contact Name' },
      { field: 'emergencyContactPhone', label: 'Emergency Contact Phone' },
      { field: 'emergencyContactRelationship', label: 'Relationship with Emergency Contact' }
    ];
    
    let isValid = true;
    
    requiredFields.forEach(({ field, label }) => {
      if (!formData[field]) {
        newErrors[field] = `Please enter your ${label}`;
        isValid = false;
      }
    });
    
    setFieldErrors(newErrors);
    return isValid;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await updateProfile(formData);
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to update profile: ' + error.message);
    }
    setLoading(false);
  }

  // Helper function to display field error message
  const renderFieldError = (fieldName) => {
    return fieldErrors[fieldName] ? (
      <div className="text-danger mt-1 small">{fieldErrors[fieldName]}</div>
    ) : null;
  };

  return (
    <Box 
      sx={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
        position: 'relative',
        overflow: 'hidden',
        flex: 1,
        minHeight: '100%'
      }}
    >
      {/* Flowing Circles Background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          overflow: 'hidden',
          '& .circle': {
            position: 'absolute',
            borderRadius: '50%',
            opacity: '0.15',
            animation: 'flow 20s linear infinite',
          },
          '& .c1': {
            width: '150px',
            height: '150px',
            background: '#40C4FF',
            left: '10%',
            animationDelay: '0s',
          },
          '& .c2': {
            width: '100px',
            height: '100px',
            background: '#29B6F6',
            left: '35%',
            animationDelay: '-5s',
          },
          '& .c3': {
            width: '120px',
            height: '120px',
            background: '#03A9F4',
            left: '60%',
            animationDelay: '-10s',
          },
          '& .c4': {
            width: '80px',
            height: '80px',
            background: '#0288D1',
            left: '85%',
            animationDelay: '-15s',
          },
          '@keyframes flow': {
            '0%': {
              top: '-20%',
              transform: 'translateX(0) rotate(0deg)',
            },
            '50%': {
              transform: 'translateX(-100px) rotate(180deg)',
            },
            '100%': {
              top: '120%',
              transform: 'translateX(0) rotate(360deg)',
            }
          },
        }}
      >
        <div className="circle c1" />
        <div className="circle c2" />
        <div className="circle c3" />
        <div className="circle c4" />
        <div className="circle c1" style={{ left: '25%', animationDelay: '-7s' }} />
        <div className="circle c2" style={{ left: '50%', animationDelay: '-12s' }} />
        <div className="circle c3" style={{ left: '75%', animationDelay: '-17s' }} />
        <div className="circle c4" style={{ left: '95%', animationDelay: '-3s' }} />
      </Box>

      {/* Enhanced Animated Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          overflow: 'hidden',
          '& .orb': {
            position: 'absolute',
            borderRadius: '50%',
            filter: 'blur(60px)',
            opacity: 0.5,
            transition: 'all 0.3s ease',
          },
          '& .orb1': {
            top: '-5%',
            left: '-5%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(64, 196, 255, 0.4), transparent 70%)',
            animation: 'float1 15s infinite ease-in-out',
          },
          '& .orb2': {
            top: '50%',
            right: '-10%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(100, 220, 255, 0.3), transparent 70%)',
            animation: 'float2 20s infinite ease-in-out',
          },
          '& .orb3': {
            bottom: '-10%',
            left: '30%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(0, 150, 255, 0.35), transparent 70%)',
            animation: 'float3 17s infinite ease-in-out',
          },
          '& .orb4': {
            top: '20%',
            right: '20%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(128, 206, 255, 0.25), transparent 70%)',
            animation: 'float4 22s infinite ease-in-out',
          },
          '@keyframes float1': {
            '0%, 100%': {
              transform: 'translate(0, 0) scale(1)',
            },
            '50%': {
              transform: 'translate(100px, 50px) scale(1.1)',
            }
          },
          '@keyframes float2': {
            '0%, 100%': {
              transform: 'translate(0, 0) scale(1)',
            },
            '50%': {
              transform: 'translate(-100px, -50px) scale(0.9)',
            }
          },
          '@keyframes float3': {
            '0%, 100%': {
              transform: 'translate(0, 0) rotate(0)',
            },
            '50%': {
              transform: 'translate(50px, -30px) rotate(180deg)',
            }
          },
          '@keyframes float4': {
            '0%, 100%': {
              transform: 'translate(0, 0) scale(1)',
            },
            '50%': {
              transform: 'translate(-30px, 50px) scale(1.2)',
            }
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
            pointerEvents: 'none',
          }
        }}
      >
        <div className="orb orb1" />
        <div className="orb orb2" />
        <div className="orb orb3" />
        <div className="orb orb4" />
      </Box>

      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        py: 8, 
        position: 'relative', 
        zIndex: 1,
        minHeight: '100%',
        backdropFilter: 'blur(5px)'
      }}>
        <Container maxWidth="md">
          <Paper
            elevation={3}
            sx={{
              p: 4,
              background: 'linear-gradient(145deg, rgba(26, 26, 26, 0.8), rgba(42, 42, 42, 0.9))',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at top right, rgba(64, 196, 255, 0.1), transparent 60%)',
                pointerEvents: 'none'
              },
              '&:hover': {
                border: '1px solid rgba(64, 196, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                '& .orb': {
                  opacity: 0.6,
                }
              }
            }}
          >
            <h2 className="text-center mb-4" style={{ color: '#00FFC8' }}>Complete Your Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit} noValidate>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  isInvalid={!!fieldErrors.firstName}
                  required
                />
                {renderFieldError('firstName')}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  isInvalid={!!fieldErrors.lastName}
                  required
                />
                {renderFieldError('lastName')}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  isInvalid={!!fieldErrors.age}
                  required
                />
                {renderFieldError('age')}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  isInvalid={!!fieldErrors.gender}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </Form.Select>
                {renderFieldError('gender')}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Height (cm)</Form.Label>
                <Form.Control
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  isInvalid={!!fieldErrors.height}
                  required
                />
                {renderFieldError('height')}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Weight (kg)</Form.Label>
                <Form.Control
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  isInvalid={!!fieldErrors.weight}
                  required
                />
                {renderFieldError('weight')}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Blood Group</Form.Label>
                <Form.Select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  isInvalid={!!fieldErrors.bloodGroup}
                  required
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="unknown">Unknown</option>
                </Form.Select>
                {renderFieldError('bloodGroup')}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Medical Conditions</Form.Label>
                <Form.Control
                  as="textarea"
                  name="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={handleChange}
                  placeholder="List any medical conditions you have (optional)"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Allergies</Form.Label>
                <Form.Control
                  as="textarea"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  placeholder="List any allergies you have (optional)"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Medications</Form.Label>
                <Form.Control
                  as="textarea"
                  name="medications"
                  value={formData.medications}
                  onChange={handleChange}
                  placeholder="List any medications you are currently taking (optional)"
                />
              </Form.Group>

              <h4 className="mt-4 mb-3">Emergency Contact Information</h4>
              
              <Form.Group className="mb-3">
                <Form.Label>Emergency Contact Name</Form.Label>
                <Form.Control
                  type="text"
                  name="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={handleChange}
                  isInvalid={!!fieldErrors.emergencyContactName}
                  placeholder="Full name of emergency contact"
                  required
                />
                {renderFieldError('emergencyContactName')}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Emergency Contact Phone</Form.Label>
                <Form.Control
                  type="tel"
                  name="emergencyContactPhone"
                  value={formData.emergencyContactPhone}
                  onChange={handleChange}
                  isInvalid={!!fieldErrors.emergencyContactPhone}
                  placeholder="Phone number of emergency contact"
                  required
                />
                {renderFieldError('emergencyContactPhone')}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Relationship</Form.Label>
                <Form.Select
                  name="emergencyContactRelationship"
                  value={formData.emergencyContactRelationship}
                  onChange={handleChange}
                  isInvalid={!!fieldErrors.emergencyContactRelationship}
                  required
                >
                  <option value="">Select Relationship</option>
                  <option value="spouse">Spouse</option>
                  <option value="parent">Parent</option>
                  <option value="child">Child</option>
                  <option value="sibling">Sibling</option>
                  <option value="friend">Friend</option>
                  <option value="relative">Other Relative</option>
                  <option value="other">Other</option>
                </Form.Select>
                {renderFieldError('emergencyContactRelationship')}
              </Form.Group>

              <Button 
                disabled={loading} 
                fullWidth 
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: '#00FFC8',
                  color: '#121212',
                  boxShadow: '0 4px 14px rgba(0, 255, 200, 0.2)',
                  '&:hover': {
                    backgroundColor: '#00E6B5',
                    boxShadow: '0 6px 20px rgba(0, 255, 200, 0.3)',
                  }
                }}
              >
                Complete Profile
              </Button>
            </Form>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}