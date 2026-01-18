
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

export default function ProfileScreen() {
  return (
    <View style={commonStyles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <IconSymbol
              android_material_icon_name="person"
              ios_icon_name="person.fill"
              size={48}
              color={colors.white}
            />
          </View>
          <Text style={styles.name}>Utilisateur</Text>
          <Text style={styles.email}>utilisateur@example.com</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Paramètres</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <IconSymbol
              android_material_icon_name="notifications"
              ios_icon_name="bell"
              size={24}
              color={colors.text}
            />
            <Text style={styles.menuText}>Notifications</Text>
            <IconSymbol
              android_material_icon_name="arrow-forward"
              ios_icon_name="chevron.right"
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <IconSymbol
              android_material_icon_name="settings"
              ios_icon_name="gear"
              size={24}
              color={colors.text}
            />
            <Text style={styles.menuText}>Paramètres</Text>
            <IconSymbol
              android_material_icon_name="arrow-forward"
              ios_icon_name="chevron.right"
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <IconSymbol
              android_material_icon_name="help"
              ios_icon_name="questionmark.circle"
              size={24}
              color={colors.text}
            />
            <Text style={styles.menuText}>Aide</Text>
            <IconSymbol
              android_material_icon_name="arrow-forward"
              ios_icon_name="chevron.right"
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={[styles.menuItem, styles.logoutButton]}>
            <IconSymbol
              android_material_icon_name="logout"
              ios_icon_name="arrow.right.square"
              size={24}
              color={colors.error}
            />
            <Text style={[styles.menuText, styles.logoutText]}>
              Déconnexion
            </Text>
          </TouchableOpacity>
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
    paddingBottom: 120,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.8,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 32,
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
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 16,
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: colors.error,
  },
  logoutText: {
    color: colors.error,
  },
});
