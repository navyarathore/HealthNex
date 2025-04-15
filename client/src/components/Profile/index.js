import React, { useState } from 'react';
import { Container } from '@mui/material';
import ProfileHeader from './ProfileHeader';
import ProfileOverview from './ProfileOverview';
import { ProfileTabs, TabPanel } from './ProfileTabs';
import ProfileMetrics from './ProfileMetrics';
import ProfileDiagnosis from './ProfileDiagnosis';
import ProfileEmergency from './ProfileEmergency';

const Profile = () => {
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 32,
    gender: 'Male',
    bloodType: 'O+',
    height: '175 cm',
    weight: '70 kg',
    bmi: 22.9,
    bloodPressure: '120/80',
    heartRate: 72,
    allergies: ['Pollen', 'Penicillin'],
    medications: ['Vitamin D', 'Omega-3'],
    conditions: ['Hypertension'],
    lastCheckup: '2023-12-15',
    nextCheckup: '2024-06-15',
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '+1 (555) 123-4567'
    }
  });

  const [diagnosisHistory] = useState([
    {
      id: 1,
      date: '2023-05-15',
      condition: 'Common Cold',
      confidence: 85,
      symptoms: ['Cough', 'Fever', 'Runny nose'],
    },
    {
      id: 2,
      date: '2023-04-20',
      condition: 'Seasonal Allergies',
      confidence: 92,
      symptoms: ['Sneezing', 'Itchy eyes', 'Runny nose'],
    },
  ]);

  const [healthMetrics] = useState([
    { date: '2023-01', weight: 72, bmi: 23.5, heartRate: 75 },
    { date: '2023-02', weight: 71, bmi: 23.2, heartRate: 74 },
    { date: '2023-03', weight: 70, bmi: 22.9, heartRate: 72 },
    { date: '2023-04', weight: 70, bmi: 22.9, heartRate: 72 },
    { date: '2023-05', weight: 69, bmi: 22.6, heartRate: 71 },
    { date: '2023-06', weight: 70, bmi: 22.9, heartRate: 72 },
  ]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically make an API call to save the changes
  };

  const handleInputChange = (field) => (event) => {
    setProfileData({
      ...profileData,
      [field]: event.target.value,
    });
  };

  return (
    <Container maxWidth="lg">
      <ProfileHeader />
      <ProfileOverview
        profileData={profileData}
        isEditing={isEditing}
        onEdit={handleEdit}
        onSave={handleSave}
        onInputChange={handleInputChange}
      />
      <ProfileTabs tabValue={tabValue} onTabChange={handleTabChange}>
        <TabPanel value={tabValue} index={0}>
          <ProfileMetrics
            profileData={profileData}
            healthMetrics={healthMetrics}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <ProfileDiagnosis diagnosisHistory={diagnosisHistory} />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <ProfileEmergency emergencyContact={profileData.emergencyContact} />
        </TabPanel>
      </ProfileTabs>
    </Container>
  );
};

export default Profile; 