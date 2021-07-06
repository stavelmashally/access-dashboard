import React from 'react';
import SectionsList from './SectionsList';
import { Button, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useAccess } from 'plugins/settings/hooks/useAccess';
import styled from 'styled-components';

const UiView = ({ selected }) => {
  const { getConfigValues, AddSection } = useAccess(selected);

  return (
    <Wrapper>
      <SectionsList config={getConfigValues()} selected={selected} />
      <Button
        style={{ textTransform: 'none' }}
        size="large"
        startIcon={<Add />}
        onClick={AddSection}
      >
        <Typography variant="h5">New</Typography>
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
`;

export default UiView;
