import type { NodeState } from '@/db/types';

export interface UnlockNode {
  id: string;
  state: NodeState;
}

export interface UnlockEdge {
  sourceNodeId: string;
  targetNodeId: string;
}

function groupPrereqsByTarget(edges: UnlockEdge[]): Map<string, string[]> {
  const map = new Map<string, string[]>();
  for (const e of edges) {
    if (!map.has(e.targetNodeId)) map.set(e.targetNodeId, []);
    map.get(e.targetNodeId)!.push(e.sourceNodeId);
  }
  return map;
}

/**
 * AND-of-all-incoming-edges: a candidate unlocks only once every prerequisite
 * (every source of an edge pointing at it) is mastered.
 */
export function computeUnlocks(nodes: UnlockNode[], edges: UnlockEdge[], candidateIds: string[]): string[] {
  const stateById = new Map(nodes.map((n) => [n.id, n.state]));
  const prereqsByTarget = groupPrereqsByTarget(edges);

  const unlocked: string[] = [];
  for (const candidateId of candidateIds) {
    if (stateById.get(candidateId) !== 'locked') continue;
    const prereqs = prereqsByTarget.get(candidateId) ?? [];
    if (prereqs.length === 0) continue;
    const allMastered = prereqs.every((p) => stateById.get(p) === 'mastered');
    if (allMastered) unlocked.push(candidateId);
  }
  return unlocked;
}

export function directChildren(edges: UnlockEdge[], sourceNodeId: string): string[] {
  return Array.from(new Set(edges.filter((e) => e.sourceNodeId === sourceNodeId).map((e) => e.targetNodeId)));
}

/**
 * Full-graph re-evaluation. Reserved for the rare un-master/undo path — everywhere
 * else state is incrementally recomputed via computeUnlocks() on just the direct
 * children of the node that changed.
 */
export function recomputeAllStates(
  nodeIds: string[],
  edges: UnlockEdge[],
  masteredIds: Set<string>
): Map<string, NodeState> {
  const prereqsByTarget = groupPrereqsByTarget(edges);
  const result = new Map<string, NodeState>();

  for (const id of nodeIds) {
    if (masteredIds.has(id)) {
      result.set(id, 'mastered');
      continue;
    }
    const prereqs = prereqsByTarget.get(id) ?? [];
    if (prereqs.length === 0) {
      result.set(id, 'available');
      continue;
    }
    const allMastered = prereqs.every((p) => masteredIds.has(p));
    result.set(id, allMastered ? 'available' : 'locked');
  }
  return result;
}
