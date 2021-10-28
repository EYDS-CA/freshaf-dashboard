import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  Fab,
  FormControlLabel,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import { useParams } from "react-router-dom";
import { titleCase } from "title-case";
import useFreshAf, { categories, Level } from "../../hooks/freshaf";
import { Save as SaveIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  question: {
    flexGrow: 1,
  },
  root: {},
  progressBar: {
    margin: theme.spacing(1),
  },
  saveButton: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  header: {
    display: "flex",
    position: "sticky",
    top: 0,
    zIndex: 100,
    padding: theme.spacing(1),
  },
  headerItem: {
    margin: theme.spacing(1),
    flexGrow: 1,
  },
  description: {
    marginBottom: theme.spacing(2),
  },
}));

const icons: Record<Level, string> = {
  paper: "💩",
  bronze: "🥉",
  silver: "🥈",
  gold: "🥇",
};

const ProjectForm = () => {
  const classes = useStyles();
  const { projectId } = useParams<{ projectId: string }>();
  const {
    scores,
    schema,
    hasUnsavedChanges,
    getAnswer,
    setAnswer,
    saveChanges,
  } = useFreshAf({ projectId });

  return (
    <Box className={classes.root}>
      {!hasUnsavedChanges ? (
        <></>
      ) : (
        <Fab
          color="primary"
          className={classes.saveButton}
          onClick={() => saveChanges()}
        >
          <SaveIcon />
        </Fab>
      )}
      <Paper className={classes.header}>
        {categories.map((category) => {
          const { total, level, nextThreshold } = scores[category];
          return (
            <Box className={classes.headerItem} key={category}>
              <Typography variant="h6">
                {icons[level]} {titleCase(category)} ({total}
                {nextThreshold ? ` / ${nextThreshold})` : ")"}
              </Typography>
            </Box>
          );
        })}
      </Paper>
      {!schema
        ? null
        : schema.questions.map((question) => {
            console.log(getAnswer(question.id).answer === "yes");
            return (
              <Accordion
                className={classes.question}
                key={`${projectId}/${question.id}`}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <FormControlLabel
                    onClick={(event) => event.stopPropagation()}
                    onFocus={(event) => event.stopPropagation()}
                    control={
                      <Checkbox
                        color="primary"
                        checked={getAnswer(question.id).answer === "yes"}
                        onChange={(event) => {
                          if (event.target.checked) {
                            setAnswer({
                              questionId: question.id,
                              answer: "yes",
                            });
                          } else {
                            setAnswer({
                              questionId: question.id,
                              answer: "no",
                            });
                          }
                        }}
                      />
                    }
                    label={question.summary}
                  />
                </AccordionSummary>
                <AccordionDetails>
                  <Box display="flex" flexDirection="column">
                    <Typography className={classes.description}>
                      {question.description}
                    </Typography>
                    <TextField label="Notes" />
                  </Box>
                </AccordionDetails>
              </Accordion>
            );
          })}
    </Box>
  );
};

export default ProjectForm;
