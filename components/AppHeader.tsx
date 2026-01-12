
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { colors } from '@/styles/commonStyles';
import { partyInfo } from '@/data/partyData';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';

interface AppHeaderProps {
  title?: string;
  showSearch?: boolean;
  showChat?: boolean;
}

export default function AppHeader({ title, showSearch = true, showChat = true }: AppHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Image
          source={partyInfo.logoUrl}
          style={styles.logo}
          resizeMode="contain"
        />
        {title && <Text style={styles.title}>{title}</Text>}
      </View>
      
      <View style={styles.actionsContainer}>
        {showSearch && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.push('/search')}
          >
            <IconSymbol
              android_material_icon_name="search"
              ios_icon_name="magnifyingglass"
              size={24}
              color={colors.white}
            />
          </TouchableOpacity>
        )}
        
        {showChat && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.push('/chat')}
          >
            <IconSymbol
              android_material_icon_name="chat"
              ios_icon_name="message"
              size={24}
              color={colors.white}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: Platform.OS === 'android' ? 48 : 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
    elevation: 4,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
    marginLeft: 12,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
