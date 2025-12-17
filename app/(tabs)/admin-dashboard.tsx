
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TextInput,
  Modal,
} from 'react-native';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';
import { useAdmin } from '@/contexts/AdminContext';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';

export default function AdminDashboardScreen() {
  const { isAdmin, isLoading, logout, changePassword } = useAdmin();
  const router = useRouter();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    console.log('AdminDashboard - isAdmin:', isAdmin, 'isLoading:', isLoading);
    
    if (!isLoading && !isAdmin) {
      console.log('User is not admin, redirecting to login...');
      router.replace('/(tabs)/admin-login');
    }
  }, [isAdmin, isLoading]);

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Déconnexion',
          style: 'destructive',
          onPress: async () => {
            console.log('Logging out...');
            await logout();
            console.log('Redirecting to home...');
            router.replace('/(tabs)/(home)/');
          },
        },
      ]
    );
  };

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    if (newPassword.length < 8) {
      Alert.alert('Erreur', 'Le nouveau mot de passe doit contenir au moins 8 caractères');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      Alert.alert('Erreur', 'Les nouveaux mots de passe ne correspondent pas');
      return;
    }

    setChangingPassword(true);

    try {
      const success = await changePassword(oldPassword, newPassword);

      if (success) {
        Alert.alert(
          'Succès',
          'Mot de passe modifié avec succès',
          [
            {
              text: 'OK',
              onPress: () => {
                setShowChangePassword(false);
                setOldPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
              },
            },
          ]
        );
      } else {
        Alert.alert('Erreur', 'Ancien mot de passe incorrect');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      Alert.alert('Erreur', 'Une erreur est survenue');
    } finally {
      setChangingPassword(false);
    }
  };

  // Show loading while checking auth
  if (isLoading) {
    return (
      <View style={[commonStyles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  // Don't render if not admin
  if (!isAdmin) {
    return null;
  }

  return (
    <View style={commonStyles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.title}>Tableau de Bord</Text>
              <Text style={styles.subtitle}>Administrateur</Text>
            </View>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <IconSymbol
                android_material_icon_name="logout"
                ios_icon_name="arrow.right.square"
                size={24}
                color={colors.error}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.securityCard}>
          <View style={styles.securityHeader}>
            <IconSymbol
              android_material_icon_name="security"
              ios_icon_name="lock.shield"
              size={24}
              color={colors.success}
            />
            <Text style={styles.securityTitle}>Sécurité</Text>
          </View>
          <Text style={styles.securityText}>
            Votre compte est protégé par un mot de passe sécurisé et chiffré
          </Text>
          <TouchableOpacity
            style={[buttonStyles.outline, styles.changePasswordButton]}
            onPress={() => setShowChangePassword(true)}
          >
            <IconSymbol
              android_material_icon_name="vpn-key"
              ios_icon_name="key"
              size={18}
              color={colors.primary}
            />
            <Text style={[buttonStyles.textOutline, styles.changePasswordText]}>
              Changer le mot de passe
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gestion du Contenu</Text>
          
          <TouchableOpacity
            style={styles.menuCard}
            onPress={() => router.push('/(tabs)/admin-events')}
          >
            <View style={styles.menuIconContainer}>
              <IconSymbol
                android_material_icon_name="event"
                ios_icon_name="calendar"
                size={28}
                color={colors.primary}
              />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Événements</Text>
              <Text style={styles.menuDescription}>
                Ajouter, modifier ou supprimer des événements
              </Text>
            </View>
            <IconSymbol
              android_material_icon_name="chevron-right"
              ios_icon_name="chevron.right"
              size={24}
              color={colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuCard}
            onPress={() => router.push('/(tabs)/admin-news')}
          >
            <View style={styles.menuIconContainer}>
              <IconSymbol
                android_material_icon_name="article"
                ios_icon_name="newspaper"
                size={28}
                color={colors.primary}
              />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Actualités</Text>
              <Text style={styles.menuDescription}>
                Gérer les articles et actualités du parti
              </Text>
            </View>
            <IconSymbol
              android_material_icon_name="chevron-right"
              ios_icon_name="chevron.right"
              size={24}
              color={colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuCard}
            onPress={() => router.push('/(tabs)/admin-media')}
          >
            <View style={styles.menuIconContainer}>
              <IconSymbol
                android_material_icon_name="photo-library"
                ios_icon_name="photo.stack"
                size={28}
                color={colors.primary}
              />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Photos & Vidéos</Text>
              <Text style={styles.menuDescription}>
                Gérer la galerie multimédia
              </Text>
            </View>
            <IconSymbol
              android_material_icon_name="chevron-right"
              ios_icon_name="chevron.right"
              size={24}
              color={colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuCard}
            onPress={() => router.push('/(tabs)/admin-conference')}
          >
            <View style={styles.menuIconContainer}>
              <IconSymbol
                android_material_icon_name="video-call"
                ios_icon_name="video"
                size={28}
                color={colors.primary}
              />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Conférences en Direct</Text>
              <Text style={styles.menuDescription}>
                Gérer les vidéoconférences et diffusions
              </Text>
            </View>
            <IconSymbol
              android_material_icon_name="chevron-right"
              ios_icon_name="chevron.right"
              size={24}
              color={colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuCard}
            onPress={() => router.push('/(tabs)/admin-programs')}
          >
            <View style={styles.menuIconContainer}>
              <IconSymbol
                android_material_icon_name="description"
                ios_icon_name="doc.text"
                size={28}
                color={colors.primary}
              />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Programmes</Text>
              <Text style={styles.menuDescription}>
                Modifier les programmes du parti
              </Text>
            </View>
            <IconSymbol
              android_material_icon_name="chevron-right"
              ios_icon_name="chevron.right"
              size={24}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistiques</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <IconSymbol
                android_material_icon_name="groups"
                ios_icon_name="person.3"
                size={32}
                color={colors.primary}
              />
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Adhésions</Text>
            </View>

            <View style={styles.statCard}>
              <IconSymbol
                android_material_icon_name="event"
                ios_icon_name="calendar"
                size={32}
                color={colors.primary}
              />
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Événements</Text>
            </View>

            <View style={styles.statCard}>
              <IconSymbol
                android_material_icon_name="article"
                ios_icon_name="newspaper"
                size={32}
                color={colors.primary}
              />
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Actualités</Text>
            </View>

            <View style={styles.statCard}>
              <IconSymbol
                android_material_icon_name="volunteer-activism"
                ios_icon_name="heart.circle"
                size={32}
                color={colors.primary}
              />
              <Text style={styles.statValue}>0€</Text>
              <Text style={styles.statLabel}>Dons</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={showChangePassword}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowChangePassword(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Changer le mot de passe</Text>
              <TouchableOpacity
                onPress={() => setShowChangePassword(false)}
                disabled={changingPassword}
              >
                <IconSymbol
                  android_material_icon_name="close"
                  ios_icon_name="xmark"
                  size={24}
                  color={colors.text}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <Text style={commonStyles.inputLabel}>Ancien mot de passe</Text>
              <TextInput
                style={commonStyles.input}
                placeholder="Entrez votre ancien mot de passe"
                placeholderTextColor={colors.textSecondary}
                value={oldPassword}
                onChangeText={setOldPassword}
                secureTextEntry
                autoCapitalize="none"
                editable={!changingPassword}
              />

              <Text style={commonStyles.inputLabel}>Nouveau mot de passe (min. 8 caractères)</Text>
              <TextInput
                style={commonStyles.input}
                placeholder="Entrez votre nouveau mot de passe"
                placeholderTextColor={colors.textSecondary}
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                autoCapitalize="none"
                editable={!changingPassword}
              />

              <Text style={commonStyles.inputLabel}>Confirmer le nouveau mot de passe</Text>
              <TextInput
                style={commonStyles.input}
                placeholder="Confirmez votre nouveau mot de passe"
                placeholderTextColor={colors.textSecondary}
                value={confirmNewPassword}
                onChangeText={setConfirmNewPassword}
                secureTextEntry
                autoCapitalize="none"
                editable={!changingPassword}
              />

              <TouchableOpacity
                style={[buttonStyles.primary, changingPassword && styles.disabledButton]}
                onPress={handleChangePassword}
                disabled={changingPassword}
              >
                {changingPassword ? (
                  <ActivityIndicator color={colors.white} />
                ) : (
                  <Text style={buttonStyles.text}>Modifier</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 48,
    paddingBottom: 120,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  logoutButton: {
    padding: 8,
  },
  securityCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 32,
    borderWidth: 2,
    borderColor: colors.success,
  },
  securityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  securityTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginLeft: 12,
  },
  securityText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  changePasswordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  changePasswordText: {
    marginLeft: 8,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  menuIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 12,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginTop: 12,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.background,
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  modalBody: {
    padding: 20,
  },
  disabledButton: {
    opacity: 0.6,
  },
});
