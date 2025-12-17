
import React, { useState } from 'react';
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
import * as ImagePicker from 'expo-image-picker';

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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  React.useEffect(() => {
    if (!isAdmin) {
      router.replace('/(tabs)/admin-login');
    }
  }, [isAdmin]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleAddEvent = () => {
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
      imageUrl: selectedImage || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
    };

    setEvents([newEvent, ...events]);
    setTitle('');
    setDescription('');
    setDate('');
    setLocation('');
    setSelectedImage(null);
    setShowAddForm(false);
    Alert.alert('Succès', 'Événement ajouté avec succès');
  };

  const handleDeleteEvent = (id: string) => {
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
  };

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
            onPress={() => router.back()}
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
          onPress={() => setShowAddForm(!showAddForm)}
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

            <TouchableOpacity
              style={styles.imagePickerButton}
              onPress={pickImage}
            >
              {selectedImage ? (
                <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
              ) : (
                <View style={styles.imagePickerPlaceholder}>
                  <IconSymbol
                    android_material_icon_name="add-photo-alternate"
                    ios_icon_name="photo.badge.plus"
                    size={48}
                    color={colors.textSecondary}
                  />
                  <Text style={styles.imagePickerText}>
                    Ajouter une image
                  </Text>
                </View>
              )}
            </TouchableOpacity>

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
                    source={{ uri: event.imageUrl }}
                    style={styles.eventImage}
                    resizeMode="cover"
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
  imagePickerButton: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  imagePickerPlaceholder: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePickerText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 12,
  },
  selectedImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
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
    backgroundColor: colors.border,
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
