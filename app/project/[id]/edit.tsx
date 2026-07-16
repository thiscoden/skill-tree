import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';

import { ProjectForm, type ProjectFormValues } from '@/components/projects/project-form';
import { ThemedView } from '@/components/themed-view';
import * as projectsRepo from '@/db/repositories/projects-repo';
import type { Project } from '@/db/types';

export default function EditProjectScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    projectsRepo.getProject(id).then(setProject);
  }, [id]);

  const handleSubmit = async (values: ProjectFormValues) => {
    await projectsRepo.updateProject(id, values);
    router.back();
  };

  if (!project) return <ThemedView style={{ flex: 1 }} />;

  return (
    <ProjectForm
      initialValues={{ name: project.name, goalDescription: project.goalDescription }}
      submitLabel="Speichern"
      onSubmit={handleSubmit}
    />
  );
}
