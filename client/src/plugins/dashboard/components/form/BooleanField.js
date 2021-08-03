import React from 'react';
import { Switch } from '@material-ui/core';

const BooleanField = ({ fieldValue, onValueChanged, isEditMode }) => {
  const handleChange = event => {
    onValueChanged(event.target.checked);
  };

  return isEditMode ? (
    <div>
      <Switch checked={fieldValue} onChange={handleChange} />
    </div>
  ) : (
    <Switch
      checked={fieldValue}
      style={{ cursor: 'default', backgroundColor: 'transparent' }}
    />
  );
};

export default BooleanField;
