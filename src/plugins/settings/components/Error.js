import React from 'react';
import ErrorIcon from '@material-ui/icons/Error';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Error = ({ text }) => {
  return (
    <ErrorContainer>
      <ErrorIcon fontSize='large'/>
      <h3>{text}</h3>
    </ErrorContainer>
  );
};

export default Error;
