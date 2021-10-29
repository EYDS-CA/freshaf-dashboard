import React from 'react';
import { AppBar, Box, Typography, makeStyles } from '@material-ui/core';
import { mdiEmoticonCoolOutline, mdiLogout } from '@mdi/js';
import Icon from '@mdi/react';
import SearchBar from './SearchBar';
import { StyledButton } from './StyledButton';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: 'white',
    boxShadow: '0px 4px 5px rgba(123, 130, 155, 0.15)',
    color: '#1D3150',
    padding: `0 ${theme.spacing(3)}px`,
  },
  appBarHeaderText: {
    fontSize: '24px',
    lineHeight: '28px',
    letterSpacing: '0.04rem',
    fontWeight: 500,
    marginLeft: '15px',
  },
  logOut: {
    marginLeft: '5px',
  },
}));

function Header() {
  const classes = useStyles();
  return (
    <Box>
      <AppBar position="static" className={classes.appBar}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Icon path={mdiEmoticonCoolOutline} size={1.3} />
            <Typography className={classes.appBarHeaderText}>FreshAF Dashboard</Typography>
          </Box>
          <Box width="60%">
            <SearchBar />
          </Box>
          <StyledButton variant="log-out" onClick={() => {}}>
            <Icon path={mdiLogout} size={1} />
            <Typography className={classes.logOut}>Log out</Typography>
          </StyledButton>
        </Box>
      </AppBar>
    </Box>
  );
}

export default Header;
