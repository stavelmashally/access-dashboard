import React from 'react';
import { Typography, Divider } from '@material-ui/core';
import { useRecoilValue } from 'recoil';
import { selectedConfigAtom } from '../../store';
import * as access from 'plugins/access';
import * as elements from './elements';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  height: 100%;
  padding: 1rem 0;
`;

const Card = styled.div`
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

const Display = () => {
  const selected = useRecoilValue(selectedConfigAtom);

  const config = access[selected]();

  const renderElements = () =>
    Object.entries(config).map(([key, values]) => (
      <Card>
        <Typography variant='h5' color='textSecondary'>{key}</Typography>
        <Divider />
        {elements[selected](values)}
      </Card>
    ));

  return <Container>{renderElements()}</Container>;
};

export default Display;
