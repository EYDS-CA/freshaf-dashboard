import { useState } from 'react';
import { ProjectReqModel } from '../models';

import { AxiosPublic } from './axios';
import { Answer, Project } from './projects';

export const useProjectsHook = () => {
  const [isFetching, setFetching] = useState(false);
  const [project, setProject] = useState<any>();
  const [answers, setAnswers] = useState<any>();
  const [projectId, setProjectId] = useState<any>();
  const [projects, setProjects] = useState<Project[]>();

  const getProjectById = async (projectId: string) => {
    try {
      setFetching(true);
      const response: any = await AxiosPublic.get(`/project/${projectId}`);
      setProject(response);
      const answerObject = {};
      project.answers.forEach((answer: any) => {
        answerObject[answer.id] = answer.answer;
      });
      setAnswers(answerObject);
      setFetching(false);
      return response;
    } catch (e) {
      setFetching(false);
    }
  };

  const createProject = async (name: string) => {
    try {
      setFetching(true);
      const response = await AxiosPublic.post('/project', {
        name: name,
        answers: [
          {
            answer: 'ans2',
            id: '123',
          },
        ],
        loggedInUser: 'kushal@freshworks.io',
      });
      setProjectId(response);
      setFetching(false);
      return response;
    } catch (e) {
      setFetching(false);
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
    }
  };

  const updateProject = async (values: any) => {
    try {
      let answers = await Object.getOwnPropertyNames(values).map((key) => {
        return { answer: values[key], id: key };
      });
      answers = answers.filter((answer) => typeof answer.answer === 'boolean');
      project.answers = [...answers];
      project.loggedInUser = 'kushal@freshworks.io';
      const toUpdate = new ProjectReqModel(project);
      setFetching(true);
      const response = await AxiosPublic.put(`/project/${project.id}`, toUpdate);
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
    answers,
  };
};
