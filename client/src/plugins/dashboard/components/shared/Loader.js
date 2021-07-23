import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { CenteredContainer } from "./Layouts";

const Loader = () => {
  return (
    <CenteredContainer>
      <CircularProgress size='5rem'/>
    </CenteredContainer>
  );
};

export default Loader;
