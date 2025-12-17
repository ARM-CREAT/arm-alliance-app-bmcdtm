
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AdminContextType {
  isAdmin: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'ARM2024@Admin';
const ADMIN_SESSION_KEY = '@arm_admin_session';

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      console.log('Checking admin authentication...');
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

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      console.log('Attempting admin login with username:', username);
      
      // Trim whitespace from inputs
      const trimmedUsername = username.trim();
      const trimmedPassword = password.trim();
      
      console.log('Comparing credentials...');
      console.log('Expected username:', ADMIN_USERNAME);
      console.log('Provided username:', trimmedUsername);
      console.log('Username match:', trimmedUsername === ADMIN_USERNAME);
      console.log('Password match:', trimmedPassword === ADMIN_PASSWORD);
      
      if (trimmedUsername === ADMIN_USERNAME && trimmedPassword === ADMIN_PASSWORD) {
        // Session expires in 24 hours
        const expiry = Date.now() + 24 * 60 * 60 * 1000;
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
    <AdminContext.Provider value={{ isAdmin, isLoading, login, logout, checkAuth }}>
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
