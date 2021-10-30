import useAxios from 'axios-hooks';
import React from 'react';

function useGetProjects() {
  const [{ data, error, loading }, refetch] = useAxios(
    'http://localhost:4000/api/v1/project/mock/data',
  );
  return {
    projectData: data,
    projectError: error,
    projectLoading: loading,
    refetchProjects: refetch,
  };
}

export default useGetProjects;
