import { AppBar, Box, Tab, Tabs, Typography, makeStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import { LeaderBoardTabs } from '../constants/enums/enums';
import { useFreshAfSchema } from '../hooks/freshaf';
import { useProjectsHook } from '../hooks/projectshook';
import LeaderBoardTable from './generic/LeaderBoardTable';
import { StyledButton } from './generic/StyledButton';
import { LeaderBoardRow, LeaderBoardUtil } from '../util/leaderboard.util';
import { useProjectContext } from '../providers/Projects';
import { useSchemaContext } from '../providers/Schema';

const useStyles = makeStyles((theme) => ({
  header: {
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '19px',
    letterSpacing: '0.025em',
    color: '#1D3150',
  },
  appbar: {
    background: 'none',
    boxShadow: 'none',
  },
  tab: {
    textTransform: 'none',
    color: '#1D3150',
    fontWeight: 'bold',
    fontSize: '16px',
  },
}));

const StyledTab = withStyles({
  indicator: {
    backgroundColor: '#1D3150',
  },
})(Tabs);

function LeaderBoard() {
  const [currentTab, setCurrentTab] = useState<LeaderBoardTabs>(LeaderBoardTabs.Project);
  const [leaderBoard, setLeaderBoard] = useState<Array<LeaderBoardRow>>();
  const classes = useStyles();
  const { projects } = useProjectContext();
  const schema = useSchemaContext();

  const handleChange = (e: React.ChangeEvent<{}>, newValue: LeaderBoardTabs) => {
    setCurrentTab(newValue);
  };

  useEffect(() => {
    if (schema) {
      const result = new LeaderBoardUtil(projects, schema).build();
      setLeaderBoard(result);
    }
  }, [projects, schema]);
  return (
    <Box marginY={2}>
      <Typography className={classes.header}>LEADERBOARD</Typography>
      <AppBar position="static" className={classes.appbar}>
        <StyledTab value={currentTab} onChange={handleChange}>
          <Tab
            className={classes.tab}
            value={LeaderBoardTabs.Project}
            label={LeaderBoardTabs.Project}
          />
          <Tab
            className={classes.tab}
            value={LeaderBoardTabs.Developer}
            label={LeaderBoardTabs.Developer}
          />
        </StyledTab>
      </AppBar>
      <Box marginY={2}>
        <LeaderBoardTable data={leaderBoard} />
      </Box>
      <Box display="flex" justifyContent="center">
        <StyledButton variant={'save'} style={{ background: 'none' }}>
          Show more
        </StyledButton>
      </Box>
    </Box>
  );
}

export default LeaderBoard;
