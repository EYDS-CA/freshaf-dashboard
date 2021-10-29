import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { AppraisalTitles, Medals } from "../constants/enums/enums";
import Appraisal from "./generic/Appraisal";
import { StyledButton } from "./generic/StyledButton";
import LeaderBoard from "./LeaderBoard";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: `${theme.spacing(4)}px 0`,
  },
  title: {
    fontWeight: "bold",
    fontSize: "20px",
    lineHeight: "23px",
    letterSpacing: "0.025rem",
    color: "#1D3150",
  },
  editButton: {
    fontSize: "14px",
    lineHeight: "16px",
    textAlign: "center",
    color: "#1D3150",
    opacity: 0.5,
    cursor: "pointer",
    "&:hover": {
      color: "#1423144",
    },
  },
  creatorText: {
    marginTop: theme.spacing(1),
    fontSize: "12px",
    lineHeight: "14px",
    color: "#1D3150",
  },
  creatorName: {
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "16px",
    letterSpacing: "0.025rem",
    color: "#1D3150",
  },
}));

function ProjectRating() {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography className={classes.title}>{"FreshAF Dashboard"}</Typography>
        {/* TODO: Add a conditional input field to update name */}
        <Typography className={classes.editButton} onClick={() => {}}>
          Edit
        </Typography>
      </Box>
      <Typography className={classes.creatorText}>Creator</Typography>
      <Typography className={classes.creatorName}>{"Sagar Roy"}</Typography>
      <Box marginY={3}>
        <Grid container spacing={1}>
          {[1, 2, 3, 4].map(() => {
            return (
              <Grid item xs={6}>
                <Appraisal
                  emoji={Medals.Gold}
                  title={AppraisalTitles.ProjectLevel}
                  value={"Gold"}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Typography className={classes.creatorText}>
        Last Updated: {""}
      </Typography>
      <Box marginY={2}>
        <StyledButton variant="save">Save</StyledButton>
      </Box>
      <LeaderBoard />
    </Box>
  );
}

export default ProjectRating;
