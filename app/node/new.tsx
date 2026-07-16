import { useEffect, useState } from 'react';
import { router } from 'expo-router';

import { NodeForm, type NodeFormValues } from '@/components/skill-tree/node-form';
import { ThemedView } from '@/components/themed-view';
import { useActiveProjectId } from '@/hooks/use-active-project-id';
import * as nodesRepo from '@/db/repositories/nodes-repo';
import * as edgesRepo from '@/db/repositories/edges-repo';
import type { SkillNode } from '@/db/types';

export default function NewNodeScreen() {
  const [activeProjectId] = useActiveProjectId();
  const [existingNodes, setExistingNodes] = useState<SkillNode[]>([]);

  useEffect(() => {
    if (activeProjectId) nodesRepo.listNodesByProject(activeProjectId).then(setExistingNodes);
  }, [activeProjectId]);

  if (!activeProjectId) return <ThemedView style={{ flex: 1 }} />;

  const handleSubmit = async (values: NodeFormValues) => {
    const node = await nodesRepo.createNode({
      projectId: activeProjectId,
      type: values.type,
      title: values.title,
      description: values.description,
      icon: values.icon,
      source: 'manual',
      initialState: values.prerequisiteIds.length > 0 ? 'locked' : 'available',
    });
    if (values.prerequisiteIds.length > 0) {
      await edgesRepo.setPrerequisites(activeProjectId, node.id, values.prerequisiteIds);
    }
    router.back();
  };

  return (
    <NodeForm candidatePrerequisites={existingNodes} submitLabel="Knoten anlegen" onSubmit={handleSubmit} />
  );
}
