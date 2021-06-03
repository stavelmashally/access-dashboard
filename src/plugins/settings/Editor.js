import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/ext-language_tools';
import { useRecoilValue } from 'recoil';
import { elementSelector } from '../../components/App';
import styled from 'styled-components';
import * as access from '../access';
import {getFromConfig} from '../access/gate'

const EditorContainer = styled.div`
  display: flex;
  padding-top: 8px;
  height: 100%;
`;

const Editor = () => {
  const element = useRecoilValue(elementSelector);
  const value = JSON.stringify(getFromConfig(element), null, 2);

  return (
    <EditorContainer>
      <AceEditor
        mode='json'
        fontSize={16}
        width='100%'
        height='100%'
        showPrintMargin={false}
        value={value}
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableLiveAutocompletion: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    </EditorContainer>
  );
};

export default Editor;
