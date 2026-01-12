
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors, commonStyles } from '@/styles/commonStyles';
import { regions } from '@/data/partyData';
import { IconSymbol } from '@/components/IconSymbol';
import AppHeader from '@/components/AppHeader';

export default function RegionsScreen() {
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null);

  const toggleRegion = (regionId: string) => {
    console.log('Toggle region:', regionId);
    setExpandedRegion(expandedRegion === regionId ? null : regionId);
  };

  return (
    <View style={commonStyles.container}>
      <AppHeader title="Régions" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <IconSymbol
            android_material_icon_name="map"
            ios_icon_name="map"
            size={48}
            color={colors.primary}
          />
          <Text style={styles.title}>Régions du Mali</Text>
          <Text style={styles.subtitle}>
            Découvrez les régions, cercles et communes
          </Text>
        </View>

        <View style={styles.regionsContainer}>
          {regions.map((region, index) => (
            <React.Fragment key={index}>
              <View style={styles.regionCard}>
                <TouchableOpacity
                  style={styles.regionHeader}
                  onPress={() => toggleRegion(region.id)}
                >
                  <View style={styles.regionTitleContainer}>
                    <IconSymbol
                      android_material_icon_name="location-city"
                      ios_icon_name="building.2"
                      size={24}
                      color={colors.primary}
                    />
                    <Text style={styles.regionName}>{region.name}</Text>
                  </View>
                  <IconSymbol
                    android_material_icon_name={
                      expandedRegion === region.id ? 'expand-less' : 'expand-more'
                    }
                    ios_icon_name={
                      expandedRegion === region.id ? 'chevron.up' : 'chevron.down'
                    }
                    size={24}
                    color={colors.textSecondary}
                  />
                </TouchableOpacity>

                {expandedRegion === region.id && (
                  <View style={styles.regionDetails}>
                    {region.cercles.length > 0 && (
                      <View style={styles.detailSection}>
                        <Text style={styles.detailTitle}>Cercles:</Text>
                        <View style={styles.chipContainer}>
                          {region.cercles.map((cercle, cercleIndex) => (
                            <React.Fragment key={cercleIndex}>
                              <View style={styles.chip}>
                                <Text style={styles.chipText}>{cercle}</Text>
                              </View>
                            </React.Fragment>
                          ))}
                        </View>
                      </View>
                    )}

                    {region.communes.length > 0 && (
                      <View style={styles.detailSection}>
                        <Text style={styles.detailTitle}>Communes:</Text>
                        <View style={styles.chipContainer}>
                          {region.communes.map((commune, communeIndex) => (
                            <React.Fragment key={communeIndex}>
                              <View style={styles.chip}>
                                <Text style={styles.chipText}>{commune}</Text>
                              </View>
                            </React.Fragment>
                          ))}
                        </View>
                      </View>
                    )}
                  </View>
                )}
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
    paddingBottom: 120,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 24,
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
  regionsContainer: {
    width: '100%',
  },
  regionCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  regionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  regionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  regionName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginLeft: 12,
  },
  regionDetails: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  detailSection: {
    marginBottom: 16,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    fontSize: 13,
    color: colors.text,
  },
});
