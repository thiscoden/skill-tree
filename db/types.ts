export type NodeType = 'task';
export type NodeState = 'locked' | 'available' | 'mastered';
export type NodeSource = 'manual' | 'orb' | 'generated';

export interface Project {
  id: string;
  name: string;
  goalDescription: string;
  archivedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SkillNode {
  id: string;
  projectId: string;
  type: NodeType;
  title: string;
  description: string;
  icon: string | null;
  state: NodeState;
  posX: number | null;
  posY: number | null;
  tier: number | null;
  source: NodeSource;
  masteredAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface NodePrerequisite {
  id: string;
  projectId: string;
  sourceNodeId: string;
  targetNodeId: string;
  createdAt: string;
}
