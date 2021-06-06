import React from 'react';
import { IconButton, Tooltip} from '@material-ui/core';
import { Save } from '@material-ui/icons';

const SaveButton = () => {
  return (
    <Tooltip title='Save'>
      <IconButton color='inherit' aria-label='save'>
        <Save />
      </IconButton>
    </Tooltip>
  );
};

export default SaveButton;
