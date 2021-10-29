import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { LeftBar, Page } from "../../components";
import Header from "../../components/generic/Header";
import { useGetProjectSummaries } from "../../hooks/projects";
import ProjectForm from "./ProjectForm";

const useStyles = makeStyles((theme) => ({
  content: {
    width: "100%",
  },
}));

const ProjectPage = () => {
  const classes = useStyles();
  const { projects } = useGetProjectSummaries();

  return (
    <div>
      <Header />
      <Page container={false} isFetching={false}>
        <Box display="flex" minHeight='calc(100vh - 58px)'>
          <LeftBar projects={projects || []} />
          <Box className={classes.content}>
            <ProjectForm />;
          </Box>
        </Box>
      </Page>
    </div>
  );
};

export default ProjectPage;
