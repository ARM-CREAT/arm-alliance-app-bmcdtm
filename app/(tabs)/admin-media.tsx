
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
  const [url, setUrl] = useState('');
  const [mediaType, setMediaType] = useState<'photo' | 'video'>('photo');

  useEffect(() => {
    console.log('🔐 AdminMedia - Vérification authentification:', isAdmin);
    if (!isAdmin) {
      console.log('⚠️ Non authentifié, redirection vers login');
      router.replace('/(tabs)/admin-login');
    }
  }, [isAdmin, router]);

  const handleAddMedia = useCallback(() => {
    console.log('➕ Ajout d\'un nouveau média');
    if (!title || !url) {
      Alert.alert('Erreur', 'Veuillez remplir au moins le titre et l\'URL');
      return;
    }

    const newMedia: MediaItem = {
      id: Date.now().toString(),
      type: mediaType,
      url,
      title,
      description,
      date: new Date().toLocaleDateString('fr-FR'),
    };

    setMediaItems([newMedia, ...mediaItems]);
    setTitle('');
    setDescription('');
    setUrl('');
    setShowAddForm(false);
    Alert.alert('Succès', 'Média ajouté avec succès');
  }, [title, url, description, mediaType, mediaItems]);

  const handleDeleteMedia = useCallback((id: string) => {
    console.log('🗑️ Demande de suppression du média:', id);
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
  }, [mediaItems]);

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
          <Text style={styles.title}>Médias</Text>
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
            {showAddForm ? 'Annuler' : 'Ajouter un média'}
          </Text>
        </TouchableOpacity>

        {showAddForm && (
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Nouveau Média</Text>

            <Text style={commonStyles.inputLabel}>Type de média</Text>
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
                  size={20}
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
                  size={20}
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

            <Text style={commonStyles.inputLabel}>Titre *</Text>
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
              numberOfLines={3}
            />

            <Text style={commonStyles.inputLabel}>URL *</Text>
            <TextInput
              style={commonStyles.input}
              placeholder={
                mediaType === 'photo'
                  ? 'https://example.com/image.jpg'
                  : 'https://youtube.com/watch?v=...'
              }
              value={url}
              onChangeText={setUrl}
              autoCapitalize="none"
              autoCorrect={false}
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
            Médias ({mediaItems.length})
          </Text>

          {mediaItems.length === 0 ? (
            <View style={styles.emptyState}>
              <IconSymbol
                android_material_icon_name="photo-library"
                ios_icon_name="photo.on.rectangle"
                size={64}
                color={colors.textSecondary}
              />
              <Text style={styles.emptyStateText}>
                Aucun média ajouté
              </Text>
            </View>
          ) : (
            <View style={styles.mediaGrid}>
              {mediaItems.map((item, index) => (
                <React.Fragment key={index}>
                  <View style={styles.mediaCard}>
                    {item.type === 'photo' ? (
                      <Image
                        source={{ uri: item.url }}
                        style={styles.mediaImage}
                        resizeMode="cover"
                      />
                    ) : (
                      <View style={styles.videoPlaceholder}>
                        <IconSymbol
                          android_material_icon_name="play-circle"
                          ios_icon_name="play.circle"
                          size={48}
                          color={colors.white}
                        />
                      </View>
                    )}
                    <View style={styles.mediaInfo}>
                      <View style={styles.mediaHeader}>
                        <View style={styles.mediaTypeIcon}>
                          <IconSymbol
                            android_material_icon_name={
                              item.type === 'photo' ? 'photo' : 'videocam'
                            }
                            ios_icon_name={
                              item.type === 'photo' ? 'photo' : 'video'
                            }
                            size={16}
                            color={colors.primary}
                          />
                        </View>
                        <Text style={styles.mediaTitle} numberOfLines={1}>
                          {item.title}
                        </Text>
                      </View>
                      {item.description && (
                        <Text style={styles.mediaDescription} numberOfLines={2}>
                          {item.description}
                        </Text>
                      )}
                      <View style={styles.mediaFooter}>
                        <Text style={styles.mediaDate}>{item.date}</Text>
                        <TouchableOpacity
                          onPress={() => handleDeleteMedia(item.id)}
                        >
                          <IconSymbol
                            android_material_icon_name="delete"
                            ios_icon_name="trash"
                            size={18}
                            color={colors.error}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </React.Fragment>
              ))}
            </View>
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
    gap: 12,
    marginBottom: 16,
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
    gap: 8,
  },
  typeButtonActive: {
    backgroundColor: colors.primary,
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  typeButtonTextActive: {
    color: colors.white,
  },
  textArea: {
    height: 80,
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
  mediaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  mediaCard: {
    width: '48%',
    backgroundColor: colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  mediaImage: {
    width: '100%',
    height: 120,
    backgroundColor: colors.border,
  },
  videoPlaceholder: {
    width: '100%',
    height: 120,
    backgroundColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mediaInfo: {
    padding: 12,
  },
  mediaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  mediaTypeIcon: {
    marginRight: 6,
  },
  mediaTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  mediaDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 16,
    marginBottom: 8,
  },
  mediaFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mediaDate: {
    fontSize: 11,
    color: colors.textSecondary,
  },
});
