import React from 'react';
import Editable from './Editable';
import { ButtonGroup, Button } from '@material-ui/core';

const BooleanField = ({ value, label, onValueChanged, ...props }) => {
  return (
    <Editable label={label} {...props}>
      <ButtonGroup>
        <Button
          size='small'
          color={value === 'true' ? 'primary' : 'secondary'}
          onClick={() => onValueChanged({ label, value: true })}
        >
          True
        </Button>
        <Button
          size='small'
          color={value === 'false' ? 'primary' : 'secondary'}
          onClick={() => onValueChanged({ label, value: false })}
        >
          False
        </Button>
      </ButtonGroup>
    </Editable>
  );
};

export default BooleanField;
