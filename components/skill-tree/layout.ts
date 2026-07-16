import type { SkillNode } from '@/db/types';

export interface LayoutPosition {
  x: number;
  y: number;
}

export interface LayoutResult {
  positions: Map<string, LayoutPosition>;
  width: number;
  height: number;
}

interface LayoutEdge {
  sourceNodeId: string;
  targetNodeId: string;
}

const TIER_HEIGHT = 140;
const NODE_SPACING = 100;
const TOP_PADDING = 80;
const SIDE_PADDING = 60;

/**
 * Depth-based tier layout: a node's row is 1 + max(prerequisite rows), so the tree
 * always grows downward as dependency chains lengthen — independent of the stored
 * `tier` hint, which only ever reflects what was true at creation time.
 */
export function computeLayout(nodes: SkillNode[], edges: LayoutEdge[]): LayoutResult {
  const prereqsByTarget = new Map<string, string[]>();
  for (const e of edges) {
    if (!prereqsByTarget.has(e.targetNodeId)) prereqsByTarget.set(e.targetNodeId, []);
    prereqsByTarget.get(e.targetNodeId)!.push(e.sourceNodeId);
  }

  const depthCache = new Map<string, number>();
  function depthOf(id: string, visiting: Set<string>): number {
    const cached = depthCache.get(id);
    if (cached !== undefined) return cached;
    if (visiting.has(id)) return 0; // cycle guard; acyclicity is enforced at write time

    visiting.add(id);
    const prereqs = prereqsByTarget.get(id) ?? [];
    const depth = prereqs.length === 0 ? 0 : 1 + Math.max(...prereqs.map((p) => depthOf(p, visiting)));
    visiting.delete(id);

    depthCache.set(id, depth);
    return depth;
  }

  const tiers = new Map<number, SkillNode[]>();
  for (const node of nodes) {
    const tier = depthOf(node.id, new Set());
    if (!tiers.has(tier)) tiers.set(tier, []);
    tiers.get(tier)!.push(node);
  }

  const sortedTierKeys = Array.from(tiers.keys()).sort((a, b) => a - b);
  const maxRowCount = Math.max(1, ...sortedTierKeys.map((t) => tiers.get(t)!.length));
  const width = SIDE_PADDING * 2 + maxRowCount * NODE_SPACING;
  const positions = new Map<string, LayoutPosition>();

  sortedTierKeys.forEach((tier, rowIndex) => {
    const rowNodes = tiers.get(tier)!.slice().sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    const rowWidth = rowNodes.length * NODE_SPACING;
    const startX = (width - rowWidth) / 2 + NODE_SPACING / 2;
    rowNodes.forEach((node, colIndex) => {
      positions.set(node.id, {
        x: startX + colIndex * NODE_SPACING,
        y: TOP_PADDING + rowIndex * TIER_HEIGHT,
      });
    });
  });

  const height = TOP_PADDING * 2 + sortedTierKeys.length * TIER_HEIGHT;
  return { positions, width: Math.max(width, 320), height: Math.max(height, 320) };
}
