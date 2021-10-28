import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { LeftBar, Page } from "../../components";
import ProjectForm from "./ProjectForm";

const useStyles = makeStyles((theme) => ({
  content: {
    width: "100%",
    padding: theme.spacing(1),
  },
}));

const ProjectPage = () => {
  const classes = useStyles();
  
  return (
    <div>
      <Page isFetching={false}>
        <Box display="flex">
          <LeftBar projects={[]} />
          <Box className={classes.content}>
            <ProjectForm />;
          </Box>
        </Box>
      </Page>
    </div>
  );
};

export default ProjectPage;
