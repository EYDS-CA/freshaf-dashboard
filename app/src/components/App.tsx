import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useGetProjectSummaries } from '../hooks/projects';
import LeftBar from './LeftBar';
import ProjectPage from './ProjectPage';

const useStyles = makeStyles((theme) => ({
  content: {
    width: "100%",
    padding: theme.spacing(1)
  }
}))

function App() {
  const classes = useStyles();
  const { projects } = useGetProjectSummaries();

  return (
    <Box display="flex">
      { projects ? <LeftBar projects={projects} /> : <></> }
      <Box className={classes.content}>
        <Switch>
          <Route path="/project/:projectId">
            <ProjectPage />
          </Route>
          <Route path="/">
            { projects && projects.length > 0 
              ? <Redirect to={`/project/${projects[0].id}`}/>
              : <></>}
          </Route>
        </Switch>
      </Box>
    </Box>
  );
}

export default App;
