import React, { createContext } from 'react';
import useGetProjects from '../hooks/useGetProjects';

const initialState = {
  projectData: [],
  projectError: null,
  projectLoading: true,
  refetchProjects: () => {},
};

export const ProjectContext = createContext(initialState);

export const ProjectProvider = ({ children }: any) => {
  const { projectData, projectError, projectLoading, refetchProjects } = useGetProjects();

  const contextValue = {
    projectData,
    projectError,
    projectLoading,
    refetchProjects,
  };

  return <ProjectContext.Provider value={contextValue}>{children}</ProjectContext.Provider>;
};
