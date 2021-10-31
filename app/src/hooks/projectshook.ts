import { useState } from 'react';

import { AxiosPublic } from './axios';
import { Project } from './projects';

export const useProjectsHook = () => {
  const [isFetching, setFetching] = useState(false);
  const [project, setProject] = useState<Project>();
  const [projectId, setProjectId] = useState<any>();
  const [projects, setProjects] = useState<Project[]>();

  const getProjectById = async (projectId: string) => {
    try {
      setFetching(true);
      const response: Project = await AxiosPublic.get(`/project/${projectId}`);
      setProject(project);
      setFetching(false);
      return response;
    } catch (e) {
      console.log(JSON.stringify(e));
      setFetching(false);
    }
  };

  const createProject = async (name: string) => {
    try {
      setFetching(true);
      const response = await AxiosPublic.post('/project', {
        name,
        loggedInUser: 'test@freshworks.io',
        answers: [{ answer: 'a', id: '1' }],
      });
      setProjectId(response);
      setFetching(false);
      return response;
    } catch (e) {
      setFetching(false);
      console.log(JSON.stringify(e, null, 2));
    }
  };

  const getAllProjects = async () => {
    try {
      setFetching(true);
      const projects: Project[] = await AxiosPublic.get('/project');
      setProjects(projects);
      setFetching(false);
    } catch (e) {
      setFetching(false);
      console.log(JSON.stringify(e, null, 2));
    }
  };

  const updateProject = async (project: Project) => {
    try {
      setFetching(true);
      const response = await AxiosPublic.put(`/project/${project.id}`, project);
      setFetching(false);
      return response;
    } catch (e) {
      setFetching(false);
      console.log(JSON.stringify(e, null, 2));
    }
  };

  return {
    isFetching,
    getProjectById,
    createProject,
    project,
    projectId,
    getAllProjects,
    projects,
    updateProject,
  };
};
