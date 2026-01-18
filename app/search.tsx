
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { Stack, useRouter } from 'expo-router';
import { colors } from '@/styles/commonStyles';

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (query: string) => {
    console.log('User searched for:', query);
    setSearchQuery(query);
    setIsSearching(true);
    
    // Simuler une recherche
    setTimeout(() => {
      setIsSearching(false);
    }, 500);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Recherche',
          headerBackTitle: 'Retour',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
        }}
      />
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <IconSymbol
            android_material_icon_name="search"
            ios_icon_name="magnifyingglass"
            size={20}
            color={colors.textSecondary}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={handleSearch}
            autoFocus
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <IconSymbol
                android_material_icon_name="close"
                ios_icon_name="xmark.circle.fill"
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView style={styles.resultsContainer}>
          {isSearching ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.loadingText}>Recherche en cours...</Text>
            </View>
          ) : searchQuery.length > 0 ? (
            <View style={styles.emptyContainer}>
              <IconSymbol
                android_material_icon_name="search"
                ios_icon_name="magnifyingglass"
                size={64}
                color={colors.textSecondary}
              />
              <Text style={styles.emptyText}>Aucun résultat trouvé</Text>
              <Text style={styles.emptySubtext}>
                Essayez avec d&apos;autres mots-clés
              </Text>
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <IconSymbol
                android_material_icon_name="search"
                ios_icon_name="magnifyingglass"
                size={64}
                color={colors.textSecondary}
              />
              <Text style={styles.emptyText}>Commencez votre recherche</Text>
              <Text style={styles.emptySubtext}>
                Entrez un mot-clé pour rechercher
              </Text>
            </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
    marginRight: 12,
  },
  resultsContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  loadingText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
});
