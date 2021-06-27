import { isObject, isString, unset } from 'lodash';
import general from './mainConfig/general';
import colors from './mainConfig/colors';
import icons from './mainConfig/icons';
import formats from './mainConfig/formats';
import dimensions from './mainConfig/dimensions';
import types from './mainConfig/types';

let config = {
  color: colors,
  general,
  icon: icons,
  format: formats,
  dimensions,
  type: types,
};

export const mergeDeep = (target, source) => {
  const innerTarget = JSON.parse(JSON.stringify(target));

  if (!source) return innerTarget;

  if (isObject(innerTarget) && isObject(source)) {
    for (const key in source) {
      if (Array.isArray(source[key])) {
        Object.assign(innerTarget, { [key]: source[key] });
      } else if (isObject(source[key])) {
        if (!innerTarget[key]) Object.assign(innerTarget, { [key]: {} });
        innerTarget[key] = mergeDeep(innerTarget[key], source[key]);
      } else {
        Object.assign(innerTarget, { [key]: source[key] });
      }
    }
  }

  return innerTarget;
};

export const addToConfig = pluginConfig => {
  for (const configKey in pluginConfig) {
    // eslint-disable-next-line no-prototype-builtins
    if (pluginConfig.hasOwnProperty(configKey)) {
      config = mergeDeep(config, pluginConfig);
    }
  }
};

export const replaceConfig = ({ path, value }) => {
  if (!path) {
    config = value;
    return;
  }

  config = { ...config, [path]: value };
};

export const deleteConfigProperty = prop => {
  config = removeKey(config, prop);
};

export const editConfigProperty = ({ property, newProperty }) => {
  config = renameKey(config, { [property]: newProperty });
  config = renameValue(config, { oldVal: property, newVal: newProperty });
};

export const getFromConfig = path => {
  if (!path) return config;

  return config[path];
};

const renameKey = (obj, keysMap) =>
  Object.entries(obj).reduce(
    (acc, [key, value]) => ({
      ...acc,
      ...{
        [keysMap[key] || key]: isObject(value)
          ? renameKey(value, keysMap)
          : value,
      },
    }),
    {}
  );

const renameValue = (obj, { oldVal, newVal }) =>
  Object.entries(obj).reduce(
    (acc, [key, value]) => ({
      ...acc,
      ...{
        [key]: isObject(value)
          ? renameValue(value, { oldVal, newVal })
          : isString(value) && value.includes(oldVal)
          ? value.replace(oldVal, newVal)
          : value,
      },
    }),
    {}
  );

const removeKey = (obj, key) =>
  !isObject(obj)
    ? obj
    : Object.keys(obj)
        .filter(k => k !== key)
        .reduce(
          (acc, x) => Object.assign(acc, { [x]: removeKey(obj[x], key) }),
          {}
        );
