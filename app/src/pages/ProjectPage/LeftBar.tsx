import React from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { StyledButton } from '../../components/generic/StyledButton';
import ProjectRating from '../../components/ProjectRating';
import { Project, ProjectSummary } from '../../hooks/projects';
import PropTypes from 'prop-types';
import { Scores } from '../../hooks/freshaf';

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

type LeftBarProps = {
  openModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentProject: Project;
  scores: Scores;
};

const LeftBar = ({ openModal, currentProject, scores }: LeftBarProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.leftBar}>
      <StyledButton variant="create-project" onClick={() => openModal(true)}>
        <Icon path={mdiPlus} size={1} />
        <Typography className={classes.buttonText}>Create New Project</Typography>
      </StyledButton>
      <ProjectRating currentProject={currentProject} scores={scores} />
    </Box>
  );
};

// LeftBar.propTypes = {
//   projects: PropTypes.array,
//   openModal: PropTypes.func,
// };

export default LeftBar;
