import * as projectsRepo from './repositories/projects-repo';
import * as nodesRepo from './repositories/nodes-repo';
import * as edgesRepo from './repositories/edges-repo';
import type { NodeType } from './types';

interface ImportNode {
  id: string;
  type: NodeType;
  title: string;
  icon?: string;
  tier?: number;
}

interface ImportEdge {
  from: string;
  to: string;
}

interface ImportPayload {
  schema_version: string;
  project: { name: string; goal_description: string };
  nodes: ImportNode[];
  edges: ImportEdge[];
}

const SUPPORTED_SCHEMA_VERSIONS = ['1.0'];

function assertAcyclic(nodes: ImportNode[], edges: ImportEdge[]): void {
  const adjacency = new Map<string, string[]>();
  for (const n of nodes) adjacency.set(n.id, []);
  for (const e of edges) adjacency.get(e.from)?.push(e.to);

  const visiting = new Set<string>();
  const visited = new Set<string>();

  function visit(id: string): void {
    if (visited.has(id)) return;
    if (visiting.has(id)) throw new Error(`Cycle detected involving node "${id}"`);
    visiting.add(id);
    for (const next of adjacency.get(id) ?? []) visit(next);
    visiting.delete(id);
    visited.add(id);
  }

  for (const n of nodes) visit(n.id);
}

/** Internal dev/fixture bulk import — not the user-facing creation flow. See fixtures/. */
export async function importSkillTree(payload: ImportPayload): Promise<string> {
  if (!SUPPORTED_SCHEMA_VERSIONS.includes(payload.schema_version)) {
    throw new Error(`Unsupported schema_version "${payload.schema_version}"`);
  }

  const ids = new Set(payload.nodes.map((n) => n.id));
  if (ids.size !== payload.nodes.length) throw new Error('Duplicate node ids in fixture');
  for (const e of payload.edges) {
    if (!ids.has(e.from) || !ids.has(e.to)) {
      throw new Error(`Edge references unknown node: ${e.from} -> ${e.to}`);
    }
  }
  const hasRoot = payload.nodes.some((n) => !payload.edges.some((e) => e.to === n.id));
  if (!hasRoot) throw new Error('Fixture graph has no root node (a node without incoming edges)');

  assertAcyclic(payload.nodes, payload.edges);

  const project = await projectsRepo.createProject({
    name: payload.project.name,
    goalDescription: payload.project.goal_description,
  });

  const incomingCount = new Map<string, number>();
  for (const e of payload.edges) incomingCount.set(e.to, (incomingCount.get(e.to) ?? 0) + 1);

  const idMap = new Map<string, string>();
  for (const n of payload.nodes) {
    const hasPrereqs = (incomingCount.get(n.id) ?? 0) > 0;
    const created = await nodesRepo.createNode({
      projectId: project.id,
      type: n.type,
      title: n.title,
      icon: n.icon ?? null,
      tier: n.tier ?? null,
      source: 'manual',
      initialState: hasPrereqs ? 'locked' : 'available',
    });
    idMap.set(n.id, created.id);
  }

  const edgesByTarget = new Map<string, string[]>();
  for (const e of payload.edges) {
    if (!edgesByTarget.has(e.to)) edgesByTarget.set(e.to, []);
    edgesByTarget.get(e.to)!.push(e.from);
  }
  for (const [targetFixtureId, sourceFixtureIds] of edgesByTarget) {
    const targetId = idMap.get(targetFixtureId)!;
    const sourceIds = sourceFixtureIds.map((fid) => idMap.get(fid)!);
    await edgesRepo.setPrerequisites(project.id, targetId, sourceIds);
  }

  return project.id;
}
