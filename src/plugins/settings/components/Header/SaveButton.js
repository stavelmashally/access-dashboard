import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { Save } from '@material-ui/icons';
import { useRecoilValue } from 'recoil';
import { saveConfigAtom } from 'plugins/settings/store';

const SaveButton = () => {
  const canSave = useRecoilValue(saveConfigAtom);

  return (
    <Tooltip title='Save'>
      <IconButton color='inherit' disabled={!canSave}>
        <Save />
      </IconButton>
    </Tooltip>
  );
};

export default SaveButton;
