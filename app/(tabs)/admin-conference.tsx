
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';
import { useAdmin } from '@/contexts/AdminContext';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';

interface Conference {
  id: string;
  title: string;
  description: string;
  url: string;
  isLive: boolean;
  scheduledDate: string;
  createdAt: string;
}

export default function AdminConferenceScreen() {
  const { isAdmin } = useAdmin();
  const router = useRouter();
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');

  React.useEffect(() => {
    if (!isAdmin) {
      router.replace('/(tabs)/admin-login');
    }
  }, [isAdmin, router]);

  const handleAddConference = () => {
    if (!title || !url) {
      Alert.alert('Erreur', 'Veuillez remplir au moins le titre et l\'URL');
      return;
    }

    const newConference: Conference = {
      id: Date.now().toString(),
      title,
      description,
      url,
      isLive: false,
      scheduledDate,
      createdAt: new Date().toISOString(),
    };

    setConferences([newConference, ...conferences]);
    setTitle('');
    setDescription('');
    setUrl('');
    setScheduledDate('');
    setShowAddForm(false);
    Alert.alert('Succès', 'Conférence ajoutée avec succès');
  };

  const toggleLiveStatus = (id: string) => {
    setConferences(
      conferences.map(conf =>
        conf.id === id ? { ...conf, isLive: !conf.isLive } : conf
      )
    );
  };

  const handleDeleteConference = (id: string) => {
    Alert.alert(
      'Confirmation',
      'Êtes-vous sûr de vouloir supprimer cette conférence ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => {
            setConferences(conferences.filter(conf => conf.id !== id));
            Alert.alert('Succès', 'Conférence supprimée');
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
          <Text style={styles.title}>Conférences</Text>
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
            {showAddForm ? 'Annuler' : 'Ajouter une conférence'}
          </Text>
        </TouchableOpacity>

        {showAddForm && (
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Nouvelle Conférence</Text>

            <Text style={commonStyles.inputLabel}>Titre *</Text>
            <TextInput
              style={commonStyles.input}
              placeholder="Titre de la conférence"
              value={title}
              onChangeText={setTitle}
            />

            <Text style={commonStyles.inputLabel}>Description</Text>
            <TextInput
              style={[commonStyles.input, styles.textArea]}
              placeholder="Description de la conférence"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />

            <Text style={commonStyles.inputLabel}>URL de la vidéo *</Text>
            <TextInput
              style={commonStyles.input}
              placeholder="https://youtube.com/watch?v=..."
              value={url}
              onChangeText={setUrl}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Text style={commonStyles.inputLabel}>Date prévue (optionnel)</Text>
            <TextInput
              style={commonStyles.input}
              placeholder="Ex: 15 Mars 2024 à 14h00"
              value={scheduledDate}
              onChangeText={setScheduledDate}
            />

            <View style={styles.infoBox}>
              <IconSymbol
                android_material_icon_name="info"
                ios_icon_name="info.circle"
                size={20}
                color={colors.primary}
              />
              <Text style={styles.infoText}>
                Vous pouvez utiliser des liens YouTube, Facebook Live, ou tout autre service de streaming
              </Text>
            </View>

            <TouchableOpacity
              style={buttonStyles.primary}
              onPress={handleAddConference}
            >
              <Text style={buttonStyles.text}>Ajouter</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Conférences ({conferences.length})
          </Text>

          {conferences.length === 0 ? (
            <View style={styles.emptyState}>
              <IconSymbol
                android_material_icon_name="video-call"
                ios_icon_name="video"
                size={64}
                color={colors.textSecondary}
              />
              <Text style={styles.emptyStateText}>
                Aucune conférence programmée
              </Text>
            </View>
          ) : (
            conferences.map((conference, index) => (
              <React.Fragment key={index}>
                <View style={styles.conferenceCard}>
                  <View style={styles.conferenceHeader}>
                    <View style={styles.conferenceIconContainer}>
                      <IconSymbol
                        android_material_icon_name="video-call"
                        ios_icon_name="video"
                        size={28}
                        color={colors.primary}
                      />
                    </View>
                    <View style={styles.conferenceContent}>
                      <View style={styles.conferenceTitleRow}>
                        <Text style={styles.conferenceTitle}>
                          {conference.title}
                        </Text>
                        {conference.isLive && (
                          <View style={styles.liveBadge}>
                            <View style={styles.liveIndicator} />
                            <Text style={styles.liveText}>EN DIRECT</Text>
                          </View>
                        )}
                      </View>
                      {conference.description && (
                        <Text style={styles.conferenceDescription} numberOfLines={2}>
                          {conference.description}
                        </Text>
                      )}
                      {conference.scheduledDate && (
                        <View style={styles.dateRow}>
                          <IconSymbol
                            android_material_icon_name="schedule"
                            ios_icon_name="clock"
                            size={14}
                            color={colors.textSecondary}
                          />
                          <Text style={styles.conferenceDate}>
                            {conference.scheduledDate}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>

                  <View style={styles.conferenceActions}>
                    <TouchableOpacity
                      style={[
                        styles.actionButton,
                        conference.isLive && styles.actionButtonLive,
                      ]}
                      onPress={() => toggleLiveStatus(conference.id)}
                    >
                      <IconSymbol
                        android_material_icon_name={
                          conference.isLive ? 'stop-circle' : 'play-circle'
                        }
                        ios_icon_name={
                          conference.isLive ? 'stop.circle' : 'play.circle'
                        }
                        size={20}
                        color={conference.isLive ? colors.error : colors.success}
                      />
                      <Text
                        style={[
                          styles.actionButtonText,
                          conference.isLive && styles.actionButtonTextLive,
                        ]}
                      >
                        {conference.isLive ? 'Arrêter' : 'Démarrer'}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.deleteIconButton}
                      onPress={() => handleDeleteConference(conference.id)}
                    >
                      <IconSymbol
                        android_material_icon_name="delete"
                        ios_icon_name="trash"
                        size={20}
                        color={colors.error}
                      />
                    </TouchableOpacity>
                  </View>
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: colors.textSecondary,
    marginLeft: 8,
    lineHeight: 18,
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
  conferenceCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  conferenceHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  conferenceIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  conferenceContent: {
    flex: 1,
  },
  conferenceTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  conferenceTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.error,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 8,
  },
  liveIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.white,
    marginRight: 4,
  },
  liveText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.white,
  },
  conferenceDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
    marginBottom: 4,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  conferenceDate: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  conferenceActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.success,
    borderRadius: 8,
    paddingVertical: 10,
    marginRight: 8,
  },
  actionButtonLive: {
    borderColor: colors.error,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.success,
    marginLeft: 6,
  },
  actionButtonTextLive: {
    color: colors.error,
  },
  deleteIconButton: {
    padding: 10,
  },
});
