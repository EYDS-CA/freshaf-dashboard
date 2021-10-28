import React, { Suspense, lazy } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Route, Switch } from "react-router-dom";

export const AFRoutes = Object.freeze({
  Root: "/",
  Project: "/pages/project/:projectId",
});

const ProjectPage = lazy(() => import("./pages/ProjectPage/ProjectPage"));

/**
 * All available routes.
 */
const AllRoutes = () => (
  // TODO: Update root route to login page
  <Switch>
    <Route exact path={AFRoutes.Root} component={ProjectPage} />
    <Route exact path={AFRoutes.Project} component={ProjectPage} />
  </Switch>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<LinearProgress />}>
      <AllRoutes />
    </Suspense>
  );
};

export { AppRoutes as Routes };
