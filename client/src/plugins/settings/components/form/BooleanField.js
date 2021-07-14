import React from 'react';
import EditableField from './EditableField';
import { ButtonGroup, Button } from '@material-ui/core';

const BooleanField = ({ value, label, onValueChanged, ...props }) => {
  return (
    <EditableField label={label} {...props}>
      <ButtonGroup>
        <Button
          size="small"
          color={value === 'true' ? 'primary' : 'secondary'}
          onClick={() => onValueChanged({ label, value: true })}
        >
          True
        </Button>
        <Button
          size="small"
          color={value === 'false' ? 'primary' : 'secondary'}
          onClick={() => onValueChanged({ label, value: false })}
        >
          False
        </Button>
      </ButtonGroup>
    </EditableField>
  );
};

export default BooleanField;