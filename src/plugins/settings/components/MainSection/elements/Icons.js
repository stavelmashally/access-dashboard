import React from 'react';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  width: 100%;
  flex-wrap: wrap;
  gap: 4px;
`;

const IConItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Icons = ({ values }) => {
  const renderIcons = () =>
    Object.entries(values).map(([key, value]) => (
      <IConItem>
        <Typography variant='subtitle2'>{key}:</Typography>
        <Typography variant='body1'>"{value}"</Typography>
      </IConItem>
    ));

  return <Container>{renderIcons()}</Container>;
};

export default Icons;
