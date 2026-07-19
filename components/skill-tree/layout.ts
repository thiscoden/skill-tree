import type { SkillNode } from '@/db/types';

export interface LayoutPosition {
  x: number;
  y: number;
}

export interface LayoutResult {
  positions: Map<string, LayoutPosition>;
  /** Intermediate bend points for edges whose source/target tiers aren't adjacent, keyed by edge id. */
  edgeWaypoints: Map<string, LayoutPosition[]>;
  /** Safe label width per node — how wide its title can render without reaching into a
      neighbor's column, given how much horizontal room that node actually has this layout. */
  labelWidths: Map<string, number>;
  width: number;
  height: number;
}

interface LayoutEdge {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
}

/** Internal-only layered-graph entry — never a real node id when `isDummy` is true. */
interface LayerColumnNode {
  key: string;
  isDummy: boolean;
  sortKey: string;
}

const TIER_HEIGHT = 140;
const NODE_SPACING = 100;
const TOP_PADDING = 80;
const SIDE_PADDING = 60;

// Same default as the fixed 84px label column this replaces — dense tiers (neighbors exactly
// NODE_SPACING apart) look identical to before. MAX caps how far an isolated node (or one at
// the end of a sparse row) can stretch; LABEL_GUTTER is the breathing room kept clear on each
// side so two neighbors that both max out their width still never touch.
const MIN_LABEL_WIDTH = 84;
const MAX_LABEL_WIDTH = 320;
const LABEL_GUTTER = 16;

const ORDERING_SWEEPS = 2; // barycenter down+up rounds; converges within a handful of sweeps
const TRANSPOSE_MAX_PASSES = 4; // adjacent-swap crossing reduction; stops early once a pass helps nothing
const ALIGNMENT_SWEEPS = 2; // median-alignment down+up rounds for coordinate assignment

