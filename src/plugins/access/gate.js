import { isObject, isString, isPlainObject } from 'lodash';
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

export const getFromConfig = path => {
  if (!path) return config;

  return config[path];
};

export const replaceConfig = ({ path, value }) => {
  if (!path) {
    config = value;
    return;
  }

  config = { ...config, [path]: value };
};

export const deleteConfigProperty = path => {
  console.log(path)
  config = deletePropertyInPath(config, path.split('.'));
};

export const addConfigProperty = ({ path, value, propName }) => {
  path = path.split('.');
  config = addPropertyInPath(config, path, value);
  if (propName) deleteConfigProperty(config, path, propName);
};

export const editConfigProperty = ({ path, newProperty }) => {
  path = path.split('.');
  config = renamePropertyInPath(config, path, newProperty);
  config = renameValue(config, {
    oldVal: path[path.length - 1],
    newVal: newProperty,
  });
};

export const setConfigValue = ({ path, value }) => {
  config = addPropertyInPath(config, path.split('.'), value);
};

const addPropertyInPath = (obj, [key, ...next], value) => {
  return next.length === 0
    ? { ...obj, [key]: { ...obj[key], ...value } }
    : { ...obj, [key]: addPropertyInPath(obj[key], next, value) };
};

const deletePropertyInPath = (obj, [key, ...next], value) => {
  if (next.length === 0) {
    const { [key]: remove, ...rest } = obj;
    return rest;
  }
  return { ...obj, [key]: deletePropertyInPath(obj[key], next, value) };
};

const renamePropertyInPath = (obj, [key, ...next], propName) => {
  if (next.length === 0) {
    const { [key]: value, ...rest } = obj;
    return { [propName]: value, ...rest };
  }
  return { ...obj, [key]: renamePropertyInPath(obj[key], next, propName) };
};

const renameValue = (obj, { oldVal, newVal }) =>
  Object.entries(obj).reduce(
    (acc, [key, value]) => ({
      ...acc,
      ...{
        [key]: isPlainObject(value)
          ? renameValue(value, { oldVal, newVal })
          : isString(value) && value.includes(oldVal)
          ? value.replace(oldVal, newVal)
          : value,
      },
    }),
    {}
  );
