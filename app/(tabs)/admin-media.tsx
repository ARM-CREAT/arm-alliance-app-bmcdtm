
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
import { partyInfo } from '@/data/partyData';

interface MediaItem {
  id: string;
  type: 'photo' | 'video';
  url: string;
  title: string;
  description: string;
  date: string;
}

export default function AdminMediaScreen() {
  const { isAdmin } = useAdmin();
  const router = useRouter();
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaType, setMediaType] = useState<'photo' | 'video'>('photo');

  React.useEffect(() => {
    if (!isAdmin) {
      router.replace('/(tabs)/admin-login');
    }
  }, [isAdmin, router]);

  const handleAddMedia = () => {
    if (!title) {
      Alert.alert('Erreur', 'Veuillez remplir le titre');
      return;
    }

    const newMedia: MediaItem = {
      id: Date.now().toString(),
      type: mediaType,
      url: partyInfo.logoUrl,
      title,
      description,
      date: new Date().toISOString(),
    };

    setMediaItems([newMedia, ...mediaItems]);
    setTitle('');
    setDescription('');
    setShowAddForm(false);
    Alert.alert('Succès', 'Média ajouté avec succès');
  };

  const handleDeleteMedia = (id: string) => {
    Alert.alert(
      'Confirmation',
      'Êtes-vous sûr de vouloir supprimer ce média ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => {
            setMediaItems(mediaItems.filter(item => item.id !== id));
            Alert.alert('Succès', 'Média supprimé');
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
          <Text style={styles.title}>Photos & Vidéos</Text>
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
            {showAddForm ? 'Annuler' : 'Ajouter un média'}
          </Text>
        </TouchableOpacity>

        {showAddForm && (
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Nouveau Média</Text>

            <View style={styles.typeSelector}>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  mediaType === 'photo' && styles.typeButtonActive,
                ]}
                onPress={() => setMediaType('photo')}
              >
                <IconSymbol
                  android_material_icon_name="photo"
                  ios_icon_name="photo"
                  size={24}
                  color={mediaType === 'photo' ? colors.white : colors.primary}
                />
                <Text
                  style={[
                    styles.typeButtonText,
                    mediaType === 'photo' && styles.typeButtonTextActive,
                  ]}
                >
                  Photo
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.typeButton,
                  mediaType === 'video' && styles.typeButtonActive,
                ]}
                onPress={() => setMediaType('video')}
              >
                <IconSymbol
                  android_material_icon_name="videocam"
                  ios_icon_name="video"
                  size={24}
                  color={mediaType === 'video' ? colors.white : colors.primary}
                />
                <Text
                  style={[
                    styles.typeButtonText,
                    mediaType === 'video' && styles.typeButtonTextActive,
                  ]}
                >
                  Vidéo
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.logoPreview}>
              <Image source={{ uri: partyInfo.logoUrl }} style={styles.logoImage} resizeMode="contain" />
              <Text style={styles.logoText}>Le logo du parti sera utilisé pour tous les médias</Text>
            </View>

            <Text style={commonStyles.inputLabel}>Titre</Text>
            <TextInput
              style={commonStyles.input}
              placeholder="Titre du média"
              value={title}
              onChangeText={setTitle}
            />

            <Text style={commonStyles.inputLabel}>Description</Text>
            <TextInput
              style={[commonStyles.input, styles.textArea]}
              placeholder="Description du média"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />

            <TouchableOpacity
              style={buttonStyles.primary}
              onPress={handleAddMedia}
            >
              <Text style={buttonStyles.text}>Ajouter</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Galerie ({mediaItems.length})
          </Text>

          {mediaItems.length === 0 ? (
            <View style={styles.emptyState}>
              <IconSymbol
                android_material_icon_name="photo-library"
                ios_icon_name="photo.stack"
                size={64}
                color={colors.textSecondary}
              />
              <Text style={styles.emptyStateText}>
                Aucun média ajouté
              </Text>
            </View>
          ) : (
            mediaItems.map((item, index) => (
              <React.Fragment key={index}>
                <View style={styles.mediaCard}>
                  <Image
                    source={{ uri: item.url }}
                    style={styles.mediaThumbnail}
                    resizeMode="contain"
                  />
                  <View style={styles.mediaContent}>
                    <View style={styles.mediaHeader}>
                      <View style={styles.mediaTypeTag}>
                        <IconSymbol
                          android_material_icon_name={
                            item.type === 'photo' ? 'photo' : 'videocam'
                          }
                          ios_icon_name={item.type === 'photo' ? 'photo' : 'video'}
                          size={16}
                          color={colors.white}
                        />
                        <Text style={styles.mediaTypeText}>
                          {item.type === 'photo' ? 'Photo' : 'Vidéo'}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.mediaTitle}>{item.title}</Text>
                    <Text style={styles.mediaDescription} numberOfLines={2}>
                      {item.description}
                    </Text>
                    <Text style={styles.mediaDate}>
                      {new Date(item.date).toLocaleDateString('fr-FR')}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteMedia(item.id)}
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
  typeSelector: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 4,
  },
  typeButtonActive: {
    backgroundColor: colors.primary,
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 8,
  },
  typeButtonTextActive: {
    color: colors.white,
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
  mediaCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  mediaThumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: colors.white,
  },
  mediaContent: {
    flex: 1,
    marginLeft: 12,
  },
  mediaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  mediaTypeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  mediaTypeText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.white,
    marginLeft: 4,
  },
  mediaTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  mediaDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
    marginBottom: 4,
  },
  mediaDate: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  deleteButton: {
    padding: 8,
  },
});
