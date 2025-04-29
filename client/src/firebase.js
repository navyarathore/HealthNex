import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence, CACHE_SIZE_UNLIMITED } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6oGDstvoKfAgNxDfrbewyTDAvaJoMz5k",
  authDomain: "healthnex-46b79.firebaseapp.com",
  projectId: "healthnex-46b79",
  storageBucket: "healthnex-46b79.firebasestorage.app",
  messagingSenderId: "157682430022",
  appId: "1:157682430022:web:0f56ae19b55fe512605a47",
  measurementId: "G-91VRP36TKV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);

// Enable offline persistence with unlimited cache size
try {
  if (typeof window !== 'undefined') {
    enableIndexedDbPersistence(db, { cacheSizeBytes: CACHE_SIZE_UNLIMITED })
      .catch((err) => {
          if (err.code === 'failed-precondition') {
              // Multiple tabs open, persistence can only be enabled in one tab at a time
              console.warn('Firebase persistence failed: Multiple tabs open');
          } else if (err.code === 'unimplemented') {
              // The current browser does not support all of the features required for persistence
              console.warn('Firebase persistence not supported in this browser');
          } else {
              console.error('Firebase persistence error:', err);
          }
      });
  }
} catch (error) {
  console.error('Error setting up persistence:', error);
}

export const storage = getStorage(app);
export const auth = getAuth(app);

// Initialize Analytics only in browser environment
let analytics = null;
try {
  if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
} catch (error) {
  console.error('Error initializing analytics:', error);
}

export { analytics };
export default app;
