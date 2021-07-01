import React from 'react';
import { useFormField } from 'plugins/settings/hooks/useFormField';
import { Typography, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { Row, Input } from 'plugins/settings/components/shared/Layout';

const NumberField = ({ label, value, onSubmit, onDelete }) => {
  const {
    inputValue,
    labelValue,
    editMode,
    setEditMode,
    handleLabelChanged,
    handleValueChanged,
    handleKeyDown,
    handleDelete,
  } = useFormField(label, value, onSubmit, onDelete, 'number');

  return (
    <Row>
      {editMode ? (
        <Input
          autoFocus
          value={labelValue}
          onChange={handleLabelChanged}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <Typography variant='h6' onDoubleClick={setEditMode}>
          {label}
        </Typography>
      )}

      <Input
        type='number'
        size='small'
        value={inputValue}
        onChange={handleValueChanged}
      />

      {editMode && (
        <IconButton>
          <Delete onClick={handleDelete} />
        </IconButton>
      )}
    </Row>
  );
};

export default NumberField;
