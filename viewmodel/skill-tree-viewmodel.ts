import { useCallback, useEffect, useState } from 'react';
import * as nodesRepo from '@/db/repositories/nodes-repo';
import * as edgesRepo from '@/db/repositories/edges-repo';
import type { SkillNode } from '@/db/types';

export interface EdgeVM {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
}

interface SkillTreeViewModel {
  nodes: SkillNode[];
  edges: EdgeVM[];
  loading: boolean;
  reload: () => Promise<void>;
}

/** Renderer-agnostic { nodes, edges } contract — the canvas layer never touches the db directly. */
export function useSkillTreeViewModel(projectId: string | null): SkillTreeViewModel {
  const [nodes, setNodes] = useState<SkillNode[]>([]);
  const [edges, setEdges] = useState<EdgeVM[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    if (!projectId) {
      setNodes([]);
      setEdges([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const [n, e] = await Promise.all([
      nodesRepo.listNodesByProject(projectId),
      edgesRepo.listEdgesByProject(projectId),
    ]);
    setNodes(n);
    setEdges(e.map((edge) => ({ id: edge.id, sourceNodeId: edge.sourceNodeId, targetNodeId: edge.targetNodeId })));
    setLoading(false);
  }, [projectId]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { nodes, edges, loading, reload };
}
