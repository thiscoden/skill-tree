import { computeLayout } from './layout';
import type { SkillNode } from '@/db/types';

function makeNode(id: string, createdAt: string): SkillNode {
  return {
    id,
    projectId: 'p1',
    type: 'task',
    title: id,
    description: '',
    icon: null,
    state: 'locked',
    posX: null,
    posY: null,
    tier: null,
    source: 'manual',
    masteredAt: null,
    createdAt,
    updatedAt: createdAt,
  };
}

function makeEdge(id: string, sourceNodeId: string, targetNodeId: string) {
  return { id, sourceNodeId, targetNodeId };
}

// Mirrors the inversion-count crossing test used inside computeLayout, applied to a resolved
// layout's own positions/waypoints instead of internal column indices — an independent check
// that operates purely on the public output shape.
function countCrossings(
  edges: { id: string; sourceNodeId: string; targetNodeId: string }[],
  positions: Map<string, { x: number; y: number }>,
  edgeWaypoints: Map<string, { x: number; y: number }[]>,
): number {
  type Segment = { x1: number; y1: number; x2: number; y2: number };
  const segments: Segment[] = [];
  for (const e of edges) {
    const from = positions.get(e.sourceNodeId)!;
    const to = positions.get(e.targetNodeId)!;
    const points = [from, ...(edgeWaypoints.get(e.id) ?? []), to];
    for (let i = 0; i < points.length - 1; i++) {
      segments.push({ x1: points[i].x, y1: points[i].y, x2: points[i + 1].x, y2: points[i + 1].y });
    }
  }

  function crosses(a: Segment, b: Segment): boolean {
    // Only segments occupying the same horizontal band (same tier-to-tier step) can cross in
    // this layout (every segment spans exactly one tier row), and they share no endpoint.
    if (Math.max(a.y1, a.y2) !== Math.max(b.y1, b.y2) || Math.min(a.y1, a.y2) !== Math.min(b.y1, b.y2)) return false;
    const shareEndpoint =
      (a.x1 === b.x1 && a.y1 === b.y1) ||
      (a.x1 === b.x2 && a.y1 === b.y2) ||
      (a.x2 === b.x1 && a.y2 === b.y1) ||
      (a.x2 === b.x2 && a.y2 === b.y2);
    if (shareEndpoint) return false;
    const topX = a.y1 < a.y2 ? [a.x1, a.x2] : [a.x2, a.x1];
    const botX = b.y1 < b.y2 ? [b.x1, b.x2] : [b.x2, b.x1];
    return (topX[0] - botX[0]) * (topX[1] - botX[1]) < 0;
  }

  let crossings = 0;
  for (let i = 0; i < segments.length; i++) {
    for (let j = i + 1; j < segments.length; j++) {
      if (crosses(segments[i], segments[j])) crossings++;
    }
  }
  return crossings;
}

