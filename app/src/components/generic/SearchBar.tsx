import { Box, makeStyles, Paper, TextField } from "@material-ui/core";
import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { withStyles } from "@material-ui/styles";

const CssTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "none",
      },
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0px",
    padding: "8px",
    paddingLeft: "40px",
    fontSize: "16px",
    backgroundColor: "#F0F1F3",
    borderRadius: "5px",
  },
  icon: {
    zIndex: 1,
    marginTop: "3px",
  },
  noborder: {
    textDecoration: "none",
    backgroundColor: "red",
    border: "white",
  },
  popper: {
    marginTop: "-10px",
    zIndex: 3000,
    overflowY: "hidden",
    maxHeight: "300px",
    marginLeft: "10px",
    marginRight: "10px",
  },
  wrapper: {
    marginLeft: "-40px",
    width: "100%",
  },
}));

//Custom Popper
const CustomPopper = function (props: any) {
  const classes = useStyles();
  return <Paper {...props} className={classes.popper} />;
};

function SearchBar() {
  const classes = useStyles();
  const data = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
  const defaultProps = {
    options: data,
    getOptionLabel: (option: any) => option,
  };
  return (
    <Box display="flex" alignItems="center" ml="30px">
      <SearchIcon className={classes.icon} />
      <Box className={classes.wrapper}>
        <Autocomplete
          onChange={(e, value) => console.log(value)}
          {...defaultProps}
          freeSolo
          disableClearable
          PaperComponent={CustomPopper}
          renderOption={(option) => <h1>{option}</h1>}
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
          ListboxProps={{ style: { overflow: "hidden" } }}
        />
      </Box>
    </Box>
  );
}

export default SearchBar;
