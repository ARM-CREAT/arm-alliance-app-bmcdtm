
import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';
import { useAdmin } from '@/contexts/AdminContext';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { partyInfo } from '@/data/partyData';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
}

export default function AdminEventsScreen() {
  const { isAdmin } = useAdmin();
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    console.log('🔐 AdminEvents - Vérification authentification:', isAdmin);
    if (!isAdmin) {
      console.log('⚠️ Non authentifié, redirection vers login');
      router.replace('/(tabs)/admin-login');
    }
  }, [isAdmin, router]);

  const handleAddEvent = useCallback(() => {
    console.log('➕ Ajout d\'un nouvel événement');
    if (!title || !date || !location) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    const newEvent: Event = {
      id: Date.now().toString(),
      title,
      description,
      date,
      location,
      imageUrl: partyInfo.logoUrl,
    };

    setEvents([newEvent, ...events]);
    setTitle('');
    setDescription('');
    setDate('');
    setLocation('');
    setShowAddForm(false);
    Alert.alert('Succès', 'Événement ajouté avec succès');
  }, [title, date, location, description, events]);

  const handleDeleteEvent = useCallback((id: string) => {
    console.log('🗑️ Demande de suppression de l\'événement:', id);
    Alert.alert(
      'Confirmation',
      'Êtes-vous sûr de vouloir supprimer cet événement ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => {
            setEvents(events.filter(event => event.id !== id));
            Alert.alert('Succès', 'Événement supprimé');
          },
        },
      ]
    );
  }, [events]);

  if (!isAdmin) {
    return null;
  }

  return (
    <View style={commonStyles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              console.log('⬅️ Retour au tableau de bord');
              router.back();
            }}
          >
            <IconSymbol
              android_material_icon_name="arrow-back"
              ios_icon_name="chevron.left"
              size={24}
              color={colors.text}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Événements</Text>
        </View>

        <TouchableOpacity
          style={[buttonStyles.primary, styles.addButton]}
          onPress={() => {
            console.log('🔄 Toggle formulaire d\'ajout');
            setShowAddForm(!showAddForm);
          }}
        >
          <IconSymbol
            android_material_icon_name={showAddForm ? 'close' : 'add'}
            ios_icon_name={showAddForm ? 'xmark' : 'plus'}
            size={20}
            color={colors.white}
          />
          <Text style={[buttonStyles.text, styles.addButtonText]}>
            {showAddForm ? 'Annuler' : 'Ajouter un événement'}
          </Text>
        </TouchableOpacity>

        {showAddForm && (
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Nouvel Événement</Text>

            <View style={styles.logoPreview}>
              <Image source={partyInfo.logoUrl} style={styles.logoImage} resizeMode="contain" />
              <Text style={styles.logoText}>Le logo du parti sera utilisé pour tous les événements</Text>
            </View>

            <Text style={commonStyles.inputLabel}>Titre *</Text>
            <TextInput
              style={commonStyles.input}
              placeholder="Titre de l'événement"
              value={title}
              onChangeText={setTitle}
            />

            <Text style={commonStyles.inputLabel}>Description</Text>
            <TextInput
              style={[commonStyles.input, styles.textArea]}
              placeholder="Description de l'événement"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />

            <Text style={commonStyles.inputLabel}>Date *</Text>
            <TextInput
              style={commonStyles.input}
              placeholder="Ex: 15 Mars 2024"
              value={date}
              onChangeText={setDate}
            />

            <Text style={commonStyles.inputLabel}>Lieu *</Text>
            <TextInput
              style={commonStyles.input}
              placeholder="Lieu de l'événement"
              value={location}
              onChangeText={setLocation}
            />

            <TouchableOpacity
              style={buttonStyles.primary}
              onPress={handleAddEvent}
            >
              <Text style={buttonStyles.text}>Ajouter</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Événements ({events.length})
          </Text>

          {events.length === 0 ? (
            <View style={styles.emptyState}>
              <IconSymbol
                android_material_icon_name="event"
                ios_icon_name="calendar"
                size={64}
                color={colors.textSecondary}
              />
              <Text style={styles.emptyStateText}>
                Aucun événement ajouté
              </Text>
            </View>
          ) : (
            events.map((event, index) => (
              <React.Fragment key={index}>
                <View style={styles.eventCard}>
                  <Image
                    source={partyInfo.logoUrl}
                    style={styles.eventImage}
                    resizeMode="contain"
                  />
                  <View style={styles.eventContent}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <View style={styles.eventDetail}>
                      <IconSymbol
                        android_material_icon_name="event"
                        ios_icon_name="calendar"
                        size={16}
                        color={colors.primary}
                      />
                      <Text style={styles.eventDetailText}>{event.date}</Text>
                    </View>
                    <View style={styles.eventDetail}>
                      <IconSymbol
                        android_material_icon_name="location-on"
                        ios_icon_name="location"
                        size={16}
                        color={colors.primary}
                      />
                      <Text style={styles.eventDetailText}>{event.location}</Text>
                    </View>
                    {event.description && (
                      <Text style={styles.eventDescription} numberOfLines={2}>
                        {event.description}
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteEvent(event.id)}
                  >
                    <IconSymbol
                      android_material_icon_name="delete"
                      ios_icon_name="trash"
                      size={20}
                      color={colors.error}
                    />
                  </TouchableOpacity>
                </View>
              </React.Fragment>
            ))
          )}
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    marginRight: 12,
    padding: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    marginLeft: 8,
  },
  formCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  logoPreview: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  logoImage: {
    width: 120,
    height: 120,
    marginBottom: 12,
  },
  logoText: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  section: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 16,
  },
  eventCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  eventImage: {
    width: '100%',
    height: 180,
    backgroundColor: colors.white,
  },
  eventContent: {
    padding: 16,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  eventDetailText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  eventDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginTop: 8,
  },
  deleteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 8,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    elevation: 3,
  },
});
