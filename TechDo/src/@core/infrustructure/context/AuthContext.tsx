import React, { createContext, useState, useContext, useEffect } from 'react';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { auth } from '../../../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showToast } from '../../../utils/utils';

interface AuthContextType {
  user: FirebaseAuthTypes.User | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((userState: FirebaseAuthTypes.User | null) => {
      setUser(userState);

      if (userState) {
        AsyncStorage.setItem('userId', userState.uid)
          .catch(err => console.error('Error saving user ID to AsyncStorage:', err));
      } else {
        AsyncStorage.removeItem('userId')
          .catch(err => console.error('Error removing user ID from AsyncStorage:', err));
      }

      setLoading(false);
    });

    return subscriber;
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);

      if (userCredential.user) {
        await userCredential.user.updateProfile({
          displayName: name,
        });

        setUser({...userCredential.user});
      }

      showToast({
        type: 'success',
        title: 'Success',
        message: 'Account created successfully',
      });
    } catch (error: any) {
      showToast({
        type: 'error',
        title: 'Registration Failed',
        message: error.message,
      });
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      showToast({
        type: 'success',
        title: 'Success',
        message: 'Logged in successfully',
      });
    } catch (error: any) {
      showToast({
        type: 'error',
        title: 'Login Failed',
        message: error.message,
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await auth().signOut();
      await AsyncStorage.removeItem('userId');
      showToast({
        type: 'success',
        title: 'Success',
        message: 'Logged out successfully',
      });
    } catch (error: any) {
      showToast({
        type: 'error',
        title: 'Logout Failed',
        message: error.message,
      });
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
