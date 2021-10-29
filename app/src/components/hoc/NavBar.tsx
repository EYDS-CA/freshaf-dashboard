/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Theme, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import clsx from 'clsx';

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.common.white,
  },
  siteTitle: {
    padding: '0',
    fontSize: '1.75rem !important',
  },
  menuButton: {
    color: `${theme.palette.text.primary}80`,
  },
  active: {
    fontWeight: 900,
  },
  listItems: {
    flexGrow: 1,
  },
  navBorder: {
    boxShadow: '0',
  },
  staticHomeBar: {
    flexGrow: 1,
    color: theme.palette.common.white,
    boxShadow: '0',
    backgroundColor: theme.palette.secondary.main,
  },
  staticHomeText: {
    color: theme.palette.common.white,
  },
  avatar: {
    backgroundColor: theme.palette.text.primary,
    cursor: 'pointer',
    fontSize: '1rem',
  },
  linkSpacing: {
    marginRight: '0.875rem',
    fontSize: '1rem',
  },
  divider: {
    backgroundColor: '#000',
    marginTop: '1.25rem',
    marginBottom: '1.25rem',
  },
  staticDivider: {
    backgroundColor: '#fff',
    marginTop: '1.25rem',
    marginBottom: '1.25rem',
  },
  loginButton: {
    color: theme.palette.primary.main,
    fontSize: '1.1rem',
  },
});

function DenseAppBar(props: any) {
  const { classes, links, loggedIn } = props;
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(typeof window !== 'undefined' ? window.location.pathname : '');
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit" className={classes.navBorder} elevation={0}>
        <Container maxWidth="lg">
          <Toolbar disableGutters={true}>
            <Typography
              variant="h3"
              color="inherit"
              className={clsx(classes.linkSpacing, classes.siteTitle)}
            >
              FreshWorks Application Framework
            </Typography>
            <div className={classes.listItems}>
              <div>
                {links.map(
                  (
                    link: {
                      title: string;
                      value: string;
                      visible: boolean;
                      onClick: any;
                    },
                    i: string,
                  ) => {
                    if (link.visible || typeof link.visible !== 'boolean') {
                      return (
                        <React.Fragment key={i}>
                          {link.onClick ? (
                            <Button
                              color="inherit"
                              onClick={() => link.onClick()}
                              className={clsx(
                                classes.menuButton,
                                link.value === currentPath && classes.active,
                                classes.linkSpacing,
                              )}
                            >
                              {link.title}
                            </Button>
                          ) : (
                            <Button
                              color="inherit"
                              href={link.value}
                              className={clsx(
                                classes.menuButton,
                                link.value === currentPath && classes.active,
                                classes.linkSpacing,
                              )}
                            >
                              {link.title}
                            </Button>
                          )}
                        </React.Fragment>
                      );
                    }
                  },
                )}
              </div>
            </div>
            {/* TODO: Connect Login Workflow */}
            <Button className={classes.loginButton} onClick={() => {}}>
              {loggedIn ? 'Log Out' : 'Login'}
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

DenseAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  links: PropTypes.arrayOf(PropTypes.any),
  loggedIn: PropTypes.bool.isRequired,
  isStaticHome: PropTypes.bool,
};

export default withStyles(styles)(DenseAppBar);
