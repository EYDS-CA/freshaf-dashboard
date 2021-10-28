import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '..';
import { CssBaseline } from '@material-ui/core';

const ThemeWrapper = (props: any) => {
  const { children } = props;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

ThemeWrapper.propTypes = {
  children: PropTypes.any.isRequired,
};

export default ThemeWrapper;
