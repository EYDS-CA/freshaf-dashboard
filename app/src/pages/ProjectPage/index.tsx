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

  const testSchema = {
    questions: [
      {
        id: 'app-runs-locally',
        summary: 'App runs end-to-end locally',
        points: {
          velocity: 5,
        },
        description:
          '"End-to-end" here means the frontend, backend, and database can be\neasily spun up so anyone can test the app locally. This can be achieved quite\neasily using docker-compose.\n',
        benefits: [
          'Increases iteration speed. Pushing code to a dev environment in order to test it is slow and can disrupt other developers.',
          "Improves onboarding. It's much easier to learn a code base if you can run it locally.",
        ],
      },
      {
        id: 'pr-linting',
        summary: 'Automatic linting',
        points: {
          velocity: 2,
        },
        description:
          "Something automatically enforces linting rules. \nPossibly a linting check on PRs. \nPossibly a pre-commit hook so you can't commit unlinted code.\n",
        benefits: [
          'Tidier code is easier to read.',
          'Forces you to pick a codestyle, which reduces arguments.',
        ],
      },
    ],
  };

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
          {({}) => (
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
