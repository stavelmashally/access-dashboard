import React from 'react';
import ErrorIcon from '@material-ui/icons/Error';
import { CenteredContainer } from './Layout';


const Error = ({ text }) => {
  return (
    <CenteredContainer>
      <ErrorIcon fontSize='large'/>
      <h3>{text}</h3>
    </CenteredContainer>
  );
};

export default Error;
