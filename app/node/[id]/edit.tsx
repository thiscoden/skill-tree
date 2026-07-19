import { useCallback, useState } from 'react';
import { Pressable, View } from 'react-native';
import { router, Stack, useFocusEffect, useLocalSearchParams } from 'expo-router';

import { NodeForm, type NodeFormValues } from '@/components/skill-tree/node-form';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { ConfirmModal } from '@/components/ui/confirm-modal';
import { useThemeColor } from '@/hooks/use-theme-color';
import * as nodesRepo from '@/db/repositories/nodes-repo';
import * as edgesRepo from '@/db/repositories/edges-repo';
import { directChildren, type UnlockEdge } from '@/domain/unlock';
import { markMastered, markUnmastered, reevaluateProjectGraph } from '@/domain/mastery';
import type { SkillNode } from '@/db/types';

export default function EditNodeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [node, setNode] = useState<SkillNode | null>(null);
  const [existingEdges, setExistingEdges] = useState<UnlockEdge[]>([]);
  const [initialPrerequisiteIds, setInitialPrerequisiteIds] = useState<string[]>([]);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const tint = useThemeColor({}, 'tint');

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const current = await nodesRepo.getNode(id);
        if (!current) return;

        const allEdges = await edgesRepo.listEdgesByProject(current.projectId);
        const edges = allEdges.map((e) => ({ sourceNodeId: e.sourceNodeId, targetNodeId: e.targetNodeId }));

        // `setNode` must be the LAST state update here: it's what flips the `!node` guard
        // below and mounts <NodeForm>, which only reads `initialValues` once (on mount, via
        // useState's initializer). Setting it before the other state was ready meant NodeForm
        // mounted with an empty `initialPrerequisiteIds` — every save then wiped the node's
        // real prerequisite edges, regardless of what the user actually touched.
        setExistingEdges(edges);
        setInitialPrerequisiteIds(allEdges.filter((e) => e.targetNodeId === id).map((e) => e.sourceNodeId));
        setNode(current);
      })();
    }, [id])
  );

  if (!node) return <ThemedView style={{ flex: 1 }} />;

  const handleAutosave = async (values: NodeFormValues) => {
    await nodesRepo.updateNode(id, {
      title: values.title,
      description: values.description,
      icon: values.icon,
      type: 'task',
    });
  };

  const handleMarkDone = async () => {
    if (node.state === 'mastered') {
      await markUnmastered(node.projectId, node.id);
    } else if (node.state === 'available') {
      await markMastered(node.id);
    }
    router.back();
  };

  const dependentCount = directChildren(existingEdges, node.id).length;
  const dependentWarning =
    dependentCount > 0
      ? `\n\n${dependentCount} ${dependentCount === 1 ? 'anderer Knoten verliert' : 'andere Knoten verlieren'} diese Voraussetzung.`
      : '';

  const handleConfirmDelete = async () => {
    setConfirmingDelete(false);
    await nodesRepo.deleteNode(node.id);
    // The deleted node may have been a dependent's last unmet prerequisite —
    // recompute rather than leave it stuck on its old locked/available state.
    await reevaluateProjectGraph(node.projectId);
    router.back();
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: node.title,
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 16 }}>
              {node.state !== 'locked' ? (
                <Pressable onPress={handleMarkDone} hitSlop={8}>
                  <IconSymbol name="checkmark.circle.fill" size={24} color={tint} />
                </Pressable>
              ) : null}
              <Pressable onPress={() => setConfirmingDelete(true)} hitSlop={8}>
                <IconSymbol name="trash" size={24} color="#E5484D" />
              </Pressable>
            </View>
          ),
        }}
      />
      <NodeForm
        candidatePrerequisites={[]}
        existingEdges={existingEdges}
        initialValues={{
          title: node.title,
          description: node.description,
          icon: node.icon,
          prerequisiteIds: initialPrerequisiteIds,
        }}
        onAutosave={handleAutosave}
        primaryAction={node.state !== 'locked' ? { label: 'Erledigt', onPress: handleMarkDone } : undefined}
      />
      <ConfirmModal
        visible={confirmingDelete}
        title="Knoten löschen"
        message={`"${node.title}" unwiderruflich löschen?${dependentWarning}`}
        confirmLabel="Löschen"
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmingDelete(false)}
      />
    </>
  );
}
