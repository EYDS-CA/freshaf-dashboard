import { Box, makeStyles } from '@material-ui/core';
import React, { useEffect, useRef } from 'react';
import { LeftBar, Page } from '../../components';
import { useGetProjectSummaries } from '../../hooks/projects';
import ProjectForm from './ProjectForm';
import { Formik, Form as FormikForm } from 'formik';
import useFreshAf from '../../hooks/freshaf';
import { useParams } from 'react-router';

const useStyles = makeStyles((theme) => ({
  content: {},
}));

const ProjectPage = () => {
  const classes = useStyles();
  const formRef = useRef<any>();
  const { projects } = useGetProjectSummaries();
  const { projectId } = useParams<{ projectId: string }>();
  const { schema } = useFreshAf({ projectId });

  const handleSubmit = () => {};

  useEffect(() => {
    if (schema) {
      console.log(JSON.stringify(schema, null, 2));
    }
  }, [schema]);

  return (
    <div>
      <Page isFetching={false}>
        <Formik
          innerRef={formRef}
          initialValues={schema?.questions || {}}
          // validationSchema={{}}
          onSubmit={handleSubmit}
        >
          {() => (
            <FormikForm>
              <Box display="flex" minHeight="calc(100vh - 58px)">
                <LeftBar projects={projects || []} />
                <Box className={classes.content}>
                  <ProjectForm />;
                </Box>
              </Box>
            </FormikForm>
          )}
        </Formik>
      </Page>
    </div>
  );
};

export default ProjectPage;
