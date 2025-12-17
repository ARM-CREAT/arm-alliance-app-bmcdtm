
import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { colors, commonStyles } from '@/styles/commonStyles';
import { useAdmin } from '@/contexts/AdminContext';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';

export default function AdminDashboardScreen() {
  const { isAdmin, logout } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) {
      router.replace('/(tabs)/admin-login');
    }
  }, [isAdmin]);

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
            await logout();
            router.replace('/(tabs)/(home)/');
          },
        },
      ]
    );
  };

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
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 48,
    paddingBottom: 120,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 32,
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
});
