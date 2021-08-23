import { nanoid } from "nanoid"

const projectStore: Record<string, Project> = {}

export interface Answer {
  questionId: string,
  answer: 'yes' | 'no' | 'n/a',
  comment?: string
}

export interface UseProject {
  error?: Error
  project?: Project
}

export interface ProjectSummary {
  id: string
  name: string
}

export interface Project extends ProjectSummary {
  answers: Answer[]
}

export async function createProject(name: string): Promise<Project> {
  const id = nanoid()
  projectStore[id] = {
    id,
    name,
    answers: []
  }
  return projectStore[id]
}

export async function saveProject(project: Project): Promise<void> {
  projectStore[project.id] = project
}

export function useGetProject(projectId: string): UseProject {
  return {
    project: projectStore[projectId]
  }
}

export interface UseProjectSummaries {
  projects?: ProjectSummary[],
  error?: Error
}

export function useGetProjectSummaries(): UseProjectSummaries {
  return {
    projects: [{
      id: 'a',
      name: 'HCAP'
    }, {
      id: 'b',
      name: 'LTC'
    }]
  }
}
