import React from 'react';
import Loader from '../shared/Loader';
import Error from '../shared/Error';
import Ui from './ui/UiView';
import Editor from './editor/CodeEditor';
import { Toolbar } from '@material-ui/core';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import {
  viewModeAtom,
  defaultConfigAtom,
  refreshAtom,
} from 'plugins/settings/store';
import { SIDEBAR_WIDTH } from '../shared/Layout';
import styled from 'styled-components';

const MainContent = () => {
  const { state } = useRecoilValueLoadable(defaultConfigAtom);
  const viewMode = useRecoilValue(viewModeAtom);
  useRecoilValue(refreshAtom);

  if (state === 'loading') return <Loader />;
  if (state === 'hasError') return <Error msg='Failed to load configs' />;

  return (
    <Wrapper>
      <Toolbar />
      {viewMode ? <Ui /> : <Editor />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - ${SIDEBAR_WIDTH}px);
  height: 100%;
`;

export default MainContent;
