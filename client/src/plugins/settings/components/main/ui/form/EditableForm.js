import React from 'react';
import FormatField from './formFields/FormatField';
import { Divider } from '@material-ui/core';
import FormHeader from './FormHeader';
import { useSetRecoilState } from 'recoil';
import { refreshAtom } from 'plugins/settings/store';
import { Column } from 'plugins/settings/components/shared/Layout';
import { isPlainObject, uniqueId } from 'lodash';
import { getFieldComponentByType } from './formFields';
import * as Access from 'plugins/access/gate';

const EditableForm = ({ title, data, path }) => {
  const setRefresh = useSetRecoilState(refreshAtom);

  const AddField = value => {
    Access.addConfigProperty({ path, value });
    setRefresh({});
  };

  const DeleteField = fieldName => {
    Access.deleteConfigProperty(`${path}.${fieldName}`);
    setRefresh({});
  };

  const changeValue = ({ label, value }) => {
    Access.setConfigValue({ path: `${path}.${label}`, value });
    setRefresh({});
  };

  const changeLabel = ({ label, value }) => {
    Access.renameConfigProperty({
      path: label ? `${path}.${label}` : path,
      propName: value,
    });
    setRefresh({});
  };

  const DeleteSection = () => {
    Access.deleteConfigProperty(path);
    setRefresh({});
  };

  const renderTree = property => {
    return Object.entries(property).map(([key, value]) => {
      return isPlainObject(value) ? (
        <EditableForm
          key={uniqueId()}
          title={key}
          data={value}
          path={`${path}.${key}`}
        />
      ) : (
        getFieldComponentByType(value, {
          key: uniqueId(),
          label: key,
          value,
          onLabelChanged: changeLabel,
          onValueChanged: changeValue,
          onDelete: DeleteField,
        })
      );
    });
  };

  return (
    <FormHeader
      title={title}
      onSubmit={changeLabel}
      onAdd={AddField}
      onDelete={DeleteSection}
    >
      <Divider />
      <Column>
        {isPlainObject(data) ? renderTree(data) : <FormatField value={data} />}
      </Column>
    </FormHeader>
  );
};

export default EditableForm;
