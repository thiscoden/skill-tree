import { useCallback, useState } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';
import * as nodesRepo from '@/db/repositories/nodes-repo';
import * as edgesRepo from '@/db/repositories/edges-repo';
import { markMastered } from '@/domain/mastery';
import type { SkillNode } from '@/db/types';

export default function NodeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [node, setNode] = useState<SkillNode | null>(null);
  const [prerequisites, setPrerequisites] = useState<SkillNode[]>([]);
  const tint = useThemeColor({}, 'tint');

  const reload = useCallback(async () => {
    const n = await nodesRepo.getNode(id);
    setNode(n);
    if (n) {
      const edges = await edgesRepo.listEdgesByProject(n.projectId);
      const prereqIds = edges.filter((e) => e.targetNodeId === id).map((e) => e.sourceNodeId);
      const prereqNodes = (await Promise.all(prereqIds.map((pid) => nodesRepo.getNode(pid)))).filter(
        (p): p is SkillNode => p !== null
      );
      setPrerequisites(prereqNodes);
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload])
  );

  if (!node) return <ThemedView style={{ flex: 1 }} />;

  const unmet = prerequisites.filter((p) => p.state !== 'mastered');

  const handleMarkMastered = async () => {
    await markMastered(node.id);
    reload();
  };

  const handleDelete = () => {
    Alert.alert('Knoten löschen', `"${node.title}" unwiderruflich löschen?`, [
      { text: 'Abbrechen', style: 'cancel' },
      {
        text: 'Löschen',
        style: 'destructive',
        onPress: async () => {
          await nodesRepo.deleteNode(node.id);
          router.back();
        },
      },
    ]);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.headerRow}>
        <IconSymbol name={(node.icon as never) ?? 'square.fill'} size={28} color={tint} />
        <ThemedText type="title" style={styles.title}>
          {node.title}
        </ThemedText>
      </View>

      {node.description ? <ThemedText style={styles.description}>{node.description}</ThemedText> : null}

      <ThemedText type="defaultSemiBold" style={styles.sectionLabel}>
        Status: {node.state}
      </ThemedText>

      {unmet.length > 0 && (
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold">Offene Voraussetzungen</ThemedText>
          {unmet.map((p) => (
            <ThemedText key={p.id} style={styles.prereqItem}>
              • {p.title}
            </ThemedText>
          ))}
        </View>
      )}

      {node.state !== 'mastered' && unmet.length === 0 && (
        <Pressable onPress={handleMarkMastered} style={[styles.button, { backgroundColor: tint }]}>
          <ThemedText style={styles.buttonLabel}>Als gemeistert markieren</ThemedText>
        </Pressable>
      )}

      <Pressable onPress={handleDelete} style={styles.deleteButton}>
        <ThemedText style={styles.deleteLabel}>Knoten löschen</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 32, gap: 4 },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  title: { flex: 1 },
  description: { opacity: 0.8, marginBottom: 12 },
  sectionLabel: { marginTop: 8, marginBottom: 8, textTransform: 'capitalize' },
  section: { marginBottom: 16, gap: 4 },
  prereqItem: { opacity: 0.75 },
  button: {
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 14,
    borderCurve: 'continuous',
    alignItems: 'center',
  },
  buttonLabel: { color: '#fff', fontWeight: '600', fontSize: 16 },
  deleteButton: { marginTop: 24, alignItems: 'center', paddingVertical: 10 },
  deleteLabel: { color: '#E5484D' },
});
