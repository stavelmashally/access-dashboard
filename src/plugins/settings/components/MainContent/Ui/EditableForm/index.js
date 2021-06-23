import React, { useState, useRef } from 'react';
import { Typography, Divider} from '@material-ui/core';
import ExpandableSection from './ExpandableSection';
import EditButtons from './EditButtons';
import { isPlainObject, isNumber, isString, isBoolean } from 'lodash';
import { getComponent } from '../elements';
import styled from 'styled-components';

const EditableForm = ({
  title,
  data,
  type,
  path,
  onTitleChange,
  onAddProperty,
  onDeleteSection,
}) => {
  const [edit, setEdit] = useState(title === 'sectionTitle');
  const titleRef = useRef();

  const { Component, Layout } = getComponent(type);

  const handleKeyDown = e => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      const newTitle = titleRef.current.value;
      onTitleChange({ key: title, newKey: newTitle });
      setEdit(false);
    }
  };

  const handleDeleteSection = () => {
    onDeleteSection(path);
  };

  const handleAddProperty = () => {
    onAddProperty();
  };

  const renderTitle = () => {
    return (
      <>
        <SectionTitle>
          {edit ? (
            <>
              <Input
                ref={titleRef}
                type='text'
                autoFocus
                defaultValue={title}
                onKeyDown={handleKeyDown}
              />
              <EditButtons
                onDelete={handleDeleteSection}
                onAdd={handleAddProperty}
              />
            </>
          ) : (
            <Typography
              variant='h5'
              color='textSecondary'
              onDoubleClick={() => setEdit(true)}
            >
              {title}
            </Typography>
          )}
        </SectionTitle>
        <Divider />
      </>
    );
  };

  const renderTree = property => {
    if (!isPlainObject(property)) {
      return React.createElement(Component, { value: property });
    }

    return Object.entries(property).map(([key, value], idx) =>
      isNumber(value) || isString(value) || isBoolean(value) ? (
        React.createElement(Component, {
          text: key,
          value,
          key: idx,
        })
      ) : (
        <ExpandableSection title={key} key={idx}>
          <EditableForm
            data={value}
            type={type}
            path={path.concat(`.${key}`)}
            onTitleChange={onTitleChange}
            onDeleteSection={onDeleteSection}
          />
        </ExpandableSection>
      )
    );
  };

  return (
    <>
      {title && renderTitle()}
      <Layout>{renderTree(data)}</Layout>
    </>
  );
};

const SectionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Input = styled.input`
  font-size: 1.5rem;
  width: 40%;
  border: none;
  border-bottom: 2px solid;
  outline: none;
`;

const ButtonsContainer = styled.div`
  display: flex;
`;

export const InnerSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

export default React.memo(EditableForm);
