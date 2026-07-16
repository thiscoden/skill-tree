import * as nodesRepo from '@/db/repositories/nodes-repo';
import * as edgesRepo from '@/db/repositories/edges-repo';
import { computeUnlocks, recomputeAllStates } from './unlock';

/** Marks a node mastered and unlocks any direct children whose prerequisites are now all satisfied. */
export async function markMastered(nodeId: string): Promise<string[]> {
  const node = await nodesRepo.getNode(nodeId);
  if (!node) throw new Error(`Node not found: ${nodeId}`);
  if (node.state === 'mastered') return [];

  await nodesRepo.setNodeState(nodeId, 'mastered');

  const childIds = await edgesRepo.listDirectChildren(nodeId);
  if (childIds.length === 0) return [];

  const edges = await edgesRepo.listEdgesByProject(node.projectId);
  const relevantEdges = edges
    .filter((e) => childIds.includes(e.targetNodeId))
    .map((e) => ({ sourceNodeId: e.sourceNodeId, targetNodeId: e.targetNodeId }));

  const relevantNodeIds = new Set<string>([...childIds, ...relevantEdges.map((e) => e.sourceNodeId)]);
  const relevantNodes = (
    await Promise.all(Array.from(relevantNodeIds).map((id) => nodesRepo.getNode(id)))
  ).filter((n): n is NonNullable<typeof n> => n !== null);

  const unlockedIds = computeUnlocks(
    relevantNodes.map((n) => ({ id: n.id, state: n.state })),
    relevantEdges,
    childIds
  );

  for (const id of unlockedIds) {
    await nodesRepo.setNodeState(id, 'available');
  }
  return unlockedIds;
}

/** Un-masters a node and re-evaluates the whole project graph (rare debug/undo path). */
export async function markUnmastered(projectId: string, nodeId: string): Promise<void> {
  const [allNodes, allEdges] = await Promise.all([
    nodesRepo.listNodesByProject(projectId),
    edgesRepo.listEdgesByProject(projectId),
  ]);

  const masteredIds = new Set(
    allNodes.filter((n) => n.state === 'mastered' && n.id !== nodeId).map((n) => n.id)
  );

  const recomputed = recomputeAllStates(
    allNodes.map((n) => n.id),
    allEdges.map((e) => ({ sourceNodeId: e.sourceNodeId, targetNodeId: e.targetNodeId })),
    masteredIds
  );

  for (const node of allNodes) {
    const nextState = recomputed.get(node.id);
    if (nextState && nextState !== node.state) {
      await nodesRepo.setNodeState(node.id, nextState);
    }
  }
}
