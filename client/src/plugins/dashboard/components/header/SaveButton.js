import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { Save } from '@material-ui/icons';
import { getFromConfig } from 'plugins/access/gate';
import { useRecoilValue } from 'recoil';
import { hasErrorAtom } from 'plugins/dashboard/store';
import { downloadJsonFile } from 'plugins/dashboard/services/file';

const SaveButton = () => {
  const hasError = useRecoilValue(hasErrorAtom);

  const handleSave = () => {
    downloadJsonFile({ content: getFromConfig() });
  };

  return (
    <Tooltip title='Save'>
      <IconButton color='inherit' disabled={hasError} onClick={handleSave}>
        <Save />
      </IconButton>
    </Tooltip>
  );
};

export default SaveButton;
