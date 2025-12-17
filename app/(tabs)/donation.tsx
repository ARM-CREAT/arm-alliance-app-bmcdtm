
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
import { donationOptions, bankInfo } from '@/data/partyData';
import { IconSymbol } from '@/components/IconSymbol';

export default function DonationScreen() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | null>(null);

  const handleDonation = () => {
    console.log('Processing donation:', { selectedAmount, customAmount, paymentMethod });
    
    const amount = selectedAmount || parseFloat(customAmount);
    
    if (!amount || amount <= 0) {
      Alert.alert('Erreur', 'Veuillez sélectionner ou entrer un montant valide.');
      return;
    }

    if (!paymentMethod) {
      Alert.alert('Erreur', 'Veuillez sélectionner une méthode de paiement.');
      return;
    }

    Alert.alert(
      'Don en cours',
      `Merci pour votre générosité! Votre don de ${amount}€ sera traité via ${paymentMethod === 'card' ? 'carte bancaire' : 'virement bancaire'}.`,
      [{ text: 'OK' }]
    );

    setSelectedAmount(null);
    setCustomAmount('');
    setPaymentMethod(null);
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
            android_material_icon_name="volunteer-activism"
            ios_icon_name="heart.circle"
            size={48}
            color={colors.primary}
          />
          <Text style={styles.title}>Faire un Don</Text>
          <Text style={styles.subtitle}>
            Soutenez l&apos;A.R.M dans sa mission pour un Mali meilleur
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Montant du don</Text>
          <View style={styles.amountContainer}>
            {donationOptions.map((option, index) => (
              <React.Fragment key={index}>
                <TouchableOpacity
                  style={[
                    styles.amountButton,
                    selectedAmount === option.amount && styles.amountButtonSelected,
                  ]}
                  onPress={() => {
                    setSelectedAmount(option.amount);
                    setCustomAmount('');
                  }}
                >
                  <Text
                    style={[
                      styles.amountText,
                      selectedAmount === option.amount && styles.amountTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              </React.Fragment>
            ))}
          </View>

          <View style={styles.customAmountContainer}>
            <Text style={styles.label}>Montant personnalisé (€)</Text>
            <TextInput
              style={styles.input}
              value={customAmount}
              onChangeText={(text) => {
                setCustomAmount(text);
                setSelectedAmount(null);
              }}
              placeholder="Entrez un montant"
              placeholderTextColor={colors.textSecondary}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Méthode de paiement</Text>
          
          <TouchableOpacity
            style={[
              styles.paymentMethod,
              paymentMethod === 'card' && styles.paymentMethodSelected,
            ]}
            onPress={() => setPaymentMethod('card')}
          >
            <View style={styles.paymentMethodContent}>
              <IconSymbol
                android_material_icon_name="credit-card"
                ios_icon_name="creditcard"
                size={24}
                color={paymentMethod === 'card' ? colors.white : colors.primary}
              />
              <View style={styles.paymentMethodText}>
                <Text
                  style={[
                    styles.paymentMethodTitle,
                    paymentMethod === 'card' && styles.paymentMethodTitleSelected,
                  ]}
                >
                  Carte Bancaire
                </Text>
                <Text
                  style={[
                    styles.paymentMethodSubtitle,
                    paymentMethod === 'card' && styles.paymentMethodSubtitleSelected,
                  ]}
                >
                  Visa, MasterCard
                </Text>
              </View>
            </View>
            {paymentMethod === 'card' && (
              <IconSymbol
                android_material_icon_name="check-circle"
                ios_icon_name="checkmark.circle.fill"
                size={24}
                color={colors.white}
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentMethod,
              paymentMethod === 'bank' && styles.paymentMethodSelected,
            ]}
            onPress={() => setPaymentMethod('bank')}
          >
            <View style={styles.paymentMethodContent}>
              <IconSymbol
                android_material_icon_name="account-balance"
                ios_icon_name="building.columns"
                size={24}
                color={paymentMethod === 'bank' ? colors.white : colors.primary}
              />
              <View style={styles.paymentMethodText}>
                <Text
                  style={[
                    styles.paymentMethodTitle,
                    paymentMethod === 'bank' && styles.paymentMethodTitleSelected,
                  ]}
                >
                  Virement Bancaire
                </Text>
                <Text
                  style={[
                    styles.paymentMethodSubtitle,
                    paymentMethod === 'bank' && styles.paymentMethodSubtitleSelected,
                  ]}
                >
                  {bankInfo.bankName}
                </Text>
              </View>
            </View>
            {paymentMethod === 'bank' && (
              <IconSymbol
                android_material_icon_name="check-circle"
                ios_icon_name="checkmark.circle.fill"
                size={24}
                color={colors.white}
              />
            )}
          </TouchableOpacity>
        </View>

        {paymentMethod === 'bank' && (
          <View style={styles.bankInfoCard}>
            <Text style={styles.bankInfoTitle}>Informations bancaires</Text>
            <Text style={styles.bankInfoText}>Banque: {bankInfo.bankName}</Text>
            <Text style={styles.bankInfoText}>Type: {bankInfo.accountType}</Text>
            <Text style={styles.bankInfoText}>Localisation: {bankInfo.location}</Text>
          </View>
        )}

        <TouchableOpacity style={buttonStyles.primary} onPress={handleDonation}>
          <Text style={buttonStyles.text}>Confirmer le don</Text>
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <IconSymbol
            android_material_icon_name="security"
            ios_icon_name="lock.shield"
            size={20}
            color={colors.primary}
          />
          <Text style={styles.infoText}>
            Tous les paiements sont sécurisés. Vos informations sont protégées.
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  amountButton: {
    flex: 1,
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 20,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountButtonSelected: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  amountText: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  amountTextSelected: {
    color: colors.text,
  },
  customAmountContainer: {
    marginTop: 16,
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
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  paymentMethodSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  paymentMethodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentMethodText: {
    marginLeft: 12,
  },
  paymentMethodTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  paymentMethodTitleSelected: {
    color: colors.white,
  },
  paymentMethodSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  paymentMethodSubtitleSelected: {
    color: colors.white,
  },
  bankInfoCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  bankInfoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  bankInfoText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 6,
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
