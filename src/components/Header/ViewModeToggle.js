import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { Visibility, Code } from '@material-ui/icons';
import { useRecoilState } from 'recoil';
import viewModeAtom from 'recoil/viewModeState';

const ViewModeToggle = () => {
  const [viewMode, setViewMode] = useRecoilState(viewModeAtom);
  
  const toggleViewMode = () => setViewMode(!viewMode);

  return (
    <Tooltip title={viewMode ? 'switch to code' : 'switch to ui'}>
      <IconButton color='inherit' onClick={toggleViewMode}>
        {viewMode ? <Visibility /> : <Code />}
      </IconButton>
    </Tooltip>
  );
};

export default ViewModeToggle;
