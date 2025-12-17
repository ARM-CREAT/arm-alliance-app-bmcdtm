
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { colors, commonStyles } from '@/styles/commonStyles';
import { Event } from '@/types';
import { IconSymbol } from '@/components/IconSymbol';

export default function EventsScreen() {
  const [events] = useState<Event[]>([
    {
      id: '1',
      title: 'Assemblée Générale 2024',
      description: 'Réunion annuelle de tous les membres du parti pour discuter des orientations stratégiques et élire les nouveaux responsables.',
      date: '2024-03-15',
      location: 'Bamako Sebenikoro, Siège du Parti',
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    },
    {
      id: '2',
      title: 'Forum sur l\'Éducation',
      description: 'Discussion sur les réformes éducatives nécessaires pour améliorer le système scolaire malien.',
      date: '2024-04-20',
      location: 'Université de Bamako',
      imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
    },
    {
      id: '3',
      title: 'Campagne de Sensibilisation Santé',
      description: 'Campagne de sensibilisation sur l\'importance de la santé publique et de la prévention des maladies.',
      date: '2024-05-10',
      location: 'Plusieurs régions du Mali',
      imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
    },
  ]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <View style={commonStyles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <IconSymbol
            android_material_icon_name="event"
            ios_icon_name="calendar"
            size={48}
            color={colors.primary}
          />
          <Text style={styles.title}>Événements</Text>
          <Text style={styles.subtitle}>
            Découvrez nos prochains événements et activités
          </Text>
        </View>

        <View style={styles.eventsContainer}>
          {events.map((event, index) => (
            <React.Fragment key={index}>
              <TouchableOpacity style={styles.eventCard}>
                {event.imageUrl && (
                  <Image
                    source={{ uri: event.imageUrl }}
                    style={styles.eventImage}
                    resizeMode="cover"
                  />
                )}
                <View style={styles.eventContent}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventDescription}>{event.description}</Text>
                  <View style={styles.eventDetails}>
                    <View style={styles.detailRow}>
                      <IconSymbol
                        android_material_icon_name="calendar-today"
                        ios_icon_name="calendar"
                        size={16}
                        color={colors.primary}
                      />
                      <Text style={styles.detailText}>{formatDate(event.date)}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <IconSymbol
                        android_material_icon_name="location-on"
                        ios_icon_name="location"
                        size={16}
                        color={colors.primary}
                      />
                      <Text style={styles.detailText}>{event.location}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </React.Fragment>
          ))}
        </View>

        <View style={styles.infoBox}>
          <IconSymbol
            android_material_icon_name="info"
            ios_icon_name="info.circle"
            size={20}
            color={colors.primary}
          />
          <Text style={styles.infoText}>
            Pour plus d&apos;informations sur nos événements, contactez-nous ou suivez nos actualités.
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
  eventsContainer: {
    width: '100%',
  },
  eventCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  eventImage: {
    width: '100%',
    height: 180,
  },
  eventContent: {
    padding: 16,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  eventDetails: {
    marginTop: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    alignItems: 'flex-start',
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
});
