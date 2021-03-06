import React from 'react';
import Input from 'plugins/dashboard/components/shared/Input';
import Label from '../shared/Label';

const NumberField = ({ fieldValue, onValueChanged, isEditMode }) => {
  const handleChanged = ({ target }) => {
    onValueChanged(Number(target.value));
  };

  return isEditMode ? (
    <Input
      type="number"
      aria-label="number value"
      value={fieldValue}
      onChange={handleChanged}
    />
  ) : (
    <Label variant="value" title={fieldValue}>
      {fieldValue}
    </Label>
  );
};

export default NumberField;