describe('computeLayout', () => {
  it('lays out a single node with no edges and floors width/height', () => {
    const nodes = [makeNode('a', '2024-01-01T00:00:00Z')];
    const result = computeLayout(nodes, []);

    expect(result.positions.size).toBe(1);
    expect(result.edgeWaypoints.size).toBe(0);
    expect(result.width).toBe(320);
    expect(result.height).toBe(320);
  });

  it('stacks a simple chain in one column with no waypoints', () => {
    const nodes = [
      makeNode('a', '2024-01-01T00:00:00Z'),
      makeNode('b', '2024-01-02T00:00:00Z'),
      makeNode('c', '2024-01-03T00:00:00Z'),
    ];
    const edges = [makeEdge('e1', 'a', 'b'), makeEdge('e2', 'b', 'c')];
    const result = computeLayout(nodes, edges);

    const [a, b, c] = ['a', 'b', 'c'].map((id) => result.positions.get(id)!);
    expect(a.x).toBe(b.x);
    expect(b.x).toBe(c.x);
    expect(b.y - a.y).toBe(140);
    expect(c.y - b.y).toBe(140);
    expect(result.edgeWaypoints.get('e1')).toEqual([]);
    expect(result.edgeWaypoints.get('e2')).toEqual([]);
  });

  it('lays out a diamond with no dummy waypoints needed', () => {
    const nodes = ['a', 'b', 'c', 'd'].map((id, i) => makeNode(id, `2024-01-0${i + 1}T00:00:00Z`));
    const edges = [
      makeEdge('e1', 'a', 'b'),
      makeEdge('e2', 'a', 'c'),
      makeEdge('e3', 'b', 'd'),
      makeEdge('e4', 'c', 'd'),
    ];
    const result = computeLayout(nodes, edges);

    expect(result.positions.size).toBe(4);
    const b = result.positions.get('b')!;
    const c = result.positions.get('c')!;
    expect(b.y).toBe(c.y);
    expect(b.x).not.toBe(c.x);
    for (const wp of result.edgeWaypoints.values()) expect(wp).toEqual([]);
  });

  it('splits a skip-tier edge into a dummy chain that avoids sibling columns', () => {
    // a(tier0) -> b(tier1) -> c(tier2); d(tier3) requires both b->...->c chain and a directly,
    // so edge a->d spans tiers 0..3 and must route around b (tier1) and c (tier2).
    const nodes = ['a', 'b', 'c', 'd'].map((id, i) => makeNode(id, `2024-01-0${i + 1}T00:00:00Z`));
    const edges = [
      makeEdge('ab', 'a', 'b'),
      makeEdge('bc', 'b', 'c'),
      makeEdge('cd', 'c', 'd'),
      makeEdge('ad', 'a', 'd'),
    ];
    const result = computeLayout(nodes, edges);

    const waypoints = result.edgeWaypoints.get('ad')!;
    expect(waypoints).toHaveLength(2);

    const b = result.positions.get('b')!;
    const c = result.positions.get('c')!;
    expect(waypoints[0].y).toBe(b.y);
    expect(waypoints[1].y).toBe(c.y);
    expect(waypoints[0].x).not.toBe(b.x);
    expect(waypoints[1].x).not.toBe(c.x);
  });

  it('grows width when a skip-tier edge reserves extra dummy columns', () => {
    // Pad tier1/tier2 to 3 real columns each so the baseline width already clears the
    // Math.max(_, 320) floor — otherwise both variants would flatten to the same floor value.
    const ids = ['a', 'b', 'c', 'd', 'x1', 'x2', 'y1', 'y2'];
    const buildNodes = () => ids.map((id, i) => makeNode(id, `2024-01-0${i + 1}T00:00:00Z`));
    const baseEdges = [
      makeEdge('ab', 'a', 'b'),
      makeEdge('bc', 'b', 'c'),
      makeEdge('cd', 'c', 'd'),
      makeEdge('ax1', 'a', 'x1'),
      makeEdge('ax2', 'a', 'x2'),
      makeEdge('x1y1', 'x1', 'y1'),
      makeEdge('x2y2', 'x2', 'y2'),
    ];

    const withoutLongEdge = computeLayout(buildNodes(), baseEdges);
    const withLongEdge = computeLayout(buildNodes(), [...baseEdges, makeEdge('ad', 'a', 'd')]);

    expect(withLongEdge.width).toBeGreaterThan(withoutLongEdge.width);
  });

  it('never leaks a dummy key into the returned positions map', () => {
    const nodes = ['a', 'b', 'c', 'd'].map((id, i) => makeNode(id, `2024-01-0${i + 1}T00:00:00Z`));
    const edges = [
      makeEdge('ab', 'a', 'b'),
      makeEdge('bc', 'b', 'c'),
      makeEdge('cd', 'c', 'd'),
      makeEdge('ad', 'a', 'd'),
    ];
    const result = computeLayout(nodes, edges);
    const nodeIds = new Set(nodes.map((n) => n.id));

    for (const key of result.positions.keys()) expect(nodeIds.has(key)).toBe(true);
  });

  it('is deterministic across repeated calls with equivalent input', () => {
    const build = () => ({
      nodes: ['a', 'b', 'c', 'd'].map((id, i) => makeNode(id, `2024-01-0${i + 1}T00:00:00Z`)),
      edges: [
        makeEdge('ab', 'a', 'b'),
        makeEdge('bc', 'b', 'c'),
        makeEdge('cd', 'c', 'd'),
        makeEdge('ad', 'a', 'd'),
      ],
    });

    const first = build();
    const second = build();
    const resultA = computeLayout(first.nodes, first.edges);
    const resultB = computeLayout(second.nodes, second.edges);

    expect(resultA.positions).toEqual(resultB.positions);
    expect(resultA.edgeWaypoints).toEqual(resultB.edgeWaypoints);
  });

  it('keeps a longer chain perfectly vertical', () => {
    const ids = ['a', 'b', 'c', 'd', 'e'];
    const nodes = ids.map((id, i) => makeNode(id, `2024-01-0${i + 1}T00:00:00Z`));
    const edges = [
      makeEdge('ab', 'a', 'b'),
      makeEdge('bc', 'b', 'c'),
      makeEdge('cd', 'c', 'd'),
      makeEdge('de', 'd', 'e'),
    ];
    const result = computeLayout(nodes, edges);
    const xs = ids.map((id) => result.positions.get(id)!.x);

    expect(new Set(xs).size).toBe(1);
  });

  it('centers a parent exactly on the mean x of its two children', () => {
    const nodes = ['a', 'b', 'c', 'd'].map((id, i) => makeNode(id, `2024-01-0${i + 1}T00:00:00Z`));
    const edges = [
      makeEdge('e1', 'a', 'b'),
      makeEdge('e2', 'a', 'c'),
      makeEdge('e3', 'b', 'd'),
      makeEdge('e4', 'c', 'd'),
    ];
    const result = computeLayout(nodes, edges);
    const a = result.positions.get('a')!;
    const b = result.positions.get('b')!;
    const c = result.positions.get('c')!;
    const d = result.positions.get('d')!;

    expect(a.x).toBeCloseTo((b.x + c.x) / 2, 5);
    expect(d.x).toBeCloseTo((b.x + c.x) / 2, 5);
  });

  it('never places two nodes in the same tier closer than the minimum spacing', () => {
    const ids = ['a', 'b', 'c', 'd', 'x1', 'x2', 'y1', 'y2'];
    const nodes = ids.map((id, i) => makeNode(id, `2024-01-0${i + 1}T00:00:00Z`));
    const edges = [
      makeEdge('ab', 'a', 'b'),
      makeEdge('bc', 'b', 'c'),
      makeEdge('cd', 'c', 'd'),
      makeEdge('ax1', 'a', 'x1'),
      makeEdge('ax2', 'a', 'x2'),
      makeEdge('x1y1', 'x1', 'y1'),
      makeEdge('x2y2', 'x2', 'y2'),
      makeEdge('ad', 'a', 'd'),
    ];
    const result = computeLayout(nodes, edges);

    const byTierY = new Map<number, number[]>();
    for (const p of result.positions.values()) {
      if (!byTierY.has(p.y)) byTierY.set(p.y, []);
      byTierY.get(p.y)!.push(p.x);
    }
    for (const xs of byTierY.values()) {
      xs.sort((a, b) => a - b);
      for (let i = 1; i < xs.length; i++) {
        expect(xs[i] - xs[i - 1]).toBeGreaterThanOrEqual(100 - 1e-6);
      }
    }
  });

  it('produces zero edge-edge crossings for a plain diamond', () => {
    const nodes = ['a', 'b', 'c', 'd'].map((id, i) => makeNode(id, `2024-01-0${i + 1}T00:00:00Z`));
    const edges = [
      makeEdge('e1', 'a', 'b'),
      makeEdge('e2', 'a', 'c'),
      makeEdge('e3', 'b', 'd'),
      makeEdge('e4', 'c', 'd'),
    ];
    const result = computeLayout(nodes, edges);

    expect(countCrossings(edges, result.positions, result.edgeWaypoints)).toBe(0);
  });

  it('gives an isolated node with no same-tier neighbor the maximum label width', () => {
    const nodes = [makeNode('a', '2024-01-01T00:00:00Z')];
    const result = computeLayout(nodes, []);

    expect(result.labelWidths.get('a')).toBe(320);
  });

  it('caps label width to the default column when siblings sit at minimum spacing', () => {
    // b and c are the only two nodes in tier1, exactly NODE_SPACING (100) apart — mirrors the
    // fixed 84px column every node used to get, so dense trees look unchanged.
    const nodes = ['a', 'b', 'c', 'd'].map((id, i) => makeNode(id, `2024-01-0${i + 1}T00:00:00Z`));
    const edges = [
      makeEdge('e1', 'a', 'b'),
      makeEdge('e2', 'a', 'c'),
      makeEdge('e3', 'b', 'd'),
      makeEdge('e4', 'c', 'd'),
    ];
    const result = computeLayout(nodes, edges);

    expect(result.labelWidths.get('b')).toBe(84);
    expect(result.labelWidths.get('c')).toBe(84);
    // a and d are the lone occupants of their own tier — free to use the max width.
    expect(result.labelWidths.get('a')).toBe(320);
    expect(result.labelWidths.get('d')).toBe(320);
  });

  it('untangles a barycenter tie via the transpose pass', () => {
    // Middle tier has one node (m1) requiring two outer-column roots (p0, p2) and a sibling
    // (m2) requiring only the middle root (p1) — a classic barycenter tie (both score the same
    // mean column) that a naive sortKey tiebreak can leave crossed. Also feeds a deeper tier (q)
    // requiring both m1 and m2, so the check exercises two tier boundaries at once.
    const nodes = ['p0', 'p1', 'p2', 'm1', 'm2', 'q'].map((id, i) => makeNode(id, `2024-01-0${i + 1}T00:00:00Z`));
    const edges = [
      makeEdge('p0m1', 'p0', 'm1'),
      makeEdge('p2m1', 'p2', 'm1'),
      makeEdge('p1m2', 'p1', 'm2'),
      makeEdge('m1q', 'm1', 'q'),
      makeEdge('m2q', 'm2', 'q'),
    ];
    const result = computeLayout(nodes, edges);

    expect(countCrossings(edges, result.positions, result.edgeWaypoints)).toBe(0);
  });
});
