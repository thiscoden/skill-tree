import { useEffect, useState } from 'react';
import { router } from 'expo-router';

import { NodeForm, type NodeFormValues } from '@/components/skill-tree/node-form';
import { ThemedView } from '@/components/themed-view';
import { useActiveProjectId } from '@/hooks/use-active-project-id';
import * as nodesRepo from '@/db/repositories/nodes-repo';
import * as edgesRepo from '@/db/repositories/edges-repo';
import { reduceRedundantPrerequisites, type UnlockEdge } from '@/domain/unlock';
import type { SkillNode } from '@/db/types';

export default function NewNodeScreen() {
  const [activeProjectId] = useActiveProjectId();
  const [existingNodes, setExistingNodes] = useState<SkillNode[]>([]);
  const [existingEdges, setExistingEdges] = useState<UnlockEdge[]>([]);

  useEffect(() => {
    if (!activeProjectId) return;
    nodesRepo.listNodesByProject(activeProjectId).then(setExistingNodes);
    edgesRepo.listEdgesByProject(activeProjectId).then(setExistingEdges);
  }, [activeProjectId]);

  if (!activeProjectId) return <ThemedView style={{ flex: 1 }} />;

  const handleSubmit = async (values: NodeFormValues) => {
    // Defense-in-depth: the picker already keeps the selection reduced live, but re-check
    // here too in case existingEdges was stale when the user submitted.
    const prerequisiteIds = reduceRedundantPrerequisites(values.prerequisiteIds, existingEdges);
    const node = await nodesRepo.createNode({
      projectId: activeProjectId,
      type: 'task',
      title: values.title,
      description: values.description,
      icon: values.icon,
      source: 'manual',
      initialState: prerequisiteIds.length > 0 ? 'locked' : 'available',
    });
    if (prerequisiteIds.length > 0) {
      await edgesRepo.setPrerequisites(activeProjectId, node.id, prerequisiteIds);
    }
    router.back();
  };

  return (
    <NodeForm
      candidatePrerequisites={existingNodes}
      existingEdges={existingEdges}
      submitLabel="Knoten anlegen"
      onSubmit={handleSubmit}
    />
  );
}
