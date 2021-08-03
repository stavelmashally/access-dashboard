import { useState, useCallback } from 'react';

export const useToggler = (initialState = false) => {
  const [value, setValue] = useState(initialState);

  const toggle = useCallback(() => setValue(prev => !prev), []);
  const open = useCallback(() => setValue(true), []);
  const close = useCallback(() => setValue(false), []);

  return [value, toggle, open, close];
};
