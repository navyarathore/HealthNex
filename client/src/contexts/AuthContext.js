import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../firebase';
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({ uid: 'test-user-123', email: 'test@example.com' }); // Mock user
  const [userProfile, setUserProfile] = useState({
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    createdAt: new Date().toISOString()
  }); // Mock profile
  const [loading, setLoading] = useState(false); // Set to false to skip loading state
  const [userToken, setUserToken] = useState('mock-jwt-token-for-testing-123456789');

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
    /*
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      let errorMessage = 'Failed to sign in.';
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        default:
          errorMessage = error.message;
      }
      throw new Error(errorMessage);
    }
    */
    
    // Mock implementation
    console.log('Mock login with:', email, password);
    return { uid: 'test-user-123', email };
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
    getToken
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}