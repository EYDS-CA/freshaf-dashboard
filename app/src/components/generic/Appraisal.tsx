import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { AppraisalTitles, Medals } from '../../constants/enums/enums';

const useStyles = makeStyles((theme) => ({
  container: {
    border: '1px solid #ccc',
    borderRadius: '7px',
    padding: theme.spacing(1),
  },
  emoji: {
    fontSize: '20px',
  },
  value: {
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '21px',
    letterSpacing: '0.025em',
    color: '#1D3150',
  },
  title: {
    fontSize: '12px',
    lineHeight: '14px',
    textAlign: 'right',
    letterSpacing: '0.025em',
    color: '#7B829B',
  },
}));

interface AppraisalProp {
  emoji: Medals;
  value: string | number;
  title: AppraisalTitles;
}

function Appraisal({ emoji, value, title }: AppraisalProp) {
  const classes = useStyles();
  return (
    <Box display="flex" flexGrow={1} className={classes.container}>
      <Typography className={classes.emoji}>🥇</Typography>
      <Box ml={1}>
        <Typography className={classes.value}>Gold</Typography>
        <Typography className={classes.title}>Project-level</Typography>
      </Box>
    </Box>
  );
}

export default Appraisal;
