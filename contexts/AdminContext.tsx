
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

interface AdminContextType {
  isAdmin: boolean;
  isLoading: boolean;
  hasPassword: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  setupPassword: (username: string, password: string) => Promise<boolean>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_SESSION_KEY = '@arm_admin_session';
const ADMIN_CREDENTIALS_KEY = 'arm_admin_credentials';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 heures

// Simple hash function for password (in production, use a proper crypto library)
const hashPassword = async (password: string): Promise<string> => {
  // Simple hash - in production use a proper crypto library like crypto-js
  let hash = 0;
  const salt = 'ARM_SECURE_SALT_2024';
  const combined = password + salt;
  
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  return Math.abs(hash).toString(36);
};

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasPassword, setHasPassword] = useState(false);

  const checkAuth = async () => {
    try {
      console.log('Checking admin authentication...');
      
      // Check if password is set up
      const credentials = await SecureStore.getItemAsync(ADMIN_CREDENTIALS_KEY);
      setHasPassword(!!credentials);
      console.log('Password configured:', !!credentials);
      
      // Check session
      const session = await AsyncStorage.getItem(ADMIN_SESSION_KEY);
      
      if (session) {
        const sessionData = JSON.parse(session);
        const now = Date.now();
        
        console.log('Session found:', { expiry: sessionData.expiry, now });
        
        if (sessionData.expiry > now) {
          setIsAdmin(true);
          console.log('Admin session restored successfully');
        } else {
          await AsyncStorage.removeItem(ADMIN_SESSION_KEY);
          setIsAdmin(false);
          console.log('Admin session expired, removed');
        }
      } else {
        console.log('No admin session found');
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Error checking admin auth:', error);
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  };

  const setupPassword = async (username: string, password: string): Promise<boolean> => {
    try {
      console.log('Setting up admin password...');
      
      if (!username || !password) {
        console.log('Username or password missing');
        return false;
      }

      if (password.length < 8) {
        console.log('Password too short');
        return false;
      }

      const hashedPassword = await hashPassword(password);
      const credentials = JSON.stringify({
        username: username.trim(),
        password: hashedPassword,
        createdAt: Date.now(),
      });

      await SecureStore.setItemAsync(ADMIN_CREDENTIALS_KEY, credentials);
      setHasPassword(true);
      console.log('Admin password configured successfully');
      
      return true;
    } catch (error) {
      console.error('Error setting up password:', error);
      return false;
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      console.log('Attempting admin login with username:', username);
      
      // Get stored credentials
      const storedCredentials = await SecureStore.getItemAsync(ADMIN_CREDENTIALS_KEY);
      
      if (!storedCredentials) {
        console.log('No credentials configured');
        return false;
      }

      const credentials = JSON.parse(storedCredentials);
      const hashedPassword = await hashPassword(password);
      
      // Trim whitespace from inputs
      const trimmedUsername = username.trim();
      
      console.log('Comparing credentials...');
      console.log('Username match:', trimmedUsername === credentials.username);
      console.log('Password match:', hashedPassword === credentials.password);
      
      if (trimmedUsername === credentials.username && hashedPassword === credentials.password) {
        // Create session
        const expiry = Date.now() + SESSION_DURATION;
        const sessionData = {
          username: trimmedUsername,
          expiry,
          loginTime: Date.now(),
        };
        
        console.log('Credentials valid, saving session...');
        await AsyncStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(sessionData));
        
        // Verify the session was saved
        const savedSession = await AsyncStorage.getItem(ADMIN_SESSION_KEY);
        console.log('Session saved successfully:', savedSession !== null);
        
        setIsAdmin(true);
        console.log('Admin login successful, isAdmin set to true');
        return true;
      }
      
      console.log('Admin login failed: Invalid credentials');
      return false;
    } catch (error) {
      console.error('Error during admin login:', error);
      return false;
    }
  };

  const changePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    try {
      console.log('Attempting to change password...');
      
      // Get stored credentials
      const storedCredentials = await SecureStore.getItemAsync(ADMIN_CREDENTIALS_KEY);
      
      if (!storedCredentials) {
        console.log('No credentials configured');
        return false;
      }

      const credentials = JSON.parse(storedCredentials);
      const hashedOldPassword = await hashPassword(oldPassword);
      
      // Verify old password
      if (hashedOldPassword !== credentials.password) {
        console.log('Old password incorrect');
        return false;
      }

      if (newPassword.length < 8) {
        console.log('New password too short');
        return false;
      }

      // Save new password
      const hashedNewPassword = await hashPassword(newPassword);
      const newCredentials = JSON.stringify({
        username: credentials.username,
        password: hashedNewPassword,
        createdAt: Date.now(),
      });

      await SecureStore.setItemAsync(ADMIN_CREDENTIALS_KEY, newCredentials);
      console.log('Password changed successfully');
      
      return true;
    } catch (error) {
      console.error('Error changing password:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      console.log('Logging out admin...');
      await AsyncStorage.removeItem(ADMIN_SESSION_KEY);
      setIsAdmin(false);
      console.log('Admin logged out successfully');
    } catch (error) {
      console.error('Error during admin logout:', error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AdminContext.Provider 
      value={{ 
        isAdmin, 
        isLoading, 
        hasPassword, 
        login, 
        logout, 
        checkAuth, 
        setupPassword,
        changePassword,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
