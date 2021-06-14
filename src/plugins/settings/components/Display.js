import React from 'react';
import { useRecoilValue } from 'recoil';
import { Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { selectedConfigAtom } from '../store';
import { CenteredContainer } from './Layout';
import * as access from 'plugins/access';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  height: 100%;
  padding-top: 0.5rem;
`;


const useStyles = makeStyles({
  root: {
    width: '90%',
    padding: '0.5rem',
  },
  media: {
    height: 140,
  },
});

const Display = () => {
  const classes = useStyles();
  const selected = useRecoilValue(selectedConfigAtom);

  const config = access[selected]();

  const renderElements = () => {
    return Object.entries(config).map(([key, value]) => (
      <Card className={classes.root}>
        <CardContent>
          <h2>{key}</h2>
          {Object.entries(value).map(([innerKey, innerValue]) => (
            <span>{innerKey}</span>
          ))}
        </CardContent>
      </Card>
    ));
  };

  return <Container>{renderElements()}</Container>;
};

export default Display;
