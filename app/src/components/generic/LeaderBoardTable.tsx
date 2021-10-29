import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  row: {
    fontSize: "16px",
    lineHeight: "19px",
    color: "#000000",
  },
}));

interface LeaderBoardTableRow {
  name: string;
  value: number;
}

interface LeaderBoardTableProp {
  data: Array<LeaderBoardTableRow>;
}

function LeaderBoardTable({ data }: LeaderBoardTableProp) {
    const classes = useStyles()
  return (
    <Box>
      {data?.map((row) => {
        return (
          <Box display="flex" justifyContent="space-between" className={classes.row}>
            <Typography>{row.name}</Typography>
            <Typography>{row.value}</Typography>
          </Box>
        );
      })}
    </Box>
  );
}

export default LeaderBoardTable;
