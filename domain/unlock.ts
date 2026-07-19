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
 * All nodes transitively required by (prerequisites of) `id` — the mirror image of
 * `transitiveDescendantsOf`. Picking one of these as a *dependent* of `id` would create a cycle.
 */
export function transitiveAncestorsOf(id: string, edges: UnlockEdge[]): Set<string> {
  const prereqsByTarget = groupPrereqsByTarget(edges);
  const ancestors = new Set<string>();
  const stack = [...(prereqsByTarget.get(id) ?? [])];
  while (stack.length > 0) {
    const current = stack.pop()!;
    if (ancestors.has(current)) continue;
    ancestors.add(current);
    stack.push(...(prereqsByTarget.get(current) ?? []));
  }
  return ancestors;
}

/**
 * Transitive reduction over a set of about-to-be-selected prerequisites: drops any selected
 * id that's already a transitive ancestor of another selected id, since requiring it directly
 * adds no constraint that wasn't already implied by the chain. `edges` is the existing project
 * graph (the new node being created isn't part of it yet).
 */
export function reduceRedundantPrerequisites(selectedIds: string[], edges: UnlockEdge[]): string[] {
  return selectedIds.filter(
    (id) => !selectedIds.some((other) => other !== id && transitiveAncestorsOf(other, edges).has(id))
  );
}

function groupChildrenBySource(edges: UnlockEdge[]): Map<string, string[]> {
  const map = new Map<string, string[]>();
  for (const e of edges) {
    if (!map.has(e.sourceNodeId)) map.set(e.sourceNodeId, []);
    map.get(e.sourceNodeId)!.push(e.targetNodeId);
  }
  return map;
}

/**
 * All nodes transitively unlocked by (dependent on) `id`. Picking one of these as a
 * prerequisite of `id` would create a cycle — callers building an edit-time candidate
 * prerequisite list must exclude them (along with `id` itself).
 */
export function transitiveDescendantsOf(id: string, edges: UnlockEdge[]): Set<string> {
  const childrenBySource = groupChildrenBySource(edges);
  const descendants = new Set<string>();
  const stack = [...(childrenBySource.get(id) ?? [])];
  while (stack.length > 0) {
    const current = stack.pop()!;
    if (descendants.has(current)) continue;
    descendants.add(current);
    stack.push(...(childrenBySource.get(current) ?? []));
  }
  return descendants;
}

/**
 * A node's tier: 0 if it has no prerequisites, else 1 + max(prerequisite depths) — same
 * definition `layout.ts` uses for rendering. Any ancestor of `id` always has a strictly smaller
 * depth than `id` (depth increases by at least 1 along every prerequisite edge), so filtering
 * candidates by `depth(candidate) > depth(id)` also rules out cycles for free.
 */
export function computeDepths(nodeIds: string[], edges: UnlockEdge[]): Map<string, number> {
  const prereqsByTarget = groupPrereqsByTarget(edges);
  const depths = new Map<string, number>();

  function depthOf(id: string, visiting: Set<string>): number {
    const cached = depths.get(id);
    if (cached !== undefined) return cached;
    if (visiting.has(id)) return 0; // cycle guard; acyclicity is enforced at write time

    visiting.add(id);
    const prereqs = prereqsByTarget.get(id) ?? [];
    const depth = prereqs.length === 0 ? 0 : 1 + Math.max(...prereqs.map((p) => depthOf(p, visiting)));
    visiting.delete(id);

    depths.set(id, depth);
    return depth;
  }

  for (const id of nodeIds) depthOf(id, new Set());
  return depths;
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

  // A node only counts as still mastered if every one of its prerequisites is still mastered
  // too — un-mastering one node must cascade through anything that depended on it, however
  // deep the chain. `nodeIds` isn't topologically sorted, so iterate to a fixed point.
  const stillMastered = new Set(masteredIds);
  let changed = true;
  while (changed) {
    changed = false;
    for (const id of nodeIds) {
      if (!stillMastered.has(id)) continue;
      const prereqs = prereqsByTarget.get(id) ?? [];
      if (prereqs.length > 0 && !prereqs.every((p) => stillMastered.has(p))) {
        stillMastered.delete(id);
        changed = true;
      }
    }
  }

  const result = new Map<string, NodeState>();
  for (const id of nodeIds) {
    if (stillMastered.has(id)) {
      result.set(id, 'mastered');
      continue;
    }
    const prereqs = prereqsByTarget.get(id) ?? [];
    if (prereqs.length === 0) {
      result.set(id, 'available');
      continue;
    }
    const allMastered = prereqs.every((p) => stillMastered.has(p));
    result.set(id, allMastered ? 'available' : 'locked');
  }
  return result;
}
