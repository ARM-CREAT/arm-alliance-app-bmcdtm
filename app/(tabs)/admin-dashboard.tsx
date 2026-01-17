
import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';
import { useAdmin } from '@/contexts/AdminContext';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';

export default function AdminDashboardScreen() {
  const { isAdmin, isLoading, logout } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    console.log('📊 AdminDashboard - État:', { isAdmin, isLoading });
    
    if (!isLoading && !isAdmin) {
      console.log('⚠️ Utilisateur non authentifié, redirection vers login...');
      router.replace('/(tabs)/admin-login');
    }
  }, [isAdmin, isLoading, router]);

  const handleLogout = async () => {
    console.log('🚪 Demande de déconnexion...');
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
            await logout();
            router.replace('/(tabs)/(home)/');
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={[commonStyles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const menuItems = [
    {
      title: 'Gérer les Événements',
      description: 'Ajouter, modifier ou supprimer des événements',
      icon: 'event',
      route: '/(tabs)/admin-events',
      color: '#4CAF50',
    },
    {
      title: 'Gérer les Actualités',
      description: 'Publier et gérer les articles d\'actualité',
      icon: 'article',
      route: '/(tabs)/admin-news',
      color: '#2196F3',
    },
    {
      title: 'Gérer les Médias',
      description: 'Ajouter des photos et vidéos',
      icon: 'photo-library',
      route: '/(tabs)/admin-media',
      color: '#FF9800',
    },
    {
      title: 'Gérer les Conférences',
      description: 'Organiser des vidéoconférences en direct',
      icon: 'videocam',
      route: '/(tabs)/admin-conference',
      color: '#9C27B0',
    },
    {
      title: 'Gérer les Programmes',
      description: 'Modifier les programmes politiques',
      icon: 'description',
      route: '/(tabs)/admin-programs',
      color: '#F44336',
    },
  ];

  return (
    <View style={commonStyles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <IconSymbol
              android_material_icon_name="admin-panel-settings"
              ios_icon_name="lock.shield"
              size={64}
              color={colors.white}
            />
          </View>
          <Text style={styles.title}>Tableau de Bord</Text>
          <Text style={styles.subtitle}>Espace Administrateur</Text>
        </View>

        <View style={styles.welcomeCard}>
          <IconSymbol
            android_material_icon_name="check-circle"
            ios_icon_name="checkmark.circle"
            size={32}
            color={colors.success}
          />
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeTitle}>Bienvenue, Administrateur</Text>
            <Text style={styles.welcomeText}>
              Vous êtes connecté avec succès. Gérez le contenu de l&apos;application depuis ce tableau de bord.
            </Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  console.log('Navigation vers:', item.route);
                  router.push(item.route as any);
                }}
              >
                <View style={[styles.menuIconContainer, { backgroundColor: item.color }]}>
                  <IconSymbol
                    android_material_icon_name={item.icon as any}
                    ios_icon_name={item.icon}
                    size={32}
                    color={colors.white}
                  />
                </View>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuDescription}>{item.description}</Text>
                </View>
                <IconSymbol
                  android_material_icon_name="chevron-right"
                  ios_icon_name="chevron.right"
                  size={24}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </React.Fragment>
          ))}
        </View>

        <View style={styles.infoCard}>
          <IconSymbol
            android_material_icon_name="info"
            ios_icon_name="info.circle"
            size={24}
            color={colors.primary}
          />
          <Text style={styles.infoText}>
            💡 Toutes les modifications que vous effectuez seront immédiatement visibles pour les utilisateurs de l&apos;application.
          </Text>
        </View>

        <TouchableOpacity
          style={[buttonStyles.secondary, styles.logoutButton]}
          onPress={handleLogout}
        >
          <IconSymbol
            android_material_icon_name="logout"
            ios_icon_name="arrow.right.square"
            size={20}
            color={colors.primary}
          />
          <Text style={[buttonStyles.text, styles.logoutButtonText]}>
            Se déconnecter
          </Text>
        </TouchableOpacity>

        <View style={styles.passwordInfo}>
          <Text style={styles.passwordTitle}>🔑 Informations de connexion</Text>
          <View style={styles.credentialRow}>
            <Text style={styles.credentialLabel}>Nom d&apos;utilisateur:</Text>
            <Text style={styles.credentialValue}>admin</Text>
          </View>
          <View style={styles.credentialRow}>
            <Text style={styles.credentialLabel}>Mot de passe:</Text>
            <Text style={styles.credentialValue}>ARM2024@Mali</Text>
          </View>
          <Text style={styles.passwordNote}>
            ⚠️ Gardez ces informations confidentielles et ne les partagez avec personne.
          </Text>
        </View>
      </ScrollView>
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
    paddingBottom: 120,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 32,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  welcomeCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  welcomeTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  welcomeText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  menuContainer: {
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  menuIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTextContainer: {
    flex: 1,
    marginLeft: 16,
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
  infoCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 12,
    lineHeight: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  logoutButtonText: {
    marginLeft: 8,
    color: colors.primary,
  },
  passwordInfo: {
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#FF9800',
  },
  passwordTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  credentialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  credentialLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  credentialValue: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '700',
    fontFamily: 'monospace',
  },
  passwordNote: {
    fontSize: 13,
    color: '#E65100',
    fontWeight: '600',
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 8,
  },
});
