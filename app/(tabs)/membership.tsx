
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';
import { regions } from '@/data/partyData';
import { MembershipForm } from '@/types';
import { IconSymbol } from '@/components/IconSymbol';

export default function MembershipScreen() {
  const [form, setForm] = useState<MembershipForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    region: '',
    cercle: '',
    commune: '',
  });

  const [selectedRegion, setSelectedRegion] = useState<string>('');

  const handleSubmit = () => {
    console.log('Membership form submitted:', form);
    
    if (!form.firstName || !form.lastName || !form.email || !form.phone) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires.');
      return;
    }

    Alert.alert(
      'Demande envoyée',
      'Votre demande d\'adhésion a été envoyée avec succès. Nous vous contacterons bientôt.',
      [{ text: 'OK' }]
    );

    setForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      region: '',
      cercle: '',
      commune: '',
    });
    setSelectedRegion('');
  };

  const selectedRegionData = regions.find(r => r.name === selectedRegion);

  return (
    <View style={commonStyles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <IconSymbol
            android_material_icon_name="person-add"
            ios_icon_name="person.badge.plus"
            size={48}
            color={colors.primary}
          />
          <Text style={styles.title}>Adhésion au Parti</Text>
          <Text style={styles.subtitle}>
            Rejoignez l&apos;Alliance pour le Rassemblement Malien
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Prénom *</Text>
            <TextInput
              style={styles.input}
              value={form.firstName}
              onChangeText={(text) => setForm({ ...form, firstName: text })}
              placeholder="Entrez votre prénom"
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nom *</Text>
            <TextInput
              style={styles.input}
              value={form.lastName}
              onChangeText={(text) => setForm({ ...form, lastName: text })}
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
            <Text style={styles.label}>Téléphone *</Text>
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
            <Text style={styles.label}>Adresse</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={form.address}
              onChangeText={(text) => setForm({ ...form, address: text })}
              placeholder="Entrez votre adresse complète"
              placeholderTextColor={colors.textSecondary}
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Région</Text>
            <View style={styles.pickerContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {regions.map((region, index) => (
                  <React.Fragment key={index}>
                    <TouchableOpacity
                      style={[
                        styles.regionChip,
                        selectedRegion === region.name && styles.regionChipSelected,
                      ]}
                      onPress={() => {
                        setSelectedRegion(region.name);
                        setForm({ ...form, region: region.name, cercle: '', commune: '' });
                      }}
                    >
                      <Text
                        style={[
                          styles.regionChipText,
                          selectedRegion === region.name && styles.regionChipTextSelected,
                        ]}
                      >
                        {region.name}
                      </Text>
                    </TouchableOpacity>
                  </React.Fragment>
                ))}
              </ScrollView>
            </View>
          </View>

          {selectedRegionData && selectedRegionData.cercles.length > 0 && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Cercle</Text>
              <View style={styles.pickerContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {selectedRegionData.cercles.map((cercle, index) => (
                    <React.Fragment key={index}>
                      <TouchableOpacity
                        style={[
                          styles.regionChip,
                          form.cercle === cercle && styles.regionChipSelected,
                        ]}
                        onPress={() => setForm({ ...form, cercle, commune: '' })}
                      >
                        <Text
                          style={[
                            styles.regionChipText,
                            form.cercle === cercle && styles.regionChipTextSelected,
                          ]}
                        >
                          {cercle}
                        </Text>
                      </TouchableOpacity>
                    </React.Fragment>
                  ))}
                </ScrollView>
              </View>
            </View>
          )}

          {selectedRegionData && selectedRegionData.communes.length > 0 && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Commune</Text>
              <View style={styles.pickerContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {selectedRegionData.communes.map((commune, index) => (
                    <React.Fragment key={index}>
                      <TouchableOpacity
                        style={[
                          styles.regionChip,
                          form.commune === commune && styles.regionChipSelected,
                        ]}
                        onPress={() => setForm({ ...form, commune })}
                      >
                        <Text
                          style={[
                            styles.regionChipText,
                            form.commune === commune && styles.regionChipTextSelected,
                          ]}
                        >
                          {commune}
                        </Text>
                      </TouchableOpacity>
                    </React.Fragment>
                  ))}
                </ScrollView>
              </View>
            </View>
          )}

          <TouchableOpacity style={buttonStyles.primary} onPress={handleSubmit}>
            <Text style={buttonStyles.text}>Soumettre ma demande</Text>
          </TouchableOpacity>

          <View style={styles.infoBox}>
            <IconSymbol
              android_material_icon_name="info"
              ios_icon_name="info.circle"
              size={20}
              color={colors.primary}
            />
            <Text style={styles.infoText}>
              Votre demande sera examinée par notre équipe. Vous recevrez une confirmation par email ou téléphone.
            </Text>
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
    height: 80,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    marginTop: 8,
  },
  regionChip: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  regionChipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  regionChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  regionChipTextSelected: {
    color: colors.white,
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
