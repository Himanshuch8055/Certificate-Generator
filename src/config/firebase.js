import { validateEnvVariables, getEnvVariable } from '../utils/envValidator';
import { getApps, initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

// Validate all required Firebase environment variables
validateEnvVariables([
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
  'VITE_APP_ENV'
]);

// Firebase configuration with environment variables
const firebaseConfig = {
  apiKey: getEnvVariable('VITE_FIREBASE_API_KEY'),
  authDomain: getEnvVariable('VITE_FIREBASE_AUTH_DOMAIN'),
  projectId: getEnvVariable('VITE_FIREBASE_PROJECT_ID'),
  storageBucket: getEnvVariable('VITE_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnvVariable('VITE_FIREBASE_MESSAGING_SENDER_ID'),
  appId: getEnvVariable('VITE_FIREBASE_APP_ID')
};

// Initialize Firebase with error handling
let app;
try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
} catch (error) {
  console.error('Error initializing Firebase:', error);
  throw new Error('Failed to initialize Firebase application');
}

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Connect to emulators in development environment
if (getEnvVariable('VITE_APP_ENV') === 'development') {
  try {
    connectAuthEmulator(auth, 'http://localhost:9099');
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectStorageEmulator(storage, 'localhost', 9199);
    console.log('Connected to Firebase emulators');
  } catch (error) {
    console.error('Error connecting to Firebase emulators:', error);
  }
}

// Export configured Firebase instance
export default app;