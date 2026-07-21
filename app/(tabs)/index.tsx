import { useCallback, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { ScreenHeader } from '@/components/ui/screen-header';
import { ConfirmModal } from '@/components/ui/confirm-modal';
import { ProjectListItem } from '@/components/projects/project-list-item';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useActiveProjectId } from '@/hooks/use-active-project-id';
import * as projectsRepo from '@/db/repositories/projects-repo';
import type { Project } from '@/db/types';

export default function ProjectsScreen() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProjectId, setActiveProjectId] = useActiveProjectId();
  const [pendingDelete, setPendingDelete] = useState<Project | null>(null);
  const tint = useThemeColor({}, 'tint');
  const borderColor = useThemeColor({ light: '#E0E0E0', dark: '#2A2A2A' }, 'text');

  const reload = useCallback(async () => {
    const list = await projectsRepo.listProjects(true);
    setProjects(list);
  }, []);

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload])
  );

  const handleDelete = (project: Project) => setPendingDelete(project);

  const handleConfirmDelete = async () => {
    if (!pendingDelete) return;
    const projectId = pendingDelete.id;
    setPendingDelete(null);
    await projectsRepo.deleteProject(projectId);
    if (activeProjectId === projectId) setActiveProjectId(null);
    reload();
  };

  const handleSelect = (project: Project) => {
    setActiveProjectId(project.id);
    router.push('/(tabs)/tree');
  };

  return (
    <ThemedView style={styles.container}>
      <ScreenHeader title="Projekte" />

      <View style={styles.body}>
        <FlatList
          data={projects}
          keyExtractor={(p) => p.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <ProjectListItem
              project={item}
              onSelect={() => handleSelect(item)}
              onEdit={() => router.push(`/project/${item.id}/edit`)}
              onDelete={() => handleDelete(item)}
            />
          )}
          ListFooterComponent={
            <Pressable onPress={() => router.push('/project/new')} style={[styles.createCard, { borderColor }]}>
              <IconSymbol name="plus.circle.fill" size={28} color={tint} />
              <ThemedText type="defaultSemiBold">Projekt anlegen</ThemedText>
            </Pressable>
          }
        />
      </View>

      <ConfirmModal
        visible={!!pendingDelete}
        title="Projekt löschen"
        message={`"${pendingDelete?.name}" und alle Knoten unwiderruflich löschen?`}
        confirmLabel="Löschen"
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  list: {
    paddingBottom: 120,
  },
  createCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    minHeight: 76,
    borderRadius: 14,
    borderCurve: 'continuous',
    borderWidth: StyleSheet.hairlineWidth,
    gap: 12,
  },
});
