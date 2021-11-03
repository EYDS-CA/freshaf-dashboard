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
import Header from '../../components/generic/Header';
import { FormUtil } from '../../util/form.util';
import { useProjectContext } from '../../providers/Projects';

const useStyles = makeStyles((theme) => ({
  content: {},
}));

const ProjectPage = () => {
  const history = useHistory();
  const { projects } = useProjectContext();
  const visited = sessionStorage.getItem('visited');
  const [isModalOpen, setIsModalOpen] = useState(!visited);
  const classes = useStyles();
  const formRef = useRef<any>();
  const { projectId } = useParams<{ projectId: string }>();
  const { createProject, isFetching, getProjectById, project, updateProject } = useProjectsHook();

  const { answers, scores, schema, hasUnsavedChanges, setAnswer, saveChanges } = useFreshAf({
    project: project,
  });

  const handleSave = async () => {
    if (project) {
      await updateProject(
        {
          name: project.name,
          answers: answers,
          loggedInUser: 'test@test.com',
        },
        project.id,
      );
    }
  };

  const handleCreate = async (values) => {
    const result = await createProject(values.name);
    sessionStorage.setItem('visited', 'true');
    history.push(`/project/${result}`);
    setIsModalOpen(false);
  };

  // useEffect(() => {
  //   if (newProjectId) {
  //     history.push(AFRoutes.Project.replace(':projectId', newProjectId));
  //   }
  // }, [newProjectId]);

  useEffect(() => {
    if (projectId) {
      getProjectById(projectId);
    }
  }, [projectId]);

  return (
    <div>
      <Header />
      <Page isFetching={isFetching}>
        <Formik
          innerRef={formRef}
          initialValues={new FormUtil(project).build()}
          onSubmit={handleSave}
          enableReinitialize
        >
          {() => (
            <FormikForm>
              <Box display="flex" minHeight="calc(100vh - 58px)">
                <LeftBar openModal={setIsModalOpen} currentProject={project} scores={scores} />
                <Box className={classes.content}>
                  <ProjectForm
                    scores={scores}
                    schema={schema}
                    hasUnsavedChanges={hasUnsavedChanges}
                    setAnswer={setAnswer}
                    saveChanges={saveChanges}
                  />
                  ;
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
        projects={projects}
      />
    </div>
  );
};

export default ProjectPage;
