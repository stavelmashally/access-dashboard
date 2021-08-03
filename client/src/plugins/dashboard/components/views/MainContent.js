import React from 'react';
import Loader from '../shared/Loader';
import Error from '../shared/Error';
import Ui from './UiView';
import Editor from './CodeEditor';
import Settings from './Settings';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import {
  configEndpointsAtom,
  viewModeAtom,
  configAtom,
  selectedConfigAtom,
} from 'plugins/dashboard/store';
import { SIDEBAR_WIDTH, TOOLBAR_HEIGHT } from '../shared/Layouts';
import styled from 'styled-components/macro';

const MainContent = () => {
  const viewMode = useRecoilValue(viewModeAtom);
  const selected = useRecoilValue(selectedConfigAtom);
  const { fetchUrl, postUrl } = useRecoilValue(configEndpointsAtom);
  const { state } = useRecoilValueLoadable(configAtom);

  if (!fetchUrl || !postUrl)
    return (
      <Wrapper>
        <Settings />
      </Wrapper>
    );
  if (state === 'loading') return <Loader />;
  if (state === 'hasError') return <Error msg="Failed to load configs" />;

  return (
    <Wrapper>
      {viewMode ? <Ui selected={selected} /> : <Editor selected={selected} />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: ${TOOLBAR_HEIGHT}px;
  left: ${SIDEBAR_WIDTH}px;
  right: 0px;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

export default MainContent;
