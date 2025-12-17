
import React from 'react';
import { Stack } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';

export default function TabLayout() {
  const tabs: TabBarItem[] = [
    {
      name: '(home)',
      route: '/(tabs)/(home)/',
      icon: 'home',
      label: 'Accueil',
    },
    {
      name: 'membership',
      route: '/(tabs)/membership',
      icon: 'person-add',
      label: 'Adhésion',
    },
    {
      name: 'events',
      route: '/(tabs)/events',
      icon: 'event',
      label: 'Événements',
    },
    {
      name: 'news',
      route: '/(tabs)/news',
      icon: 'article',
      label: 'Actualités',
    },
    {
      name: 'profile',
      route: '/(tabs)/profile',
      icon: 'menu',
      label: 'Menu',
    },
  ];

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}
      >
        <Stack.Screen key="home" name="(home)" />
        <Stack.Screen key="membership" name="membership" />
        <Stack.Screen key="events" name="events" />
        <Stack.Screen key="news" name="news" />
        <Stack.Screen key="profile" name="profile" />
      </Stack>
      <FloatingTabBar tabs={tabs} containerWidth={380} />
    </>
  );
}
