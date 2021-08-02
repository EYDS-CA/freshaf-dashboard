import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import FrameworkTable from './FrameworkTable';

const useStyles = makeStyles((theme) => ({
  leftBar: {
    width: "300px",
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column"
  },
  content: {
    width: "100%",
    padding: theme.spacing(1)
  }
}))

function App() {
  const classes = useStyles();
  return (
    <Box display="flex">
      <Box className={classes.leftBar}>
        <Typography>
          Projects
        </Typography>
        <Button>Court Interpreter Scheduling</Button>
        <Button>HCAP</Button>
        <Button>ETS</Button>
      </Box>
      <Box className={classes.content}>
        <FrameworkTable />
      </Box>
    </Box>
  );
}

export default App;
