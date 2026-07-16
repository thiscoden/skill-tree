import { useCallback, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { ProjectListItem } from '@/components/projects/project-list-item';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useActiveProjectId } from '@/hooks/use-active-project-id';
import * as projectsRepo from '@/db/repositories/projects-repo';
import type { Project } from '@/db/types';

export default function ProjectsScreen() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProjectId, setActiveProjectId] = useActiveProjectId();
  const tint = useThemeColor({}, 'tint');

  const reload = useCallback(async () => {
    const list = await projectsRepo.listProjects(true);
    setProjects(list);
  }, []);

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload])
  );

  const handleDelete = (project: Project) => {
    Alert.alert('Projekt löschen', `"${project.name}" und alle Knoten unwiderruflich löschen?`, [
      { text: 'Abbrechen', style: 'cancel' },
      {
        text: 'Löschen',
        style: 'destructive',
        onPress: async () => {
          await projectsRepo.deleteProject(project.id);
          if (activeProjectId === project.id) setActiveProjectId(null);
          reload();
        },
      },
    ]);
  };

  const handleArchiveToggle = async (project: Project) => {
    await projectsRepo.setProjectArchived(project.id, !project.archivedAt);
    reload();
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Projects</ThemedText>
        <Pressable onPress={() => router.push('/project/new')} hitSlop={8}>
          <IconSymbol name="plus.circle.fill" size={30} color={tint} />
        </Pressable>
      </View>

      {projects.length === 0 ? (
        <ThemedText style={styles.empty}>
          Noch kein Projekt. Tippe auf + um dein erstes großes Ziel anzulegen.
        </ThemedText>
      ) : (
        <FlatList
          data={projects}
          keyExtractor={(p) => p.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <ProjectListItem
              project={item}
              isActive={item.id === activeProjectId}
              onSelect={() => setActiveProjectId(item.id)}
              onEdit={() => router.push(`/project/${item.id}/edit`)}
              onArchiveToggle={() => handleArchiveToggle(item)}
              onDelete={() => handleDelete(item)}
            />
          )}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 120,
  },
  empty: {
    opacity: 0.6,
    marginTop: 40,
  },
});
