import React, { createContext, useState, useContext, useEffect } from 'react';
// import { auth, db } from '../firebase';
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
// import { doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // Start with no current user for testing authentication flow
  const [currentUser, setCurrentUser] = useState(null); // Initially not authenticated
  const [userProfile, setUserProfile] = useState(null); // Initially no profile
  // const [loading, setLoading] = useState(false); // Set to false to skip loading state
  const [userToken, setUserToken] = useState(null); // Initially no token

  // Add isAuthenticated getter based on currentUser
  const isAuthenticated = !!currentUser;

  // Commented out for testing
  async function signup(email, password) {
    /* 
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Create a new user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        createdAt: new Date().toISOString(),
      });
      
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
    */
    
    // Mock implementation
    console.log('Mock signup with:', email, password);
    return { uid: 'test-user-123', email };
  }

  // Commented out for testing
  async function login(email, password) {
    // Mock implementation
    console.log('Mock login with:', email, password);
    const mockUser = { uid: 'test-user-123', email };
    
    // Set the current user state to update authentication status
    setCurrentUser(mockUser);
    
    // Set complete mock profile data 
    setUserProfile({
      firstName: 'Test',
      lastName: 'User',
      email,
      age: '28',
      gender: 'male',
      bloodGroup: 'O+',
      height: '175',
      weight: '70',
      bloodPressure: '120/80',
      heartRate: '72',
      allergies: 'None',
      medications: 'None',
      medicalConditions: 'None',
      lastCheckup: '2025-03-15',
      nextCheckup: '2025-09-15',
      createdAt: new Date().toISOString(),
      // Emergency contact fields - ensure these match the field names expected by the ProfileEmergency component
      emergencyContactName: 'Jane Doe',
      emergencyContactRelationship: 'spouse',
      emergencyContactPhone: '555-123-4567'
    });
    
    // Set mock token
    setUserToken('mock-jwt-token-for-testing-123456789');
    
    return mockUser;
  }

  // Commented out for testing
  async function logout() {
    /*
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error(error.message);
    }
    */
    
    // Mock implementation
    console.log('Mock logout');
    
    // Clear user data on logout
    setCurrentUser(null);
    setUserProfile(null);
    setUserToken(null);
    
    return true;
  }

  // Modified for testing
  async function updateProfile(profileData) {
    /* 
    try {
      if (!currentUser) throw new Error('No user is currently signed in.');
      const userRef = doc(db, 'users', currentUser.uid);
      await setDoc(userRef, profileData, { merge: true });
    } catch (error) {
      throw new Error(error.message);
    }
    */
    
    // Mock implementation
    console.log('Mock update profile with:', profileData);
    setUserProfile({ ...userProfile, ...profileData });
    return true;
  }

  // Modified for testing
  async function getProfile() {
    /*
    try {
      if (!currentUser) throw new Error('No user is currently signed in.');
      const userRef = doc(db, 'users', currentUser.uid);
      const docSnap = await getDoc(userRef);
      return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
      throw new Error(error.message);
    }
    */
    
    // Mock implementation
    return userProfile;
  }

  // Added function to get authentication token for API requests
  async function getToken() {
    /*
    try {
      if (!currentUser) throw new Error('No user is currently signed in.');
      const token = await currentUser.getIdToken();
      return token;
    } catch (error) {
      throw new Error('Failed to get authentication token: ' + error.message);
    }
    */
    
    // Mock implementation - return a static mock token
    // In a real implementation, this would get a JWT token from Firebase
    return userToken;
  }

  // Commented out auth state listener
  useEffect(() => {
    /*
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(userRef);
          setUserProfile(docSnap.exists() ? docSnap.data() : null);
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setUserProfile(null);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
    */
    
    // Mock implementation - no cleanup needed
    return () => {}; 
  }, []);

  const value = {
    currentUser,
    userProfile,
    signup,
    login,
    logout,
    updateProfile,
    getProfile,
    getToken,
    isAuthenticated  // Add isAuthenticated to the context value
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}