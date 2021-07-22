import React from 'react';
import { Divider } from '@material-ui/core';
import FormHeader from './FormHeader';
import EditableField from './EditableField';
import { Grid } from '../shared/Layouts';
import { useSetRecoilState } from 'recoil';
import { refreshAtom } from 'plugins/settings/store';
import { isPlainObject, isUndefined, uniqueId } from 'lodash';
import * as Access from 'plugins/access/gate';

const EditableForm = ({ title, data, path }) => {
  const setRefresh = useSetRecoilState(refreshAtom);

  const addField = value => {
    Access.addConfigProperty({ path, value });
    setRefresh({});
  };

  const deleteField = fieldName => {
    Access.deleteConfigProperty(`${path}.${fieldName}`);
    setRefresh({});
  };

  const changeTitle = label => {
    Access.renameConfigProperty(path, label);
    setRefresh({});
  };

  const changeField = (label, fieldValue) => {
    Access.updateConfigProperty(`${path}.${label}`, fieldValue);
    setRefresh({});
  };

  const deleteSection = () => {
    Access.deleteConfigProperty(path);
    setRefresh({});
  };

  const renderTree = () => {
    return Object.entries(data).map(([key, value]) => {
      if (isUndefined(value)) return null;

      const fieldProps = {
        key: uniqueId(),
        label: key,
        value,
        onFieldChanged: changeField,
        onDelete: deleteField,
      };

      if (isPlainObject(value)) {
        return (
          <EditableForm
            key={fieldProps.key}
            title={fieldProps.label}
            data={fieldProps.value}
            path={`${path}.${fieldProps.label}`}
          />
        );
      }

      return <EditableField {...fieldProps} />;
    });
  };

  return (
    <FormHeader
      title={title}
      onSubmit={changeTitle}
      onAdd={addField}
      onDelete={deleteSection}
    >
      <Divider />
      <Grid>{renderTree()}</Grid>
    </FormHeader>
  );
};

export default EditableForm;
