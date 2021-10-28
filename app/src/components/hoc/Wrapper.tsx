import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Overlay } from "..";
import { Box, Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  body: {},
}));

const Wrapper = ({
  children,
  isFetching,
  isBusy,
  navBar,
  container = true,
  classes,
}: {
  children: React.ReactElement;
  isFetching?: boolean;
  isBusy?: boolean;
  navBar: React.ReactElement;
  container?: boolean;
  classes?: any;
}): React.ReactElement => {
  const myClasses = useStyles();
  return (
    <div>
      {navBar}
      <Box
        className={clsx(myClasses.body, classes?.wrapperBody, "wrapper")}
        pb={4}
      >
        {container ? (
          <Container maxWidth="lg" className={"root-container"}>
            {children}
          </Container>
        ) : (
          <>{children}</>
        )}
      </Box>

      <Overlay loading={isBusy} />
    </div>
  );
};

Wrapper.defaultProps = {
  isBusy: false,
  isFetching: false,
  classes: {},
};

Wrapper.propTypes = {
  children: PropTypes.object.isRequired,
  container: PropTypes.bool,
  isFetching: PropTypes.bool,
  isBusy: PropTypes.bool,
  navBar: PropTypes.object.isRequired,
  classes: PropTypes.object,
};

export default Wrapper;
