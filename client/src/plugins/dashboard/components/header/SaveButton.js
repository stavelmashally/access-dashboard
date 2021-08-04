import React from 'react';
import SaveSnackbar from './SaveSnackbar';
import { IconButton, Tooltip } from '@material-ui/core';
import { Save } from '@material-ui/icons';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { saveConfigSelector } from 'plugins/dashboard/store/data';
import { hasErrorAtom } from 'plugins/dashboard/store/ui';
import { useToggler } from 'plugins/dashboard/hooks/useToggler';

const SaveButton = () => {
  const [isOpen, toggleOpen, , close] = useToggler(false);
  const hasError = useRecoilValue(hasErrorAtom);
  const resetPost = useResetRecoilState(saveConfigSelector);
  
  const handleSave = () => {
    resetPost();
    toggleOpen();
  };

  return (
    <>
      <Tooltip title="Save">
        <IconButton color="inherit" disabled={hasError} onClick={handleSave}>
          <Save />
        </IconButton>
      </Tooltip>
      {isOpen && <SaveSnackbar onClose={close} />}
    </>
  );
};

export default SaveButton;
