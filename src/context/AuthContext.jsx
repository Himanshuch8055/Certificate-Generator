import { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../config/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function signup(email, password) {
    try {
      console.log('Starting signup process...'); // Debug log
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created in Authentication:', userCredential.user); // Debug log

      // Create a user document in Firestore
      try {
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          email: email,
          createdAt: new Date().toISOString(),
          certificates: []
        });
        console.log('User document created in Firestore'); // Debug log
        return userCredential;
      } catch (firestoreError) {
        console.error('Firestore error:', firestoreError); // Debug log
        // If Firestore fails, delete the auth user to maintain consistency
        await userCredential.user.delete();
        throw new Error('Failed to set up user account. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error); // Debug log
      throw new Error(getErrorMessage(error.code));
    }
  }

  async function login(email, password) {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(getErrorMessage(error.code));
    }
  }

  async function logout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error(getErrorMessage(error.code));
    }
  }

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log('Auth state changed:', user);
        setCurrentUser(user);
        setLoading(false);
      });

      return unsubscribe;
    } catch (error) {
      console.error('Auth error:', error);
      setError(error.message);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Helper function to get user-friendly error messages
  function getErrorMessage(errorCode) {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'This email is already registered. Please try logging in instead.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters long.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/operation-not-allowed':
        return 'Email/password accounts are not enabled. Please contact support.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your internet connection.';
      default:
        return `Failed to create account: ${errorCode}`;
    }
  }

  const value = {
    currentUser,
    error,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 