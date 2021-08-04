import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { Visibility, Code } from '@material-ui/icons';
import { useRecoilState } from 'recoil';
import { viewModeAtom } from 'plugins/dashboard/store/ui';

const ModeToggle = () => {
  const [viewMode, setViewMode] = useRecoilState(viewModeAtom);

  const toggleViewMode = () => setViewMode(viewMode => !viewMode);

  return (
    <Tooltip title={`Switch to ${viewMode ? 'code' : 'ui'}`}>
      <IconButton color='inherit' onClick={toggleViewMode}>
        {viewMode ? <Visibility /> : <Code />}
      </IconButton>
    </Tooltip>
  );
};

export default ModeToggle;
