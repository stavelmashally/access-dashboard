import React from 'react';
import { Divider } from '@material-ui/core';
import ExpandableSection from './ExpandableSection';
import FormHeader from './FormHeader';
import { refreshAtom } from 'plugins/settings/store';
import { useSetRecoilState } from 'recoil';
import { isPlainObject, isNumber, isString, isEmpty } from 'lodash';
import * as Access from 'plugins/access/gate';
import { getComponent } from './elements';

const EditableForm = ({ title, data, type, path }) => {
  const refresh = useSetRecoilState(refreshAtom);

  const { Component, Layout } = getComponent(type);

  const handleAddProperty = fieldValue => {
    Access.addConfigProperty({
      path,
      value: { propertyName: fieldValue },
    });
    refresh({});
  };

  const handleSetValue = value => {
    Access.setConfigValue({ path, value });
    refresh({});
  };

  const handleTitleChanged = title => {
    Access.editConfigProperty({ path, newProperty: title });
    refresh({});
  };

  const handleDeleteProperty = ({ propName }) => {
    const propPath = propName ? `${path}.${propName}` : path;
    Access.deleteConfigProperty(propPath);
    refresh({});
  };

  const renderTree = property => {
    return Object.entries(property).map(([key, value], idx) => {
      const elemProps = {
        key,
        label: key,
        onSubmit: handleSetValue,
        onDelete: handleDeleteProperty,
      };

      if (isNumber(value) || isString(value))
        return <Component {...elemProps} value={value} />;

      if (Array.isArray(value))
        return <Component {...elemProps} value={`[ ${value.join(', ')} ]`} />;

      return (
        <ExpandableSection title={key} key={idx}>
          {!isEmpty(value) && (
            <EditableForm data={value} type={type} path={`${path}.${key}`} />
          )}
        </ExpandableSection>
      );
    });
  };

  return (
    <>
      {title && (
        <FormHeader
          title={title}
          onSubmit={handleTitleChanged}
          onAdd={handleAddProperty}
          onDelete={handleDeleteProperty}
        />
      )}
      <Divider />
      <Layout>
        {isPlainObject(data) ? renderTree(data) : <Component value={data} />}
      </Layout>
    </>
  );
};

export default EditableForm;
