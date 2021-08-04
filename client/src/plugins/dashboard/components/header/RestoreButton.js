import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { RestorePage } from '@material-ui/icons';
import { useSetRecoilState } from 'recoil';
import { forceUpdateAtom, confirmModalAtom } from 'plugins/dashboard/store/ui';
import { restoreSelector } from 'plugins/dashboard/store/data';

const RestoreButton = () => {
  const restore = useSetRecoilState(restoreSelector);
  const confirmModal = useSetRecoilState(confirmModalAtom);
  const forceUpdate = useSetRecoilState(forceUpdateAtom);

  const handleRestore = () => {
    restore();
    forceUpdate(x => x + 1);
  };

  return (
    <Tooltip title="Restore config">
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
  );
};

export default RestoreButton;
