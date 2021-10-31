import { Box, makeStyles } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { LeftBar, Page, Modal } from '../../components';
import { useGetProjectSummaries } from '../../hooks/projects';
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
  const classes = useStyles();
  const formRef = useRef<any>();
  const { projectId } = useParams<{ projectId: string }>();
  const { schema } = useFreshAf({ projectId });
  const {
    createProject,
    projectId: newProjectId,
    isFetching,
    getProjectById,
    project,
    projects,
  } = useProjectsHook();

  const handleSave = (values: any) => {
    console.log(JSON.stringify(values, null, 2));
  };

  const handleCreate = (values) => {
    createProject(values.name);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (newProjectId) {
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
          initialValues={project?.answers || {}}
          onSubmit={handleSave}
          enableReinitialize
        >
          {() => (
            <FormikForm>
              <Box display="flex" minHeight="calc(100vh - 58px)">
                <LeftBar openModal={setIsModalOpen} projects={projects || []} />
                <Box className={classes.content}>
                  <ProjectForm />;
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
