
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
import { NewsItem } from '@/types';
import { IconSymbol } from '@/components/IconSymbol';

export default function NewsScreen() {
  const [news] = useState<NewsItem[]>([
    {
      id: '1',
      title: 'Lancement officiel de l\'A.R.M',
      content: 'L\'Alliance pour le Rassemblement Malien a été officiellement lancée lors d\'une cérémonie à Bamako. Le président Lassine Diakité a présenté la vision du parti pour un Mali uni et prospère.',
      date: '2024-01-15',
      author: 'Équipe A.R.M',
      imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
    },
    {
      id: '2',
      title: 'Programme de développement rural',
      content: 'L\'A.R.M annonce un programme ambitieux pour le développement des zones rurales, incluant l\'amélioration des infrastructures agricoles et l\'accès à l\'eau potable.',
      date: '2024-02-01',
      author: 'Équipe A.R.M',
      imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800',
    },
    {
      id: '3',
      title: 'Rencontre avec la diaspora malienne',
      content: 'Le premier vice-président Dadou Sangare a rencontré la diaspora malienne en Europe pour discuter de leur rôle dans le développement du pays.',
      date: '2024-02-20',
      author: 'Équipe A.R.M',
      imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800',
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
            android_material_icon_name="article"
            ios_icon_name="newspaper"
            size={48}
            color={colors.primary}
          />
          <Text style={styles.title}>Actualités</Text>
          <Text style={styles.subtitle}>
            Restez informé de nos dernières nouvelles
          </Text>
        </View>

        <View style={styles.newsContainer}>
          {news.map((item, index) => (
            <React.Fragment key={index}>
              <TouchableOpacity style={styles.newsCard}>
                {item.imageUrl && (
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.newsImage}
                    resizeMode="cover"
                  />
                )}
                <View style={styles.newsContent}>
                  <Text style={styles.newsTitle}>{item.title}</Text>
                  <Text style={styles.newsText}>{item.content}</Text>
                  <View style={styles.newsFooter}>
                    <View style={styles.authorRow}>
                      <IconSymbol
                        android_material_icon_name="person"
                        ios_icon_name="person"
                        size={14}
                        color={colors.textSecondary}
                      />
                      <Text style={styles.authorText}>{item.author}</Text>
                    </View>
                    <Text style={styles.dateText}>{formatDate(item.date)}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </React.Fragment>
          ))}
        </View>

        <View style={styles.infoBox}>
          <IconSymbol
            android_material_icon_name="notifications"
            ios_icon_name="bell"
            size={20}
            color={colors.primary}
          />
          <Text style={styles.infoText}>
            Suivez-nous pour ne manquer aucune actualité importante du parti.
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
  newsContainer: {
    width: '100%',
  },
  newsCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  newsImage: {
    width: '100%',
    height: 180,
  },
  newsContent: {
    padding: 16,
  },
  newsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  newsText: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  newsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  dateText: {
    fontSize: 12,
    color: colors.textSecondary,
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
