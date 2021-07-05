import React from "react";
import FormatField from "./formFields/FormatField";
import { Divider } from "@material-ui/core";
import Expandable from "./Expandable";
import { Column } from "plugins/settings/components/shared/Layout";
import { isPlainObject, uniqueId } from "lodash";
import { useSetRecoilState } from "recoil";
import { refreshAtom } from "plugins/settings/store";
import * as Access from "plugins/access/gate";
import { getFieldComponentByType } from "./formFields";

const EditableForm = ({ title, data, type, path }) => {
  const refresh = useSetRecoilState(refreshAtom);

  const handleAddProperty = (value) => {
    Access.addConfigProperty({ path, value });
    refresh({});
  };

  const handleValueChanged = ({ label, value }) => {
    Access.setConfigValue({ path: `${path}.${label}`, value });
    refresh({});
  };

  const handleLabelChanged = ({ label, value }) => {
    Access.renameConfigProperty({
      path: label ? `${path}.${label}` : path,
      propName: value,
    });
    refresh({});
  };

  const handleDeleteProperty = ({ propName }) => {
    const propPath = propName ? `${path}.${propName}` : path;
    Access.deleteConfigProperty(propPath);
    refresh({});
  };

  const renderTree = (property) => {
    return Object.entries(property).map(([key, value]) => {
      return isPlainObject(value) ? (
        <EditableForm
          key={uniqueId()}
          title={key}
          data={value}
          type={type}
          path={`${path}.${key}`}
        />
      ) : (
        getFieldComponentByType(value, {
          key: uniqueId(),
          label: key,
          value,
          onLabelChanged: handleLabelChanged,
          onValueChanged: handleValueChanged,
          onDelete: handleDeleteProperty,
        })
      );
    });
  };

  return (
    <Expandable
      title={title}
      path={path}
      onSubmit={handleLabelChanged}
      onAdd={handleAddProperty}
      onDelete={handleDeleteProperty}
    >
      <Divider />
      <Column>
        {isPlainObject(data) ? renderTree(data) : <FormatField value={data} />}
      </Column>
    </Expandable>
  );
};

export default EditableForm;
