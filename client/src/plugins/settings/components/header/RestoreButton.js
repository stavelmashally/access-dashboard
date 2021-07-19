import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { RestorePage } from '@material-ui/icons';
import { useSetRecoilState } from 'recoil';
import {
  refreshAtom,
  restoreDefaultSelector,
  confirmModalAtom,
} from 'plugins/settings/store';

const RestoreButton = () => {
  const restoreDefault = useSetRecoilState(restoreDefaultSelector);
  const confirmModal = useSetRecoilState(confirmModalAtom);
  const refresh = useSetRecoilState(refreshAtom);

  const handleRestore = () => {
    restoreDefault();
    refresh({});
  };

  return (
    <>
      <Tooltip title="Restore default">
        <IconButton
          color="inherit"
          onClick={() =>
            confirmModal({
              message: 'Are you sure you want to restore the config?',
              onConfirm: handleRestore,
            })
          }
        >
          <RestorePage />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default RestoreButton;
