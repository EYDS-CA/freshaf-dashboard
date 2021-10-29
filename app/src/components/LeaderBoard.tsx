import { AppBar, Box, Tab, Tabs, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { LeaderBoardTabs } from "../constants/enums/enums";
import LeaderBoardTable from "./generic/LeaderBoardTable";
import { StyledButton } from "./generic/StyledButton";

const useStyles = makeStyles((theme) => ({
  header: {
    fontWeight: "bold",
    fontSize: "16px",
    lineHeight: "19px",
    letterSpacing: "0.025em",
    color: "#1D3150",
  },
  appbar: {
    background: "none",
    boxShadow: "none",
  },
  tab: {
    textTransform: "none",
    color: "#1D3150",
    fontWeight: "bold",
    fontSize: "16px",
  },
}));

const StyledTab = withStyles({
  indicator: {
    backgroundColor: "#1D3150",
  },
})(Tabs);

function LeaderBoard() {
  const [currentTab, setCurrentTab] = useState<LeaderBoardTabs>(
    LeaderBoardTabs.Project
  );
  const classes = useStyles();

  const handleChange = (
    e: React.ChangeEvent<{}>,
    newValue: LeaderBoardTabs
  ) => {
    setCurrentTab(newValue);
  };
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
        <LeaderBoardTable data={[{ name: "LTC", value: 1200 }]} />
      </Box>
      <Box display='flex' justifyContent='center'>
        <StyledButton variant={'save'} style={{background: 'none'}}>
          Show more
        </StyledButton>
      </Box>
    </Box>
  );
}

export default LeaderBoard;
