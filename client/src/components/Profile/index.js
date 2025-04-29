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
          firstName: data?.firstName || '',
          lastName: data?.lastName || '',
          email: data?.email || '',
          age: data?.age || '',
          gender: data?.gender || '',
          bloodGroup: data?.bloodGroup || '',
          height: data?.height || '',
          weight: data?.weight || '',
          bmi: calculateBMI(data?.height, data?.weight),
          bloodPressure: data?.bloodPressure || '',
          heartRate: data?.heartRate || '',
          allergies: data?.allergies ? data.allergies.split(',').map(item => item.trim()) : [],
          medications: data?.medications ? data.medications.split(',').map(item => item.trim()) : [],
          conditions: data?.medicalConditions ? data.medicalConditions.split(',').map(item => item.trim()) : [],
          lastCheckup: data?.lastCheckup || '',
          nextCheckup: data?.nextCheckup || '',
          // Use direct emergency contact fields
          emergencyContactName: data?.emergencyContactName || '',
          emergencyContactPhone: data?.emergencyContactPhone || '',
          emergencyContactRelationship: data?.emergencyContactRelationship || ''
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
        bloodGroup: profileData.bloodGroup,
        height: profileData.height,
        weight: profileData.weight,
        bloodPressure: profileData.bloodPressure,
        heartRate: profileData.heartRate,
        allergies: profileData.allergies.join(', '),
        medications: profileData.medications.join(', '),
        medicalConditions: profileData.conditions.join(', '),
        lastCheckup: profileData.lastCheckup,
        nextCheckup: profileData.nextCheckup,
        // Direct emergency contact fields
        emergencyContactName: profileData.emergencyContactName,
        emergencyContactPhone: profileData.emergencyContactPhone,
        emergencyContactRelationship: profileData.emergencyContactRelationship
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
          <ProfileDiagnosis />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <ProfileEmergency 
            // Create an emergency contact object for the Emergency tab
            emergencyContact={{
              name: profileData?.emergencyContactName || '',
              phone: profileData?.emergencyContactPhone || '',
              relationship: profileData?.emergencyContactRelationship || ''
            }} 
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