/**
 * Depth-based tier layout: a node's row is 1 + max(prerequisite rows), so the tree
 * always grows downward as dependency chains lengthen — independent of the stored
 * `tier` hint, which only ever reflects what was true at creation time.
 *
 * A prerequisite edge can span more than one tier (e.g. a node with one shallow and one
 * deep prerequisite). Drawing that edge as a single straight line would let it cross
 * directly through an unrelated node sitting in an intermediate tier at the same column.
 * To prevent that, every edge spanning >1 tier is split into a chain of dummy waypoint
 * nodes — one per intermediate tier — so every segment spans exactly one tier and gets
 * its own reserved column, never sharing a column with a real node.
 *
 * Beyond that, two more passes turn the raw layered graph into the clean, symmetric
 * "diamond lattice" look (chains dead straight, multi-child/multi-parent nodes centered
 * on their neighbors' mean position, no edge crossing another edge where avoidable):
 * a transpose pass that actively swaps adjacent columns to remove crossings the
 * barycenter ordering alone can't see, and a median-alignment pass that replaces rigid
 * grid coordinates with positions pulled toward each node's neighbors' median x.
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

  const tiersExt = new Map<number, LayerColumnNode[]>();
  function addToTier(tier: number, entry: LayerColumnNode) {
    if (!tiersExt.has(tier)) tiersExt.set(tier, []);
    tiersExt.get(tier)!.push(entry);
  }

  for (const node of nodes) {
    const tier = depthOf(node.id, new Set());
    addToTier(tier, { key: node.id, isDummy: false, sortKey: node.createdAt });
  }

  // Split every multi-tier edge into a chain of dummy waypoints, one per intermediate tier,
  // so every segment (real->real, real->dummy, dummy->dummy, dummy->real) spans exactly one tier.
  const predecessorsByKey = new Map<string, string[]>();
  const chainsByEdge = new Map<string, string[]>();
  function addPredecessor(key: string, predecessorKey: string) {
    if (!predecessorsByKey.has(key)) predecessorsByKey.set(key, []);
    predecessorsByKey.get(key)!.push(predecessorKey);
  }

  for (const edge of edges) {
    const sourceTier = depthOf(edge.sourceNodeId, new Set());
    const targetTier = depthOf(edge.targetNodeId, new Set());
    if (targetTier - sourceTier <= 1) {
      addPredecessor(edge.targetNodeId, edge.sourceNodeId);
      chainsByEdge.set(edge.id, []);
      continue;
    }

    const chain: string[] = [];
    let prevKey = edge.sourceNodeId;
    for (let tier = sourceTier + 1; tier <= targetTier - 1; tier++) {
      const dummyKey = `dummy:${edge.id}:${tier}`;
      addToTier(tier, { key: dummyKey, isDummy: true, sortKey: edge.id });
      addPredecessor(dummyKey, prevKey);
      prevKey = dummyKey;
      chain.push(dummyKey);
    }
    addPredecessor(edge.targetNodeId, prevKey);
    chainsByEdge.set(edge.id, chain);
  }

  const successorsByKey = new Map<string, string[]>();
  for (const [key, preds] of predecessorsByKey) {
    for (const pred of preds) {
      if (!successorsByKey.has(pred)) successorsByKey.set(pred, []);
      successorsByKey.get(pred)!.push(key);
    }
  }

  const sortedTierKeys = Array.from(tiersExt.keys()).sort((a, b) => a - b);
  const order = new Map<number, LayerColumnNode[]>();
  for (const tier of sortedTierKeys) {
    order.set(
      tier,
      tiersExt
        .get(tier)!
        .slice()
        .sort((a, b) => a.sortKey.localeCompare(b.sortKey)),
    );
  }

  const indexMaps = new Map<number, Map<string, number>>();
  function rebuildIndex(tier: number) {
    const m = new Map<string, number>();
    order.get(tier)!.forEach((n, i) => m.set(n.key, i));
    indexMaps.set(tier, m);
  }
  for (const tier of sortedTierKeys) rebuildIndex(tier);

  function reorderTier(tier: number, neighborKeysOf: Map<string, string[]>, neighborIndex: Map<string, number>) {
    const current = order.get(tier)!;
    const currentIndex = indexMaps.get(tier)!;
    const scored = current.map((n) => {
      const neighborKeys = neighborKeysOf.get(n.key) ?? [];
      const neighborIdxs = neighborKeys
        .map((k) => neighborIndex.get(k))
        .filter((v): v is number => v !== undefined);
      const score = neighborIdxs.length
        ? neighborIdxs.reduce((a, b) => a + b, 0) / neighborIdxs.length
        : currentIndex.get(n.key)!;
      return { n, score };
    });
    scored.sort((a, b) => a.score - b.score || a.n.sortKey.localeCompare(b.n.sortKey));
    order.set(
      tier,
      scored.map((s) => s.n),
    );
    rebuildIndex(tier);
  }

  function downSweep() {
    // tier[0] (the anchor/root row) is never reordered, matching today's createdAt-only ordering.
    for (const tier of sortedTierKeys.slice(1)) {
      reorderTier(tier, predecessorsByKey, indexMaps.get(tier - 1)!);
    }
  }

  function upSweep() {
    // The deepest tier has no successor row to reference, so it's left as downSweep set it.
    for (const tier of sortedTierKeys.slice(1, -1).reverse()) {
      reorderTier(tier, successorsByKey, indexMaps.get(tier + 1)!);
    }
  }

  // Crossing count between two adjacent, already-ordered tiers: for every edge (source in
  // tUpper, target in tLower), two edges cross iff their upper/lower column indices are
  // inverted relative to each other. O(E^2) per boundary — fine at this app's scale.
  function crossingsBetween(tUpper: number, tLower: number): number {
    const upperIndex = indexMaps.get(tUpper)!;
    const lowerIndex = indexMaps.get(tLower)!;
    const pairs: Array<[number, number]> = [];
    for (const n of order.get(tLower)!) {
      for (const pred of predecessorsByKey.get(n.key) ?? []) {
        const u = upperIndex.get(pred);
        const l = lowerIndex.get(n.key);
        if (u !== undefined && l !== undefined) pairs.push([u, l]);
      }
    }
    let crossings = 0;
    for (let i = 0; i < pairs.length; i++) {
      for (let j = i + 1; j < pairs.length; j++) {
        if ((pairs[i][0] - pairs[j][0]) * (pairs[i][1] - pairs[j][1]) < 0) crossings++;
      }
    }
    return crossings;
  }

  function crossingsForTier(tier: number): number {
    const tierIdx = sortedTierKeys.indexOf(tier);
    let total = 0;
    if (tierIdx > 0) total += crossingsBetween(sortedTierKeys[tierIdx - 1], tier);
    if (tierIdx < sortedTierKeys.length - 1) total += crossingsBetween(tier, sortedTierKeys[tierIdx + 1]);
    return total;
  }

  // Barycenter ordering alone can settle into an avoidable crossing (ties broken by sortKey
  // have no idea about crossings). This local search fixes what's fixable by adjacent swaps —
  // for the tree/occasional-diamond shape this app actually produces, that's every crossing;
  // for adversarial dense many-to-many DAGs, minimizing crossings is NP-hard in general, so
  // this only guarantees "no swap of two neighbors helps," not a global optimum.
  function transposePass(): boolean {
    let improved = false;
    // Unlike the barycenter sweeps, tier0 has no predecessor tier to score against but it does
    // have a tier1 to count crossings against — leaving it fixed can force an avoidable crossing
    // whenever the arbitrary createdAt order happens to interleave badly with tier1's needs.
    for (const tier of sortedTierKeys) {
      const row = order.get(tier)!;
      for (let i = 0; i < row.length - 1; i++) {
        const before = crossingsForTier(tier);
        [row[i], row[i + 1]] = [row[i + 1], row[i]];
        rebuildIndex(tier);
        const after = crossingsForTier(tier);
        if (after < before) {
          improved = true;
        } else {
          [row[i], row[i + 1]] = [row[i + 1], row[i]];
          rebuildIndex(tier);
        }
      }
    }
    return improved;
  }

  for (let i = 0; i < ORDERING_SWEEPS; i++) {
    downSweep();
    upSweep();
    transposePass();
  }
  for (let i = 0; i < TRANSPOSE_MAX_PASSES; i++) {
    if (!transposePass()) break;
  }
  // Order is frozen from here on — nothing past this point may reorder a tier.

  const maxColumns = Math.max(1, ...sortedTierKeys.map((t) => order.get(t)!.length));
  const seedWidth = SIDE_PADDING * 2 + maxColumns * NODE_SPACING;
  const x = new Map<string, number>();
  sortedTierKeys.forEach((tier) => {
    const row = order.get(tier)!;
    const startX = (seedWidth - row.length * NODE_SPACING) / 2 + NODE_SPACING / 2;
    row.forEach((n, i) => x.set(n.key, startX + i * NODE_SPACING));
  });

  function medianOf(values: number[]): number {
    const sorted = values.slice().sort((a, b) => a - b);
    const mid = Math.floor((sorted.length - 1) / 2);
    return sorted.length % 2 === 1 ? sorted[mid] : (sorted[mid] + sorted[mid + 1]) / 2;
  }

  // Places nodes at their raw target x, preserving the tier's fixed order and a minimum gap
  // of NODE_SPACING, while minimizing total displacement from the targets — this is isotonic
  // regression via pool-adjacent-violators (substituting y_i = x_i - i*NODE_SPACING turns the
  // min-gap constraint into "non-decreasing", the classic PAVA precondition). Unlike a naive
  // greedy left-to-right clamp, this splits ties symmetrically instead of biasing everything
  // rightward — e.g. two siblings both targeting the same x land evenly on either side of it,
  // which is what makes a parent centered exactly between two children look right.
  function resolveRow(targets: number[]): number[] {
    const reduced = targets.map((t, i) => t - i * NODE_SPACING);
    const blocks: { value: number; weight: number; count: number }[] = [];
    for (const value of reduced) {
      blocks.push({ value, weight: 1, count: 1 });
      while (blocks.length > 1 && blocks[blocks.length - 2].value > blocks[blocks.length - 1].value) {
        const b2 = blocks.pop()!;
        const b1 = blocks.pop()!;
        const weight = b1.weight + b2.weight;
        blocks.push({ value: (b1.value * b1.weight + b2.value * b2.weight) / weight, weight, count: b1.count + b2.count });
      }
    }
    const y: number[] = [];
    for (const b of blocks) for (let k = 0; k < b.count; k++) y.push(b.value);
    return y.map((v, i) => v + i * NODE_SPACING);
  }

  function alignPass(direction: 'down' | 'up') {
    const tiers =
      direction === 'down'
        ? sortedTierKeys.slice(1) // tier0 has no predecessors to pull from
        : sortedTierKeys.slice(0, -1).reverse(); // includes tier0 — a root must float toward its children's median
    const neighborsOf = direction === 'down' ? predecessorsByKey : successorsByKey;

    for (const tier of tiers) {
      const row = order.get(tier)!;
      const targets = row.map((n) => {
        const neighborXs = (neighborsOf.get(n.key) ?? []).map((k) => x.get(k)).filter((v): v is number => v !== undefined);
        return neighborXs.length ? medianOf(neighborXs) : x.get(n.key)!;
      });
      resolveRow(targets).forEach((v, i) => x.set(row[i].key, v));
    }
  }

  for (let i = 0; i < ALIGNMENT_SWEEPS; i++) {
    alignPass('down');
    alignPass('up');
  }

  // Recenter/shrink-wrap from the actual coordinate extent rather than the column-count-based
  // seed width, since alignment can widen (or narrow) an individual row past that estimate.
  const allX = Array.from(x.values());
  const minX = Math.min(...allX);
  const maxX = Math.max(...allX);
  const shift = SIDE_PADDING - minX;
  for (const [key, value] of x) x.set(key, value + shift);
  const width = Math.max(SIDE_PADDING * 2 + (maxX - minX), 320);

  // A label only has to clear the nearest REAL neighbor in its own row — a dummy waypoint
  // column has no rendered label of its own, so a title is free to stretch across it.
  function realNeighborGap(row: LayerColumnNode[], index: number, direction: 1 | -1): number {
    let i = index + direction;
    while (i >= 0 && i < row.length) {
      if (!row[i].isDummy) return Math.abs(x.get(row[i].key)! - x.get(row[index].key)!);
      i += direction;
    }
    return Infinity;
  }

  const pixelPositions = new Map<string, LayoutPosition>();
  const labelWidthsByKey = new Map<string, number>();
  sortedTierKeys.forEach((tier, rowIndex) => {
    const row = order.get(tier)!;
    row.forEach((n, colIndex) => {
      pixelPositions.set(n.key, { x: x.get(n.key)!, y: TOP_PADDING + rowIndex * TIER_HEIGHT });
      if (n.isDummy) return;
      // Both this node and its neighbor apply the same rule off the same shared gap, so each
      // capping its width at (gap - GUTTER) still leaves GUTTER of clearance between the two
      // boxes — no need to also halve it. At exactly the default NODE_SPACING (100) this
      // resolves to exactly MIN_LABEL_WIDTH (84), matching today's fixed column exactly.
      const available = Math.min(realNeighborGap(row, colIndex, -1), realNeighborGap(row, colIndex, 1)) - LABEL_GUTTER;
      labelWidthsByKey.set(n.key, Math.min(MAX_LABEL_WIDTH, Math.max(MIN_LABEL_WIDTH, available)));
    });
  });

  const positions = new Map<string, LayoutPosition>();
  const labelWidths = new Map<string, number>();
  for (const node of nodes) {
    const p = pixelPositions.get(node.id);
    if (p) positions.set(node.id, p);
    const w = labelWidthsByKey.get(node.id);
    if (w !== undefined) labelWidths.set(node.id, w);
  }

  const edgeWaypoints = new Map<string, LayoutPosition[]>();
  for (const edge of edges) {
    const chain = chainsByEdge.get(edge.id) ?? [];
    edgeWaypoints.set(
      edge.id,
      chain.map((k) => pixelPositions.get(k)!),
    );
  }

  const height = TOP_PADDING * 2 + sortedTierKeys.length * TIER_HEIGHT;
  return { positions, edgeWaypoints, labelWidths, width, height: Math.max(height, 320) };
}
