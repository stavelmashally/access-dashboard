import React, { useState } from 'react';
import AppModal from '../shared/AppModal';
import { IconButton, Tooltip } from '@material-ui/core';
import { RestorePage } from '@material-ui/icons';
import { useSetRecoilState } from 'recoil';
import { refreshAtom, restoreDefaultSelector } from 'plugins/settings/store';

const RestoreButton = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const restoreDefault = useSetRecoilState(restoreDefaultSelector);
  const refresh = useSetRecoilState(refreshAtom);

  const handleRestore = () => {
    restoreDefault();
    setModalOpen(false);
    refresh({});
  };

  return (
    <>
      <Tooltip title='Restore default'>
        <IconButton color='inherit' onClick={() => setModalOpen(true)}>
          <RestorePage />
        </IconButton>
      </Tooltip>
      {modalOpen && (
        <AppModal
          onSubmit={handleRestore}
          onClose={() => setModalOpen(false)}
          msg='Are you sure you want to restore the config?'
        />
      )}
    </>
  );
};

export default RestoreButton;
