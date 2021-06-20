import React from 'react';
import { Typography } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import { CenteredContainer } from './Layout';


const Error = ({ text }) => {
  return (
    <CenteredContainer>
      <ErrorIcon fontSize='large'/>
      <Typography variant='h6'>{text}</Typography>
    </CenteredContainer>
  );
};

export default Error;
