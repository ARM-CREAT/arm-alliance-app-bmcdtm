
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
import { programSections } from '@/data/partyData';

export default function AdminProgramsScreen() {
  const { isAdmin } = useAdmin();
  const router = useRouter();
  const [programs, setPrograms] = useState(programSections);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  React.useEffect(() => {
    if (!isAdmin) {
      router.replace('/(tabs)/admin-login');
    }
  }, [isAdmin]);

  const handleEdit = (program: typeof programSections[0]) => {
    setEditingId(program.id);
    setEditTitle(program.title);
    setEditDescription(program.description);
  };

  const handleSave = () => {
    if (!editTitle || !editDescription) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    setPrograms(
      programs.map(prog =>
        prog.id === editingId
          ? { ...prog, title: editTitle, description: editDescription }
          : prog
      )
    );

    setEditingId(null);
    setEditTitle('');
    setEditDescription('');
    Alert.alert('Succès', 'Programme mis à jour avec succès');
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditTitle('');
    setEditDescription('');
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
          <Text style={styles.title}>Programmes</Text>
        </View>

        <View style={styles.infoCard}>
          <IconSymbol
            android_material_icon_name="info"
            ios_icon_name="info.circle"
            size={20}
            color={colors.primary}
          />
          <Text style={styles.infoText}>
            Modifiez les descriptions de vos programmes politiques
          </Text>
        </View>

        <View style={styles.section}>
          {programs.map((program, index) => (
            <React.Fragment key={index}>
              <View style={styles.programCard}>
                <View style={styles.programHeader}>
                  <View style={styles.programIconContainer}>
                    <IconSymbol
                      android_material_icon_name={program.icon as any}
                      ios_icon_name={program.icon}
                      size={24}
                      color={colors.primary}
                    />
                  </View>
                  <Text style={styles.programTitle}>{program.title}</Text>
                </View>

                {editingId === program.id ? (
                  <View style={styles.editForm}>
                    <Text style={commonStyles.inputLabel}>Titre</Text>
                    <TextInput
                      style={commonStyles.input}
                      value={editTitle}
                      onChangeText={setEditTitle}
                    />

                    <Text style={commonStyles.inputLabel}>Description</Text>
                    <TextInput
                      style={[commonStyles.input, styles.textArea]}
                      value={editDescription}
                      onChangeText={setEditDescription}
                      multiline
                      numberOfLines={4}
                    />

                    <View style={styles.editActions}>
                      <TouchableOpacity
                        style={[buttonStyles.outline, styles.cancelButton]}
                        onPress={handleCancel}
                      >
                        <Text style={buttonStyles.textOutline}>Annuler</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[buttonStyles.primary, styles.saveButton]}
                        onPress={handleSave}
                      >
                        <Text style={buttonStyles.text}>Enregistrer</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <>
                    <Text style={styles.programDescription}>
                      {program.description}
                    </Text>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => handleEdit(program)}
                    >
                      <IconSymbol
                        android_material_icon_name="edit"
                        ios_icon_name="pencil"
                        size={18}
                        color={colors.primary}
                      />
                      <Text style={styles.editButtonText}>Modifier</Text>
                    </TouchableOpacity>
                  </>
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
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 12,
    lineHeight: 20,
  },
  section: {
    marginTop: 8,
  },
  programCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  programHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  programIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  programTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
  },
  programDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 6,
  },
  editForm: {
    marginTop: 8,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
  },
  saveButton: {
    flex: 1,
    marginLeft: 8,
  },
});
