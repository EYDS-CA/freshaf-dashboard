import React from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { StyledButton } from '../../components/generic/StyledButton';
import ProjectRating from '../../components/ProjectRating';
import { ProjectSummary } from '../../hooks/projects';
import PropTypes from 'prop-types';

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

const LeftBar = (props) => {
  const { openModal } = props;
  const classes = useStyles();

  return (
    <Box className={classes.leftBar}>
      <StyledButton variant="create-project" onClick={() => openModal(true)}>
        <Icon path={mdiPlus} size={1} />
        <Typography className={classes.buttonText}>Create New Project</Typography>
      </StyledButton>
      <ProjectRating />
    </Box>
  );
};

LeftBar.propTypes = {
  projects: PropTypes.array,
  openModal: PropTypes.func,
};

export default LeftBar;
