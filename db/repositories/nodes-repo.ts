import { getDb } from '../client';
import { uuid } from '../uuid';
import type { SkillNode, NodeType, NodeState, NodeSource } from '../types';

interface NodeRow {
  id: string;
  project_id: string;
  type: NodeType;
  title: string;
  description: string;
  icon: string | null;
  state: NodeState;
  pos_x: number | null;
  pos_y: number | null;
  tier: number | null;
  source: NodeSource;
  mastered_at: string | null;
  created_at: string;
  updated_at: string;
}

function mapRow(row: NodeRow): SkillNode {
  return {
    id: row.id,
    projectId: row.project_id,
    type: row.type,
    title: row.title,
    description: row.description,
    icon: row.icon,
    state: row.state,
    posX: row.pos_x,
    posY: row.pos_y,
    tier: row.tier,
    source: row.source,
    masteredAt: row.mastered_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function listNodesByProject(projectId: string): Promise<SkillNode[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<NodeRow>(
    'SELECT * FROM nodes WHERE project_id = ? ORDER BY created_at ASC;',
    [projectId]
  );
  return rows.map(mapRow);
}

export async function getNode(id: string): Promise<SkillNode | null> {
  const db = await getDb();
  const row = await db.getFirstAsync<NodeRow>('SELECT * FROM nodes WHERE id = ?;', [id]);
  return row ? mapRow(row) : null;
}

export interface CreateNodeInput {
  projectId: string;
  type: NodeType;
  title: string;
  description?: string;
  icon?: string | null;
  tier?: number | null;
  source?: NodeSource;
  /** No prerequisites means the node starts immediately available. */
  initialState?: NodeState;
}

export async function createNode(input: CreateNodeInput): Promise<SkillNode> {
  const db = await getDb();
  const now = new Date().toISOString();
  const id = uuid();
  const state: NodeState = input.initialState ?? 'available';
  await db.runAsync(
    `INSERT INTO nodes (id, project_id, type, title, description, icon, state, pos_x, pos_y, tier, source, mastered_at, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, NULL, NULL, ?, ?, NULL, ?, ?);`,
    [
      id,
      input.projectId,
      input.type,
      input.title,
      input.description ?? '',
      input.icon ?? null,
      state,
      input.tier ?? null,
      input.source ?? 'manual',
      now,
      now,
    ]
  );
  return {
    id,
    projectId: input.projectId,
    type: input.type,
    title: input.title,
    description: input.description ?? '',
    icon: input.icon ?? null,
    state,
    posX: null,
    posY: null,
    tier: input.tier ?? null,
    source: input.source ?? 'manual',
    masteredAt: null,
    createdAt: now,
    updatedAt: now,
  };
}

export async function updateNode(
  id: string,
  input: { title: string; description: string; icon: string | null; type: NodeType }
): Promise<void> {
  const db = await getDb();
  const now = new Date().toISOString();
  await db.runAsync('UPDATE nodes SET title = ?, description = ?, icon = ?, type = ?, updated_at = ? WHERE id = ?;', [
    input.title,
    input.description,
    input.icon,
    input.type,
    now,
    id,
  ]);
}

export async function setNodeState(id: string, state: NodeState): Promise<void> {
  const db = await getDb();
  const now = new Date().toISOString();
  await db.runAsync('UPDATE nodes SET state = ?, mastered_at = ?, updated_at = ? WHERE id = ?;', [
    state,
    state === 'mastered' ? now : null,
    now,
    id,
  ]);
}

export async function deleteNode(id: string): Promise<void> {
  const db = await getDb();
  await db.runAsync('DELETE FROM nodes WHERE id = ?;', [id]);
}
