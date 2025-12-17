
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
  resetToDefault: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_SESSION_KEY = '@arm_admin_session';
const ADMIN_USERNAME_KEY = 'arm_admin_username';
const ADMIN_PASSWORD_KEY = 'arm_admin_password';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 heures

// Identifiants par défaut
const DEFAULT_USERNAME = 'admin';
const DEFAULT_PASSWORD = 'ARM2024@Mali';

// Simple hash function for password
const hashPassword = (password: string): string => {
  let hash = 0;
  const salt = 'ARM_SECURE_SALT_2024_MALI';
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

  const initializeDefaultCredentials = async () => {
    try {
      console.log('🔧 Initializing default admin credentials...');
      
      const existingUsername = await SecureStore.getItemAsync(ADMIN_USERNAME_KEY);
      
      if (!existingUsername) {
        console.log('📝 No credentials found, setting up defaults...');
        const hashedPassword = hashPassword(DEFAULT_PASSWORD);
        
        await SecureStore.setItemAsync(ADMIN_USERNAME_KEY, DEFAULT_USERNAME);
        await SecureStore.setItemAsync(ADMIN_PASSWORD_KEY, hashedPassword);
        
        console.log('✅ Default credentials set successfully');
        console.log('👤 Username:', DEFAULT_USERNAME);
        console.log('🔑 Password:', DEFAULT_PASSWORD);
        
        setHasPassword(true);
        return true;
      } else {
        console.log('✅ Credentials already exist');
        setHasPassword(true);
        return true;
      }
    } catch (error) {
      console.error('❌ Error initializing credentials:', error);
      return false;
    }
  };

  const checkAuth = async () => {
    try {
      console.log('🔍 Checking admin authentication...');
      
      // Initialize default credentials if needed
      await initializeDefaultCredentials();
      
      // Check session
      const session = await AsyncStorage.getItem(ADMIN_SESSION_KEY);
      
      if (session) {
        const sessionData = JSON.parse(session);
        const now = Date.now();
        
        console.log('📅 Session found:', {
          username: sessionData.username,
          expiry: new Date(sessionData.expiry).toLocaleString(),
          now: new Date(now).toLocaleString(),
          isValid: sessionData.expiry > now,
        });
        
        if (sessionData.expiry > now) {
          setIsAdmin(true);
          console.log('✅ Admin session restored successfully');
        } else {
          await AsyncStorage.removeItem(ADMIN_SESSION_KEY);
          setIsAdmin(false);
          console.log('⏰ Admin session expired, removed');
        }
      } else {
        console.log('ℹ️ No admin session found');
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('❌ Error checking admin auth:', error);
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  };

  const setupPassword = async (username: string, password: string): Promise<boolean> => {
    try {
      console.log('🔧 Setting up new admin password...');
      
      if (!username || !password) {
        console.log('❌ Username or password missing');
        return false;
      }

      if (password.length < 8) {
        console.log('❌ Password too short (minimum 8 characters)');
        return false;
      }

      const hashedPassword = hashPassword(password);
      
      await SecureStore.setItemAsync(ADMIN_USERNAME_KEY, username.trim());
      await SecureStore.setItemAsync(ADMIN_PASSWORD_KEY, hashedPassword);
      
      setHasPassword(true);
      console.log('✅ Admin password configured successfully');
      console.log('👤 New username:', username.trim());
      
      return true;
    } catch (error) {
      console.error('❌ Error setting up password:', error);
      return false;
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      console.log('🔐 Attempting admin login...');
      console.log('👤 Username provided:', username);
      
      // Get stored credentials
      const storedUsername = await SecureStore.getItemAsync(ADMIN_USERNAME_KEY);
      const storedPassword = await SecureStore.getItemAsync(ADMIN_PASSWORD_KEY);
      
      if (!storedUsername || !storedPassword) {
        console.log('❌ No credentials configured in storage');
        return false;
      }

      const hashedPassword = hashPassword(password);
      const trimmedUsername = username.trim();
      
      console.log('🔍 Comparing credentials...');
      console.log('  - Stored username:', storedUsername);
      console.log('  - Provided username:', trimmedUsername);
      console.log('  - Username match:', trimmedUsername === storedUsername);
      console.log('  - Password match:', hashedPassword === storedPassword);
      
      if (trimmedUsername === storedUsername && hashedPassword === storedPassword) {
        // Create session
        const expiry = Date.now() + SESSION_DURATION;
        const sessionData = {
          username: trimmedUsername,
          expiry,
          loginTime: Date.now(),
        };
        
        console.log('💾 Saving session...');
        await AsyncStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(sessionData));
        
        // Verify the session was saved
        const savedSession = await AsyncStorage.getItem(ADMIN_SESSION_KEY);
        console.log('✅ Session saved:', savedSession !== null);
        
        setIsAdmin(true);
        console.log('✅ Admin login successful!');
        return true;
      }
      
      console.log('❌ Admin login failed: Invalid credentials');
      return false;
    } catch (error) {
      console.error('❌ Error during admin login:', error);
      return false;
    }
  };

  const changePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    try {
      console.log('🔄 Attempting to change password...');
      
      const storedUsername = await SecureStore.getItemAsync(ADMIN_USERNAME_KEY);
      const storedPassword = await SecureStore.getItemAsync(ADMIN_PASSWORD_KEY);
      
      if (!storedUsername || !storedPassword) {
        console.log('❌ No credentials configured');
        return false;
      }

      const hashedOldPassword = hashPassword(oldPassword);
      
      // Verify old password
      if (hashedOldPassword !== storedPassword) {
        console.log('❌ Old password incorrect');
        return false;
      }

      if (newPassword.length < 8) {
        console.log('❌ New password too short');
        return false;
      }

      // Save new password
      const hashedNewPassword = hashPassword(newPassword);
      await SecureStore.setItemAsync(ADMIN_PASSWORD_KEY, hashedNewPassword);
      
      console.log('✅ Password changed successfully');
      return true;
    } catch (error) {
      console.error('❌ Error changing password:', error);
      return false;
    }
  };

  const resetToDefault = async () => {
    try {
      console.log('🔄 Resetting to default credentials...');
      
      const hashedPassword = hashPassword(DEFAULT_PASSWORD);
      
      await SecureStore.setItemAsync(ADMIN_USERNAME_KEY, DEFAULT_USERNAME);
      await SecureStore.setItemAsync(ADMIN_PASSWORD_KEY, hashedPassword);
      await AsyncStorage.removeItem(ADMIN_SESSION_KEY);
      
      setIsAdmin(false);
      setHasPassword(true);
      
      console.log('✅ Reset to default credentials');
      console.log('👤 Username:', DEFAULT_USERNAME);
      console.log('🔑 Password:', DEFAULT_PASSWORD);
    } catch (error) {
      console.error('❌ Error resetting credentials:', error);
    }
  };

  const logout = async () => {
    try {
      console.log('🚪 Logging out admin...');
      await AsyncStorage.removeItem(ADMIN_SESSION_KEY);
      setIsAdmin(false);
      console.log('✅ Admin logged out successfully');
    } catch (error) {
      console.error('❌ Error during admin logout:', error);
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
        resetToDefault,
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
