import { useState, useEffect } from 'react';

export const useFormField = (label, value, onSubmit, onDelete, type) => {
  const [inputValue, setInputValue] = useState(value);
  const [labelValue, setLabelValue] = useState(label);
  const [editMode, setEditMode] = useState(label === 'propertyName');

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleKeyDown = ({ key }) => {
    if (key === 'Enter') {
      onSubmit({ [labelValue]: inputValue });
      if (labelValue !== label) handleDelete();
      setEditMode(false);
    }
    if (key === 'Escape') {
      setLabelValue(label);
      setEditMode(false);
    }
  };

  const handleLabelChanged = evt => {
    setLabelValue(evt.target.value);
  };

  const handleValueChanged = ({ target }) => {
    const value = type === 'number' ? Number(target.value) : target.value;
    setInputValue(value);
    if (!editMode) onSubmit({ [labelValue]: value });
  };

  const handleDelete = () => {
    onDelete({ propName: label });
  };

  return {
    inputValue,
    labelValue,
    handleLabelChanged,
    handleValueChanged,
    editMode,
    setEditMode,
    handleKeyDown,
    handleDelete,
  };
};
