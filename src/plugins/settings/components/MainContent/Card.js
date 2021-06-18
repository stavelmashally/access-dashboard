import React from 'react';
import { Typography, Divider } from '@material-ui/core';
import styled from 'styled-components';

const Card = ({ title, content }) => {
  return (
    <CardWrapper>
      <Typography variant='h5' color='textSecondary'>
        {title}
      </Typography>
      <Divider />
      {content}
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 8px;
  width: 90%;
  padding: 1rem;
  border-radius: 8px;
  background: white;
  box-shadow: 0px 3px 11px 0px #e8eafc, 0 3px 3px -2px #b2b2b21a,
    0 1px 8px 0 #9a9a9a1a;
`;

export default Card;
