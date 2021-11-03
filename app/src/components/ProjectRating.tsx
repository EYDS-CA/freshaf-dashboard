import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { StyledButton } from './generic/StyledButton';
import LeaderBoard from './LeaderBoard';
import { useFormikContext } from 'formik';
import { Project } from '../hooks/projects';
import { useSchemaContext } from '../providers/Schema';
import { Scores } from '../hooks/freshaf';
import { ProjectLegend } from '../util/projectLegend.util';
import Appraisal, { AppraisalProp } from './generic/Appraisal';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: `${theme.spacing(4)}px 0`,
  },
  title: {
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '23px',
    letterSpacing: '0.025rem',
    color: '#1D3150',
  },
  editButton: {
    fontSize: '14px',
    lineHeight: '16px',
    textAlign: 'center',
    color: '#1D3150',
    opacity: 0.5,
    cursor: 'pointer',
    '&:hover': {
      color: '#1423144',
    },
  },
  creatorText: {
    marginTop: theme.spacing(1),
    fontSize: '12px',
    lineHeight: '14px',
    color: '#1D3150',
  },
  creatorName: {
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '0.025rem',
    color: '#1D3150',
  },
}));

function ProjectRating({ currentProject, scores }: { currentProject: Project; scores: Scores }) {
  const classes = useStyles();
  const [rating, setRating] = useState<AppraisalProp[]>([]);
  const { submitForm, values } = useFormikContext();
  const schema = useSchemaContext();
  useEffect(() => {
    if (scores) {
      setRating(new ProjectLegend(scores).build());
    }
  }, [scores]);
  return (
    <Box className={classes.container}>
      {currentProject && (
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography className={classes.title}>{currentProject?.name}</Typography>
            {/* TODO: Add a conditional input field to update name */}
            <Typography className={classes.editButton} onClick={() => {}}>
              Edit
            </Typography>
          </Box>
          <Typography className={classes.creatorText}>Creator</Typography>
          <Typography className={classes.creatorName}>
            {currentProject?.creator || 'N/A'}
          </Typography>
          <Box marginY={3}>
            <Grid container spacing={1}>
              {rating?.map((element) => {
                return (
                  <Grid key={element.title} item xs={6}>
                    <Appraisal emoji={element.emoji} title={element.title} value={element.value} />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
          <Typography className={classes.creatorText}>Last Updated: {''}</Typography>
          <Box marginY={2} display="flex" justifyContent="center">
            <StyledButton variant="save" onClick={submitForm}>
              Save
            </StyledButton>
          </Box>
        </Box>
      )}
      <LeaderBoard />
    </Box>
  );
}

export default ProjectRating;
