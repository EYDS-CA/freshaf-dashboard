import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { ProjectSummary } from "../../hooks/projects";

const useStyles = makeStyles((theme) => ({
  leftBar: {
    width: "300px",
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column"
  }
}))

export default function LeftBar({ projects }: { projects: ProjectSummary[] }) {
  const classes = useStyles();
  const history = useHistory();

  return (<Box className={classes.leftBar}>
      <Typography>
        Projects
      </Typography>
      {projects?.map((project) => {
        return <Button 
          onClick={() => history.push(`/project/${project.id}`)} 
          key={project.id}>{project.name}</Button>
      })}
    </Box>)
}
