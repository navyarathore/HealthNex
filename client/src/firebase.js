import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export const storage = getStorage(app);
export const auth = getAuth(app);

// Initialize Analytics only in browser environment
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { analytics };
export default app; 