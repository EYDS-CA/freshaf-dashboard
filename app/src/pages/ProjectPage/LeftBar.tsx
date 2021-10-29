import React from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { useHistory } from 'react-router-dom';
import { StyledButton } from '../../components/generic/StyledButton';
import ProjectRating from '../../components/ProjectRating';
import { ProjectSummary } from '../../hooks/projects';

const useStyles = makeStyles((theme) => ({
  leftBar: {
    width: '400px',
    padding: theme.spacing(3),
    backgroundColor: '#F0F1F3',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  buttonText: {
    marginLeft: theme.spacing(1),
  },
}));

export default function LeftBar({ projects }: { projects: ProjectSummary[] }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box className={classes.leftBar}>
      <StyledButton variant="create-project" onClick={() => {}}>
        <Icon path={mdiPlus} size={1} />
        <Typography className={classes.buttonText}>Create New Project</Typography>
      </StyledButton>
      <ProjectRating />
    </Box>
  );
}
