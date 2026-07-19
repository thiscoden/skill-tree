import { Modal, Platform, Pressable, StyleSheet, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { TreeCanvas } from '@/components/skill-tree/tree-canvas';
// KI-Orb deaktiviert bis auf Weiteres — Ersatz: One-Shot Tree-Generierung bei Projekterstellung
// import { FloatingOrb } from '@/components/orb/floating-orb';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useActiveProjectId } from '@/hooks/use-active-project-id';
import { useSkillTreeViewModel } from '@/viewmodel/skill-tree-viewmodel';
import { SkillTreeColors } from '@/constants/skill-tree-theme';

interface InsertChooser {
  nodeId: string;
  nodeTitle: string;
}

export default function TreeScreen() {
  const [activeProjectId] = useActiveProjectId();
  const { nodes, edges, loading, reload } = useSkillTreeViewModel(activeProjectId);
  const [insertChooser, setInsertChooser] = useState<InsertChooser | null>(null);
  const tint = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');
  const tintText = useThemeColor({}, 'tintText');

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload])
  );

  const handleNodeLongPress = (id: string) => {
    const node = nodes.find((n) => n.id === id);
    if (!node) return;
    setInsertChooser({ nodeId: id, nodeTitle: node.title });
  };

  const handleInsert = (insertMode: 'before' | 'after') => {
    if (!insertChooser) return;
    const anchorNodeId = insertChooser.nodeId;
    setInsertChooser(null);
    router.push({ pathname: '/node/new', params: { anchorNodeId, insertMode } });
  };

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
        <View style={styles.canvasBackground}>
          <TreeCanvas
            nodes={nodes}
            edges={edges}
            onNodePress={(id) => router.push(`/node/${id}/edit`)}
            onNodeLongPress={handleNodeLongPress}
          />
        </View>
      )}

      <Modal visible={!!insertChooser} transparent animationType="fade" onRequestClose={() => setInsertChooser(null)}>
        <Pressable style={styles.backdrop} onPress={() => setInsertChooser(null)}>
          <Pressable style={[styles.chooserCard, { backgroundColor: SkillTreeColors.background }]} onPress={() => {}}>
            <ThemedText type="defaultSemiBold" style={styles.chooserTitle}>
              Wo soll er relativ zu &quot;{insertChooser?.nodeTitle}&quot; stehen?
            </ThemedText>
            <Pressable onPress={() => handleInsert('after')} style={[styles.chooserButton, { backgroundColor: tint }]}>
              <ThemedText style={[styles.chooserButtonLabel, { color: tintText }]}>Danach einfügen</ThemedText>
            </Pressable>
            <Pressable onPress={() => handleInsert('before')} style={[styles.chooserButton, { backgroundColor: tint }]}>
              <ThemedText style={[styles.chooserButtonLabel, { color: tintText }]}>Davor einfügen</ThemedText>
            </Pressable>
            {/* iOS/Android: tapping anywhere outside this card dismisses it, no cancel button
                needed. Web has no such tap-outside gesture affordance, so keep an explicit one. */}
            {Platform.OS === 'web' && (
              <Pressable onPress={() => setInsertChooser(null)} style={styles.chooserCancel}>
                <ThemedText style={[styles.chooserCancelLabel, { color: textColor }]}>Abbrechen</ThemedText>
              </Pressable>
            )}
          </Pressable>
        </Pressable>
      </Modal>

      {/* KI-Orb deaktiviert bis auf Weiteres — Ersatz: One-Shot Tree-Generierung bei Projekterstellung
      <View pointerEvents="box-none" style={styles.orbLayer}>
        <FloatingOrb />
      </View>
      */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60 },
  canvasBackground: { flex: 1, backgroundColor: SkillTreeColors.background },
  orbLayer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  title: { paddingHorizontal: 20 },
  empty: { opacity: 0.6, marginTop: 20, paddingHorizontal: 20 },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  chooserCard: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 16,
    borderCurve: 'continuous',
    padding: 20,
    gap: 10,
  },
  chooserTitle: { marginBottom: 4, textAlign: 'center' },
  chooserButton: {
    paddingVertical: 14,
    borderRadius: 14,
    borderCurve: 'continuous',
    alignItems: 'center',
  },
  chooserButtonLabel: { fontWeight: '600', fontSize: 16 },
  chooserCancel: { marginTop: 4, alignItems: 'center', paddingVertical: 10 },
  chooserCancelLabel: { opacity: 0.7 },
});
