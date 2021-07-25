import { isObject } from 'lodash';
import {
  addPropertyInPath,
  deletePropertyInPath,
  renamePropertyInPath,
  getFromPath,
  updateObjectProperty,
} from 'plugins/access/utils/objectUtils';
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
    if (pluginConfig.hasOwnProperty(configKey)) {
      config = mergeDeep(config, pluginConfig);
    }
  }
};

export const getFromConfig = path => {
  if (!path) return config;

  return config[path];
};

export const getConfigFromPath = path => {
  return getFromPath(config, path.split('.'));
};

export const replaceConfig = ({ path, value }) => {
  if (!path) {
    config = value;
    return;
  }

  config = { ...config, [path]: value };
};

export const deleteConfigProperty = path => {
  config = deletePropertyInPath(config, path.split('.'));
};

export const addConfigProperty = ({ path, value }) => {
  config = addPropertyInPath(config, path.split('.'), value);
};

export const updateConfigProperty = (path, value) => {
  config = updateObjectProperty(config, path.split('.'), value);
};

export const renameConfigProperty = (path, propName) => {
  config = renamePropertyInPath(config, path.split('.'), propName);
};
