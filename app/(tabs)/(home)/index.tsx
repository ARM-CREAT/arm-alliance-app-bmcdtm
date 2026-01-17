
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';
import { partyInfo, programSections } from '@/data/partyData';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import AppHeader from '@/components/AppHeader';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'web') {
      const handleBeforeInstallPrompt = (e: any) => {
        console.log('beforeinstallprompt event fired');
        e.preventDefault();
        setDeferredPrompt(e);
        setShowInstallButton(true);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

      // Check if app is already installed
      if (window.matchMedia('(display-mode: standalone)').matches) {
        console.log('App is already installed');
        setShowInstallButton(false);
      }

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
    }
  }, []);

  const handleInstallClick = async () => {
    console.log('Install button clicked');
    if (!deferredPrompt) {
      console.log('No deferred prompt available');
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  return (
    <View style={commonStyles.container}>
      <AppHeader title="A.R.M" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Image
            source={partyInfo.logoUrl}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.partyName}>{partyInfo.name}</Text>
          <Text style={styles.partyFullName}>{partyInfo.fullName}</Text>
          <View style={styles.mottoContainer}>
            <Text style={styles.motto}>{partyInfo.motto}</Text>
          </View>
        </View>

        {showInstallButton && Platform.OS === 'web' && (
          <View style={styles.installSection}>
            <TouchableOpacity
              style={styles.installButton}
              onPress={handleInstallClick}
            >
              <View style={styles.installButtonContent}>
                <IconSymbol
                  android_material_icon_name="download"
                  ios_icon_name="arrow.down.circle.fill"
                  size={28}
                  color={colors.white}
                />
                <View style={styles.installTextContainer}>
                  <Text style={styles.installButtonText}>Installer l&apos;application</Text>
                  <Text style={styles.installButtonSubtext}>
                    Accédez rapidement à A.R.M depuis votre écran d&apos;accueil
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notre Mission</Text>
          <Text style={styles.description}>
            L&apos;Alliance pour le Rassemblement Malien (A.R.M) est un parti politique dédié à la construction d&apos;un Mali uni, prospère et démocratique. Nous œuvrons pour le développement économique, social et culturel de notre nation, en plaçant les valeurs de fraternité, liberté et égalité au cœur de notre action politique.
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nos Programmes</Text>
            <TouchableOpacity
              onPress={() => {
                console.log('User tapped "Voir tout" button to view all programs');
                router.push('/(tabs)/programs');
              }}
            >
              <Text style={styles.viewAllText}>Voir tout →</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.programGrid}>
            {programSections.slice(0, 6).map((program, index) => (
              <React.Fragment key={index}>
                <TouchableOpacity
                  style={styles.programCard}
                  onPress={() => {
                    console.log('User tapped program card:', program.title);
                    router.push('/(tabs)/programs');
                  }}
                  activeOpacity={0.7}
                >
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
                </TouchableOpacity>
              </React.Fragment>
            ))}
          </View>
          <TouchableOpacity
            style={styles.viewAllButton}
            onPress={() => {
              console.log('User tapped "Voir tous les programmes" button');
              router.push('/(tabs)/programs');
            }}
          >
            <Text style={styles.viewAllButtonText}>Voir tous les programmes</Text>
            <IconSymbol
              android_material_icon_name="arrow-forward"
              ios_icon_name="arrow.right"
              size={20}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rejoignez-nous</Text>
          <Text style={styles.description}>
            Devenez membre de l&apos;A.R.M et participez activement à la construction d&apos;un Mali meilleur.
          </Text>
          <TouchableOpacity
            style={buttonStyles.primary}
            onPress={() => {
              console.log('User tapped "Adhérer au parti" button');
              router.push('/(tabs)/membership');
            }}
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
  installSection: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 8,
  },
  installButton: {
    backgroundColor: colors.accent,
    borderRadius: 16,
    padding: 20,
    boxShadow: '0px 4px 12px rgba(3, 102, 102, 0.3)',
    elevation: 4,
  },
  installButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  installTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  installButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4,
  },
  installButtonSubtext: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.white,
    opacity: 0.9,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  viewAllText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
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
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  viewAllButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginRight: 8,
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
