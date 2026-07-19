import { getDb } from './client';

const SCHEMA_VERSION = 3;

const MIGRATIONS: string[] = [
  `
  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    goal_description TEXT NOT NULL DEFAULT '',
    archived_at TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS nodes (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK(type IN ('task','capstone')),
    title TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    icon TEXT,
    state TEXT NOT NULL CHECK(state IN ('locked','available','mastered')) DEFAULT 'available',
    pos_x REAL,
    pos_y REAL,
    tier INTEGER,
    source TEXT NOT NULL CHECK(source IN ('manual','orb')) DEFAULT 'manual',
    mastered_at TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS node_prerequisites (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    source_node_id TEXT NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
    target_node_id TEXT NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
    created_at TEXT NOT NULL,
    UNIQUE(source_node_id, target_node_id),
    CHECK(source_node_id != target_node_id)
  );

  CREATE INDEX IF NOT EXISTS idx_nodes_project_id ON nodes(project_id);
  CREATE INDEX IF NOT EXISTS idx_nodes_project_state ON nodes(project_id, state);
  CREATE INDEX IF NOT EXISTS idx_edges_source ON node_prerequisites(source_node_id);
  CREATE INDEX IF NOT EXISTS idx_edges_target ON node_prerequisites(target_node_id);
  `,
  // Capstones cut from the design — collapse any existing 'capstone' rows to 'task' and
  // tighten the CHECK so the column can no longer accept a value we no longer render.
  `
  PRAGMA foreign_keys = OFF;

  UPDATE nodes SET type = 'task' WHERE type = 'capstone';

  CREATE TABLE nodes_new (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK(type IN ('task')),
    title TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    icon TEXT,
    state TEXT NOT NULL CHECK(state IN ('locked','available','mastered')) DEFAULT 'available',
    pos_x REAL,
    pos_y REAL,
    tier INTEGER,
    source TEXT NOT NULL CHECK(source IN ('manual','orb')) DEFAULT 'manual',
    mastered_at TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  INSERT INTO nodes_new SELECT * FROM nodes;
  DROP TABLE nodes;
  ALTER TABLE nodes_new RENAME TO nodes;

  CREATE INDEX IF NOT EXISTS idx_nodes_project_id ON nodes(project_id);
  CREATE INDEX IF NOT EXISTS idx_nodes_project_state ON nodes(project_id, state);

  PRAGMA foreign_keys = ON;
  `,
  // One-shot LLM tree generation adds a third node source alongside manual/orb.
  `
  PRAGMA foreign_keys = OFF;

  CREATE TABLE nodes_new (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK(type IN ('task')),
    title TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    icon TEXT,
    state TEXT NOT NULL CHECK(state IN ('locked','available','mastered')) DEFAULT 'available',
    pos_x REAL,
    pos_y REAL,
    tier INTEGER,
    source TEXT NOT NULL CHECK(source IN ('manual','orb','generated')) DEFAULT 'manual',
    mastered_at TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  INSERT INTO nodes_new SELECT * FROM nodes;
  DROP TABLE nodes;
  ALTER TABLE nodes_new RENAME TO nodes;

  CREATE INDEX IF NOT EXISTS idx_nodes_project_id ON nodes(project_id);
  CREATE INDEX IF NOT EXISTS idx_nodes_project_state ON nodes(project_id, state);

  PRAGMA foreign_keys = ON;
  `,
];

export async function migrate(): Promise<void> {
  const db = await getDb();
  await db.execAsync('PRAGMA foreign_keys = ON;');

  const { user_version: currentVersion } = (await db.getFirstAsync<{ user_version: number }>(
    'PRAGMA user_version;'
  )) ?? { user_version: 0 };

  if (currentVersion >= SCHEMA_VERSION) return;

  for (let version = currentVersion; version < SCHEMA_VERSION; version++) {
    const migration = MIGRATIONS[version];
    await db.execAsync(migration);
  }

  await db.execAsync(`PRAGMA user_version = ${SCHEMA_VERSION};`);
}
