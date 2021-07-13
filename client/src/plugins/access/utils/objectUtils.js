export const setValueInPath = (obj, [key, ...next], value) => {
  return next.length === 0
    ? { ...obj, [key]: value }
    : { ...obj, [key]: setValueInPath(obj[key], next, value) };
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
    const { [key]: remove, ...rest } = obj;
    return rest;
  }
  return { ...obj, [key]: deletePropertyInPath(obj[key], next) };
};

export const renamePropertyInPath = (obj, [key, ...next], propName) => {
  if (next.length === 0) {
    const { [key]: value, ...rest } = obj;
    return { [propName]: value, ...rest };
  }
  return { ...obj, [key]: renamePropertyInPath(obj[key], next, propName) };
};

export const renameValue = (obj, { oldVal, newVal }) => {
  console.log('renameValue', oldVal, newVal);
  return Object.entries(obj).reduce(
    (acc, [key, value]) => ({
      ...acc,
      ...{
        [key]: isPlainObject(value)
          ? renameValue(value, { oldVal, newVal })
          : typeof value === 'string' && value.includes(`${oldVal}`)
          ? value.replace(oldVal, newVal)
          : value,
      },
    }),
    {}
  );
};

const isPlainObject = obj => {
  return Object.prototype.toString.call(obj) === '[object Object]';
};
