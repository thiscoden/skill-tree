import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';

import { ProjectForm, type ProjectFormValues } from '@/components/projects/project-form';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useActiveProjectId } from '@/hooks/use-active-project-id';
import * as projectsRepo from '@/db/repositories/projects-repo';
import { importSkillTree } from '@/db/import-skill-tree';
import { getTreeGeneratorProvider } from '@/providers/tree-generator';
import { isMeaningfulTitle } from '@/domain/title-quality';

type Status =
  | { kind: 'idle' }
  | { kind: 'generating' }
  | { kind: 'error'; message: string; values: ProjectFormValues };

export default function NewProjectScreen() {
  const [, setActiveProjectId] = useActiveProjectId();
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const tint = useThemeColor({}, 'tint');

  const finish = (projectId: string) => {
    setActiveProjectId(projectId);
    router.dismissTo('/tree');
  };

  const generate = async (values: ProjectFormValues) => {
    if (!isMeaningfulTitle(values.name) || !isMeaningfulTitle(values.goalDescription)) {
      setStatus({
        kind: 'error',
        message: 'Titel und Ziel brauchen echte, aussagekräftige Wörter — bitte ausführlicher beschreiben.',
        values,
      });
      return;
    }

    setStatus({ kind: 'generating' });
    try {
      const tree = await getTreeGeneratorProvider().generateTree({
        projectTitle: values.name,
        goalDescription: values.goalDescription,
      });
      const projectId = await importSkillTree(
        {
          schema_version: '1.0',
          project: { name: values.name, goal_description: values.goalDescription },
          nodes: tree.nodes.map((n) => ({ ...n, type: 'task' as const })),
          edges: tree.edges,
        },
        { source: 'generated' }
      );
      finish(projectId);
    } catch (error) {
      console.error('skill tree generation failed', error);
      setStatus({
        kind: 'error',
        message: 'Skilltree-Generierung fehlgeschlagen. Erneut versuchen oder ohne KI anlegen.',
        values,
      });
    }
  };

  const createEmpty = async (values: ProjectFormValues) => {
    const project = await projectsRepo.createProject(values);
    finish(project.id);
  };

  return (
    <ThemedView style={styles.container}>
      <ProjectForm
        submitLabel={status.kind === 'generating' ? 'Generiere Skilltree…' : 'Projekt erstellen'}
        onSubmit={generate}
      />
      {status.kind === 'error' && (
        <ThemedView style={styles.errorBox}>
          <ThemedText style={styles.errorText}>{status.message}</ThemedText>
          <Pressable onPress={() => generate(status.values)} hitSlop={8}>
            <ThemedText type="defaultSemiBold" style={{ color: tint }}>
              Erneut versuchen
            </ThemedText>
          </Pressable>
          <Pressable onPress={() => createEmpty(status.values)} hitSlop={8}>
            <ThemedText type="defaultSemiBold" style={{ color: tint }}>
              Ohne KI anlegen
            </ThemedText>
          </Pressable>
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  errorBox: {
    paddingHorizontal: 20,
    gap: 12,
  },
  errorText: {
    opacity: 0.8,
  },
});
