import React from 'react';
import Label from '../shared/Label';
import { ButtonGroup, Button } from '@material-ui/core';

const BooleanField = ({ fieldValue, onValueChanged, editMode }) => {
  return editMode ? (
    <ButtonGroup>
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
    </ButtonGroup>
  ) : (
      <Label variant="value" title={fieldValue}>
      {String(fieldValue)}
    </Label>
  );
};

export default BooleanField;
