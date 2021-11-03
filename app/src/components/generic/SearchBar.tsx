import { Box, makeStyles, Paper, TextField, CircularProgress, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withStyles } from '@material-ui/styles';
import { useProjectContext } from '../../providers/Projects';
import { Project } from '../../hooks/projects';
import { useHistory } from 'react-router';

const CssTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none',
      },
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0px',
    padding: '8px',
    paddingLeft: '40px',
    fontSize: '16px',
    backgroundColor: '#F0F1F3',
    borderRadius: '5px',
  },
  icon: {
    zIndex: 1,
    marginTop: '3px',
  },
  noborder: {
    textDecoration: 'none',
    backgroundColor: 'red',
    border: 'white',
  },
  popper: {
    marginTop: '-10px',
    overflow: 'auto',
    zIndex: 3000,
    maxHeight: '400px',
    marginLeft: '10px',
    marginRight: '10px',
  },
  wrapper: {
    marginLeft: '-40px',
    width: '100%',
  },
  popperText: {
    color: '#000',
    fontSize: '19px',
    lineHeight: '23px',
    padding: '10px',
  },
}));

// Custom Popper
const CustomPopper = function (props: any) {
  const classes = useStyles();
  return <Paper {...props} className={classes.popper} />;
};

function SearchBar() {
  const classes = useStyles();
  const { projects, loading } = useProjectContext();
  const history = useHistory();

  const handleChange = (value: Project) => {
    if (value.id) {
      history.push(`/project/${value.id}`);
    }
  };
  return (
    <Box display="flex" alignItems="center" ml="30px">
      {!loading ? (
        <SearchIcon className={classes.icon} />
      ) : (
        <CircularProgress className={classes.icon} size={20} />
      )}
      <Box className={classes.wrapper}>
        <Autocomplete
          disabled={loading}
          onChange={(e, value) => handleChange(value as Project)}
          options={projects}
          getOptionLabel={(option) => option.name}
          freeSolo
          disableClearable
          PaperComponent={CustomPopper}
          renderOption={(option) => (
            <Typography className={classes.popperText}>{option.name}</Typography>
          )}
          renderInput={(params) => (
            <CssTextField
              variant="outlined"
              {...params}
              inputProps={{
                ...params.inputProps,
                className: classes.root,
              }}
            />
          )}
          ListboxProps={{ style: { overflow: 'hidden' } }}
        />
      </Box>
    </Box>
  );
}

export default SearchBar;
