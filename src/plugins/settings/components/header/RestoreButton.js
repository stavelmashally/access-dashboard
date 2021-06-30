import React from 'react';
import AppModal from '../shared/AppModal';
import { useToggler } from 'plugins/settings/hooks/useToggler';
import { IconButton, Tooltip } from '@material-ui/core';
import { RestorePage } from '@material-ui/icons';
import { useSetRecoilState } from 'recoil';
import { refreshAtom, restoreDefaultSelector } from 'plugins/settings/store';

const RestoreButton = () => {
  const [modalOpen, toggleModal] = useToggler(false);
  const restoreDefault = useSetRecoilState(restoreDefaultSelector);
  const refresh = useSetRecoilState(refreshAtom);

  const handleRestore = () => {
    restoreDefault();
    toggleModal()
    refresh({});
  };

  return (
    <>
      <Tooltip title='Restore default'>
        <IconButton color='inherit' onClick={toggleModal}>
          <RestorePage />
        </IconButton>
      </Tooltip>
      {modalOpen && (
        <AppModal
          onSubmit={handleRestore}
          onClose={toggleModal}
          msg='Are you sure you want to restore the config?'
        />
      )}
    </>
  );
};

export default RestoreButton;
