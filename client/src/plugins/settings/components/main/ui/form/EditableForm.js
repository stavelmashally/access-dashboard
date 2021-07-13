import React from 'react';
import { Divider } from '@material-ui/core';
import FormHeader from './FormHeader';
import { useSetRecoilState } from 'recoil';
import { refreshAtom } from 'plugins/settings/store';
import { Column } from 'plugins/settings/components/shared/Layouts';
import { isPlainObject, isNumber, isString, uniqueId } from 'lodash';
import * as Access from 'plugins/access/gate';
import NumberField from './formFields/NumberField';
import StringField from './formFields/StringField';
import ColorField from './formFields/ColorField';
import BooleanField from './formFields/BooleanField';
import EditableList from './formFields/EditableList';

const getFieldComponentByType = value => {
  if (value === 'true' || value === 'false') return BooleanField;
  if (isNumber(value)) return NumberField;
  if (Array.isArray(value)) return EditableList;
  if (isString(value)) return value.startsWith('#') ? ColorField : StringField;
};

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

  const renderTree = () => {
    return Object.entries(data).map(([key, value]) => {
      const fieldProps = {
        key: uniqueId(),
        label: key,
        value,
        onLabelChanged: changeLabel,
        onValueChanged: changeValue,
        onDelete: DeleteField,
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

      const FieldComponent = getFieldComponentByType(value);
      return <FieldComponent {...fieldProps} />;
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
      <Column>{renderTree()}</Column>
    </FormHeader>
  );
};

export default EditableForm;
