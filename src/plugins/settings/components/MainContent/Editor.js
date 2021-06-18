import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/webpack-resolver';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedConfigAtom, hasErrorAtom } from 'plugins/settings/store';
import styled from 'styled-components';
import { getFromConfig, replaceConfig } from 'plugins/access/gate';

const Editor = () => {
  const selected = useRecoilValue(selectedConfigAtom);
  const hasError = useSetRecoilState(hasErrorAtom);

  const code = JSON.stringify(getFromConfig(selected), null, 2);

  const handleChange = newCode => {
    try {
      const config = JSON.parse(newCode);
      replaceConfig({ path: selected, value: config });
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
        debounceChangePeriod={500}
        showPrintMargin={false}
        enableLiveAutocompletion
        editorProps={{ $blockScrolling: true }}
      />
    </EditorContainer>
  );
};

const EditorContainer = styled.div`
  display: flex;
  height: 100%;
`;

export default Editor;
