import React from 'react';
import Input from 'plugins/dashboard/components/shared/Input';
import Label from '../shared/Label';

const StringField = ({ fieldValue, onValueChanged, isEditMode }) => {
  const handleChanged = event => {
    onValueChanged(event.target.value);
  };

  return isEditMode ? (
    <Input
      type="text"
      aria-label="string fieldValue"
      value={fieldValue}
      onChange={handleChanged}
    />
  ) : (
    <Label variant="value" title={fieldValue}>
      {fieldValue}
    </Label>
  );
};

export default StringField;
