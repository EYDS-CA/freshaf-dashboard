import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Fab,
  FormControlLabel,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { titleCase } from 'title-case';
import useFreshAf, { categories, themes, Level, Theme } from '../../hooks/freshaf';
import { Save as SaveIcon } from '@material-ui/icons';
import { Field, useFormikContext } from 'formik';
import { RenderTextField } from '../../components';
import RenderCheckboxField from '../../components/RenderCheckboxField';

const useStyles = makeStyles((theme) => ({
  question: {
    flexGrow: 1,
  },
  root: {},
  progressBar: {
    margin: theme.spacing(1),
  },
  saveButton: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  header: {
    display: 'flex',
    position: 'sticky',
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
  categories: {
    marginTop: '50px',
    marginBottom: '50px',
  },
  theme: {
    fontSize: '18px',
    lineHeight: '23px',
    cursor: 'pointer',
  },
  selectedTheme: {
    fontSize: '18px',
    lineHeight: '23px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
}));

const icons: Record<Level, string> = {
  paper: '💩',
  bronze: '🥉',
  silver: '🥈',
  gold: '🥇',
};

const ProjectForm = () => {
  const classes = useStyles();
  const { values, setFieldValue } = useFormikContext();
  const { projectId } = useParams<{ projectId: string }>();
  const { scores, schema, hasUnsavedChanges, getAnswer, setAnswer, saveChanges } = useFreshAf({
    projectId,
  });

  const [currentTheme, setCurrentTheme] = useState<Theme>('environments');

  const handleCategoryChange = (theme: Theme) => {
    setCurrentTheme(theme);
  };

  return (
    <Box className={classes.root}>
      {!hasUnsavedChanges ? (
        <></>
      ) : (
        <Fab color="primary" className={classes.saveButton} onClick={() => saveChanges()}>
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
                {nextThreshold ? ` / ${nextThreshold})` : ')'}
              </Typography>
            </Box>
          );
        })}
      </Paper>
      <Grid container spacing={3} justifyContent="center" className={classes.categories}>
        {themes.map((theme, index) => {
          return (
            <Grid key={`${theme}${index}`} item>
              <Typography
                className={theme === currentTheme ? classes.selectedTheme : classes.theme}
                onClick={() => handleCategoryChange(theme)}
              >
                {titleCase(theme)}
              </Typography>
            </Grid>
          );
        })}
      </Grid>
      {!schema
        ? null
        : schema.questions.map((question) => {
            console.log(getAnswer(question.id).answer === 'yes');
            return (
              <Accordion className={classes.question} key={`${projectId}/${question.id}`}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <FormControlLabel
                    onClick={(event) => event.stopPropagation()}
                    onFocus={(event) => event.stopPropagation()}
                    control={
                      <Field
                        name={question.id}
                        component={RenderCheckboxField}
                        checked={getAnswer(question.id).answer === 'yes'}
                        onChange={(event: any) => {
                          setFieldValue(question.id, event.target.checked);
                          if (event.target.checked) {
                            setAnswer({
                              questionId: question.id,
                              answer: 'yes',
                            });
                          } else {
                            setAnswer({
                              questionId: question.id,
                              answer: 'no',
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
                    <Typography className={classes.description}>{question.description}</Typography>
                    <Field
                      label="Notes"
                      component={RenderTextField}
                      name={`${question.id}-notes`}
                    />
                  </Box>
                </AccordionDetails>
              </Accordion>
            );
          })}
    </Box>
  );
};

export default ProjectForm;
