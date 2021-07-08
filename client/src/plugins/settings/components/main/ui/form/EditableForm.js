import React from 'react';
import FormatField from './formFields/FormatField';
import { Divider } from '@material-ui/core';
import FormHeader from './FormHeader';
import { Column } from 'plugins/settings/components/shared/Layout';
import { isPlainObject, uniqueId } from 'lodash';
import { useAccess } from 'plugins/settings/hooks/useAccess';
import { getFieldComponentByType } from './formFields';

const EditableForm = ({ title, data, path }) => {
  const { AddField, DeleteField, changeLabel, changeValue, DeleteSection } =
    useAccess(path);

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
