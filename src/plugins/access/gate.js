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

  config = { ...config, [path]: value };
};

export const deleteValue = path => {
  unset(config, path);
};

export const editConfigProperty = ({ property, newProperty }) => {
  config = renameProperty(config, { [property]: newProperty });
  renameValue(config, property, newProperty);
};

export const getFromConfig = path => {
  if (!path) return config;

  return config[path];
};

function renameProperty(obj, keysMap) {
  return transform(obj, (result, value, key) => {
    const currentKey = keysMap[key] || key;
    result[currentKey] = isObject(value)
      ? renameProperty(value, keysMap)
      : value;
  });
}

function renameValue(obj, oldVal, newVal) {
  Object.entries(obj).forEach(([key, value]) => {
    if (value && isObject(value)) {
      renameValue(obj[key], oldVal, newVal);
    }
    if (isString(value) && value.includes(oldVal)) {
      obj[key] = value.replace(oldVal, newVal);
    }
  });
}
