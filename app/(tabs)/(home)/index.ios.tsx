
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors, commonStyles } from '@/styles/commonStyles';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={commonStyles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Bienvenue</Text>
          <Text style={styles.subtitle}>Application Natively</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fonctionnalités</Text>
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              console.log('User tapped Search card');
              router.push('/search');
            }}
          >
            <IconSymbol
              android_material_icon_name="search"
              ios_icon_name="magnifyingglass"
              size={32}
              color={colors.primary}
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Recherche</Text>
              <Text style={styles.cardDescription}>
                Recherchez du contenu dans l&apos;application
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              console.log('User tapped Chat card');
              router.push('/chat');
            }}
          >
            <IconSymbol
              android_material_icon_name="chat"
              ios_icon_name="message"
              size={32}
              color={colors.primary}
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Chat</Text>
              <Text style={styles.cardDescription}>
                Discutez avec l&apos;assistant
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>À propos</Text>
          <Text style={styles.description}>
            Ceci est une application de démonstration créée avec Natively.
            Vous pouvez personnaliser cette application selon vos besoins.
          </Text>
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
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textSecondary,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  cardContent: {
    flex: 1,
    marginLeft: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
