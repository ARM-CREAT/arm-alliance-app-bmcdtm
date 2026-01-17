
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors, commonStyles } from '@/styles/commonStyles';
import { programSections } from '@/data/partyData';
import { IconSymbol } from '@/components/IconSymbol';
import AppHeader from '@/components/AppHeader';

export default function ProgramsScreen() {
  console.log('User opened Programs screen');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (id: string) => {
    console.log('User toggled program section:', id);
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <View style={commonStyles.container}>
      <AppHeader title="Programmes" />
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
          <Text style={styles.title}>Notre Programme Politique</Text>
          <Text style={styles.subtitle}>
            Le Mali Koura avec A.R.M - Une vision complète pour le renouveau
          </Text>
        </View>

        <View style={styles.programsContainer}>
          {programSections.map((program, index) => {
            const isExpanded = expandedSections.has(program.id);
            return (
              <React.Fragment key={index}>
                <TouchableOpacity
                  style={styles.programCard}
                  onPress={() => toggleSection(program.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.programHeader}>
                    <View style={styles.iconContainer}>
                      <IconSymbol
                        android_material_icon_name={program.icon as any}
                        ios_icon_name={program.icon}
                        size={28}
                        color={colors.white}
                      />
                    </View>
                    <View style={styles.programTitleContainer}>
                      <Text style={styles.programNumber}>{program.id}.</Text>
                      <Text style={styles.programTitle}>{program.title}</Text>
                    </View>
                    <IconSymbol
                      android_material_icon_name={isExpanded ? 'expand-less' : 'expand-more'}
                      ios_icon_name={isExpanded ? 'chevron.up' : 'chevron.down'}
                      size={24}
                      color={colors.textSecondary}
                    />
                  </View>
                  <Text style={styles.programDescription}>{program.description}</Text>

                  {isExpanded && program.details && program.details.length > 0 && (
                    <View style={styles.detailsContainer}>
                      {program.details.map((detail, detailIndex) => (
                        <React.Fragment key={detailIndex}>
                          <View style={styles.detailItem}>
                            <View style={styles.bulletPoint} />
                            <View style={styles.detailContent}>
                              <Text style={styles.detailSubtitle}>{detail.subtitle} :</Text>
                              <Text style={styles.detailText}>{detail.content}</Text>
                            </View>
                          </View>
                        </React.Fragment>
                      ))}
                    </View>
                  )}
                </TouchableOpacity>
              </React.Fragment>
            );
          })}
        </View>

        <View style={styles.conclusionCard}>
          <Text style={styles.conclusionTitle}>
            Conclusion et Perspective d&apos;Avenir – Le Mali Koura avec A.R.M
          </Text>
          <Text style={styles.conclusionText}>
            L&apos;Alliance Pour le Rassemblement Malien (A.R.M) incarne une nouvelle vision pour le Mali :
          </Text>
          <View style={styles.visionList}>
            <View style={styles.visionItem}>
              <IconSymbol
                android_material_icon_name="check-circle"
                ios_icon_name="checkmark.circle.fill"
                size={20}
                color={colors.primary}
              />
              <Text style={styles.visionText}>
                Une société unie autour des valeurs de justice, d&apos;équité et de solidarité.
              </Text>
            </View>
            <View style={styles.visionItem}>
              <IconSymbol
                android_material_icon_name="check-circle"
                ios_icon_name="checkmark.circle.fill"
                size={20}
                color={colors.primary}
              />
              <Text style={styles.visionText}>
                Une économie productive, durable et inclusive.
              </Text>
            </View>
            <View style={styles.visionItem}>
              <IconSymbol
                android_material_icon_name="check-circle"
                ios_icon_name="checkmark.circle.fill"
                size={20}
                color={colors.primary}
              />
              <Text style={styles.visionText}>
                Une jeunesse formée, encadrée et au cœur du développement.
              </Text>
            </View>
            <View style={styles.visionItem}>
              <IconSymbol
                android_material_icon_name="check-circle"
                ios_icon_name="checkmark.circle.fill"
                size={20}
                color={colors.primary}
              />
              <Text style={styles.visionText}>
                Une administration responsable, une armée républicaine et une justice équitable.
              </Text>
            </View>
          </View>
          <Text style={styles.conclusionFooter}>
            Le projet du Mali Koura ne peut se faire sans le peuple. A.R.M tend la main à toutes les forces vives de la nation : agriculteurs, ouvriers, commerçants, enseignants, femmes, jeunes, diaspora et anciens.
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
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 22,
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
  programTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  programNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    marginRight: 6,
  },
  programTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  programDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  detailsContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  detailItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginTop: 8,
    marginRight: 12,
  },
  detailContent: {
    flex: 1,
  },
  detailSubtitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  conclusionCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    marginTop: 8,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  conclusionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
    lineHeight: 28,
  },
  conclusionText: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  visionList: {
    marginBottom: 16,
  },
  visionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  visionText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: colors.text,
    marginLeft: 12,
  },
  conclusionFooter: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
});
