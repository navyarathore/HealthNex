import React, { useState, useEffect } from 'react';
import { Container, Skeleton } from '@mui/material';
import ProfileHeader from './ProfileHeader';
import ProfileOverview from './ProfileOverview';
import { ProfileTabs, TabPanel } from './ProfileTabs';
import ProfileMetrics from './ProfileMetrics';
import ProfileDiagnosis from './ProfileDiagnosis';
import ProfileEmergency from './ProfileEmergency';
import { useAuth } from '../../contexts/AuthContext';

const Profile = () => {
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const { userProfile, getProfile, updateProfile } = useAuth();
  
  const [profileData, setProfileData] = useState(null);

  // Load profile data on component mount
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const data = await getProfile();
        
        // Merge with default data for any missing fields
        setProfileData({
          firstName: data?.firstName || 'User',
          lastName: data?.lastName || '',
          email: data?.email || '',
          age: data?.age || '',
          gender: data?.gender || '',
          bloodType: data?.bloodType || '',
          height: data?.height || '',
          weight: data?.weight || '',
          bmi: calculateBMI(data?.height, data?.weight),
          bloodPressure: data?.bloodPressure || '120/80',
          heartRate: data?.heartRate || 72,
          allergies: data?.allergies ? data.allergies.split(',').map(item => item.trim()) : [],
          medications: data?.medications ? data.medications.split(',').map(item => item.trim()) : [],
          conditions: data?.medicalConditions ? data.medicalConditions.split(',').map(item => item.trim()) : [],
          lastCheckup: data?.lastCheckup || '',
          nextCheckup: data?.nextCheckup || '',
          emergencyContact: data?.emergencyContact || {
            name: '',
            relationship: '',
            phone: ''
          }
        });
      } catch (error) {
        console.error("Error loading profile data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProfileData();
  }, [getProfile]);

  // Calculate BMI if height and weight are available
  function calculateBMI(height, weight) {
    if (!height || !weight) return '';
    
    // Convert height to meters if in cm
    const heightInM = parseInt(height) / 100;
    const weightInKg = parseInt(weight);
    
    if (isNaN(heightInM) || isNaN(weightInKg) || heightInM <= 0) return '';
    
    const bmi = (weightInKg / (heightInM * heightInM)).toFixed(1);
    return bmi;
  }

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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      // Format data for saving to backend
      const dataToSave = {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        age: profileData.age,
        gender: profileData.gender,
        bloodType: profileData.bloodType,
        height: profileData.height,
        weight: profileData.weight,
        bloodPressure: profileData.bloodPressure,
        heartRate: profileData.heartRate,
        allergies: profileData.allergies.join(', '),
        medications: profileData.medications.join(', '),
        medicalConditions: profileData.conditions.join(', '),
        lastCheckup: profileData.lastCheckup,
        nextCheckup: profileData.nextCheckup,
        emergencyContact: profileData.emergencyContact
      };
      
      await updateProfile(dataToSave);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field) => (event) => {
    setProfileData({
      ...profileData,
      [field]: event.target.value,
    });
  };

  const handleArrayInputChange = (field) => (event, value) => {
    setProfileData({
      ...profileData,
      [field]: value || [],
    });
  };

  if (loading && !profileData) {
    return (
      <Container maxWidth="lg">
        <Skeleton variant="rectangular" height={200} sx={{ mb: 2, borderRadius: 1 }} />
        <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 1 }} />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <ProfileHeader loading={loading} />
      <ProfileOverview
        profileData={profileData}
        isEditing={isEditing}
        onEdit={handleEdit}
        onSave={handleSave}
        onInputChange={handleInputChange}
        loading={loading}
      />
      <ProfileTabs tabValue={tabValue} onTabChange={handleTabChange}>
        <TabPanel value={tabValue} index={0}>
          <ProfileMetrics
            profileData={profileData}
            loading={loading}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <ProfileDiagnosis diagnosisHistory={diagnosisHistory} loading={loading} />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <ProfileEmergency 
            emergencyContact={profileData?.emergencyContact} 
            isEditing={isEditing} 
            onInputChange={handleInputChange}
            loading={loading}
          />
        </TabPanel>
      </ProfileTabs>
    </Container>
  );
};

export default Profile;