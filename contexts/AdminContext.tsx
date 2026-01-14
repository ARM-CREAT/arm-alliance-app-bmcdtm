
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

const ADMIN_SESSION_KEY = '@arm_admin_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 heures

// Identifiants administrateur
const DEFAULT_USERNAME = 'admin';
const DEFAULT_PASSWORD = 'ARM2024@Mali';

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      console.log('🔍 Vérification de l\'authentification admin...');
      
      const session = await AsyncStorage.getItem(ADMIN_SESSION_KEY);
      
      if (session) {
        const sessionData = JSON.parse(session);
        const now = Date.now();
        
        console.log('📅 Session trouvée:', {
          username: sessionData.username,
          expiry: new Date(sessionData.expiry).toLocaleString(),
          now: new Date(now).toLocaleString(),
          isValid: sessionData.expiry > now,
        });
        
        if (sessionData.expiry > now) {
          setIsAdmin(true);
          console.log('✅ Session admin restaurée avec succès');
        } else {
          await AsyncStorage.removeItem(ADMIN_SESSION_KEY);
          setIsAdmin(false);
          console.log('⏰ Session admin expirée, supprimée');
        }
      } else {
        console.log('ℹ️ Aucune session admin trouvée');
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('❌ Erreur lors de la vérification de l\'authentification:', error);
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      console.log('🔐 Tentative de connexion admin...');
      console.log('👤 Nom d\'utilisateur fourni:', username);
      console.log('🔑 Longueur du mot de passe:', password.length);
      
      // Nettoyer les entrées
      const trimmedUsername = username.trim();
      const trimmedPassword = password.trim();
      
      console.log('✂️ Après nettoyage - Nom d\'utilisateur:', trimmedUsername);
      console.log('✂️ Après nettoyage - Longueur du mot de passe:', trimmedPassword.length);
      
      // Vérification simple et directe
      console.log('🔍 Comparaison des identifiants...');
      console.log('  - Nom d\'utilisateur attendu:', DEFAULT_USERNAME);
      console.log('  - Nom d\'utilisateur fourni:', trimmedUsername);
      console.log('  - Correspondance nom d\'utilisateur:', trimmedUsername === DEFAULT_USERNAME);
      console.log('  - Correspondance mot de passe:', trimmedPassword === DEFAULT_PASSWORD);
      
      if (trimmedUsername === DEFAULT_USERNAME && trimmedPassword === DEFAULT_PASSWORD) {
        // Créer la session
        const expiry = Date.now() + SESSION_DURATION;
        const sessionData = {
          username: trimmedUsername,
          expiry,
          loginTime: Date.now(),
        };
        
        console.log('💾 Enregistrement de la session...');
        await AsyncStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(sessionData));
        
        // Vérifier que la session a été enregistrée
        const savedSession = await AsyncStorage.getItem(ADMIN_SESSION_KEY);
        console.log('✅ Session enregistrée avec succès:', savedSession !== null);
        
        setIsAdmin(true);
        console.log('✅ Connexion admin réussie !');
        return true;
      }
      
      console.log('❌ Échec de la connexion admin: Identifiants invalides');
      return false;
    } catch (error) {
      console.error('❌ Erreur lors de la connexion admin:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      console.log('🚪 Déconnexion admin...');
      await AsyncStorage.removeItem(ADMIN_SESSION_KEY);
      setIsAdmin(false);
      console.log('✅ Admin déconnecté avec succès');
    } catch (error) {
      console.error('❌ Erreur lors de la déconnexion admin:', error);
    }
  };

  // Vérifier l'authentification au démarrage
  useEffect(() => {
    console.log('🚀 Initialisation AdminContext...');
    checkAuth();
  }, []);

  return (
    <AdminContext.Provider 
      value={{ 
        isAdmin, 
        isLoading, 
        login, 
        logout, 
        checkAuth,
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
