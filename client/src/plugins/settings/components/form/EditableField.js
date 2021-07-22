import React, { useState } from 'react';
import NumberField from './NumberField';
import StringField from './StringField';
import ColorField from './ColorField';
import BooleanField from './BooleanField';
import EditableList from './EditableList';
import Input from 'plugins/settings/components/shared/Input';
import Label from 'plugins/settings/components/shared/Label';
import { GridItem } from 'plugins/settings/components/shared/Layouts';
import { useToggler } from 'plugins/settings/hooks/useToggler';
import { IconButton } from '@material-ui/core';
import { Delete, Done } from '@material-ui/icons';
import { useSetRecoilState } from 'recoil';
import { confirmModalAtom } from 'plugins/settings/store';
import { isNumber, isString, isBoolean } from 'lodash';
import styled from 'styled-components';

const getFieldComponentByValue = value => {
  if (isBoolean(value)) return BooleanField;
  if (isNumber(value)) return NumberField;
  if (Array.isArray(value)) return EditableList;
  if (isString(value)) return value.startsWith('#') ? ColorField : StringField;
};

const EditableField = ({ label, value, onFieldChanged, onDelete }) => {
  const [labelValue, setLabelValue] = useState(label);
  const [fieldValue, setFieldValue] = useState(value);
  const [isEditMode, toggleEditMode] = useToggler(label === 'propertyName');
  const confirmModal = useSetRecoilState(confirmModalAtom);

  const handleKeyDown = event => {
    const { key } = event;
    if (key === 'Enter') handleSubmit();
    if (key === 'Escape' && label !== 'propertyName') {
      setLabelValue(label);
      setFieldValue(value);
      toggleEditMode();
    }
  };

  const handleSubmit = () => {
    const newLabel = labelValue.trim(' ');
    const newValue = isString(fieldValue) ? fieldValue.trim(' ') : fieldValue;
    // if (newLabel.length < 1 || !newValue) return;
    onFieldChanged(label, { [newLabel]: newValue });
    toggleEditMode();
  };

  const handleLabelChanged = event => {
    setLabelValue(event.target.value);
  };

  const handleValueChanged = newValue => {
    setFieldValue(newValue);
  };

  const handleDelete = () => {
    onDelete(label);
  };

  const renderButtons = () => {
    return (
      <ButtonsWrapper size="small" aria-label="button group">
        <IconButton size="small" onClick={handleSubmit}>
          <Done />
        </IconButton>
        <IconButton
          size="small"
          onClick={() =>
            confirmModal({
              message: 'Are you sure you want to delete this field?',
              onConfirm: handleDelete,
            })
          }
        >
          <Delete />
        </IconButton>
      </ButtonsWrapper>
    );
  };

  const Field = getFieldComponentByValue(value);

  return (
    <GridItem onDoubleClick={toggleEditMode}>
      {isEditMode ? (
        <Input
          type="text"
          aria-label="label value"
          autoFocus
          placeholder={labelValue}
          value={labelValue === 'propertyName' ? '' : labelValue}
          onChange={handleLabelChanged}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <Label title={label}>{`${label}:`}</Label>
      )}
      <FieldWrapper>
        <Field
          isEditMode={isEditMode}
          fieldValue={fieldValue}
          onValueChanged={handleValueChanged}
        />
        {isEditMode && renderButtons()}
      </FieldWrapper>
    </GridItem>
  );
};

const FieldWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
`;

const ButtonsWrapper = styled.div`
  display: flex;

`;

export default EditableField;
