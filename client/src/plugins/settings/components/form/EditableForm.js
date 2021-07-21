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

  const changeLabel = ({ label, value }) => {
    Access.renameConfigProperty({
      path: label ? `${path}.${label}` : path,
      propName: value,
    });
    setRefresh({});
  };

  const changeField = (label, { newLabel, value }) => {
    Access.setConfigValue({ path: `${path}.${label}`, value });
    Access.renameConfigProperty({
      path: `${path}.${label}`,
      propName: newLabel,
    });
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
      onSubmit={changeLabel}
      onAdd={addField}
      onDelete={deleteSection}
    >
      <Divider />
      <Grid>{renderTree()}</Grid>
    </FormHeader>
  );
};

export default EditableForm;
