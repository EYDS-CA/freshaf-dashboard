import { Box, makeStyles } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { LeftBar, Page, Modal } from '../../components';
import { useGetProjectSummaries } from '../../hooks/projects';
import ProjectForm from './ProjectForm';
import { Formik, Form as FormikForm } from 'formik';
import useFreshAf from '../../hooks/freshaf';
import { useParams } from 'react-router';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  content: {},
}));

const ProjectPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const classes = useStyles();
  const formRef = useRef<any>();
  const { projects } = useGetProjectSummaries();
  const { projectId } = useParams<{ projectId: string }>();
  const { schema } = useFreshAf({ projectId });

  const handleSave = (values: any) => {
    console.log(JSON.stringify(values, null, 2));
  };

  const handleCreate = (name: string) => {
    console.log(`New Project - ${name}`);
    setIsModalOpen(false);
  };

  const handleSelect = () => {};

  return (
    <div>
      <Page isFetching={false}>
        <Formik innerRef={formRef} initialValues={schema?.questions || {}} onSubmit={handleSave}>
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
        onSelect={handleSelect}
        onCreate={handleCreate}
        onClose={!isModalOpen}
      />
    </div>
  );
};

export default ProjectPage;
