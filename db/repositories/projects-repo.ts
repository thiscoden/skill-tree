import { getDb } from '../client';
import { uuid } from '../uuid';
import type { Project } from '../types';

interface ProjectRow {
  id: string;
  name: string;
  goal_description: string;
  archived_at: string | null;
  created_at: string;
  updated_at: string;
}

function mapRow(row: ProjectRow): Project {
  return {
    id: row.id,
    name: row.name,
    goalDescription: row.goal_description,
    archivedAt: row.archived_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function listProjects(includeArchived = false): Promise<Project[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<ProjectRow>(
    includeArchived
      ? 'SELECT * FROM projects ORDER BY created_at DESC;'
      : 'SELECT * FROM projects WHERE archived_at IS NULL ORDER BY created_at DESC;'
  );
  return rows.map(mapRow);
}

export async function getProject(id: string): Promise<Project | null> {
  const db = await getDb();
  const row = await db.getFirstAsync<ProjectRow>('SELECT * FROM projects WHERE id = ?;', [id]);
  return row ? mapRow(row) : null;
}

export async function createProject(input: { name: string; goalDescription: string }): Promise<Project> {
  const db = await getDb();
  const now = new Date().toISOString();
  const id = uuid();
  await db.runAsync(
    'INSERT INTO projects (id, name, goal_description, archived_at, created_at, updated_at) VALUES (?, ?, ?, NULL, ?, ?);',
    [id, input.name, input.goalDescription, now, now]
  );
  return { id, name: input.name, goalDescription: input.goalDescription, archivedAt: null, createdAt: now, updatedAt: now };
}

export async function updateProject(
  id: string,
  input: { name: string; goalDescription: string }
): Promise<void> {
  const db = await getDb();
  const now = new Date().toISOString();
  await db.runAsync('UPDATE projects SET name = ?, goal_description = ?, updated_at = ? WHERE id = ?;', [
    input.name,
    input.goalDescription,
    now,
    id,
  ]);
}

export async function setProjectArchived(id: string, archived: boolean): Promise<void> {
  const db = await getDb();
  const now = new Date().toISOString();
  await db.runAsync('UPDATE projects SET archived_at = ?, updated_at = ? WHERE id = ?;', [
    archived ? now : null,
    now,
    id,
  ]);
}

export async function deleteProject(id: string): Promise<void> {
  const db = await getDb();
  await db.runAsync('DELETE FROM projects WHERE id = ?;', [id]);
}
