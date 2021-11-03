import { Box, ButtonBase, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { Project } from '../../hooks/projects';
import { useHistory, useParams } from 'react-router';
import { AFRoutes } from '../../routes';
import { useFormikContext } from 'formik';

const useStyles = makeStyles((theme) => ({
  row: {
    fontSize: '16px',
    lineHeight: '19px',
    color: '#000000',
  },
  button: {
    width: '100%',
  },
  selected: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: '10px',
  },
}));

interface LeaderBoardTableRow {
  name: string;
  value: number;
}

interface LeaderBoardTableProp {
  data: Array<LeaderBoardTableRow>;
}

function LeaderBoardTable(props) {
  const { projectId } = useParams<{ projectId: string }>();
  const history = useHistory();
  const { resetForm } = useFormikContext();
  const { projects } = props;
  const classes = useStyles();

  const handleLoad = async (id: string) => {
    await resetForm();
    history.push(AFRoutes.Project.replace(':projectId', id));
  };

  return (
    <Box>
      {projects?.map((row: Project) => {
        return (
          <Box key={row.id}>
            <ButtonBase
              onClick={() => handleLoad(row.id)}
              className={projectId === row.id ? classes.selected : classes.button}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                className={classes.row}
                width="100%"
                px={7}
              >
                <Typography>{row.name}</Typography>
                <Typography>500</Typography>
              </Box>
            </ButtonBase>
          </Box>
        );
      })}
    </Box>
  );
}

LeaderBoardTable.propTypes = {
  projects: PropTypes.array,
};

export default LeaderBoardTable;
