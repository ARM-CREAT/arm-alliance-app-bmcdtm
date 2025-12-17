
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

interface NewsItem {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
}

export default function AdminNewsScreen() {
  const { isAdmin } = useAdmin();
  const router = useRouter();
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
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

  const handleAddNews = () => {
    if (!title || !content || !author) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    const newNews: NewsItem = {
      id: Date.now().toString(),
      title,
      content,
      author,
      date: new Date().toISOString(),
      imageUrl: selectedImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c',
    };

    setNewsItems([newNews, ...newsItems]);
    setTitle('');
    setContent('');
    setAuthor('');
    setSelectedImage(null);
    setShowAddForm(false);
    Alert.alert('Succès', 'Actualité ajoutée avec succès');
  };

  const handleDeleteNews = (id: string) => {
    Alert.alert(
      'Confirmation',
      'Êtes-vous sûr de vouloir supprimer cette actualité ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => {
            setNewsItems(newsItems.filter(news => news.id !== id));
            Alert.alert('Succès', 'Actualité supprimée');
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
          <Text style={styles.title}>Actualités</Text>
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
            {showAddForm ? 'Annuler' : 'Ajouter une actualité'}
          </Text>
        </TouchableOpacity>

        {showAddForm && (
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Nouvelle Actualité</Text>

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
              placeholder="Titre de l'actualité"
              value={title}
              onChangeText={setTitle}
            />

            <Text style={commonStyles.inputLabel}>Contenu *</Text>
            <TextInput
              style={[commonStyles.input, styles.textArea]}
              placeholder="Contenu de l'actualité"
              value={content}
              onChangeText={setContent}
              multiline
              numberOfLines={6}
            />

            <Text style={commonStyles.inputLabel}>Auteur *</Text>
            <TextInput
              style={commonStyles.input}
              placeholder="Nom de l'auteur"
              value={author}
              onChangeText={setAuthor}
            />

            <TouchableOpacity
              style={buttonStyles.primary}
              onPress={handleAddNews}
            >
              <Text style={buttonStyles.text}>Publier</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Actualités ({newsItems.length})
          </Text>

          {newsItems.length === 0 ? (
            <View style={styles.emptyState}>
              <IconSymbol
                android_material_icon_name="article"
                ios_icon_name="newspaper"
                size={64}
                color={colors.textSecondary}
              />
              <Text style={styles.emptyStateText}>
                Aucune actualité publiée
              </Text>
            </View>
          ) : (
            newsItems.map((news, index) => (
              <React.Fragment key={index}>
                <View style={styles.newsCard}>
                  <Image
                    source={{ uri: news.imageUrl }}
                    style={styles.newsImage}
                    resizeMode="cover"
                  />
                  <View style={styles.newsContent}>
                    <Text style={styles.newsTitle}>{news.title}</Text>
                    <Text style={styles.newsText} numberOfLines={3}>
                      {news.content}
                    </Text>
                    <View style={styles.newsFooter}>
                      <View style={styles.authorInfo}>
                        <IconSymbol
                          android_material_icon_name="person"
                          ios_icon_name="person"
                          size={14}
                          color={colors.textSecondary}
                        />
                        <Text style={styles.authorText}>{news.author}</Text>
                      </View>
                      <Text style={styles.dateText}>
                        {new Date(news.date).toLocaleDateString('fr-FR')}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteNews(news.id)}
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
    height: 120,
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
  newsCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  newsImage: {
    width: '100%',
    height: 180,
    backgroundColor: colors.border,
  },
  newsContent: {
    padding: 16,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  newsText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  newsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginLeft: 6,
  },
  dateText: {
    fontSize: 12,
    color: colors.textSecondary,
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
