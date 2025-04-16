import { db } from '../firebase';
import { 
  doc, 
  getDoc, 
  getDocs, 
  collection, 
  query,
  setDoc, 
  addDoc,
  updateDoc,
  onSnapshot
} from 'firebase/firestore';

// Function to fetch a document with proper error handling
export const getDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { data: { id: docSnap.id, ...docSnap.data() }, error: null };
    } else {
      return { data: null, error: 'Document does not exist' };
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    
    // Check if the error is due to being offline
    if (error.message?.includes('offline') || !navigator.onLine) {
      return { 
        data: null, 
        error: 'You are currently offline. Please check your internet connection and try again.',
        isOffline: true
      };
    }
    
    return { data: null, error: error.message };
  }
};

// Function to fetch a collection with proper error handling
export const getCollection = async (collectionName, queryConstraints = []) => {
  try {
    const q = query(collection(db, collectionName), ...queryConstraints);
    const querySnapshot = await getDocs(q);
    
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    
    return { data: documents, error: null };
  } catch (error) {
    console.error("Error fetching collection:", error);
    
    // Check if the error is due to being offline
    if (error.message?.includes('offline') || !navigator.onLine) {
      return { 
        data: null, 
        error: 'You are currently offline. Please check your internet connection and try again.',
        isOffline: true
      };
    }
    
    return { data: null, error: error.message };
  }
};

// Function to add a document with proper error handling
export const addDocument = async (collectionName, data) => {
  try {
    if (!navigator.onLine) {
      throw new Error('You are currently offline');
    }
    
    const docRef = await addDoc(collection(db, collectionName), data);
    return { id: docRef.id, error: null };
  } catch (error) {
    console.error("Error adding document:", error);
    
    // Check if the error is due to being offline
    if (error.message?.includes('offline') || !navigator.onLine) {
      return { 
        id: null, 
        error: 'You are currently offline. Please check your internet connection and try again.',
        isOffline: true
      };
    }
    
    return { id: null, error: error.message };
  }
};

// Function to update a document with proper error handling
export const updateDocument = async (collectionName, docId, data) => {
  try {
    if (!navigator.onLine) {
      throw new Error('You are currently offline');
    }
    
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
    return { success: true, error: null };
  } catch (error) {
    console.error("Error updating document:", error);
    
    // Check if the error is due to being offline
    if (error.message?.includes('offline') || !navigator.onLine) {
      return { 
        success: false, 
        error: 'You are currently offline. Please check your internet connection and try again.',
        isOffline: true
      };
    }
    
    return { success: false, error: error.message };
  }
};

// Function to listen to a document with error handling
export const listenToDocument = (collectionName, docId, callback) => {
  const docRef = doc(db, collectionName, docId);
  
  const unsubscribe = onSnapshot(
    docRef,
    (doc) => {
      if (doc.exists()) {
        callback({ data: { id: doc.id, ...doc.data() }, error: null });
      } else {
        callback({ data: null, error: 'Document does not exist' });
      }
    },
    (error) => {
      console.error("Error listening to document:", error);
      
      // Check if the error is due to being offline
      if (error.message?.includes('offline') || !navigator.onLine) {
        callback({ 
          data: null, 
          error: 'You are currently offline. Please check your internet connection and try again.',
          isOffline: true
        });
      } else {
        callback({ data: null, error: error.message });
      }
    }
  );
  
  return unsubscribe;
};

// Network status listener
export const addNetworkStatusListener = (onlineCallback, offlineCallback) => {
  window.addEventListener('online', onlineCallback);
  window.addEventListener('offline', offlineCallback);
  
  return () => {
    window.removeEventListener('online', onlineCallback);
    window.removeEventListener('offline', offlineCallback);
  };
};

// Check if user is online
export const isOnline = () => {
  return navigator.onLine;
};