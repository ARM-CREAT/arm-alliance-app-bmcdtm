
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { programSections, members, regions } from '@/data/partyData';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'program' | 'member' | 'region' | 'news' | 'event';
  icon: string;
}

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    // TODO: Backend Integration - POST /api/search with { query: string } → { results: SearchResult[] }
    // Simulate search for now with local data
    setTimeout(() => {
      const results: SearchResult[] = [];
      const lowerQuery = query.toLowerCase();

      // Search in programs
      programSections.forEach((program) => {
        if (
          program.title.toLowerCase().includes(lowerQuery) ||
          program.description.toLowerCase().includes(lowerQuery)
        ) {
          results.push({
            id: program.id,
            title: program.title,
            description: program.description,
            type: 'program',
            icon: program.icon,
          });
        }
      });

      // Search in members
      members.forEach((member) => {
        if (
          member.name.toLowerCase().includes(lowerQuery) ||
          member.role.toLowerCase().includes(lowerQuery)
        ) {
          results.push({
            id: member.id,
            title: member.name,
            description: `${member.role} - ${member.location}`,
            type: 'member',
            icon: 'person',
          });
        }
      });

      // Search in regions
      regions.forEach((region) => {
        if (region.name.toLowerCase().includes(lowerQuery)) {
          results.push({
            id: region.id,
            title: region.name,
            description: `${region.cercles.length} cercles`,
            type: 'region',
            icon: 'map',
          });
        }
      });

      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'program':
        return 'Programme';
      case 'member':
        return 'Membre';
      case 'region':
        return 'Région';
      case 'news':
        return 'Actualité';
      case 'event':
        return 'Événement';
      default:
        return '';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'program':
        return colors.primary;
      case 'member':
        return colors.accent;
      case 'region':
        return colors.secondary;
      default:
        return colors.textSecondary;
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Recherche',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: '700',
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <IconSymbol
                android_material_icon_name="arrow-back"
                ios_icon_name="chevron.left"
                size={24}
                color={colors.white}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <IconSymbol
              android_material_icon_name="search"
              ios_icon_name="magnifyingglass"
              size={20}
              color={colors.textSecondary}
            />
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={handleSearch}
              placeholder="Rechercher des programmes, membres, régions..."
              placeholderTextColor={colors.textSecondary}
              autoFocus
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => handleSearch('')}>
                <IconSymbol
                  android_material_icon_name="close"
                  ios_icon_name="xmark.circle.fill"
                  size={20}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <ScrollView
          style={styles.resultsContainer}
          contentContainerStyle={styles.resultsContent}
          showsVerticalScrollIndicator={false}
        >
          {isSearching ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.loadingText}>Recherche en cours...</Text>
            </View>
          ) : searchQuery.trim() === '' ? (
            <View style={styles.emptyContainer}>
              <IconSymbol
                android_material_icon_name="search"
                ios_icon_name="magnifyingglass"
                size={64}
                color={colors.border}
              />
              <Text style={styles.emptyTitle}>Rechercher dans A.R.M</Text>
              <Text style={styles.emptyText}>
                Trouvez des informations sur nos programmes, membres, régions et plus encore
              </Text>
            </View>
          ) : searchResults.length === 0 ? (
            <View style={styles.emptyContainer}>
              <IconSymbol
                android_material_icon_name="search-off"
                ios_icon_name="magnifyingglass"
                size={64}
                color={colors.border}
              />
              <Text style={styles.emptyTitle}>Aucun résultat</Text>
              <Text style={styles.emptyText}>
                Essayez avec d&apos;autres mots-clés
              </Text>
            </View>
          ) : (
            <>
              <Text style={styles.resultsCount}>
                {searchResults.length} résultat{searchResults.length > 1 ? 's' : ''} trouvé{searchResults.length > 1 ? 's' : ''}
              </Text>
              {searchResults.map((result) => (
                <TouchableOpacity
                  key={result.id}
                  style={styles.resultCard}
                  onPress={() => {
                    // Navigate to appropriate screen based on type
                    if (result.type === 'program') {
                      router.push('/(tabs)/programs');
                    } else if (result.type === 'member') {
                      router.push('/(tabs)/members');
                    } else if (result.type === 'region') {
                      router.push('/(tabs)/regions');
                    }
                  }}
                >
                  <View style={styles.resultIconContainer}>
                    <IconSymbol
                      android_material_icon_name={result.icon as any}
                      ios_icon_name={result.icon}
                      size={24}
                      color={getTypeColor(result.type)}
                    />
                  </View>
                  <View style={styles.resultContent}>
                    <View style={styles.resultHeader}>
                      <Text style={styles.resultTitle}>{result.title}</Text>
                      <View
                        style={[
                          styles.typeBadge,
                          { backgroundColor: getTypeColor(result.type) },
                        ]}
                      >
                        <Text style={styles.typeBadgeText}>
                          {getTypeLabel(result.type)}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.resultDescription} numberOfLines={2}>
                      {result.description}
                    </Text>
                  </View>
                  <IconSymbol
                    android_material_icon_name="chevron-right"
                    ios_icon_name="chevron.right"
                    size={20}
                    color={colors.textSecondary}
                  />
                </TouchableOpacity>
              ))}
            </>
          )}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backButton: {
    marginLeft: 8,
    padding: 4,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  resultsContainer: {
    flex: 1,
  },
  resultsContent: {
    padding: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  resultsCount: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 16,
  },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  resultIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  resultContent: {
    flex: 1,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  typeBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.white,
  },
  resultDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
