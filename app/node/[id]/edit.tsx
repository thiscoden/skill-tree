import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';

import { NodeForm, type NodeFormValues } from '@/components/skill-tree/node-form';
import { ThemedView } from '@/components/themed-view';
import * as nodesRepo from '@/db/repositories/nodes-repo';
import * as edgesRepo from '@/db/repositories/edges-repo';
import { directChildren, reduceRedundantPrerequisites, transitiveDescendantsOf, type UnlockEdge } from '@/domain/unlock';
import { reevaluateProjectGraph } from '@/domain/mastery';
import type { SkillNode } from '@/db/types';

export default function EditNodeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [node, setNode] = useState<SkillNode | null>(null);
  const [candidateNodes, setCandidateNodes] = useState<SkillNode[]>([]);
  const [existingEdges, setExistingEdges] = useState<UnlockEdge[]>([]);
  const [initialPrerequisiteIds, setInitialPrerequisiteIds] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const current = await nodesRepo.getNode(id);
        if (!current) return;

        const [allNodes, allEdges] = await Promise.all([
          nodesRepo.listNodesByProject(current.projectId),
          edgesRepo.listEdgesByProject(current.projectId),
        ]);
        const edges = allEdges.map((e) => ({ sourceNodeId: e.sourceNodeId, targetNodeId: e.targetNodeId }));

        // Excludes itself and anything downstream of it — picking either as a prerequisite
        // would create a cycle.
        const descendants = transitiveDescendantsOf(id, edges);

        // `setNode` must be the LAST state update here: it's what flips the `!node` guard
        // below and mounts <NodeForm>, which only reads `initialValues` once (on mount, via
        // useState's initializer). Setting it before the other state was ready meant NodeForm
        // mounted with an empty `initialPrerequisiteIds` — every save then wiped the node's
        // real prerequisite edges, regardless of what the user actually touched.
        setExistingEdges(edges);
        setCandidateNodes(allNodes.filter((n) => n.id !== id && !descendants.has(n.id)));
        setInitialPrerequisiteIds(allEdges.filter((e) => e.targetNodeId === id).map((e) => e.sourceNodeId));
        setNode(current);
      })();
    }, [id])
  );

  if (!node) return <ThemedView style={{ flex: 1 }} />;

  const handleSubmit = async (values: NodeFormValues) => {
    await nodesRepo.updateNode(id, {
      title: values.title,
      description: values.description,
      icon: values.icon,
      type: 'task',
    });

    const prerequisiteIds = reduceRedundantPrerequisites(values.prerequisiteIds, existingEdges);
    await edgesRepo.setPrerequisites(node.projectId, id, prerequisiteIds);
    // A prerequisite edit can invalidate this node's (or a dependent's) mastered status —
    // recompute the whole project rather than guessing this one node's next state.
    await reevaluateProjectGraph(node.projectId);

    router.back();
  };

  const handleDelete = () => {
    const dependentCount = directChildren(existingEdges, node.id).length;
    const dependentWarning =
      dependentCount > 0
        ? `\n\n${dependentCount} ${dependentCount === 1 ? 'anderer Knoten verliert' : 'andere Knoten verlieren'} diese Voraussetzung.`
        : '';

    Alert.alert('Knoten löschen', `"${node.title}" unwiderruflich löschen?${dependentWarning}`, [
      { text: 'Abbrechen', style: 'cancel' },
      {
        text: 'Löschen',
        style: 'destructive',
        onPress: async () => {
          await nodesRepo.deleteNode(node.id);
          // The deleted node may have been a dependent's last unmet prerequisite —
          // recompute rather than leave it stuck on its old locked/available state.
          await reevaluateProjectGraph(node.projectId);
          router.back();
        },
      },
    ]);
  };

  return (
    <NodeForm
      candidatePrerequisites={candidateNodes}
      existingEdges={existingEdges}
      initialValues={{
        title: node.title,
        description: node.description,
        icon: node.icon,
        prerequisiteIds: initialPrerequisiteIds,
      }}
      submitLabel="Speichern"
      onSubmit={handleSubmit}
      onDelete={handleDelete}
    />
  );
}
