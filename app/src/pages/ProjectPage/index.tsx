import { Box, makeStyles } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { LeftBar, Page, Modal } from '../../components';
import { Project, useGetProjectSummaries } from '../../hooks/projects';
import ProjectForm from './ProjectForm';
import { Formik, Form as FormikForm } from 'formik';
import useFreshAf from '../../hooks/freshaf';
import { useHistory, useParams } from 'react-router';
import { useProjectsHook } from '../../hooks/projectshook';
import { AFRoutes } from '../../routes';

const useStyles = makeStyles((theme) => ({
  content: {},
}));

const ProjectPage = () => {
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>();
  const classes = useStyles();
  const formRef = useRef<any>();
  const { projectId } = useParams<{ projectId: string }>();
  const {
    createProject,
    projectId: newProjectId,
    isFetching,
    getProjectById,
    project,
    projects: apiProjects,
    getAllProjects,
    updateProject,
    answers,
  } = useProjectsHook();

  const handleSave = () => {
    const { values } = formRef.current;
    updateProject(values);
  };

  const handleCreate = (values) => {
    createProject(values.name);
    setIsModalOpen(false);
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  useEffect(() => {
    if (apiProjects) {
      setProjects(apiProjects);
    }
  }, [apiProjects]);

  useEffect(() => {
    if (newProjectId) {
      getAllProjects();
      history.push(AFRoutes.Project.replace(':projectId', newProjectId));
    }
  }, [newProjectId]);

  useEffect(() => {
    if (projectId) {
      getProjectById(projectId);
    }
  }, [projectId]);

  return (
    <div>
      <Page isFetching={isFetching}>
        <Formik
          innerRef={formRef}
          initialValues={answers || {}}
          onSubmit={handleSave}
          enableReinitialize
        >
          {() => (
            <FormikForm>
              <Box display="flex" minHeight="calc(100vh - 58px)">
                <LeftBar
                  openModal={setIsModalOpen}
                  projects={projects || []}
                  project={project || {}}
                />
                <Box className={classes.content}>
                  <ProjectForm project={project} />;
                </Box>
              </Box>
            </FormikForm>
          )}
        </Formik>
      </Page>
      <Modal
        isVisible={isModalOpen}
        titleText={`Create or Select a Project`}
        onSelect={setIsModalOpen}
        onCreate={handleCreate}
        onClose={!isModalOpen}
      />
    </div>
  );
};

export default ProjectPage;
