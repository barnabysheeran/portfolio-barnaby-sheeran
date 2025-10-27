import { create } from 'zustand';

import { type ProjectData } from '../../types/project';

import projectsData from '../../../data/projects.json';

interface ProjectStore {
  projects: ProjectData[];
  getProjectById: (id: string) => ProjectData | undefined;
}

export const useProjectStore = create<ProjectStore>((_set, get) => ({
  projects: projectsData as ProjectData[],

  getProjectById: (id: string) =>
    get().projects.find((project) => project.id === id),
}));
