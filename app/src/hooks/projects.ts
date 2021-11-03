import axios from 'axios';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';

const projectStore: Record<string, Project> = {
  a: {
    name: 'HCAP',
    id: 'a',
    answers: [],
  },
  b: {
    name: 'LTC',
    id: 'b',
    answers: [],
  },
};

export interface Answer {
  questionId: string;
  answer: 'yes' | 'no' | 'n/a';
  comment?: string;
}

export interface UseGetProject {
  error?: Error;
  project?: Project;
  refetch(): Promise<void>;
}

export interface ProjectSummary {
  id: string;
  name: string;
}

export interface Project extends ProjectSummary {
  answers: Answer[];
  creator?: string;
  loggedInUser?: string;
}

export function isEmptyAnswer(answer: Answer): boolean {
  return answer.answer === 'no' && !answer.comment;
}

export async function createProject(name: string): Promise<Project> {
  const id = nanoid();
  projectStore[id] = {
    id,
    name,
    answers: [],
  };
  return projectStore[id];
}

export async function saveProject(project: Project): Promise<void> {
  projectStore[project.id] = project;
}

export function useGetProject(projectId: string): UseGetProject {
  const [project, setProject] = useState(projectStore[projectId]);
  // const result = axios.get('/');

  useEffect(() => {
    setProject(projectStore[projectId]);
  }, [projectId]);

  return {
    project,

    async refetch() {
      setProject({ ...projectStore[projectId] });
    },
  };
}

export interface UseGetProjectSummaries {
  projects?: ProjectSummary[];
  error?: Error;
}

export function useGetProjectSummaries(): UseGetProjectSummaries {
  return {
    projects: Object.values(projectStore),
  };
}
