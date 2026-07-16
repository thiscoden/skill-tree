import { router } from 'expo-router';

import { ProjectForm, type ProjectFormValues } from '@/components/projects/project-form';
import { useActiveProjectId } from '@/hooks/use-active-project-id';
import * as projectsRepo from '@/db/repositories/projects-repo';

export default function NewProjectScreen() {
  const [, setActiveProjectId] = useActiveProjectId();

  const handleSubmit = async (values: ProjectFormValues) => {
    const project = await projectsRepo.createProject(values);
    setActiveProjectId(project.id);
    router.back();
  };

  return <ProjectForm submitLabel="Projekt erstellen" onSubmit={handleSubmit} />;
}
