import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';

const ExpandableSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Title onClick={() => setIsOpen(isOpen => !isOpen)}>
        <Typography variant='h6'>
          {title}
          {isOpen ? '-' : '+'}
        </Typography>
      </Title>
      <InnerSection>
        {isOpen && children}
      </InnerSection>
    </>
  );
};

export const Title = styled.div`
  display: flex;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
`;

export const InnerSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0.5rem;
  gap: 1rem;
`;

export default ExpandableSection;
