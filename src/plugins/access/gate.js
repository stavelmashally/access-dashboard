import { isObject, transform, isString, unset } from 'lodash';
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

  config[path] = value;
};

function renameKey(obj, keysMap) {
  return transform(obj, (result, value, key) => {
    const currentKey = keysMap[key] || key;
    result[currentKey] = isObject(value) ? renameKey(value, keysMap) : value;
  });
}

function renameValue(obj, oldValue, newValue) {
  Object.keys(obj).forEach(key => {
    if (obj[key] !== null && isObject(obj[key])) {
      renameValue(obj[key], oldValue, newValue);
    }
    if (isString(obj[key]) && obj[key].includes(oldValue)) {
      obj[key] = obj[key].replace(oldValue, newValue);
    }
  });
}

export const deleteValue = path => {
  unset(config, path);
};

export const editConfigKey = ({ key, newKey }) => {
  config = renameKey(config, { [key]: newKey });
  renameValue(config, key, newKey);
};

export const getFromConfig = path => {
  if (!path) return config;

  return config[path];
};
