
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { programSections } from '@/data/partyData';
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

export default function ProgramDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  console.log('User opened program detail screen with ID:', id);
  
  const program = programSections.find((p) => p.id === id);

  if (!program) {
    return (
      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Programme',
            headerBackTitle: 'Retour',
          }}
        />
        <Text style={styles.errorText}>Programme non trouvé</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: program.title,
          headerBackTitle: 'Retour',
        }}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <IconSymbol
              ios_icon_name={program.icon}
              android_material_icon_name={program.icon}
              size={48}
              color={colors.primary}
            />
          </View>
          <Text style={styles.title}>{program.title}</Text>
          <Text style={styles.description}>{program.description}</Text>
        </View>

        {/* Details Section */}
        {program.details && program.details.length > 0 && (
          <View style={styles.detailsContainer}>
            {program.details.map((detail, index) => (
              <View key={index} style={styles.detailCard}>
                <View style={styles.detailHeader}>
                  <View style={styles.bulletPoint} />
                  <Text style={styles.detailSubtitle}>{detail.subtitle}</Text>
                </View>
                <Text style={styles.detailContent}>{detail.content}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            console.log('User tapped back button from program detail');
            router.back();
          }}
        >
          <IconSymbol
            ios_icon_name="arrow.left"
            android_material_icon_name="arrow-back"
            size={20}
            color="#fff"
          />
          <Text style={styles.backButtonText}>Retour aux Programmes</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  detailsContainer: {
    gap: 20,
  },
  detailCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginRight: 12,
  },
  detailSubtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  detailContent: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
    paddingLeft: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 30,
    gap: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 40,
  },
});
