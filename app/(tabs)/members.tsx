
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { colors, commonStyles } from '@/styles/commonStyles';
import { members } from '@/data/partyData';
import { IconSymbol } from '@/components/IconSymbol';
import AppHeader from '@/components/AppHeader';

export default function MembersScreen() {
  const handleCall = (phone: string) => {
    console.log('Calling:', phone);
    if (phone && phone !== 'À venir') {
      Linking.openURL(`tel:${phone}`);
    }
  };

  return (
    <View style={commonStyles.container}>
      <AppHeader title="Membres" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <IconSymbol
            android_material_icon_name="groups"
            ios_icon_name="person.3"
            size={48}
            color={colors.primary}
          />
          <Text style={styles.title}>Membres du Bureau</Text>
          <Text style={styles.subtitle}>
            Direction de l&apos;Alliance pour le Rassemblement Malien
          </Text>
        </View>

        <View style={styles.membersContainer}>
          {members.map((member, index) => (
            <React.Fragment key={index}>
              <View style={styles.memberCard}>
                <View style={styles.memberHeader}>
                  <View style={styles.avatarContainer}>
                    <IconSymbol
                      android_material_icon_name="person"
                      ios_icon_name="person"
                      size={32}
                      color={colors.white}
                    />
                  </View>
                  <View style={styles.memberInfo}>
                    <Text style={styles.memberName}>{member.name}</Text>
                    <Text style={styles.memberRole}>{member.role}</Text>
                  </View>
                </View>
                <View style={styles.memberDetails}>
                  <View style={styles.detailRow}>
                    <IconSymbol
                      android_material_icon_name="location-on"
                      ios_icon_name="location"
                      size={18}
                      color={colors.primary}
                    />
                    <Text style={styles.detailText}>{member.location}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <IconSymbol
                      android_material_icon_name="phone"
                      ios_icon_name="phone"
                      size={18}
                      color={colors.primary}
                    />
                    <Text style={styles.detailText}>{member.phone}</Text>
                  </View>
                </View>
                {member.phone && member.phone !== 'À venir' && (
                  <TouchableOpacity
                    style={styles.callButton}
                    onPress={() => handleCall(member.phone)}
                  >
                    <IconSymbol
                      android_material_icon_name="phone"
                      ios_icon_name="phone.fill"
                      size={20}
                      color={colors.white}
                    />
                    <Text style={styles.callButtonText}>Appeler</Text>
                  </TouchableOpacity>
                )}
              </View>
            </React.Fragment>
          ))}
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
    paddingBottom: 120,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 24,
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
  membersContainer: {
    width: '100%',
  },
  memberCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  memberHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberInfo: {
    flex: 1,
    marginLeft: 16,
  },
  memberName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  memberRole: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  memberDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  callButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  callButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    marginLeft: 8,
  },
});
