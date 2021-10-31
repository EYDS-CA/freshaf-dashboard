import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { LinearProgress } from '@material-ui/core';
import { NavBar, Wrapper } from '..';

const Page = (props: any) => {
  const { children, isFetching, container, isBusy, wrapperClasses, showNavBar } = props;
  const content = isFetching ? <LinearProgress /> : children;

  const navBar: React.ReactElement = (
    <NavBar
      links={[]}
      // TODO: Integrate with auth
      loggedIn={true}
    />
  );

  return (
    <Wrapper
      isFetching={isFetching}
      isBusy={isBusy}
      navBar={showNavBar ? navBar : <></>}
      container={container}
      classes={wrapperClasses}
    >
      {content}
    </Wrapper>
  );
};

Page.defaultProps = {
  isFetching: false,
  isBusy: false,
  wrapperClasses: {},
};

Page.propTypes = {
  children: PropTypes.any.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isBusy: PropTypes.bool.isRequired,
  container: PropTypes.bool,
  wrapperClasses: PropTypes.object,
};

export default Page;
