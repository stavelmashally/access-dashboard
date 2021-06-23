import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import { Item } from 'plugins/settings/components/Layout';
import styled from 'styled-components';

const ExpandableSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Item onClick={() => setIsOpen(prev => !prev)}>
        <Typography variant='h6'>
          {title}
          {isOpen ? '-' : '+'}
        </Typography>
      </Item>
      <InnerSection>
        {isOpen ? children : null}
        {React.Children.count(children) === 0 && isOpen
          ? 'The list is empty!'
          : null}
      </InnerSection>
    </>
  );
};

export const PropertyName = styled.div`
  display: flex;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
`;

export const InnerSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
`;

export default ExpandableSection;
