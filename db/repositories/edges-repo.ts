import { getDb } from '../client';
import { uuid } from '../uuid';
import type { NodePrerequisite } from '../types';

interface EdgeRow {
  id: string;
  project_id: string;
  source_node_id: string;
  target_node_id: string;
  created_at: string;
}

function mapRow(row: EdgeRow): NodePrerequisite {
  return {
    id: row.id,
    projectId: row.project_id,
    sourceNodeId: row.source_node_id,
    targetNodeId: row.target_node_id,
    createdAt: row.created_at,
  };
}

export async function listEdgesByProject(projectId: string): Promise<NodePrerequisite[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<EdgeRow>('SELECT * FROM node_prerequisites WHERE project_id = ?;', [
    projectId,
  ]);
  return rows.map(mapRow);
}

/** Replaces all prerequisites of a target node with the given source node ids. */
export async function setPrerequisites(
  projectId: string,
  targetNodeId: string,
  sourceNodeIds: string[]
): Promise<void> {
  const db = await getDb();
  const now = new Date().toISOString();
  await db.withTransactionAsync(async () => {
    await db.runAsync('DELETE FROM node_prerequisites WHERE target_node_id = ?;', [targetNodeId]);
    for (const sourceNodeId of sourceNodeIds) {
      await db.runAsync(
        'INSERT INTO node_prerequisites (id, project_id, source_node_id, target_node_id, created_at) VALUES (?, ?, ?, ?, ?);',
        [uuid(), projectId, sourceNodeId, targetNodeId, now]
      );
    }
  });
}

export async function listDirectChildren(sourceNodeId: string): Promise<string[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<{ target_node_id: string }>(
    'SELECT DISTINCT target_node_id FROM node_prerequisites WHERE source_node_id = ?;',
    [sourceNodeId]
  );
  return rows.map((r) => r.target_node_id);
}
