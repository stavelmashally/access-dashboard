import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import styled from 'styled-components';

const ExpandableSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Title onClick={() => setIsOpen(isOpen => !isOpen)}>
        <Typography variant='h6'>{title}</Typography>
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </Title>
      <InnerSection>{isOpen && children}</InnerSection>
    </>
  );
};

export const Title = styled.div`
  display: flex;
  align-items: center;
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
