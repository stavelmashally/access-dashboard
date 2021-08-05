import React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useRecoilValueLoadable } from 'recoil';
import { saveConfigSelector } from 'plugins/dashboard/store/data';

const SaveSnackbar = ({ onClose }) => {
  const { state } = useRecoilValueLoadable(saveConfigSelector);

  const loading = state === 'loading';
  const error = state === 'hasError';
  const severity = loading ? 'info' : error ? 'error' : 'success';

  return (
    <Snackbar
      open
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert severity={severity} onClose={onClose}>
        {loading
          ? 'Saving...'
          : error
          ? 'Failed to save config'
          : 'Saved successfully'}
      </Alert>
    </Snackbar>
  );
};

export default SaveSnackbar;
