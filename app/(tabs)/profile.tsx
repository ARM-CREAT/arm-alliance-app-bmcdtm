
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { colors, commonStyles } from '@/styles/commonStyles';
import { members, partyInfo } from '@/data/partyData';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { useAdmin } from '@/contexts/AdminContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { isAdmin } = useAdmin();

  return (
    <View style={commonStyles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Image
            source={{ uri: partyInfo.logoUrl }}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Menu Principal</Text>
        </View>

        {isAdmin && (
          <View style={styles.adminSection}>
            <TouchableOpacity
              style={styles.adminCard}
              onPress={() => router.push('/(tabs)/admin-dashboard')}
            >
              <View style={styles.adminIconContainer}>
                <IconSymbol
                  android_material_icon_name="admin-panel-settings"
                  ios_icon_name="lock.shield"
                  size={32}
                  color={colors.white}
                />
              </View>
              <View style={styles.adminContent}>
                <Text style={styles.adminTitle}>Tableau de Bord Admin</Text>
                <Text style={styles.adminSubtitle}>Gérer le contenu de l&apos;application</Text>
              </View>
              <IconSymbol
                android_material_icon_name="chevron-right"
                ios_icon_name="chevron.right"
                size={24}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Navigation</Text>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/(tabs)/(home)/')}
          >
            <IconSymbol
              android_material_icon_name="home"
              ios_icon_name="house"
              size={24}
              color={colors.primary}
            />
            <Text style={styles.menuText}>Accueil</Text>
            <IconSymbol
              android_material_icon_name="chevron-right"
              ios_icon_name="chevron.right"
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/(tabs)/members')}
          >
            <IconSymbol
              android_material_icon_name="groups"
              ios_icon_name="person.3"
              size={24}
              color={colors.primary}
            />
            <Text style={styles.menuText}>Membres du Bureau</Text>
            <IconSymbol
              android_material_icon_name="chevron-right"
              ios_icon_name="chevron.right"
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/(tabs)/programs')}
          >
            <IconSymbol
              android_material_icon_name="description"
              ios_icon_name="doc.text"
              size={24}
              color={colors.primary}
            />
            <Text style={styles.menuText}>Nos Programmes</Text>
            <IconSymbol
              android_material_icon_name="chevron-right"
              ios_icon_name="chevron.right"
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/(tabs)/regions')}
          >
            <IconSymbol
              android_material_icon_name="map"
              ios_icon_name="map"
              size={24}
              color={colors.primary}
            />
            <Text style={styles.menuText}>Régions du Mali</Text>
            <IconSymbol
              android_material_icon_name="chevron-right"
              ios_icon_name="chevron.right"
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/(tabs)/donation')}
          >
            <IconSymbol
              android_material_icon_name="volunteer-activism"
              ios_icon_name="heart.circle"
              size={24}
              color={colors.primary}
            />
            <Text style={styles.menuText}>Faire un Don</Text>
            <IconSymbol
              android_material_icon_name="chevron-right"
              ios_icon_name="chevron.right"
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/(tabs)/contact')}
          >
            <IconSymbol
              android_material_icon_name="contact-mail"
              ios_icon_name="envelope"
              size={24}
              color={colors.primary}
            />
            <Text style={styles.menuText}>Contact</Text>
            <IconSymbol
              android_material_icon_name="chevron-right"
              ios_icon_name="chevron.right"
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        {!isAdmin && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Administration</Text>
            <TouchableOpacity
              style={styles.adminLoginButton}
              onPress={() => router.push('/(tabs)/admin-login')}
            >
              <IconSymbol
                android_material_icon_name="admin-panel-settings"
                ios_icon_name="lock.shield"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.menuText}>Connexion Administrateur</Text>
              <IconSymbol
                android_material_icon_name="chevron-right"
                ios_icon_name="chevron.right"
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>{partyInfo.motto}</Text>
          <Text style={styles.infoText}>{partyInfo.fullName}</Text>
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
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
    borderRadius: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
  },
  adminSection: {
    marginBottom: 24,
  },
  adminCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
    elevation: 4,
  },
  adminIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  adminContent: {
    flex: 1,
  },
  adminTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4,
  },
  adminSubtitle: {
    fontSize: 13,
    color: colors.white,
    opacity: 0.9,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  adminLoginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 12,
  },
  infoCard: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginTop: 16,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 8,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 14,
    color: colors.white,
    textAlign: 'center',
  },
});
