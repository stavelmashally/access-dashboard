import React from 'react';
import Input from 'plugins/settings/components/shared/Input';
import Label from '../shared/Label';

const StringField = ({ fieldValue, onValueChanged, editMode }) => {
  const handleChanged = event => {
    onValueChanged(event.target.value);
  };

  return editMode ? (
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
