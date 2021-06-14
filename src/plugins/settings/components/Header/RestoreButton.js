import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { RestorePage } from '@material-ui/icons';
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { replaceConfig } from 'plugins/access/gate';
import { defaultConfigAtom, restoreAtom } from 'plugins/settings/store';

const RestoreButton = () => {
  const defaultConfig = useRecoilValueLoadable(defaultConfigAtom);
  const setRestore = useSetRecoilState(restoreAtom);

  const handleRestore = () => {
    replaceConfig({ value: defaultConfig.contents });
    setRestore(prev => !prev)
  };

  return (
    <Tooltip title='Restore default'>
      <IconButton color='inherit' onClick={handleRestore}>
        <RestorePage />
      </IconButton>
    </Tooltip>
  );
};

export default RestoreButton;
