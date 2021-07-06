import NumberField from './NumberField';
import StringField from './StringField';
import ColorField from './ColorField';
import BooleanField from './BooleanField';
import { isNumber, isString } from 'lodash';

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
