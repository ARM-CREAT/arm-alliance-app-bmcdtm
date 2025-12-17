
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';
import { partyInfo, members } from '@/data/partyData';
import { IconSymbol } from '@/components/IconSymbol';

export default function ContactScreen() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = () => {
    console.log('Contact form submitted:', form);
    
    if (!form.name || !form.email || !form.message) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires.');
      return;
    }

    Alert.alert(
      'Message envoyé',
      'Votre message a été envoyé avec succès. Nous vous contacterons bientôt.',
      [{ text: 'OK' }]
    );

    setForm({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  const handleCall = (phone: string) => {
    console.log('Calling:', phone);
    if (phone && phone !== 'À venir') {
      Linking.openURL(`tel:${phone}`);
    }
  };

  const president = members[0];

  return (
    <View style={commonStyles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <IconSymbol
            android_material_icon_name="contact-mail"
            ios_icon_name="envelope"
            size={48}
            color={colors.primary}
          />
          <Text style={styles.title}>Contactez-nous</Text>
          <Text style={styles.subtitle}>
            Nous sommes à votre écoute
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations de contact</Text>
          
          <View style={styles.contactCard}>
            <View style={styles.contactRow}>
              <IconSymbol
                android_material_icon_name="location-on"
                ios_icon_name="location"
                size={24}
                color={colors.primary}
              />
              <View style={styles.contactTextContainer}>
                <Text style={styles.contactLabel}>Siège</Text>
                <Text style={styles.contactText}>{partyInfo.headquarters}</Text>
              </View>
            </View>

            <View style={styles.contactRow}>
              <IconSymbol
                android_material_icon_name="person"
                ios_icon_name="person"
                size={24}
                color={colors.primary}
              />
              <View style={styles.contactTextContainer}>
                <Text style={styles.contactLabel}>Président</Text>
                <Text style={styles.contactText}>{president.name}</Text>
              </View>
            </View>

            <View style={styles.contactRow}>
              <IconSymbol
                android_material_icon_name="phone"
                ios_icon_name="phone"
                size={24}
                color={colors.primary}
              />
              <View style={styles.contactTextContainer}>
                <Text style={styles.contactLabel}>Téléphone</Text>
                <TouchableOpacity onPress={() => handleCall(president.phone)}>
                  <Text style={[styles.contactText, styles.phoneLink]}>
                    {president.phone}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Envoyez-nous un message</Text>
          
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nom complet *</Text>
              <TextInput
                style={styles.input}
                value={form.name}
                onChangeText={(text) => setForm({ ...form, name: text })}
                placeholder="Entrez votre nom"
                placeholderTextColor={colors.textSecondary}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email *</Text>
              <TextInput
                style={styles.input}
                value={form.email}
                onChangeText={(text) => setForm({ ...form, email: text })}
                placeholder="exemple@email.com"
                placeholderTextColor={colors.textSecondary}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Téléphone</Text>
              <TextInput
                style={styles.input}
                value={form.phone}
                onChangeText={(text) => setForm({ ...form, phone: text })}
                placeholder="+223 XX XX XX XX"
                placeholderTextColor={colors.textSecondary}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Message *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={form.message}
                onChangeText={(text) => setForm({ ...form, message: text })}
                placeholder="Écrivez votre message ici..."
                placeholderTextColor={colors.textSecondary}
                multiline
                numberOfLines={6}
              />
            </View>

            <TouchableOpacity style={buttonStyles.primary} onPress={handleSubmit}>
              <Text style={buttonStyles.text}>Envoyer le message</Text>
            </TouchableOpacity>
          </View>
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  contactCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  contactTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  contactLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  contactText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 22,
  },
  phoneLink: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.text,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
});
