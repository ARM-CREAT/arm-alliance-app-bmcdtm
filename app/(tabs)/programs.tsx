
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { colors, commonStyles } from '@/styles/commonStyles';
import { programSections } from '@/data/partyData';
import { IconSymbol } from '@/components/IconSymbol';

export default function ProgramsScreen() {
  return (
    <View style={commonStyles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <IconSymbol
            android_material_icon_name="description"
            ios_icon_name="doc.text"
            size={48}
            color={colors.primary}
          />
          <Text style={styles.title}>Nos Programmes</Text>
          <Text style={styles.subtitle}>
            Notre vision pour un Mali meilleur
          </Text>
        </View>

        <View style={styles.programsContainer}>
          {programSections.map((program, index) => (
            <React.Fragment key={index}>
              <View style={styles.programCard}>
                <View style={styles.programHeader}>
                  <View style={styles.iconContainer}>
                    <IconSymbol
                      android_material_icon_name={program.icon as any}
                      ios_icon_name={program.icon}
                      size={28}
                      color={colors.white}
                    />
                  </View>
                  <Text style={styles.programTitle}>{program.title}</Text>
                </View>
                <Text style={styles.programDescription}>{program.description}</Text>
              </View>
            </React.Fragment>
          ))}
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
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  programsContainer: {
    width: '100%',
  },
  programCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  programHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  programTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  programDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
  },
});
