import { useState } from 'react';
import { Alert, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useActiveProjectId } from '@/hooks/use-active-project-id';
import { importSkillTree, type ImportPayload } from '@/db/import-skill-tree';
import shanghaiFixture from '@/fixtures/shanghai-semester.json';

export default function ProfileScreen() {
  const [, setActiveProjectId] = useActiveProjectId();
  const [loading, setLoading] = useState(false);
  const tint = useThemeColor({}, 'tint');
  const tintText = useThemeColor({}, 'tintText');

  const handleLoadFixture = async () => {
    setLoading(true);
    try {
      const projectId = await importSkillTree(shanghaiFixture as ImportPayload);
      setActiveProjectId(projectId);
      router.push('/(tabs)/tree');
    } catch (error) {
      Alert.alert('Import fehlgeschlagen', error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Profile</ThemedText>

      <ThemedText type="defaultSemiBold" style={styles.sectionLabel}>
        Debug-Tools
      </ThemedText>
      <Pressable
        onPress={handleLoadFixture}
        disabled={loading}
        style={[styles.button, { backgroundColor: tint, opacity: loading ? 0.6 : 1 }]}>
        <ThemedText style={[styles.buttonLabel, { color: tintText }]}>
          {loading ? 'Lädt…' : 'Beispiel-Skilltree laden (Shanghai-Fixture)'}
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    gap: 8,
  },
  sectionLabel: { marginTop: 24 },
  button: {
    marginTop: 8,
    paddingVertical: 14,
    borderRadius: 14,
    borderCurve: 'continuous',
    alignItems: 'center',
  },
  buttonLabel: { fontWeight: '600', fontSize: 15 },
});
