
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';
import { partyInfo, programSections, donationOptions } from '@/data/partyData';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';

const { width } = Dimensions.get('window');

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
          <Image
            source={{ uri: partyInfo.logoUrl }}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.partyName}>{partyInfo.name}</Text>
          <Text style={styles.partyFullName}>{partyInfo.fullName}</Text>
          <View style={styles.mottoContainer}>
            <Text style={styles.motto}>{partyInfo.motto}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notre Mission</Text>
          <Text style={styles.description}>
            L&apos;Alliance pour le Rassemblement Malien (A.R.M) est un parti politique dédié à la construction d&apos;un Mali uni, prospère et démocratique. Nous œuvrons pour le développement économique, social et culturel de notre nation, en plaçant les valeurs de fraternité, liberté et égalité au cœur de notre action politique.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nos Programmes</Text>
          <View style={styles.programGrid}>
            {programSections.map((program, index) => (
              <React.Fragment key={index}>
                <View style={styles.programCard}>
                  <View style={styles.programIconContainer}>
                    <IconSymbol
                      android_material_icon_name={program.icon as any}
                      ios_icon_name={program.icon}
                      size={32}
                      color={colors.primary}
                    />
                  </View>
                  <Text style={styles.programTitle}>{program.title}</Text>
                  <Text style={styles.programDescription} numberOfLines={3}>
                    {program.description}
                  </Text>
                </View>
              </React.Fragment>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Soutenez-nous</Text>
          <Text style={styles.description}>
            Votre contribution nous aide à réaliser nos objectifs pour un Mali meilleur.
          </Text>
          <View style={styles.donationContainer}>
            {donationOptions.map((option, index) => (
              <React.Fragment key={index}>
                <TouchableOpacity
                  style={styles.donationButton}
                  onPress={() => router.push('/(tabs)/donation')}
                >
                  <Text style={styles.donationAmount}>{option.label}</Text>
                  <Text style={styles.donationLabel}>Faire un don</Text>
                </TouchableOpacity>
              </React.Fragment>
            ))}
          </View>
          <TouchableOpacity
            style={[buttonStyles.primary, styles.customDonationButton]}
            onPress={() => router.push('/(tabs)/donation')}
          >
            <Text style={buttonStyles.text}>Montant personnalisé</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rejoignez-nous</Text>
          <Text style={styles.description}>
            Devenez membre de l&apos;A.R.M et participez activement à la construction d&apos;un Mali meilleur.
          </Text>
          <TouchableOpacity
            style={buttonStyles.primary}
            onPress={() => router.push('/(tabs)/membership')}
          >
            <Text style={buttonStyles.text}>Adhérer au parti</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact</Text>
          <View style={styles.contactCard}>
            <View style={styles.contactRow}>
              <IconSymbol
                android_material_icon_name="location-on"
                ios_icon_name="location"
                size={20}
                color={colors.primary}
              />
              <Text style={styles.contactText}>{partyInfo.headquarters}</Text>
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
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
    borderRadius: 60,
    backgroundColor: colors.white,
  },
  partyName: {
    fontSize: 36,
    fontWeight: '900',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 8,
  },
  partyFullName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 16,
  },
  mottoContainer: {
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  motto: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
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
    marginBottom: 16,
  },
  programGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  programCard: {
    width: (width - 52) / 2,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  programIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  programTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  programDescription: {
    fontSize: 13,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  donationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  donationButton: {
    flex: 1,
    backgroundColor: colors.secondary,
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  donationAmount: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  donationLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  customDonationButton: {
    marginTop: 8,
  },
  contactCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
});
