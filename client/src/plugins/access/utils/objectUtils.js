export const updateObjectProperty = (obj, [key, ...next], value) => {
  if (next.length === 0) {
    return Object.keys(obj)
      .map(_key => (_key === key ? value : { [_key]: obj[_key] }))
      .reduce((acc, cur) => ({ ...acc, ...cur }), {});
  }
  return { ...obj, [key]: updateObjectProperty(obj[key], next, value) };
};

export const renamePropertyInPath = (obj, [key, ...next], propName) => {
  if (next.length === 0) {
    return Object.keys(obj)
      .map(_key =>
        _key === key ? { [propName]: obj[_key] } : { [_key]: obj[_key] }
      )
      .reduce((acc, cur) => ({ ...acc, ...cur }), {});
  }
  return { ...obj, [key]: renamePropertyInPath(obj[key], next, propName) };
};

export const addPropertyInPath = (obj, [key, ...next], value) => {
  return next.length === 0
    ? { ...obj, [key]: { ...obj[key], ...value } }
    : { ...obj, [key]: addPropertyInPath(obj[key], next, value) };
};

export const getFromPath = (obj, [key, ...next]) => {
  return next.length === 0 ? obj[key] : getFromPath(obj[key], next);
};

export const deletePropertyInPath = (obj, [key, ...next]) => {
  if (next.length === 0) {
    const { [key]: omitted, ...rest } = obj;
    return rest;
  }
  return { ...obj, [key]: deletePropertyInPath(obj[key], next) };
};

