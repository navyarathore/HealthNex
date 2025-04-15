import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';

export default function ProfileSetup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    medicalConditions: '',
    allergies: '',
    medications: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { updateProfile } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await updateProfile(formData);
      navigate('/');
    } catch (error) {
      setError('Failed to update profile: ' + error.message);
    }
    setLoading(false);
  }

  return (
    <Container className="py-5">
      <div className="w-100" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 className="text-center mb-4">Complete Your Profile</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Height (cm)</Form.Label>
            <Form.Control
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Weight (kg)</Form.Label>
            <Form.Control
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Medical Conditions</Form.Label>
            <Form.Control
              as="textarea"
              name="medicalConditions"
              value={formData.medicalConditions}
              onChange={handleChange}
              placeholder="List any medical conditions you have"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Allergies</Form.Label>
            <Form.Control
              as="textarea"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              placeholder="List any allergies you have"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Medications</Form.Label>
            <Form.Control
              as="textarea"
              name="medications"
              value={formData.medications}
              onChange={handleChange}
              placeholder="List any medications you are currently taking"
            />
          </Form.Group>

          <Button disabled={loading} className="w-100" type="submit">
            Complete Profile
          </Button>
        </Form>
      </div>
    </Container>
  );
} 