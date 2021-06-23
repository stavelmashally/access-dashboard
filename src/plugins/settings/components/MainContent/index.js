import React from 'react';
import Loader from '../Loader';
import Error from '../Error';
import Ui from './Ui';
import Editor from './Editor';
import { Toolbar } from '@material-ui/core';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import {
  viewModeAtom,
  defaultConfigAtom,
  restoreAtom,
} from 'plugins/settings/store';
import { SIDEBAR_WIDTH } from '../Layout';
import styled from 'styled-components';

const MainContent = () => {
  const { state } = useRecoilValueLoadable(defaultConfigAtom);
  const viewMode = useRecoilValue(viewModeAtom);
  useRecoilValue(restoreAtom);

  if (state === 'loading') return <Loader />;
  if (state === 'hasError') return <Error msg='Failed to load configs' />;

  return (
    <Container>
      <Toolbar />
      {viewMode ? <Ui /> : <Editor />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - ${SIDEBAR_WIDTH}px);
  height: 100%;
`;

export default MainContent;
