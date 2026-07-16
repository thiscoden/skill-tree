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

const TIER_HEIGHT = 140;
const NODE_SPACING = 100;
const TOP_PADDING = 80;
const SIDE_PADDING = 60;

/** Deterministic bottom-up tier layout — nodes without an explicit tier fall in row 0. */
export function computeLayout(nodes: SkillNode[]): LayoutResult {
  const tiers = new Map<number, SkillNode[]>();
  for (const node of nodes) {
    const tier = node.tier ?? 0;
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
