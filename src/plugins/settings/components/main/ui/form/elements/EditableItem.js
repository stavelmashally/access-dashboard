import React, { useState, useEffect } from 'react';
import { isNumber } from 'lodash';
import {
  Typography,
  Button,
  ButtonGroup,
  IconButton,
  TextField,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { Item } from 'plugins/settings/components/shared/Layout';
import { useToggler } from 'plugins/settings/hooks/useToggler';
import styled from 'styled-components';

const EditableItem = ({ label, value, onSubmit, onDelete }) => {
  const [inputValue, setInputValue] = useState(value);
  const [labelValue, setLabelValue] = useState(label);
  const [editMode, toggleEditMode] = useToggler(label === 'propertyName');

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleKeyDown = ({ key }) => {
    if (key === 'Enter') {
      onSubmit({ [labelValue]: inputValue });
      if (labelValue !== label) onDelete({ propName: label });
      toggleEditMode();
    }
    if (key === 'Escape') {
      setInputValue(value);
      setLabelValue(value);
      toggleEditMode();
    }
  };

  const handleInputValueChanged = ({ target: { value } }) => {
    setInputValue(value);
  };

  const handleLabelValueChanged = ({ target: { value } }) => {
    setLabelValue(value);
  };

  const renderFieldValue = () => {
    const renderBoolean = () => {
      return (
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
      );
    };

    const renderString = () => {
      return (
        <TextField
          type='text'
          size='medium'
          value={inputValue}
          onChange={handleInputValueChanged}
          onKeyDown={handleKeyDown}
        />
      );
    };

    const renderNumber = () => {
      return (
        <div style={{ width: '100px' }}>
          <TextField
            type='number'
            size='small'
            value={inputValue}
            onChange={handleInputValueChanged}
            onKeyDown={handleKeyDown}
          />
        </div>
      );
    };

    return value === 'true' || value === 'false'
      ? renderBoolean()
      : isNumber(value)
      ? renderNumber()
      : renderString();
  };

  const renderField = () => {
    return (
      <>
        <Item>
          <Typography onDoubleClick={toggleEditMode}>{label}</Typography>
          {renderFieldValue()}
        </Item>
      </>
    );
  };

  const renderEditMode = () => {
    return (
      <>
        <Item>
          <TextField
            autoFocus
            value={labelValue}
            onChange={handleLabelValueChanged}
            onKeyDown={handleKeyDown}
          />
          {renderFieldValue()}
        </Item>
        <IconButton>
          <Delete onClick={() => onDelete({ propName: label })} />
        </IconButton>
      </>
    );
  };

  return <Wrapper>{editMode ? renderEditMode() : renderField()}</Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export default EditableItem;
