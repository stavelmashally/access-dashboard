import React from 'react'
import { IconButton, Tooltip } from '@material-ui/core';
import { RestorePage } from '@material-ui/icons';

const RestoreButton = () => {
  return (
    <Tooltip title='Restore default'>
      <IconButton color='inherit'>
        <RestorePage />
      </IconButton>
    </Tooltip>
  );
}

export default RestoreButton
