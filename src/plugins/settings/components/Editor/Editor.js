import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/webpack-resolver';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  selectedConfigAtom,
  viewModeAtom,
  hasErrorAtom,
} from 'plugins/settings/store';
import styled from 'styled-components';
import { getFromConfig, replaceConfig } from 'plugins/access/gate';
import * as access from 'plugins/access';

const EditorContainer = styled.div`
  display: flex;
  height: 100%;
`;

const Editor = () => {
  const selected = useRecoilValue(selectedConfigAtom);
  const viewMode = useRecoilValue(viewModeAtom);
  const hasError = useSetRecoilState(hasErrorAtom);

  const config = viewMode ? access[selected]() : getFromConfig(selected);
  const code = JSON.stringify(config, null, 2);

  const handleChange = newCode => {
    if (viewMode || newCode === code) return;
    try {
      replaceConfig(selected, JSON.parse(newCode));
      hasError(false);
    } catch (error) {
      hasError(true);
    }
  };

  return (
    <EditorContainer>
      <AceEditor
        mode='json'
        fontSize={16}
        tabSize={2}
        width='100%'
        height='100%'
        value={code}
        onChange={handleChange}
        readOnly={viewMode}
        debounceChangePeriod={500}
        showPrintMargin={false}
        enableLiveAutocompletion
        highlightSelectedWord
        editorProps={{ $blockScrolling: true }}
      />
    </EditorContainer>
  );
};

export default Editor;
