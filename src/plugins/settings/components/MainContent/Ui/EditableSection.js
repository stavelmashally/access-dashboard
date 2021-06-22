import React, { useState, useRef } from 'react';
import {
  Typography,
  Divider,
  ButtonGroup,
  IconButton,
} from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import { isPlainObject } from 'lodash';
import { getComponent } from './elements';
import styled from 'styled-components';

const EditableSection = ({ title, values, type, onTitleChange }) => {
  const [edit, setEdit] = useState(false);
  const titleRef = useRef(null);

  const { Component, Layout } = getComponent(type);

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      onTitleChange({ key: title, newKey: titleRef.current.value });
      setEdit(false);
    }
  };

  const renderTitle = () => {
    return edit ? (
      <Input
        ref={titleRef}
        type='text'
        autoFocus
        defaultValue={title}
        onKeyDown={handleKeyDown}
      />
    ) : (
        <Typography
        variant='h5'
        color='textSecondary'
        onDoubleClick={() => setEdit(true)}
      >
        {title}
      </Typography>
    );
  };

  const renderButtons = () => {
    return edit ? (
      <ButtonGroup>
        <IconButton>
          <Remove />
        </IconButton>
        <IconButton>
          <Add />
        </IconButton>
      </ButtonGroup>
    ) : null;
  };

  const renderTree = nodes => {
    return Object.entries(nodes).map(([key, value]) => {
      if (isPlainObject(value)) {
        return (
          <InnerSection key={key}>
            <EditableSection
              title={key}
              values={value}
              type={type}
              onTitleChange={onTitleChange}
            />
          </InnerSection>
        );
      }
      return React.createElement(Component, {
        text: key,
        value,
        key,
      });
    });
  };

  return (
    <>
      <SectionTitle>
        {renderTitle()}
        {renderButtons()}
      </SectionTitle>
      <Divider />
      <Layout>{renderTree(values)}</Layout>
    </>
  );
};

const SectionTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Input = styled.input`
  font-size: 1.5rem;
  border: none;
  border-bottom: 2px solid;
  outline: none;
`;

export const InnerSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

export default EditableSection;
