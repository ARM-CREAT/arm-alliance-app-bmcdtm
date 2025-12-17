
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';
import { useAdmin } from '@/contexts/AdminContext';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';

export default function AdminLoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, isAdmin, isLoading, hasPassword, setupPassword } = useAdmin();
  const router = useRouter();
  const isSetupMode = !hasPassword;

  // Redirect if already logged in
  useEffect(() => {
    if (!isLoading && isAdmin) {
      console.log('User is already admin, redirecting to dashboard...');
      router.replace('/(tabs)/admin-dashboard');
    }
  }, [isAdmin, isLoading]);

  const handleSetup = async () => {
    console.log('Setup button pressed');
    
    if (!username || !password || !confirmPassword) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }

    setLoading(true);
    console.log('Starting password setup...');
    
    try {
      const success = await setupPassword(username, password);
      console.log('Setup result:', success);

      if (success) {
        Alert.alert(
          'Succès', 
          'Mot de passe administrateur configuré avec succès. Vous pouvez maintenant vous connecter.',
          [
            {
              text: 'OK',
              onPress: () => {
                setPassword('');
                setConfirmPassword('');
              },
            },
          ]
        );
      } else {
        Alert.alert('Erreur', 'Impossible de configurer le mot de passe');
      }
    } catch (error) {
      console.error('Setup error:', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la configuration');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    console.log('Login button pressed');
    
    if (!username || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    console.log('Starting login process...');
    
    try {
      const success = await login(username, password);
      console.log('Login result:', success);

      if (success) {
        console.log('Login successful, showing alert...');
        Alert.alert(
          'Succès', 
          'Connexion réussie', 
          [
            {
              text: 'OK',
              onPress: () => {
                console.log('Navigating to admin dashboard...');
                router.replace('/(tabs)/admin-dashboard');
              },
            },
          ]
        );
      } else {
        console.log('Login failed, showing error...');
        Alert.alert('Erreur', 'Nom d\'utilisateur ou mot de passe incorrect');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking auth
  if (isLoading) {
    return (
      <View style={[commonStyles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Vérification...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={commonStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <IconSymbol
              android_material_icon_name="admin-panel-settings"
              ios_icon_name="lock.shield"
              size={64}
              color={colors.primary}
            />
          </View>
          <Text style={styles.title}>
            {isSetupMode ? 'Configuration Administrateur' : 'Espace Administrateur'}
          </Text>
          <Text style={styles.subtitle}>
            {isSetupMode 
              ? 'Créez votre mot de passe sécurisé' 
              : 'Connexion sécurisée'}
          </Text>
        </View>

        {isSetupMode && (
          <View style={styles.setupInfo}>
            <IconSymbol
              android_material_icon_name="info"
              ios_icon_name="info.circle"
              size={24}
              color={colors.primary}
            />
            <Text style={styles.setupInfoText}>
              Première connexion : Créez votre nom d&apos;utilisateur et mot de passe unique. 
              Ces identifiants seront stockés de manière sécurisée et chiffrée.
            </Text>
          </View>
        )}

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={commonStyles.inputLabel}>Nom d&apos;utilisateur</Text>
            <View style={styles.inputWrapper}>
              <IconSymbol
                android_material_icon_name="person"
                ios_icon_name="person"
                size={20}
                color={colors.textSecondary}
              />
              <TextInput
                style={styles.input}
                placeholder="Entrez votre nom d'utilisateur"
                placeholderTextColor={colors.textSecondary}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
                returnKeyType="next"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={commonStyles.inputLabel}>
              Mot de passe {isSetupMode && '(min. 8 caractères)'}
            </Text>
            <View style={styles.inputWrapper}>
              <IconSymbol
                android_material_icon_name="lock"
                ios_icon_name="lock"
                size={20}
                color={colors.textSecondary}
              />
              <TextInput
                style={styles.input}
                placeholder="Entrez votre mot de passe"
                placeholderTextColor={colors.textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
                returnKeyType={isSetupMode ? 'next' : 'done'}
                onSubmitEditing={isSetupMode ? undefined : handleLogin}
              />
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                <IconSymbol
                  android_material_icon_name={showPassword ? 'visibility-off' : 'visibility'}
                  ios_icon_name={showPassword ? 'eye.slash' : 'eye'}
                  size={20}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {isSetupMode && (
            <View style={styles.inputContainer}>
              <Text style={commonStyles.inputLabel}>Confirmer le mot de passe</Text>
              <View style={styles.inputWrapper}>
                <IconSymbol
                  android_material_icon_name="lock"
                  ios_icon_name="lock"
                  size={20}
                  color={colors.textSecondary}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Confirmez votre mot de passe"
                  placeholderTextColor={colors.textSecondary}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                  returnKeyType="done"
                  onSubmitEditing={handleSetup}
                />
                <TouchableOpacity 
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={loading}
                >
                  <IconSymbol
                    android_material_icon_name={showConfirmPassword ? 'visibility-off' : 'visibility'}
                    ios_icon_name={showConfirmPassword ? 'eye.slash' : 'eye'}
                    size={20}
                    color={colors.textSecondary}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}

          <TouchableOpacity
            style={[buttonStyles.primary, styles.loginButton, loading && styles.disabledButton]}
            onPress={isSetupMode ? handleSetup : handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={buttonStyles.text}>
                {isSetupMode ? 'Créer le compte' : 'Se connecter'}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            disabled={loading}
          >
            <Text style={styles.backButtonText}>Retour</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.securityInfo}>
          <IconSymbol
            android_material_icon_name="security"
            ios_icon_name="lock.shield"
            size={20}
            color={colors.success}
          />
          <Text style={styles.securityText}>
            Vos identifiants sont stockés de manière sécurisée et chiffrée sur votre appareil
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.textSecondary,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  setupInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  setupInfoText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    marginLeft: 12,
    lineHeight: 20,
  },
  form: {
    width: '100%',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 16,
    color: colors.text,
  },
  loginButton: {
    marginTop: 8,
    minHeight: 48,
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  backButton: {
    marginTop: 16,
    alignItems: 'center',
    paddingVertical: 12,
  },
  backButtonText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  securityText: {
    flex: 1,
    fontSize: 13,
    color: colors.textSecondary,
    marginLeft: 12,
    lineHeight: 18,
  },
});
