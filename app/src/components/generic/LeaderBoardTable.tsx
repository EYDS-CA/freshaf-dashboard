import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { LeaderBoardRow } from '../../util/leaderboard.util';

const useStyles = makeStyles((theme) => ({
  row: {
    fontSize: '16px',
    lineHeight: '19px',
    color: '#000000',
  },
}));

interface LeaderBoardTableRow {
  name: string;
  value: number;
}

interface LeaderBoardTableProp {
  data: Array<LeaderBoardRow>;
}

function LeaderBoardTable({ data }: LeaderBoardTableProp) {
  const classes = useStyles();
  return (
    <Box>
      {data?.map((project) => {
        return (
          <Box
            key={project.projectName}
            display="flex"
            justifyContent="space-between"
            className={classes.row}
          >
            <Typography>{project.projectName}</Typography>
            <Typography>{project.score}</Typography>
          </Box>
        );
      })}
    </Box>
  );
}

export default LeaderBoardTable;
