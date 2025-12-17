
import React, { useState } from 'react';
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
  const [loading, setLoading] = useState(false);
  const { login } = useAdmin();
  const router = useRouter();

  const handleLogin = async () => {
    console.log('🔐 Bouton de connexion pressé');
    console.log('📝 Nom d\'utilisateur:', username);
    console.log('📝 Longueur du mot de passe:', password.length);
    
    if (!username || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    console.log('🚀 Démarrage du processus de connexion...');
    
    try {
      const success = await login(username, password);
      console.log('📊 Résultat de la connexion:', success);

      if (success) {
        console.log('✅ Connexion réussie ! Redirection...');
        setUsername('');
        setPassword('');
        setTimeout(() => {
          router.replace('/(tabs)/admin-dashboard');
        }, 100);
      } else {
        console.log('❌ Échec de la connexion');
        Alert.alert(
          'Erreur de connexion', 
          'Nom d\'utilisateur ou mot de passe incorrect.\n\n' +
          'Veuillez vérifier vos identifiants et réessayer.\n' +
          '(Respectez les majuscules et minuscules)'
        );
      }
    } catch (error) {
      console.error('❌ Erreur de connexion:', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

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
          <Text style={styles.title}>Espace Administrateur</Text>
          <Text style={styles.subtitle}>Connexion sécurisée</Text>
        </View>

        <View style={styles.defaultCredentialsCard}>
          <View style={styles.credentialsHeader}>
            <IconSymbol
              android_material_icon_name="info"
              ios_icon_name="info.circle"
              size={24}
              color={colors.primary}
            />
            <Text style={styles.credentialsTitle}>Informations de connexion</Text>
          </View>
          <View style={styles.credentialRow}>
            <Text style={styles.credentialLabel}>Nom d&apos;utilisateur:</Text>
            <Text style={styles.credentialValue}>admin</Text>
          </View>
          <View style={styles.credentialRow}>
            <Text style={styles.credentialLabel}>Mot de passe:</Text>
            <Text style={styles.credentialValue}>••••••••••••</Text>
          </View>
          <Text style={styles.credentialsNote}>
            🔒 Le mot de passe est confidentiel et réservé à l&apos;administrateur uniquement
          </Text>
        </View>

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
            <Text style={commonStyles.inputLabel}>Mot de passe</Text>
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
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />
              <IconSymbol
                android_material_icon_name="lock"
                ios_icon_name="lock.fill"
                size={20}
                color={colors.success}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[buttonStyles.primary, styles.loginButton, loading && styles.disabledButton]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <React.Fragment>
                <IconSymbol
                  android_material_icon_name="login"
                  ios_icon_name="arrow.right.circle"
                  size={20}
                  color={colors.white}
                />
                <Text style={[buttonStyles.text, styles.loginButtonText]}>
                  Se connecter
                </Text>
              </React.Fragment>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            disabled={loading}
          >
            <Text style={styles.backButtonText}>Retour à l&apos;accueil</Text>
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
            🔐 Connexion sécurisée. Le mot de passe est masqué et protégé. Seul l&apos;administrateur autorisé peut accéder à cet espace.
          </Text>
        </View>

        <View style={styles.successInfo}>
          <Text style={styles.successTitle}>✅ Connexion manuelle requise</Text>
          <Text style={styles.successText}>
            La connexion automatique a été désactivée. Vous devez maintenant entrer vos identifiants à chaque fois pour accéder à l&apos;espace administrateur.
          </Text>
        </View>

        <View style={styles.debugInfo}>
          <Text style={styles.debugTitle}>🔧 Informations de débogage</Text>
          <Text style={styles.debugText}>
            Si la connexion ne fonctionne pas, vérifiez les logs dans la console pour plus de détails.
            Les identifiants sont sensibles à la casse (majuscules/minuscules).
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
  defaultCredentialsCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  credentialsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  credentialsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginLeft: 12,
  },
  credentialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  credentialLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  credentialValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  credentialsNote: {
    fontSize: 12,
    color: colors.success,
    fontWeight: '600',
    lineHeight: 16,
    textAlign: 'center',
    marginTop: 8,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    marginLeft: 8,
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
  successInfo: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.success,
  },
  successTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.success,
    marginBottom: 8,
  },
  successText: {
    fontSize: 12,
    color: colors.text,
    lineHeight: 16,
  },
  debugInfo: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  debugTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  debugText: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 16,
  },
});
