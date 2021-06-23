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

const EditableSection = ({
  title,
  onDeleteSection,
  values,
  type,
  path,
  onTitleChange,
}) => {
  const [edit, setEdit] = useState(title === 'sectionTitle');
  const titleRef = useRef(null);
  const { Component, Layout } = getComponent(type);

  const handleKeyDown = e => {
    if (e.key === 'Enter' || e.key === 'Escape') {
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


  const renderInnerSection = (key, value) => {
    return (
      <InnerSection key={key}>
        <EditableSection
          title={key}
          values={value}
          type={type}
          path={path.concat(`.${key}`)}
          onTitleChange={onTitleChange}
          onDeleteSection={onDeleteSection}
        />
      </InnerSection>
    );
  };

  const renderTree = nodes => {
    if (!isPlainObject(nodes)) {
      return React.createElement(Component, { value: nodes });
    }
    return Object.entries(nodes).map(([key, value]) =>
      isPlainObject(value)
        ? renderInnerSection(key, value)
        : React.createElement(Component, {
            text: key,
            value,
            key,
          })
    );
  };

  return (
    <>
      <SectionTitle>
        {renderTitle()}
        {edit && (
          <ButtonGroup>
            <IconButton>
              <Add />
            </IconButton>
            <IconButton onClick={() => onDeleteSection(path)}>
              <Remove />
            </IconButton>
          </ButtonGroup>
        )}
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
