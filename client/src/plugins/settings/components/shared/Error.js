import React from 'react';
import { Typography } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import { CenteredContainer } from './Layouts';

const Error = ({ msg = 'Something went wrong...' }) => {
  return (
    <CenteredContainer>
      <ErrorIcon fontSize="large" />
      <Typography variant="h6">{msg}</Typography>
    </CenteredContainer>
  );
};

export default Error;
