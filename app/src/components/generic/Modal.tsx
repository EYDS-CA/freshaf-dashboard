import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Grid, makeStyles } from '@material-ui/core';
import { Field, Formik, Form as FormikForm } from 'formik';
import { RenderTextField } from '..';
import { NewProjectSchema } from '../../constants/validation';

const useStyles = makeStyles((theme) => ({
  divider: {
    backgroundColor: theme.palette.primary.main,
    height: '2px',
  },
  button: {
    width: '100%',
    padding: '12px 16px',
  },
  dialog: {
    padding: '80px 60px',
  },
  titleText: {
    color: '#1D3150',
    fontSize: '1.75rem',
    fontWeight: 700,
  },
}));

const Modal = (props: any) => {
  const classes = useStyles();
  const formRef = useRef<any>();
  const { isVisible, titleText, onSelect, onCreate, onClose } = props;

  return (
    <Dialog open={isVisible}>
      <Box className={classes.dialog}>
        <Box mb="32px">
          <Typography className={classes.titleText}>{titleText}</Typography>
        </Box>
        <Formik
          innerRef={formRef}
          initialValues={{ name: '' }}
          validationSchema={NewProjectSchema}
          onSubmit={onCreate}
        >
          {({ submitForm }) => (
            <FormikForm>
              <Box pt={2} width="100%">
                <DialogContentText>
                  <Field component={RenderTextField} name="name" label="Project Name" />
                </DialogContentText>
              </Box>
              <DialogActions>
                <Grid container direction="column" spacing={2}>
                  <Grid item xs={12}>
                    <Button variant="contained" onClick={submitForm} className={classes.button}>
                      Create
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      onClick={() => onSelect(false)}
                      className={classes.button}
                    >
                      Select an Existing Project
                    </Button>
                  </Grid>
                </Grid>
              </DialogActions>
            </FormikForm>
          )}
        </Formik>
      </Box>
    </Dialog>
  );
};

Modal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  titleText: PropTypes.string.isRequired,
  onSelect: PropTypes.any,
  onCreate: PropTypes.any,
  onClose: PropTypes.bool,
};

export default Modal;
