import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import styled from 'styled-components';

const LoaderContainer = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <CircularProgress size='5rem'/>
    </LoaderContainer>
  );
};

export default Loader;
