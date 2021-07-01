import React from 'react';
import { useFormField } from 'plugins/settings/hooks/useFormField';
import { Typography, IconButton, Button, ButtonGroup } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { Row, Input } from 'plugins/settings/components/shared/Layout';

const BooleanField = ({ label, value, onSubmit, onDelete }) => {
  const {
    labelValue,
    editMode,
    setEditMode,
    handleLabelChanged,
    handleKeyDown,
    handleDelete,
  } = useFormField(label, value, onSubmit, onDelete, 'bool');

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
      <ButtonGroup>
        <Button
          size='small'
          color={value === 'true' ? 'primary' : 'secondary'}
          onClick={() => onSubmit({ [label]: true })}
        >
          True
        </Button>
        <Button
          size='small'
          color={value === 'false' ? 'primary' : 'secondary'}
          onClick={() => onSubmit({ [label]: false })}
        >
          False
        </Button>
      </ButtonGroup>
      {editMode && (
        <IconButton>
          <Delete onClick={handleDelete} />
        </IconButton>
      )}
    </Row>
  );
};

export default BooleanField;
