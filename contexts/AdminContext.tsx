
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AdminContextType {
  isAdmin: boolean;
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

  const checkAuth = async () => {
    try {
      const session = await AsyncStorage.getItem(ADMIN_SESSION_KEY);
      if (session) {
        const sessionData = JSON.parse(session);
        const now = Date.now();
        if (sessionData.expiry > now) {
          setIsAdmin(true);
          console.log('Admin session restored');
        } else {
          await AsyncStorage.removeItem(ADMIN_SESSION_KEY);
          setIsAdmin(false);
          console.log('Admin session expired');
        }
      }
    } catch (error) {
      console.error('Error checking admin auth:', error);
      setIsAdmin(false);
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        const expiry = Date.now() + 24 * 60 * 60 * 1000;
        const sessionData = {
          username,
          expiry,
        };
        await AsyncStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(sessionData));
        setIsAdmin(true);
        console.log('Admin login successful');
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
      await AsyncStorage.removeItem(ADMIN_SESSION_KEY);
      setIsAdmin(false);
      console.log('Admin logged out');
    } catch (error) {
      console.error('Error during admin logout:', error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout, checkAuth }}>
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
