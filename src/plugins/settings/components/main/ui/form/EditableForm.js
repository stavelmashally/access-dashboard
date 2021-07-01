import React from 'react';
import FormatField from './formFields/FormatField';
import { Divider } from '@material-ui/core';
import ExpandableSection from './ExpandableSection';
import FormHeader from './FormHeader';
import { refreshAtom } from 'plugins/settings/store';
import { useSetRecoilState } from 'recoil';
import { isPlainObject, isEmpty, uniqueId } from 'lodash';
import * as Access from 'plugins/access/gate';
import { getFieldLayout, getFieldComponentByType } from './formFields';

const EditableForm = ({ title, data, type, path }) => {
  const refresh = useSetRecoilState(refreshAtom);

  const handleAddProperty = value => {
    Access.addConfigProperty({ path, value });
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
    return Object.entries(property).map(([key, value], idx) =>
      isPlainObject(value) ? (
        <ExpandableSection title={key} key={idx}>
          {!isEmpty(value) && (
            <EditableForm data={value} type={type} path={`${path}.${key}`} />
          )}
        </ExpandableSection>
      ) : (
        getFieldComponentByType(value, {
          key: uniqueId(),
          label: key,
          value,
          onSubmit: handleSetValue,
          onDelete: handleDeleteProperty,
        })
      )
    );
  };

  const Layout = getFieldLayout(type);

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
        {isPlainObject(data) ? renderTree(data) : <FormatField value={data} />}
      </Layout>
    </>
  );
};

export default EditableForm;
