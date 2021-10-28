import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
    flex: 1,
    position: 'fixed',
    textAlign: 'center',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgb(0,0,0,0.2)',
    zIndex: 2000,
  },
  spinner: {
    position: 'fixed',
    top: '50vh',
  },
}));

const Overlay = (props: any) => {
  const classes = useStyles();

  const { children, loading } = props;

  return (
    <React.Fragment>
      {children && children}
      {loading && (
        <Box className={classes.container}>
          <CircularProgress className={classes.spinner} />
        </Box>
      )}
    </React.Fragment>
  );
};

Overlay.defaultProps = {
  loading: false,
};

Overlay.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.any,
};

export default Overlay;
