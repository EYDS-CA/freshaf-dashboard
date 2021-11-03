import React, { createContext, useContext, useEffect, useState } from 'react';
import { Project } from '../hooks/projects';
import { useProjectsHook } from '../hooks/projectshook';

export type ProjectsType = {
  projects: Project[];
  updateProjects: Function;
  loading: boolean;
};

const initialState: ProjectsType = {
  projects: [],
  updateProjects: () => {},
  loading: true,
};

export const ProjectContext = createContext(initialState);

export const ProjectProvider = ({ children }: any) => {
  const [updateProject, setUpdateProjectContext] = useState<number>();
  const { projects, getAllProjects, isFetching } = useProjectsHook();

  useEffect(() => {
    getAllProjects();
  }, [updateProject]);

  const contextValue: ProjectsType = {
    projects: projects,
    updateProjects: setUpdateProjectContext,
    loading: isFetching,
  };

  return <ProjectContext.Provider value={contextValue}>{children}</ProjectContext.Provider>;
};

export const useProjectContext = () => useContext(ProjectContext);
