import { Box, Button, Link, makeStyles, Typography } from "@material-ui/core";
import { ProjectSummary } from "../hooks/projects";

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
  
  return (<Box className={classes.leftBar}>
      <Typography>
        Projects
      </Typography>
      {projects?.map((project) => {
        return <Link href={`/project/${project.id}`}><Button>{project.name}</Button></Link>
      })}
    </Box>)
}
