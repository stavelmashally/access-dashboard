import { Row, Column } from 'plugins/settings/components/shared/Layout';
import NumberField from './NumberField';
import StringField from './StringField';
import ColorField from './ColorField';
import BooleanField from './BooleanField';
import { isNumber, isString } from 'lodash';

const layouts = {
  color: Row,
  icon: Column,
  format: Row,
  dimensions: Column,
  type: Column,
  general: Column,
  fallback: Row,
};

export const getFieldComponentByType = (value, fieldProps) => {
  if (value === 'true' || value === 'false')
    return <BooleanField {...fieldProps} />;

  if (isNumber(value)) return <NumberField {...fieldProps} />;

  if (isString(value)) {
    return value.startsWith('#') ? (
      <ColorField {...fieldProps} />
    ) : (
      <StringField {...fieldProps} />
    );
  }

  if (Array.isArray(value))
    return <StringField {...fieldProps} value={`[ ${value.join(', ')} ]`} />;
};

export const getFieldLayout = type => {
  if (layouts[type] !== undefined) return layouts[type];

  return layouts['fallback'];
};
