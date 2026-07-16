import { Pressable, StyleSheet, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { TreeCanvas } from '@/components/skill-tree/tree-canvas';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useActiveProjectId } from '@/hooks/use-active-project-id';
import { useSkillTreeViewModel } from '@/viewmodel/skill-tree-viewmodel';

export default function TreeScreen() {
  const [activeProjectId] = useActiveProjectId();
  const { nodes, edges, loading, reload } = useSkillTreeViewModel(activeProjectId);
  const tint = useThemeColor({}, 'tint');

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload])
  );

  if (!activeProjectId) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          Tree
        </ThemedText>
        <ThemedText style={styles.empty}>
          Kein aktives Projekt. Wähle im Projects-Tab ein Projekt aus.
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Tree</ThemedText>
        <Pressable onPress={() => router.push('/node/new')} hitSlop={8}>
          <IconSymbol name="plus.circle.fill" size={30} color={tint} />
        </Pressable>
      </View>

      {!loading && nodes.length === 0 ? (
        <ThemedText style={styles.empty}>
          Noch keine Knoten. Tippe auf + um deinen ersten Schritt anzulegen.
        </ThemedText>
      ) : (
        <TreeCanvas nodes={nodes} edges={edges} onNodePress={(id) => router.push(`/node/${id}`)} />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  title: { paddingHorizontal: 20 },
  empty: { opacity: 0.6, marginTop: 20, paddingHorizontal: 20 },
});
