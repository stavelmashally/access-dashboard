import React, { useState, useRef } from 'react';
import { Typography, Divider } from '@material-ui/core';
import ExpandableSection from './ExpandableSection';
import EditButtons from './EditButtons';
import { refreshAtom } from 'plugins/settings/store';
import { useSetRecoilState } from 'recoil';
import { isPlainObject, isNumber, isString, isBoolean, isEmpty } from 'lodash';
import { editConfigProperty, deleteConfigProperty } from 'plugins/access/gate';
import { getComponent } from './elements';
import styled from 'styled-components';

const EditableForm = ({ title, data, type }) => {
  const [edit, setEdit] = useState(() => title === 'sectionTitle');
  const refresh = useSetRecoilState(refreshAtom);
  const titleRef = useRef();

  const { Component, Layout } = getComponent(type);

  const handleKeyDown = evt => {
    if (evt.key === 'Enter' || evt.key === 'Escape') {
      editConfigProperty({
        property: title,
        newProperty: titleRef.current.value,
      });
      setEdit(false);
      refresh({});
    }
  };

  const handleDeleteSection = () => {
    deleteConfigProperty(title);
    refresh({});
  };

  const handleAddProperty = () => {};

  const renderTitle = () => {
    return edit ? (
      <>
        <Input
          ref={titleRef}
          type='text'
          autoFocus
          defaultValue={title}
          onKeyDown={handleKeyDown}
        />
        <EditButtons onDelete={handleDeleteSection} onAdd={handleAddProperty} />
      </>
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
      ) : Array.isArray(value) ? (
        React.createElement(Component, {
          text: key,
          value: `[ ${value.join(', ')} ]`,
          key: idx,
        })
      ) : (
        <ExpandableSection title={key} key={idx}>
          {!isEmpty(value) && <EditableForm data={value} type={type} />}
        </ExpandableSection>
      )
    );
  };

  return (
    <>
      {title && <SectionTitle>{renderTitle()}</SectionTitle>}
      <Divider />
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

export default React.memo(EditableForm);
