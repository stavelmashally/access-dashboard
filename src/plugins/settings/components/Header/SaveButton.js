import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { Save } from '@material-ui/icons';
import { useRecoilValue } from 'recoil';
import { hasErrorAtom } from 'plugins/settings/store';

const SaveButton = () => {
  const hasError = useRecoilValue(hasErrorAtom);

  return (
    <Tooltip title='Save'>
      <IconButton color='inherit' disabled={hasError}>
        <Save />
      </IconButton>
    </Tooltip>
  );
};

export default SaveButton;
