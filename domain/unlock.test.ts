import {
  computeUnlocks,
  recomputeAllStates,
  directChildren,
  reduceRedundantPrerequisites,
  type UnlockNode,
  type UnlockEdge,
} from './unlock';

describe('computeUnlocks', () => {
  it('unlocks a candidate with a single satisfied prerequisite', () => {
    const nodes: UnlockNode[] = [
      { id: 'a', state: 'mastered' },
      { id: 'b', state: 'locked' },
    ];
    const edges: UnlockEdge[] = [{ sourceNodeId: 'a', targetNodeId: 'b' }];

    expect(computeUnlocks(nodes, edges, ['b'])).toEqual(['b']);
  });

  it('keeps a two-prerequisite node locked until both are mastered', () => {
    const nodes: UnlockNode[] = [
      { id: 'a', state: 'mastered' },
      { id: 'b', state: 'locked' },
      { id: 'c', state: 'locked' },
    ];
    const edges: UnlockEdge[] = [
      { sourceNodeId: 'a', targetNodeId: 'c' },
      { sourceNodeId: 'b', targetNodeId: 'c' },
    ];

    expect(computeUnlocks(nodes, edges, ['c'])).toEqual([]);

    nodes[1].state = 'mastered';
    expect(computeUnlocks(nodes, edges, ['c'])).toEqual(['c']);
  });

  it('resolves a diamond graph (a -> b, a -> c, b+c -> d)', () => {
    const nodes: UnlockNode[] = [
      { id: 'a', state: 'mastered' },
      { id: 'b', state: 'available' },
      { id: 'c', state: 'locked' },
      { id: 'd', state: 'locked' },
    ];
    const edges: UnlockEdge[] = [
      { sourceNodeId: 'a', targetNodeId: 'b' },
      { sourceNodeId: 'a', targetNodeId: 'c' },
      { sourceNodeId: 'b', targetNodeId: 'd' },
      { sourceNodeId: 'c', targetNodeId: 'd' },
    ];

    expect(computeUnlocks(nodes, edges, ['d'])).toEqual([]);

    nodes[1].state = 'mastered';
    nodes[2].state = 'mastered';
    expect(computeUnlocks(nodes, edges, ['d'])).toEqual(['d']);
  });

  it('does not re-unlock an already available or mastered candidate', () => {
    const nodes: UnlockNode[] = [
      { id: 'a', state: 'mastered' },
      { id: 'b', state: 'available' },
    ];
    const edges: UnlockEdge[] = [{ sourceNodeId: 'a', targetNodeId: 'b' }];

    expect(computeUnlocks(nodes, edges, ['b'])).toEqual([]);
  });
});

describe('reduceRedundantPrerequisites', () => {
  it('drops a selected ancestor that another selected node already implies transitively', () => {
    // tier1 <- tier2 <- tier3 (tier3 already requires tier1 through the chain).
    const edges: UnlockEdge[] = [
      { sourceNodeId: 'tier1', targetNodeId: 'tier2' },
      { sourceNodeId: 'tier2', targetNodeId: 'tier3' },
    ];
    expect(reduceRedundantPrerequisites(['tier3', 'tier1'], edges).sort()).toEqual(['tier3']);
  });

  it('keeps unrelated selections that do not imply each other', () => {
    const edges: UnlockEdge[] = [{ sourceNodeId: 'tier1', targetNodeId: 'tier2' }];
    expect(reduceRedundantPrerequisites(['tier2', 'other'], edges).sort()).toEqual(['other', 'tier2']);
  });
});

describe('directChildren', () => {
  it('deduplicates targets reached via multiple edges', () => {
    const edges: UnlockEdge[] = [
      { sourceNodeId: 'a', targetNodeId: 'b' },
      { sourceNodeId: 'a', targetNodeId: 'b' },
      { sourceNodeId: 'a', targetNodeId: 'c' },
    ];
    expect(directChildren(edges, 'a').sort()).toEqual(['b', 'c']);
  });
});

describe('recomputeAllStates', () => {
  it('cascades an un-master back through dependents', () => {
    const edges: UnlockEdge[] = [
      { sourceNodeId: 'a', targetNodeId: 'b' },
      { sourceNodeId: 'b', targetNodeId: 'c' },
    ];
    // a, b, c all mastered; un-mastering b should lock c but leave a mastered.
    const masteredIds = new Set(['a']);
    const result = recomputeAllStates(['a', 'b', 'c'], edges, masteredIds);

    expect(result.get('a')).toBe('mastered');
    expect(result.get('b')).toBe('available');
    expect(result.get('c')).toBe('locked');
  });

  it('nodes without any prerequisites start available', () => {
    const result = recomputeAllStates(['a'], [], new Set());
    expect(result.get('a')).toBe('available');
  });

  it('cascades through a dependent that is still flagged mastered in the input set', () => {
    // Skill 4 requires 1, 2, 3 (chained a -> b -> c -> d). All four are currently mastered.
    const edges: UnlockEdge[] = [
      { sourceNodeId: 'a', targetNodeId: 'b' },
      { sourceNodeId: 'b', targetNodeId: 'c' },
      { sourceNodeId: 'c', targetNodeId: 'd' },
    ];
    // Un-mastering 'c': the caller still reports 'a', 'b', and 'd' as mastered in the DB —
    // 'd' being in masteredIds must not be trusted blindly, since its prerequisite 'c' isn't.
    const masteredIds = new Set(['a', 'b', 'd']);
    const result = recomputeAllStates(['a', 'b', 'c', 'd'], edges, masteredIds);

    expect(result.get('a')).toBe('mastered');
    expect(result.get('b')).toBe('mastered');
    expect(result.get('c')).toBe('available');
    expect(result.get('d')).toBe('locked');
  });
});
