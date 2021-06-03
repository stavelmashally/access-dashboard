
import { isUndefined, isObject, isString } from 'lodash';
import { getFromConfig, mergeDeep } from './gate';
import memoize from 'memoizee';

const memo = (func) => {
  return memoize(func, { primitive: true });
};

const get = (collection, path, delimiter = '.') => {
  if (!path) return collection;
  
  let value = collection;

  if (typeof path === 'string') {
    path = path.split(delimiter);
  }

  for (let i = 0; i < path.length; i++) {
    if (typeof value === 'undefined') {
      return undefined;
    }
    value = value[path[i]];
  }

  return value;
};

const getNestedEndValue = (newObject = {}, obj, type, delimiter) => {
  const keys = Object.keys(obj);

  keys.forEach((key) => {
    const value = obj[key];

    if (isUndefined(value)) newObject[key] = undefined;
    else if (Array.isArray(value)) newObject[key] = value;
    else if (isObject(value)) {
      newObject[key] = getNestedEndValue({}, value, type, delimiter);
    } else if (isString(value)) {
      if (value.indexOf(delimiter) > -1) {
        // eslint-disable-next-line no-use-before-define
        newObject[key] =  getNested(type, value);
      } else {
        newObject[key] = value;
      }
    }
  });

  return newObject;
};

const getNested = (type, path, delimiter = '.') => {
  const collection = getFromConfig(type);
  const code = get(collection, path, delimiter);

  if (isUndefined(code)) return undefined;
  if (Array.isArray(code)) return code;
  if (isObject(code)) return getNestedEndValue({}, code, type, delimiter);
  if (isString(code)) {
    if (code.indexOf(delimiter) > -1) return getNested(type, code);
  }

  return code;
};

const getDimension = (path) => {
  return getNested('dimensions', path);
};

const getFormat = (path) => {
  return getNested('formats', path, '_');
};

const getGeneral = (path) => {
  return getNested('general', path);
};

const getColor = (path) => {
  return getNested('colors', path);
};

const getIcon = (path) => {
  return getNested('icons', path);
};

const getWidgets = (path) => {
  return getNested('widgets', path);
};

const getType = (path) => {
  return getNested('types', path);
};

const getChart = (path) => {
  return getNested('charts', path);
};

const getTable = (path) => {
  return getNested('tables', path);
};

const getEnums = (path) => {
  const collection = getFromConfig('enums');

  if (!collection) return undefined;
  if (!path) return collection;

  const pathArr = path.split('.');
  const [group, key] = pathArr;

  if (!collection[group]) return undefined;
  if (!key) return collection[group];

  const enumObject = collection[group].filter((item) => {
    return item.enumId === key;
  });
  
  return enumObject && enumObject[0];
};

const getEntity = (type, path) => {
  const collection = getFromConfig('entities') || {};
  const mainConfig = collection.default || {};

  
  if (!type) {
    const entries = Object.entries(collection);

    const entities = entries.reduce((res, [name, typeConfig]) => {
      res.push(
        {
          name,
          typeConfig,
          fullConfig: mergeDeep(mainConfig, typeConfig),
        },
      );

      return res;
    }, []);

    return entities;
  }

  const typeConfig = collection[type.toLowerCase()];
  const fullConfig = mergeDeep(mainConfig, typeConfig);

  if (path) {
    return get(fullConfig, path);
  }

  return fullConfig;
};


export const dim = memo(getDimension);
export const icon = memo(getIcon);
export const color = memo(getColor);
export const format = memo(getFormat);
export const general = memo(getGeneral);
export const chart = memo(getChart); 
export const widget = memo(getWidgets); 
export const table = memo(getTable);
export const entity = memo(getEntity); 
export const type = memo(getType); 
export const enums = memo(getEnums);
