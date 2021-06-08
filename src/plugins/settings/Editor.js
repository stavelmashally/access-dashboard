import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/ext-language_tools';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  updateConfigSelector,
  activeConfigSelector,
  activeConfigAtom,
} from 'recoil/config';
import { debounce } from 'lodash';
import * as access from 'plugins/access';
import {getFromConfig} from 'plugins/access/gate'

const EditorContainer = styled.div`
  display: flex;
  height: 100%;
`;

const Editor = () => {
  const selected = useRecoilValue(activeConfigAtom);
  const updateConfig = useSetRecoilState(updateConfigSelector);

  const config = selected ? access[selected]() : ''

  const handleChange = debounce(newValue => {
    updateConfig(newValue);
  }, 300);

  return (
    <EditorContainer>
      <AceEditor
        mode='json'
        fontSize={16}
        width='100%'
        height='100%'
        value={JSON.stringify(config, null, 2)}
        onChange={handleChange}
        showPrintMargin={false}
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableLiveAutocompletion: true,
          showLineNumbers: true,
          tabSize: 2,
          useWorker: false,
        }}
      />
    </EditorContainer>
  );
};

export default Editor;
