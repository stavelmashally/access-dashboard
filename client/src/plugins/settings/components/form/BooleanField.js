import React from 'react';
import Label from '../shared/Label';
import { ButtonGroup, Button } from '@material-ui/core';

const BooleanField = ({ fieldValue, onValueChanged, isEditMode }) => {
  return isEditMode ? (
    <div>
      <Button
        color={fieldValue ? 'primary' : 'secondary'}
        onClick={() => onValueChanged(true)}
      >
        True
      </Button>
      <Button
        color={!fieldValue ? 'primary' : 'secondary'}
        onClick={() => onValueChanged(false)}
      >
        False
      </Button>
    </div>
  ) : (
    <Label variant="value" title={String(fieldValue)}>
      {String(fieldValue)}
    </Label>
  );
};

export default BooleanField;
